import React, { Fragment, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductDetailsContext } from "./index";
import { LayoutContext } from "../layout";
import Submenu from "./Submenu";
import ProductDetailsSectionTwo from "./ProductDetailsSectionTwo";

import { getSingleProduct } from "./FetchApi";
import { cartListProduct } from "../partials/FetchApi";

import { isWishReq, unWishReq, isWish } from "../home/Mixins";
import { updateQuantity, addToCart, cartList } from "./Mixins";
import { totalCost } from "../partials/Mixins";

const apiURL = process.env.REACT_APP_API_URL;

const ProductDetailsSection = () => {
  const { id } = useParams();

  const { data, dispatch } = useContext(ProductDetailsContext);
  const { data: layoutData, dispatch: layoutDispatch } = useContext(LayoutContext);

  const sProduct = layoutData.singleProductDetail;
  const [pImages, setPimages] = useState([]);
  const [count, setCount] = useState(0);

  const [quantity, setQuantity] = useState(1);
  const [, setAlertq] = useState(false);

  const [wList, setWlist] = useState(JSON.parse(localStorage.getItem("wishList")) || []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    try {
      const responseData = await getSingleProduct(id);
      if (responseData && responseData.Product) {
        layoutDispatch({ type: "singleProductDetail", payload: responseData.Product });
        setPimages(responseData.Product.pImages || []);
        dispatch({ type: "loading", payload: false });
        layoutDispatch({ type: "inCart", payload: cartList() });
      } else {
        dispatch({ type: "loading", payload: false });
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      dispatch({ type: "loading", payload: false });
    }
    fetchCartProduct();
  };

  const fetchCartProduct = async () => {
    try {
      const responseData = await cartListProduct();
      if (responseData && responseData.Products) {
        layoutDispatch({ type: "cartProduct", payload: responseData.Products });
      }
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };

  if (data.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </div>
    );
  }

  if (!sProduct) {
    return <div className="p-4 text-center text-gray-600">Product not found.</div>;
  }

  return (
    <Fragment>
      <Submenu
        value={{
          categoryId: sProduct.pCategory?._id || "",
          product: sProduct.pName || "",
          category: sProduct.pCategory?.cName || "",
        }}
      />
      <section className="m-4 md:mx-12 md:my-6">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-4">
          <div className="hidden md:flex md:flex-col md:space-y-4 md:col-span-1 md:mr-2">
            {pImages.map((img, index) => (
              <img
                key={index}
                onClick={() => setCount(index)}
                className={`cursor-pointer w-20 h-20 object-cover object-center ${count === index ? "" : "opacity-50"}`}
                src={`${apiURL}/uploads/products/${img}`}
                alt={`Thumbnail ${index + 1}`}
              />
            ))}
          </div>
          <div className="col-span-2 md:col-span-7">
            <div className="relative">
              {pImages[count] ? (
                <img
                  className="w-full"
                  src={`${apiURL}/uploads/products/${pImages[count]}`}
                alt={`Product ${count + 1}`}
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image Available
                </div>
              )}
            </div>
          </div>
          <div className="col-span-2 md:col-span-4 md:ml-6 lg:ml-12">
            <div className="flex flex-col leading-8">
              <h1 className="text-3xl font-semibold mb-2">{sProduct.pName}</h1>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-yellow-700">₹{sProduct.pPrice}.00</span>
                <span>
                  {!isWish(sProduct._id, wList) ? (
                    <svg
                      onClick={(e) => isWishReq(e, sProduct._id, setWlist)}
                      className="w-6 h-6 cursor-pointer text-yellow-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      onClick={(e) => unWishReq(e, sProduct._id, setWlist)}
                      className="w-6 h-6 cursor-pointer text-yellow-700"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
              </div>
              <p className="text-gray-700 mb-6">{sProduct.pDescription}</p>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Quantity</label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() =>
                      updateQuantity("decrease", sProduct.pQuantity, quantity, setQuantity, setAlertq)
                    }
                    disabled={quantity <= 1}
                    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity("increase", sProduct.pQuantity, quantity, setQuantity, setAlertq)
                    }
                    disabled={quantity >= sProduct.pQuantity}
                    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
                {quantity === sProduct.pQuantity && (
                  <p className="text-xs text-red-500 mt-1">Stock limited</p>
                )}
              </div>
              {sProduct.pQuantity > 0 ? (
                layoutData.inCart && layoutData.inCart.includes(sProduct._id) ? (
                  <button
                    disabled
                    className="w-full py-2 bg-gray-700 text-white uppercase opacity-75 cursor-not-allowed"
                  >
                    In Cart
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      addToCart(
                        sProduct._id,
                        quantity,
                        sProduct.pPrice,
                        layoutDispatch,
                        setQuantity,
                        setAlertq,
                        fetchData,
                        totalCost
                      )
                    }
                    className="w-full py-2 bg-gray-800 text-white uppercase hover:bg-yellow-700 transition"
                  >
                    Add to Cart
                  </button>
                )
              ) : (
                <button
                  disabled
                  className="w-full py-2 bg-gray-400 text-white uppercase cursor-not-allowed"
                >
                  Out of Stock
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      <ProductDetailsSectionTwo />
    </Fragment>
  );
};

export default ProductDetailsSection;

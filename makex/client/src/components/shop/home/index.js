import React, { Fragment, useReducer, useEffect, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Layout from "../layout";
import Slider from "./Slider";
import ProductCategory from "./ProductCategory";
import { homeState, homeReducer, HomeContext } from "./HomeContext";
import SingleProduct from "./SingleProduct";
import ProductCard from "./ProductCard";
import HorizontalProductList from "./HorizontalProductList";
import { getAllProduct } from "../../admin/products/FetchApi";
import { getAllCategory } from "../../admin/categories/FetchApi";
import { getSlideImages } from "./FetchApi";

const SearchBar = () => {
const { dispatch } = useContext(HomeContext);
const [searchTerm, setSearchTerm] = useState("");

const handleChange = (e) => {
setSearchTerm(e.target.value);
dispatch({ type: "searchHandleInReducer", payload: e.target.value });
};

return (
  <input
    type="text"
    value={searchTerm}
    onChange={handleChange}
    placeholder="Search products..."
    className="w-full p-2 border border-gray-300 rounded"
  />
);
};

const FilteredSlider = ({ title, products, onImageClick }) => {
const [slide, setSlide] = useState(0);

useEffect(() => {
  console.log("FilteredSlider products:", products);
  if (products.length > 0) {
    setSlide(0);
  }
}, [products]);

const prevSlide = () => {
setSlide((prev) => (prev === 0 ? products.length - 1 : prev - 1));
};

const nextSlide = () => {
setSlide((prev) => (prev === products.length - 1 ? 0 : prev + 1));
};

if (!products || products.length === 0) return null;

return (
  <div className="filtered-slider-container">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
<img
      src={`${process.env.REACT_APP_API_BASE_URL || "http://localhost:8000"}${products[slide].slideImage || products[slide].imageUrl || products[slide].pImage || ""}`}
      alt={products[slide].pName || "product"}
      className="w-full cursor-pointer"
      style={{ maxHeight: "600px", objectFit: "fill" }}
      onClick={() => onImageClick(products[slide])}
    />
    <button
      className="slider-prev-button"
      onClick={prevSlide}
      aria-label="Previous Slide"
    >
      ❮
    </button>
    <button
      className="slider-next-button"
      onClick={nextSlide}
      aria-label="Next Slide"
    >
      ❯
    </button>
  </div>
);
};

const HomeComponent = () => {
const { data, dispatch } = useContext(HomeContext);
const [categories, setCategories] = useState([]);
const [loading, setLoading] = useState(true);
const [sliders, setSliders] = useState([]);
const history = useHistory();

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsRes, categoriesRes, sliderImages] = await Promise.all([
        getAllProduct(),
        getAllCategory(),
        getSlideImages(),
      ]);

      console.log("Fetched sliderImages:", sliderImages);

      if (productsRes?.Products) {
        dispatch({ type: "setProducts", payload: productsRes.Products });
      }

      if (categoriesRes?.Categories) {
        setCategories(categoriesRes.Categories);
      }

      if (sliderImages && sliderImages.length > 0) {
        dispatch({ type: "sliderImages", payload: sliderImages });
        setSliders(sliderImages);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [dispatch]);

const handleSliderImageClick = (product) => {
history.push(`/products/${product._id}`);
};

// Group products by category id
const productsByCategory = {};
if (data.products && categories.length > 0) {
categories.forEach((cat) => {
productsByCategory[cat._id] = [];
});
data.products.forEach((product) => {
if (product.pCategory && productsByCategory[product.pCategory._id]) {
productsByCategory[product.pCategory._id].push(product);
}
});
}

return (
  <Fragment>
    <SearchBar />

    {/* Debug: Display sliderImages JSON */}
    {/* Removed the JSON display as per user request */}
    {/* <pre className="text-xs p-2 bg-gray-100 overflow-auto max-h-40 mb-4">
      {JSON.stringify(sliders, null, 2)}
    </pre> */}

    {/* Admin added sliders */}
    <FilteredSlider
      title="Admin Added Sliders"
      products={sliders}
      onImageClick={(slide) => {
        if (slide.pId) {
          history.push(`/products/${slide.pId}`);
        }
      }}
    />

    {/* Category Section - Responsive padding */}
    <section className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ProductCategory />
    </section>

    {/* Featured Products - Responsive grid */}
    <section className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Featured Products</h2>
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg aspect-square animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {data.products?.slice(0, 8).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>

    {/* Products by Category - Responsive sections */}
    {categories.map((category) => (
      <section key={category._id} className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">{category.cName}</h2>
          <Link
            to={`/products/category/${category._id}`}
            className="text-sm sm:text-base text-blue-600 hover:underline"
          >
            View All
          </Link>
        </div>
        {data.products && data.products.length > 0 ? (
          <HorizontalProductList
            products={data.products.filter(p => p.pCategory && p.pCategory._id === category._id).slice(0, 6)}
          />
        ) : (
          <div className="text-center py-8 text-gray-500">
            No products available in this category
          </div>
        )}
      </section>
    ))}
  </Fragment>
);
};

const Home = (props) => {
const [data, dispatch] = useReducer(homeReducer, homeState);
return (
  <HomeContext.Provider value={{ data, dispatch }}>
    <Layout>
      <HomeComponent />
    </Layout>
  </HomeContext.Provider>
);
};

export { HomeContext };
export default Home;
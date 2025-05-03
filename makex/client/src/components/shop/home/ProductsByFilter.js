import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HorizontalProductList from "./HorizontalProductList";
import { getAllProduct } from "../../admin/products/FetchApi";

const ProductsByFilter = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Determine filter type from URL path
  const filterType = location.pathname.split("/").pop();

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      try {
        const res = await getAllProduct();
        if (res?.Products) {
          let filtered = [];
          switch (filterType) {
            case "discount-20":
              filtered = res.Products.filter(
                (p) => p.discount && p.discount >= 20
              );
              break;
            case "price-200":
              filtered = res.Products.filter(
                (p) => p.price && p.price <= 200
              );
              break;
            case "high-rated":
              filtered = res.Products.filter(
                (p) => p.rating && p.rating >= 4
              );
              break;
            default:
              filtered = res.Products;
          }
          setProducts(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [filterType]);

  const titleMap = {
    "discount-20": "Products with 20% or More Discount",
    "price-200": "Products Priced at 200 Rs or Less",
    "high-rated": "Highly Rated Products (4 stars and above)",
  };

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      {loading ? (
        <div>Loading products...</div>
      ) : (
        <HorizontalProductList
          title={titleMap[filterType] || "Products"}
          products={products}
          categoryId="" // no category link here
        />
      )}
    </div>
  );
};

export default ProductsByFilter;

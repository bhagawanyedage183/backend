import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const HorizontalProductList = ({ title, products, categoryId }) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="my-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div
        className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 max-w-full snap-x snap-mandatory"
        style={{ scrollSnapType: "x mandatory", scrollPaddingLeft: "1rem" }}
      >
        {products.map((product, index) => (
          <div
            key={product._id}
            className="flex-shrink-0 w-64 min-w-[14rem] snap-start"
            style={{ scrollSnapAlign: "start" }}
          >
            <ProductCard product={product} />
          </div>
        ))}
        <Link
          to={`/products/category/${categoryId}`}
          className="flex items-center justify-center w-16 cursor-pointer text-2xl font-bold select-none"
        >
          {'>'}
        </Link>
      </div>
    </section>
  );
};

export default HorizontalProductList;

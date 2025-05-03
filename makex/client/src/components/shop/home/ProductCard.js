import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const imageUrl = product.pImages && product.pImages.length > 0
    ? `${process.env.REACT_APP_API_URL}/uploads/products/${product.pImages[0]}`
    : "https://via.placeholder.com/300x200?text=No+Image";

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishList")) || [];
    setLiked(wishlist.includes(product._id));
  }, [product._id]);

  const toggleLike = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishList")) || [];
    if (liked) {
      wishlist = wishlist.filter(id => id !== product._id);
    } else {
      wishlist.push(product._id);
    }
    localStorage.setItem("wishList", JSON.stringify(wishlist));
    setLiked(!liked);
  };

  return (
    <div className="border rounded shadow p-4 flex flex-col relative">
      <button
        onClick={toggleLike}
        className="absolute top-2 right-2 text-2xl focus:outline-none"
        aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
      >
        {liked ? "❤️" : "🤍"}
      </button>
      <img
        src={imageUrl}
        alt={product.pName || "Product Image"}
        className="w-full h-48 object-cover mb-4 rounded"
      />
      <h3 className="text-lg font-semibold mb-2">{product.pName}</h3>
      <p className="text-gray-600 mb-2 truncate">{product.pDescription}</p>
      <div className="mt-auto flex justify-between items-center">
        <span className="text-xl font-bold text-green-600">₹{product.pPrice}</span>
        <Link
          to={`/products/${product._id}`}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Navbar from "../partials/Navbar";
import { Footer } from "../partials";
import { useHistory } from "react-router-dom";

const SoldProducts = () => {
  const [soldOrders, setSoldOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  const fetchSoldProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/product/sold-products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setSoldOrders(res.data.soldOrders);
      } else {
        setError("Failed to fetch sold products");
      }
    } catch (err) {
      setError("Error fetching sold products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSoldProducts();
  }, []);

  return (
    <Fragment>
      <Navbar />
      <div style={{ paddingTop: "120px" }} className="max-w-5xl mx-auto p-4">
        <button
          onClick={() => history.push("/user/profile")}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          &larr; Back to Dashboard
        </button>
        <h2 className="text-2xl font-bold mb-6">Sold Products</h2>
        {loading && <p>Loading sold products...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && soldOrders.length === 0 && <p>No sold products found.</p>}
        {!loading && !error && soldOrders.length > 0 && (
          <div>
            {soldOrders.map((order) => (
              <div key={order.orderId} className="mb-8 border p-4 rounded shadow">
                <h3 className="text-xl font-semibold mb-2">Order ID: {order.orderId}</h3>
                <p className="mb-2 font-semibold text-green-700"><span role="img" aria-label="Product Sold">✅</span> Product Sold!</p>
                <div className="mb-4">
                  <h4 className="font-semibold">Earnings Breakdown:</h4>
                  <p>Amount Earned: ${order.amount.toFixed(2)}</p>
                  {/* Add fees calculation if applicable */}
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold">Shipping Instructions:</h4>
                  <p>If you handle shipping, please prepare the package according to the buyer's address:</p>
                  <p>{order.address}</p>
                  <p>Phone: {order.phone}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold">Next Steps:</h4>
                  <ul className="list-disc list-inside">
                    <li>Dispatch the product promptly.</li>
                    <li>Confirm delivery once shipped.</li>
                    <li>Update order status if applicable.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">Products in this order:</h4>
                  <ul>
                    {order.products.map((product) => (
                      <li key={product.productId} className="flex items-center space-x-4 my-2">
                        {product.images && product.images.length > 0 && (
                          <img
                            src={`http://localhost:8000/uploads/products/${product.images[0]}`}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p>Quantity: {product.quantity}</p>
                          <p>Price: ${product.price.toFixed(2)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </Fragment>
  );
};

export default SoldProducts;

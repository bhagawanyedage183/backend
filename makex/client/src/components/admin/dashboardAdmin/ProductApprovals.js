import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import AdminLayout from "../layout";

const ProductApprovals = () => {
  const [pendingProducts, setPendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [confirmApproveId, setConfirmApproveId] = useState(null);

  const apiURL = process.env.REACT_APP_API_URL;

  const fetchPendingProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User from localStorage:", user);
      if (!user || user.userRole !== 1) {
        setError("Admin access required to view pending products.");
        setLoading(false);
        return;
      }
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);
      const res = await axios.get(`${apiURL}/api/product/pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response from /api/product/pending:", res);
      setPendingProducts(res.data.pendingProducts || []);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch pending products", err);
      setError("Failed to fetch pending products");
      setLoading(false);
    }
  }, [apiURL]);

  useEffect(() => {
    fetchPendingProducts();
  }, [fetchPendingProducts]);

  const handleApproveClick = (productId) => {
    setConfirmApproveId(productId);
  };

  const confirmApprove = async () => {
    if (!confirmApproveId) return;
    setActionLoading(true);
    setError(null);
    setMessage(null);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || user.userRole !== 1) {
        setError("Admin access required to approve products.");
        setActionLoading(false);
        return;
      }
      const token = localStorage.getItem("token");
      await axios.put(
        `${apiURL}/api/product/${confirmApproveId}/status`,
        {
          approvalStatus: "approved",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Product approved successfully");
      setConfirmApproveId(null);
      fetchPendingProducts();
    } catch (err) {
      console.error(" approve product", err);
      setError("approve product");
    } finally {
      setActionLoading(false);
    }
  };

  const cancelApprove = () => {
    setConfirmApproveId(null);
  };

  const handleReject = (product) => {
    setSelectedProduct(product);
    setRejectionReason("");
    setShowModal(true);
    setError(null);
    setMessage(null);
  };

  const submitRejection = async () => {
    if (!rejectionReason.trim()) {
      setError("Rejection reason cannot be empty");
      return;
    }
    setActionLoading(true);
    setError(null);
    setMessage(null);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || user.userRole !== 1) {
        setError("Admin access required to reject products.");
        setActionLoading(false);
        return;
      }
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${apiURL}/api/product/${selectedProduct._id}/status`,
        {
          approvalStatus: "rejected",
          rejectionReason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setMessage("Product rejected successfully");
        setShowModal(false);
        setSelectedProduct(null);
        fetchPendingProducts();
      } else {
        setError(`Failed to reject product: ${response.statusText}`);
      }
    } catch (err) {
      console.error("Failed to reject product", err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(`Failed to reject product: ${err.response.data.error}`);
      } else {
        setError("Failed to reject product");
      }
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div>Loading pending products...</div>;

  return (
    <AdminLayout>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Product Approvals</h2>
        {error && (
          <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">{error}</div>
        )}
        {message && (
          <div className="mb-4 p-2 bg-green-200 text-green-800 rounded">{message}</div>
        )}
        {pendingProducts.length === 0 ? (
          <div>No pending products for approval.</div>
        ) : (
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Seller</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingProducts.map((product) => (
                <tr key={product._id}>
                  <td className="border px-4 py-2">{product.pName}</td>
                  <td className="border px-4 py-2">{product.pCategory.cName}</td>
                  <td className="border px-4 py-2">{product.seller.name}</td>
                  <td className="border px-4 py-2">₹{product.pPrice}</td>
                  <td className="border px-4 py-2">
                    {confirmApproveId === product._id ? (
                      <>
                        <button
                          className="bg-green-600 text-white px-2 py-1 mr-2 rounded"
                          onClick={confirmApprove}
                          disabled={actionLoading}
                        >
                          Confirm
                        </button>
                        <button
                          className="bg-gray-400 text-white px-2 py-1 rounded"
                          onClick={cancelApprove}
                          disabled={actionLoading}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                          onClick={() => handleApproveClick(product._id)}
                          disabled={actionLoading}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => handleReject(product)}
                          disabled={actionLoading}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {showModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rejectionReasonTitle"
          >
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h3
                id="rejectionReasonTitle"
                className="text-lg font-bold mb-4"
              >
                Rejection Reason
              </h3>
              <textarea
                className="w-full border rounded p-2 mb-4"
                rows="4"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                aria-describedby="rejectionReasonDesc"
              />
              <div className="flex justify-end">
                <button
                  className="mr-2 px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setShowModal(false)}
                  disabled={actionLoading}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded"
                  onClick={submitRejection}
                  disabled={!rejectionReason.trim() || actionLoading}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
export default ProductApprovals;

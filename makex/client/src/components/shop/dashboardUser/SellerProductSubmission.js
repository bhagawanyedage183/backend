import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllCategory } from "../../admin/categories/FetchApi";
import Layout from "./Layout";

// Simple notification system replacement
const showToast = (message, type = 'success') => {
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 px-4 py-2 rounded-md shadow-md ${
    type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
};

// Simple icon replacements using Unicode characters
const Icons = {
  Edit: () => <span className="icon">✏️</span>,
  Delete: () => <span className="icon">🗑️</span>,
  Add: () => <span className="icon">➕</span>,
  Back: () => <span className="icon">⬅️</span>,
  Close: () => <span className="icon">✕</span>,
  Check: () => <span className="icon">✓</span>
};

const SellerProductSubmission = () => {
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    pId: null,
    pName: "",
    pDescription: "",
    pStatus: "Inactive",
    pImage: [],
    pCategory: "",
    pPrice: "",
    pOffer: 0,
    pQuantity: "",
  });
  const [userProducts, setUserProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchUserProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getAllCategory();
      if (res.Categories) {
        setCategories(res.Categories);
      }
    } catch (err) {
      console.error("Failed to fetch categories", err);
      showToast("Failed to load categories", 'error');
    }
  };

  const fetchUserProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/product/user-products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setUserProducts(res.data.products);
      }
    } catch (err) {
      console.error("Failed to fetch user products", err);
      showToast("Failed to load your products", 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "pImage") {
      const newImagePreviews = [];
      const newImages = [];
      
      for (let i = 0; i < files.length; i++) {
        newImages.push(files[i]);
        newImagePreviews.push(URL.createObjectURL(files[i]));
      }
      
      setFormData(prev => ({ ...prev, pImage: [...prev.pImage, ...newImages] }));
      setImagePreviews(prev => [...prev, ...newImagePreviews]);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const removeImage = (index) => {
    const newImages = [...formData.pImage];
    const newPreviews = [...imagePreviews];
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setFormData(prev => ({ ...prev, pImage: newImages }));
    setImagePreviews(newPreviews);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:8000/api/product/delete-product",
        { pId: productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (res.data.success) {
        showToast("Product deleted successfully");
        fetchUserProducts();
      } else {
        showToast(res.data.error || "Failed to delete product", 'error');
      }
    } catch (err) {
      console.error("Delete product error", err);
      showToast("Failed to delete product", 'error');
    }
  };

  const handleEdit = (product) => {
    setFormData({
      pId: product._id,
      pName: product.pName,
      pDescription: product.pDescription,
      pStatus: product.pStatus,
      pImage: [],
      pImages: product.pImages ? product.pImages.join(",") : "",
      pCategory: product.pCategory ? product.pCategory._id : "",
      pPrice: product.pPrice,
      pOffer: product.pOffer,
      pQuantity: product.pQuantity,
    });
    setImagePreviews([]);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      pId: null,
      pName: "",
      pDescription: "",
      pStatus: "Inactive",
      pImage: [],
      pCategory: "",
      pPrice: "",
      pOffer: 0,
      pQuantity: "",
    });
    setImagePreviews([]);
    setShowForm(false);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Validate required fields before submission
    if (!formData.pName.trim()) {
      showToast("Product name is required", "error");
      return;
    }
    if (!formData.pDescription.trim()) {
      showToast("Product description is required", "error");
      return;
    }
    if (!formData.pCategory) {
      showToast("Product category is required", "error");
      return;
    }
    if (!formData.pPrice || isNaN(Number(formData.pPrice))) {
      showToast("Valid product price is required", "error");
      return;
    }
    if (!formData.pQuantity || isNaN(Number(formData.pQuantity))) {
      showToast("Valid product quantity is required", "error");
      return;
    }
    if (formData.pOffer && isNaN(Number(formData.pOffer))) {
      showToast("Discount offer must be a number", "error");
      return;
    }
    if (!formData.pStatus) {
      showToast("Product status is required", "error");
      return;
    }

    if (formData.pImage.length !== 2 && formData.pId) {
      showToast("Please upload exactly 2 images when updating a product", "error");
      return;
    }

    try {
      const data = new FormData();
      data.append("pName", formData.pName.trim());
      data.append("pDescription", formData.pDescription.trim());
      data.append("pStatus", formData.pStatus);
      data.append("pCategory", formData.pCategory);
      data.append("pPrice", Number(formData.pPrice));
      data.append("pOffer", formData.pOffer ? formData.pOffer.toString() : "");
      data.append("pQuantity", Number(formData.pQuantity));

      if (formData.pId) {
        data.append("pId", formData.pId);
      }

      // Append new images if any
      if (formData.pImage && formData.pImage.length > 0) {
        formData.pImage.forEach((file) => {
          data.append("pImage", file);
        });
      }

      // Append existing images as comma separated string if no new images uploaded
      if (formData.pId && (!formData.pImage || formData.pImage.length === 0) && formData.pImages) {
        data.append("pImages", formData.pImages);
      }

      const token = localStorage.getItem("token");
      const endpoint = formData.pId
        ? "http://localhost:8000/api/product/edit-product"
        : "http://localhost:8000/api/product/draft";

      const res = await axios.post(endpoint, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        showToast(formData.pId ? "Product updated successfully" : "Product submitted for approval");
        resetForm();
        fetchUserProducts();
      } else {
        showToast(res.data.error || "Submission failed", "error");
      }
    } catch (err) {
      console.error("Submission error", err);
      showToast("Submission failed", "error");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex-1 max-w-7xl mx-auto">
        {!showForm ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Your Products</h2>
                <p className="text-gray-600">Manage your product listings</p>
              </div>
              <div className="mt-4 sm:mt-0 flex space-x-3">
                <button
                  onClick={() => window.location.href = "/user/sold-products"}
                  className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  <Icons.Back className="mr-2" />
                  Sold Products
                </button>
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600"
                >
                  <Icons.Add className="mr-2" />
                  Add Product
                </button>
              </div>
            </div>

            {loading ? (
              <div className="p-6">
                <div className="animate-pulse space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-20 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ) : userProducts.length === 0 ? (
              <div className="p-12 text-center">
                <div className="mx-auto h-24 w-24 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by adding your first product.</p>
                <div className="mt-6">
                  <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600"
                  >
                    <Icons.Add className="mr-2" />
                    Add Product
                  </button>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userProducts.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {product.pImages && product.pImages.length > 0 ? (
                                <img
                                  className="h-10 w-10 rounded-md object-cover"
                                  src={`http://localhost:8000/uploads/products/${product.pImages[0]}`}
                                  alt={product.pName}
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
                                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.pName}</div>
                              <div className="text-sm text-gray-500 line-clamp-1">{product.pDescription}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {product.pCategory ? product.pCategory.cName : "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${product.pPrice}</div>
                          {product.pOffer > 0 && (
                            <div className="text-xs text-green-600">
                              {product.pOffer}% off
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.pStatus === "Active" 
                              ? "bg-green-100 text-green-800" 
                              : product.pStatus === "Pending" 
                                ? "bg-yellow-100 text-yellow-800" 
                                : "bg-gray-100 text-gray-800"
                          }`}>
                            {product.pStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                            title="Edit"
                          >
                            <Icons.Edit />
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <Icons.Delete />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {formData.pId ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
                title="Close"
              >
                <Icons.Close />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={submitForm}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="col-span-2">
                    <label htmlFor="pName" className="block text-sm font-medium text-gray-700">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      id="pName"
                      name="pName"
                      value={formData.pName}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="pDescription" className="block text-sm font-medium text-gray-700">
                      Product Description *
                    </label>
                    <textarea
                      id="pDescription"
                      name="pDescription"
                      rows={3}
                      value={formData.pDescription}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="pCategory" className="block text-sm font-medium text-gray-700">
                      Category *
                    </label>
                    <select
                      id="pCategory"
                      name="pCategory"
                      value={formData.pCategory}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.cName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="pStatus" className="block text-sm font-medium text-gray-700">
                      Status *
                    </label>
                    <select
                      id="pStatus"
                      name="pStatus"
                      value={formData.pStatus}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="pPrice" className="block text-sm font-medium text-gray-700">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      id="pPrice"
                      name="pPrice"
                      min="0"
                      step="0.01"
                      value={formData.pPrice}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="pOffer" className="block text-sm font-medium text-gray-700">
                      Discount Offer (%)
                    </label>
                    <input
                      type="number"
                      id="pOffer"
                      name="pOffer"
                      min="0"
                      max="100"
                      value={formData.pOffer}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="pQuantity" className="block text-sm font-medium text-gray-700">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      id="pQuantity"
                      name="pQuantity"
                      min="0"
                      value={formData.pQuantity}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="pImage" className="block text-sm font-medium text-gray-700">
                      Product Images *
                    </label>
                    <input
                      type="file"
                      id="pImage"
                      name="pImage"
                      onChange={handleChange}
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                      multiple
                      accept="image/*"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      {formData.pId ? "Upload exactly 2 new images to replace existing ones" : "Upload at least 2 images"}
                    </p>
                  </div>

                  {imagePreviews.length > 0 && (
                    <div className="col-span-2">
                      <div className="flex flex-wrap gap-2">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative">
                            <img
                              src={preview}
                              alt={`Preview ${index}`}
                              className="h-24 w-24 object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {formData.pId ? "Update Product" : "Submit Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SellerProductSubmission;
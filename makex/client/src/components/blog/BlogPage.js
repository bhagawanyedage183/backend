import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogPage = () => {
  // State management
  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [categories, setCategories] = useState(['all']);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/blog/posts');
        setPosts(res.data.posts);
        setFeaturedPost(res.data.posts.find(post => post.isFeatured));
        setCategories(['all', ...new Set(res.data.posts.map(post => post.category))]);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts by category and search
  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // View post details
  const viewPost = (post) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Return to blog list
  const backToList = () => {
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Scrapyard Blog</h1>
          <p className="text-xl text-gray-600">
            Tips, trends, and insights for scrap collectors and sellers
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search blog posts..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {!selectedPost && featuredPost && (
          <div className="mb-16 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-1/2">
                <img
                  className="h-full w-full object-cover"
                  src={`http://localhost:8000/uploads/blog/${featuredPost.image}`}
                  alt={featuredPost.title}
                />
              </div>
              <div className="p-8 md:w-1/2">
                <div className="uppercase tracking-wide text-sm text-green-600 font-semibold">
                  {featuredPost.category}
                </div>
                <h2 className="mt-2 text-2xl font-semibold text-gray-900">
                  {featuredPost.title}
                </h2>
                <p className="mt-3 text-gray-500">{featuredPost.excerpt}</p>
                <button
                  onClick={() => viewPost(featuredPost)}
                  className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                >
                  Read full article
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Post Detail View */}
        {selectedPost && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center mb-4">
                <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  {selectedPost.category}
                </span>
                <span className="ml-auto text-sm text-gray-500">
                  {new Date(selectedPost.createdAt).toLocaleDateString()} • {Math.ceil(selectedPost.content.split(' ').length / 200)} min read
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedPost.title}</h1>
            </div>

            <div className="p-6">
              <img
                className="w-full h-96 object-cover rounded-lg mb-8"
                src={`http://localhost:8000/uploads/blog/${selectedPost.image}`}
                alt={selectedPost.title}
              />
              <div className="prose max-w-none">
                {selectedPost.content.split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-4 text-gray-700">{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <button
                onClick={backToList}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
              >
                Back to all articles
              </button>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!selectedPost && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {activeCategory === 'all' ? 'Latest Articles' : `${activeCategory} Articles`}
            </h2>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map(post => (
                  <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                    <img
                      className="w-full h-48 object-cover"
                      src={`http://localhost:8000/uploads/blog/${post.image}`}
                      alt={post.title}
                    />
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                          {post.category}
                        </span>
                        <span className="ml-auto text-xs text-gray-500">
                          {Math.ceil(post.content.split(' ').length / 200)} min read
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-gray-500 text-sm mb-4">{post.excerpt}</p>
                      <button
                        onClick={() => viewPost(post)}
                        className="text-green-600 hover:text-green-800 font-medium text-sm"
                      >
                        Read more →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No posts found</h3>
                <p className="mt-1 text-gray-500">
                  {searchQuery ? 'Try a different search term' : 'No posts in this category yet'}
                </p>
              </div>
            )}
          </>
        )}

        {/* Newsletter Subscription */}
        {!selectedPost && (
          <div className="mt-16 bg-green-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated</h2>
            <p className="text-gray-600 mb-6">
              Get the latest scrap market trends and tips delivered to your inbox
            </p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <button className="px-6 py-2 bg-green-600 text-white font-medium rounded-r-lg hover:bg-green-700">
                Subscribe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;

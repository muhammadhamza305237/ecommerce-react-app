import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { AlertCircle, RefreshCw, Layers, Sparkles } from 'lucide-react'

function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex flex-col justify-between h-[390px] animate-pulse">
      <div>
        <div className="w-full h-52 bg-gray-100 rounded-xl mb-4"></div>
        <div className="w-20 h-3 bg-gray-100 rounded mb-2.5"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-100 rounded w-full"></div>
          <div className="h-4 bg-gray-100 rounded w-3/4"></div>
        </div>
      </div>
      <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
        <div className="h-6 bg-gray-100 rounded w-16"></div>
        <div className="h-9 bg-gray-100 rounded-xl w-28"></div>
      </div>
    </div>
  )
}

export default function ProductGrid() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const fetchProducts = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`)
      }
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      console.error('Error fetching products:', err)
      setError(err.message || 'Something went wrong while fetching products.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Extract unique categories from fetched product data
  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category))).filter(Boolean)]

  // Filter products by selected category
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((p) => p.category === selectedCategory)

  // Capitalize category name for display
  const formatCategoryName = (cat) => {
    if (cat === 'All') return 'All Products'
    return cat.charAt(0).toUpperCase() + cat.slice(1)
  }

  return (
    <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
            <Layers className="w-4 h-4" />
            <span>Catalog Collection</span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Explore Our Products
          </h2>
          <p className="mt-1.5 text-base text-gray-500">
            Handpicked quality items across electronics, fashion, and jewelry.
          </p>
        </div>

        {!isLoading && !error && (
          <span className="text-sm font-medium text-gray-500 shrink-0">
            Showing <strong className="text-gray-900">{filteredProducts.length}</strong> of {products.length} products
          </span>
        )}
      </div>

      {/* Category Filter Buttons Row */}
      {!isLoading && !error && categories.length > 1 && (
        <div id="categories" className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 pt-1 scroll-smooth">
          {categories.map((category) => {
            const isActive = selectedCategory === category
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-200'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                {category === 'All' && <Sparkles className="w-3.5 h-3.5" />}
                <span>{formatCategoryName(category)}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* Loading State: Responsive Skeleton Cards */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <ProductSkeleton key={idx} />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Failed to Load Products</h3>
          <p className="text-sm text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchProducts}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-colors shadow-xs"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      )}

      {/* Success State: Responsive CSS Grid (1 col on mobile, 2 on tablet, 4 on desktop) */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  )
}

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import {
  Star,
  ShoppingCart,
  Check,
  ArrowLeft,
  Truck,
  ShieldCheck,
  RotateCcw,
  AlertCircle,
  RefreshCw,
  Plus,
  Minus
} from 'lucide-react'

function ProductDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-48 mb-8"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 h-[450px] flex items-center justify-center">
          <div className="w-64 h-64 bg-gray-100 rounded-2xl"></div>
        </div>
        <div className="space-y-5">
          <div className="h-6 bg-gray-200 rounded-full w-28"></div>
          <div className="h-8 bg-gray-200 rounded w-4/5"></div>
          <div className="h-5 bg-gray-100 rounded w-36"></div>
          <div className="h-10 bg-gray-200 rounded w-32 my-4"></div>
          <div className="space-y-2 pt-2">
            <div className="h-4 bg-gray-100 rounded w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-5/6"></div>
            <div className="h-4 bg-gray-100 rounded w-3/4"></div>
          </div>
          <div className="h-14 bg-gray-200 rounded-2xl w-full mt-6"></div>
        </div>
      </div>
    </div>
  )
}

export default function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchProduct = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        if (!response.ok) {
          throw new Error(`Failed to load product: HTTP ${response.status}`)
        }
        const data = await response.json()
        if (!data || !data.id) {
          throw new Error('Product not found.')
        }
        setProduct(data)
      } catch (err) {
        console.error('Error fetching single product:', err)
        setError(err.message || 'Unable to retrieve product details.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (!product) return
    // Add product according to selected quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
    }, 1500)
  }

  if (isLoading) {
    return <ProductDetailsSkeleton />
  }

  if (error || !product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-600 mb-6">{error || 'The requested product could not be found.'}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>
    )
  }

  const { title, price, description, category, image, rating } = product

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
        <Link to="/" className="hover:text-indigo-600 transition-colors flex items-center gap-1 font-medium">
          <ArrowLeft className="w-4 h-4" />
          <span>Catalog</span>
        </Link>
        <span>/</span>
        <span className="capitalize">{category}</span>
        <span>/</span>
        <span className="text-gray-900 font-semibold truncate max-w-xs">{title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Large Product Image Showcase */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-gray-100 p-8 sm:p-14 flex items-center justify-center shadow-xs overflow-hidden sticky top-24">
          <div className="relative w-full flex items-center justify-center max-h-[460px] min-h-[340px]">
            <img
              src={image}
              alt={title}
              className="max-h-[440px] max-w-full object-contain transition-transform duration-300 hover:scale-105"
            />
            {category && (
              <span className="absolute top-0 left-0 bg-gray-100/90 backdrop-blur-xs text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
                {category}
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="lg:col-span-6 flex flex-col">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700">
              {category}
            </span>
          </div>

          {/* Product Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {title}
          </h1>

          {/* Rating */}
          {rating && (
            <div className="flex items-center gap-2 mt-4 pb-4 border-b border-gray-100">
              <div className="flex items-center text-amber-400">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-sm font-bold text-gray-900">{rating.rate}</span>
              <span className="text-sm text-gray-400 font-normal">
                ({rating.count} customer reviews)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="my-6">
            <span className="text-xs text-gray-500 font-medium block">Price</span>
            <span className="text-3xl sm:text-4xl font-black text-gray-900">
              ${typeof price === 'number' ? price.toFixed(2) : price}
            </span>
          </div>

          {/* Full Description */}
          <div className="border-t border-gray-100 pt-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-2">
              Description
            </h3>
            <p className="text-base text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Quantity Selector & Add to Cart */}
          <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-700">Quantity</span>
              <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50/80 p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 rounded-lg text-gray-600 hover:bg-white hover:text-gray-900 transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-gray-900 min-w-[36px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 rounded-lg text-gray-600 hover:bg-white hover:text-gray-900 transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Prominent Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-200 shadow-md cursor-pointer active:scale-[0.99] ${
                isAdded
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 hover:shadow-indigo-300'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5 transition-transform scale-110" />
                  <span>Added {quantity > 1 ? `(${quantity})` : ''} to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add {quantity > 1 ? `${quantity} items` : 'to Cart'}</span>
                </>
              )}
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-8 p-5 bg-gray-50/70 border border-gray-100 rounded-2xl space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <Truck className="w-5 h-5 text-indigo-600 shrink-0" />
              <span><strong>Free Delivery</strong> on all orders nationwide</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
              <span><strong>Guaranteed Authentic</strong> direct from verified sources</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <RotateCcw className="w-5 h-5 text-indigo-600 shrink-0" />
              <span><strong>30 Days</strong> money-back return policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

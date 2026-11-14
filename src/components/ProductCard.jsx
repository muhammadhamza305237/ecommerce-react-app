import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Star, Check } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { id, title, price, image, category, rating } = product
  const { addToCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(product)
    setIsAdded(true)

    // Reset feedback after 1.2s
    setTimeout(() => {
      setIsAdded(false)
    }, 1200)
  }

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Product Image wrapped with Link */}
      <Link 
        to={`/product/${id}`}
        className="relative w-full h-56 p-6 bg-white flex items-center justify-center overflow-hidden cursor-pointer"
        aria-label={`View details for ${title}`}
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 ease-out"
        />
        {category && (
          <span className="absolute top-3 left-3 bg-gray-100/90 backdrop-blur-xs text-gray-700 text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {category}
          </span>
        )}
      </Link>

      {/* Product Details */}
      <div className="p-5 flex-1 flex flex-col justify-between border-t border-gray-50">
        <div>
          {/* Rating */}
          {rating && (
            <div className="flex items-center gap-1.5 mb-2">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-xs font-semibold text-gray-700">{rating.rate}</span>
              <span className="text-xs text-gray-400">({rating.count})</span>
            </div>
          )}

          {/* Title wrapped with Link */}
          <Link to={`/product/${id}`} className="block group/title">
            <h3 
              className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover/title:text-indigo-600 transition-colors leading-snug cursor-pointer"
              title={title}
            >
              {title}
            </h3>
          </Link>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 flex items-center justify-between gap-3">
          <div>
            <span className="text-xs text-gray-500 block">Price</span>
            <span className="text-xl font-bold text-gray-900">
              ${typeof price === 'number' ? price.toFixed(2) : price}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white text-sm font-medium shadow-xs transition-all duration-200 cursor-pointer active:scale-95 ${
              isAdded
                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
            }`}
            aria-label={`Add ${title} to cart`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 transition-transform scale-110" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

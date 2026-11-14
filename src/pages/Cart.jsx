import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, ArrowRight } from 'lucide-react'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-xs">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Cart is Empty</h2>
        <p className="mt-3 text-base text-gray-500 max-w-md mx-auto">
          Your shopping cart is currently empty. Explore our catalog and discover amazing products!
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-gray-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link to="/" className="hover:text-indigo-600 transition-colors inline-flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Products</span>
            </Link>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Shopping Cart</h1>
          <p className="text-sm text-gray-500 mt-1">
            You have <strong className="text-gray-900">{cart.length}</strong> unique item{cart.length > 1 ? 's' : ''} in your cart.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-red-600 hover:text-red-700 font-medium cursor-pointer self-start sm:self-auto py-1 px-3 rounded-lg hover:bg-red-50 transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-100 p-6 shadow-xs divide-y divide-gray-100">
          {cart.map((item) => (
            <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-center gap-6">
              {/* Product Thumbnail */}
              <div className="w-24 h-24 p-3 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Title & Category & Price */}
              <div className="flex-1 text-center sm:text-left">
                <span className="text-[11px] uppercase font-bold text-indigo-600 tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-base font-semibold text-gray-900 line-clamp-2 leading-snug mt-0.5">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Unit Price: <span className="font-semibold text-gray-800">${item.price.toFixed(2)}</span>
                </p>
              </div>

              {/* Quantity Adjuster */}
              <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50/80 p-1">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1.5 rounded-lg text-gray-600 hover:bg-white hover:text-gray-900 transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-sm font-bold text-gray-800 min-w-[32px] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1.5 rounded-lg text-gray-600 hover:bg-white hover:text-gray-900 transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Subtotal */}
              <div className="text-center sm:text-right min-w-[90px]">
                <span className="text-xs text-gray-400 block">Subtotal</span>
                <span className="text-base font-extrabold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-red-600 hover:text-red-700 bg-red-50/60 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                aria-label={`Remove ${item.title} from cart`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-100 p-6 shadow-xs sticky top-24">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Order Summary</h2>

          <div className="space-y-3 text-sm border-b border-gray-100 pb-5">
            <div className="flex justify-between text-gray-600">
              <span>Items Total ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
              <span className="font-semibold text-gray-900">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Standard Shipping</span>
              <span className="text-emerald-600 font-semibold uppercase text-xs tracking-wider">Free</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Estimated Tax</span>
              <span className="text-gray-500 font-medium">$0.00</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-lg font-extrabold text-gray-900 py-5">
            <span>Total Amount</span>
            <span className="text-2xl text-indigo-600">${totalPrice.toFixed(2)}</span>
          </div>

          <button className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-semibold text-sm shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition-all cursor-pointer flex items-center justify-center gap-2">
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="mt-5 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ProductGrid from './components/ProductGrid'
import Cart from './pages/Cart'
import ProductDetails from './pages/ProductDetails'
import { CartProvider } from './context/CartContext'

function Home() {
  return (
    <div>
      <HeroSection />
      <ProductGrid />
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
          </main>
          <footer className="border-t border-gray-200 bg-white py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
              NovaStore &copy; {new Date().getFullYear()} &mdash; Built with React, Vite &amp; Tailwind CSS
            </div>
          </footer>
        </div>
      </CartProvider>
    </Router>
  )
}

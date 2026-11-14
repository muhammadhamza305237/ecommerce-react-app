import { ArrowRight, Sparkles, ShieldCheck, Truck, RotateCcw } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-gray-50/40 py-16 sm:py-24 border-b border-gray-100">
      {/* Decorative background glow */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none"
      >
        <div className="w-[600px] h-[350px] bg-indigo-300/30 rounded-full blur-3xl transform -translate-y-12"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-100 text-indigo-700 text-xs sm:text-sm font-semibold shadow-xs mb-6 hover:border-indigo-200 transition-colors">
          <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
          <span>New Season Arrivals Are Live</span>
        </div>

        {/* Catchy Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15] max-w-3xl">
          Elevate Your Everyday Style &amp; Tech Essentials
        </h1>

        {/* Subtitle */}
        <p className="mt-5 max-w-2xl text-base sm:text-lg text-gray-600 leading-relaxed">
          Explore curated fashion, premium electronics, and timeless accessories sourced directly with unbeatable value and rapid delivery.
        </p>

        {/* Call-to-action buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#products"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-indigo-600 text-white font-medium text-base shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <a
            href="#categories"
            className="inline-flex items-center px-6 py-3.5 rounded-full bg-white text-gray-700 font-medium text-base border border-gray-200 shadow-2xs hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all duration-200"
          >
            Explore Categories
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-14 pt-8 border-t border-gray-200/80 w-full grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-600 text-sm">
          <div className="flex items-center justify-center gap-2.5">
            <Truck className="w-5 h-5 text-indigo-600" />
            <span className="font-medium">Free Worldwide Express Delivery</span>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <span className="font-medium">100% Authentic Quality Assured</span>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <RotateCcw className="w-5 h-5 text-indigo-600" />
            <span className="font-medium">30-Day Hassle-Free Returns</span>
          </div>
        </div>
      </div>
    </section>
  )
}

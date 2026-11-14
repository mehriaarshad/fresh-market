
import ProductCard from './ProductCard'

export default function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <div className="empty-state flex flex-col items-center justify-center rounded-2xl p-10 text-center">
        <span className="mb-3 text-5xl">🥬</span>

        <h3 className="mb-2 text-xl font-semibold text-[#183b2b]">
          No products found
        </h3>

        <p className="max-w-sm text-sm text-gray-500">
          Try another search or choose a different category.
        </p>
      </div>
    )
  }

  return (
    <div className="product-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  )
}

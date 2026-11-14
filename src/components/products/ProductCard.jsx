
import { Link } from 'react-router-dom'
import { Plus, Star } from 'lucide-react'
import { useStore } from '../../context/StoreContext'
import { categories } from '../../data/products'

const categoryPhotos = {
  fruits: 'https://media.istockphoto.com/id/672204322/photo/closeup-of-many-strawberries-in-plastic-boxes-on-display-in-wooden-crate.jpg?s=612x612&w=0&k=20&c=jK-3R3l8zBK0I9EwBiwWBFiNL664tHI4_qnjJliCcWc=',
  vegetables: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=85',
  meat: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=700&q=85',
  fish: 'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=700&q=85',
  dairy: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=700&q=85',
  oils: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=85',
  rice: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=85',
  pasta: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=700&q=85',
  bakery: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=85',
  biscuits: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=700&q=85',
  chocolate: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=700&q=85',
  drinks: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=700&q=85',
  pantry: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=700&q=85',
  canned: 'https://images.unsplash.com/photo-1584263347416-85a696b4eda7?auto=format&fit=crop&w=700&q=85'
}

export default function ProductCard({ product }) {
  const { addToCart, language, t } = useStore()

  const category = categories.find(
    (c) => c.id === product.category
  )

  return (
    <article className="product-card group">

      {/* PRODUCT IMAGE */}
      <Link
        to={`/product/${product.id}`}
        className="product-image relative block overflow-hidden rounded-2xl"
        style={{ background: product.color }}
      >
        {product.badge && (
          <span className="product-badge">
            {product.badge}
          </span>
        )}

        
<img
  src={product.image}
  alt={language === 'fa' ? product.dari : product.name}
  loading="lazy"
  className="product-real-image block h-full w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
/>


        <span className="product-emoji product-emoji-overlay">
          {product.emoji}
        </span>
      </Link>

      {/* PRODUCT INFORMATION */}
      <div className="product-info">

        <div className="product-meta">
          <span>
            {language === 'fa'
              ? category?.dari
              : category?.name}
          </span>

          <span className="rating">
            <Star size={12} fill="currentColor" />
            {product.rating}
          </span>
        </div>

        {/* PRODUCT NAME */}
        <Link
          to={`/product/${product.id}`}
          className="product-name"
        >
          {language === 'fa'
            ? product.dari
            : product.name}
        </Link>

        {/* PRICE AND ADD TO CART */}
        <div className="product-bottom">

          <div>
            <strong>
              ${product.price.toFixed(2)}
            </strong>

            <small> / {product.unit}</small>
          </div>

          <button
            className="add-button transition-all duration-300 hover:scale-110 active:scale-95"
            onClick={() => addToCart(product)}
            aria-label={`${t.add}: ${product.name}`}
          >
            <Plus size={18} />
          </button>

        </div>
      </div>
    </article>
  )
}

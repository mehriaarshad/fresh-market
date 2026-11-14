import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, Star, Truck } from 'lucide-react'
import { products, categories } from '../data/products'
import { useStore } from '../context/StoreContext'
import QuantityControl from '../components/ui/QuantityControl'
export default function ProductDetails() {
  const { id } = useParams(), navigate = useNavigate()
  const product = products.find(p=>p.id===Number(id))
  const { addToCart, language } = useStore()
  const [qty,setQty] = useState(1)
  const fa = language === 'fa'
  if (!product) return <div className="container page-section empty-state"><h2>{fa?'محصول پیدا نشد':'Product not found'}</h2><Link to="/shop" className="button button-dark">{fa?'بازگشت به فروشگاه':'Back to shop'}</Link></div>
  const category = categories.find(c=>c.id===product.category)
  return <div className="container page-section"><button className="back-link" onClick={()=>navigate(-1)}><ArrowLeft size={16}/> {fa?'بازگشت':'Back'}</button><div className="detail-layout"><div className="detail-image" style={{background:product.color}}><span>{product.emoji}</span></div><div className="detail-copy"><span className="eyebrow">{fa?category?.dari:category?.name}</span><h1>{fa?product.dari:product.name}</h1><div className="detail-rating"><Star size={16} fill="currentColor"/> {product.rating} <span>• {fa?'امتیاز مشتریان':'Fresh Market customer rating'}</span></div><div className="detail-price">${product.price.toFixed(2)} <small>/ {product.unit}</small></div><p>{fa?product.descriptionDari:product.description}</p><div className="stock-line"><Check size={16}/> {fa?'موجود است — آماده خرید':'In stock — ready for your basket'}</div><div className="detail-buy"><QuantityControl value={qty} onChange={v=>setQty(Math.max(1,Math.min(10,v)))}/><button className="button button-dark" onClick={()=>addToCart(product,qty)}>{fa?'افزودن به سبد':'Add to cart'} · ${(product.price*qty).toFixed(2)}</button></div><div className="delivery-note"><Truck size={18}/><span><b>{fa?'ارسال تازه‌گی':'Freshness delivered'}</b><small>{fa?'ارسال رایگان برای خرید بیش از ۳۵ دالر. هزینه عادی ارسال ۳.۵۰ دالر است.':'Free delivery on orders over $35. Standard delivery fee $3.50.'}</small></span></div></div></div></div>
}

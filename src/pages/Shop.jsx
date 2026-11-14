import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal } from 'lucide-react'
import { categories, products } from '../data/products'
import ProductGrid from '../components/products/ProductGrid'
import { useStore } from '../context/StoreContext'

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('featured')
  const { language, t } = useStore()
  const active = params.get('category') || 'all'
  const filtered = useMemo(() => {
    let list = products.filter(p => (active === 'all' || p.category === active) && `${p.name} ${p.dari}`.toLowerCase().includes(search.toLowerCase()))
    if (sort === 'low') list = [...list].sort((a,b)=>a.price-b.price)
    if (sort === 'high') list = [...list].sort((a,b)=>b.price-a.price)
    if (sort === 'name') list = [...list].sort((a,b)=>a.name.localeCompare(b.name))
    return list
  }, [active, search, sort])
  const activeCategory = categories.find(c => c.id === active)
  return <div className="container page-section"><div className="page-heading"><span className="eyebrow">{language === 'fa' ? 'خرید آسان و تازه' : 'THE GOOD STUFF'}</span><h1>{t.shopTitle}</h1><p>{t.shopSubtitle}</p></div>
    <div className="shop-toolbar"><label className="search-field"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.search}/></label><label className="sort-field"><SlidersHorizontal size={17}/><span>{t.sort}</span><select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">{t.featured}</option><option value="low">{t.low}</option><option value="high">{t.high}</option><option value="name">{t.name}</option></select></label></div>
    <div className="shop-layout"><aside className="category-sidebar"><h3>{t.categories}</h3>{categories.map(c=><button key={c.id} className={active===c.id?'active':''} onClick={()=>setParams(c.id==='all'?{}:{category:c.id})}><span>{c.icon}</span>{language === 'fa' ? c.dari : c.name}<span className="category-count">{c.id==='all'?products.length:products.filter(p=>p.category===c.id).length}</span></button>)}</aside><div className="shop-results"><div className="results-heading"><b>{active==='all'?t.allProducts:(language === 'fa' ? activeCategory?.dari : activeCategory?.name)}</b><span>{filtered.length} {t.products}</span></div>{filtered.length ? <ProductGrid products={filtered}/> : <p className="empty-products">{t.noProducts}</p>}</div></div>
  </div>
}

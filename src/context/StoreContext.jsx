import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { products } from '../data/products'

const StoreContext = createContext(null)
const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}

export const messages = {
  en: {
    home: 'Home', shop: 'Shop', about: 'About', contact: 'Contact', cart: 'Cart', account: 'My account',
    announcement: 'Fresh finds, happy days.', delivery: 'Free delivery on orders over $35',
    shopTitle: 'Shop all groceries', shopSubtitle: 'Fresh finds and everyday favourites, all in one place.',
    search: 'Search for products...', sort: 'Sort by', featured: 'Featured', low: 'Price: low to high', high: 'Price: high to low', name: 'Name A–Z',
    categories: 'Categories', allProducts: 'All products', products: 'products', noProducts: 'No products found. Try another search or category.',
    add: 'Add to cart', popular: 'Popular', explore: 'Explore collection', viewAll: 'View all',
    heroEyebrow: 'FRESHNESS, RIGHT TO YOUR DOOR', heroTitle1: 'Good food.', heroTitle2: 'Better', heroTitle3: 'everyday.',
    heroText: 'Fill your basket with the freshest picks, pantry favourites and little things that make home feel like home.',
    shopFresh: 'Shop fresh picks', ourStory: 'Our story',
    categoryEyebrow: 'SHOP BY CATEGORY', categoryTitle: 'A little something for everyone', categoryText: 'Explore the everyday essentials and fresh favourites you love.',
    freshEdit: 'THE FRESH EDIT', freshTitle: 'Fresh picks for your basket', freshText: 'A few favourites to make your next shop a little easier.', shopAll: 'Shop all products',
    footerText: 'Everyday groceries, thoughtfully selected and delivered with care.', exploreHeading: 'Explore', customerCare: 'Customer care', stay: 'Stay in the loop',
    shopAllLink: 'Shop all', ourStoryLink: 'Our story', contactUs: 'Contact us', help: 'Help & support',
  },
  fa: {
    home: 'صفحه اصلی', shop: 'فروشگاه', about: 'درباره ما', contact: 'تماس با ما', cart: 'سبد خرید', account: 'حساب من',
    announcement: 'تازه‌گی و طراوت، هر روز.', delivery: 'ارسال رایگان برای خریدهای بیش از ۳۵ دالر',
    shopTitle: 'تمام مواد خوراکی', shopSubtitle: 'مواد تازه و نیازمندی‌های روزانه، همه در یک‌جا.',
    search: 'جستجوی محصولات...', sort: 'ترتیب بر اساس', featured: 'ویژه', low: 'قیمت: از کم به زیاد', high: 'قیمت: از زیاد به کم', name: 'نام: الف تا ی',
    categories: 'دسته‌بندی‌ها', allProducts: 'تمام محصولات', products: 'محصول', noProducts: 'محصولی پیدا نشد. جستجو یا دسته‌بندی دیگری را امتحان کنید.',
    add: 'افزودن به سبد', popular: 'محبوب', explore: 'مشاهده محصولات', viewAll: 'مشاهده همه',
    heroEyebrow: 'تازگی، تا پشت دروازه خانه شما', heroTitle1: 'غذای خوب.', heroTitle2: 'زندگی', heroTitle3: 'بهتر، هر روز.',
    heroText: 'سبد خرید خود را با تازه‌ترین محصولات، مواد خوراکی و نیازمندی‌های روزانه پُر کنید.',
    shopFresh: 'خرید محصولات تازه', ourStory: 'داستان ما',
    categoryEyebrow: 'خرید بر اساس دسته‌بندی', categoryTitle: 'برای هر سلیقه، چیزی داریم', categoryText: 'نیازمندی‌های روزانه و محصولات تازه مورد علاقه‌تان را پیدا کنید.',
    freshEdit: 'انتخاب تازه ما', freshTitle: 'محصولات تازه برای سبد شما', freshText: 'چند انتخاب محبوب برای خرید آسان‌تر شما.', shopAll: 'مشاهده تمام محصولات',
    footerText: 'مواد خوراکی روزانه، با دقت انتخاب و با توجه به شما ارسال می‌شوند.', exploreHeading: 'بخش‌ها', customerCare: 'خدمات مشتریان', stay: 'با ما همراه باشید',
    shopAllLink: 'تمام محصولات', ourStoryLink: 'داستان ما', contactUs: 'تماس با ما', help: 'کمک و پشتیبانی',
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => read('fm-cart', []))
  const [user, setUser] = useState(() => read('fm-user', null))
  const [orders, setOrders] = useState(() => read('fm-orders', []))
  const [language, setLanguage] = useState(() => read('fm-language', 'en'))
  const [toast, setToast] = useState('')
  useEffect(() => localStorage.setItem('fm-cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('fm-user', JSON.stringify(user)), [user])
  useEffect(() => localStorage.setItem('fm-orders', JSON.stringify(orders)), [orders])
  useEffect(() => {
    localStorage.setItem('fm-language', JSON.stringify(language))
    document.documentElement.lang = language === 'fa' ? 'fa' : 'en'
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr'
    document.body.classList.toggle('is-dari', language === 'fa')
  }, [language])

  const t = messages[language]
  const notify = (message) => { setToast(message); window.clearTimeout(window.__fmToast); window.__fmToast = window.setTimeout(() => setToast(''), 2600) }
  const addToCart = (product, quantity = 1) => {
    setCart(current => {
      const found = current.find(item => item.id === product.id)
      return found ? current.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item) : [...current, { ...product, quantity }]
    })
    notify(`${language === 'fa' ? product.dari : product.name} ${language === 'fa' ? 'به سبد خرید اضافه شد' : 'added to your cart'}`)
  }
  const updateQuantity = (id, quantity) => setCart(current => quantity < 1 ? current.filter(item => item.id !== id) : current.map(item => item.id === id ? { ...item, quantity } : item))
  const removeFromCart = id => { setCart(current => current.filter(item => item.id !== id)); notify(language === 'fa' ? 'محصول از سبد حذف شد' : 'Item removed from cart') }
  const clearCart = () => setCart([])
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const placeOrder = details => {
    const order = { id: `FM-${Date.now().toString().slice(-7)}`, date: new Date().toISOString(), items: cart, total: subtotal + (subtotal >= 35 ? 0 : 3.5), status: 'Order received', customer: details }
    setOrders(current => [order, ...current]); clearCart(); notify(language === 'fa' ? 'سفارش شما با موفقیت ثبت شد!' : 'Your order has been placed successfully!')
    return order
  }
  const login = (email, name) => { const next = { email, name }; setUser(next); notify(`${language === 'fa' ? 'خوش آمدید' : 'Welcome'}, ${name}!`) }
  const logout = () => { setUser(null); notify(language === 'fa' ? 'از حساب خارج شدید' : 'You have signed out') }
  const value = useMemo(() => ({ products, cart, user, orders, toast, cartCount, subtotal, language, setLanguage, t, addToCart, updateQuantity, removeFromCart, clearCart, placeOrder, login, logout, notify }), [cart, user, orders, toast, cartCount, subtotal, language, t])
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
export const useStore = () => useContext(StoreContext)

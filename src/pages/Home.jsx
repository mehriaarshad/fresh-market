
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Truck,
  ShieldCheck,
  Sprout,
  MapPin,
  Heart,
  Instagram
} from 'lucide-react'

import { categories, products } from '../data/products'
import ProductGrid from '../components/products/ProductGrid'
import SectionTitle from '../components/ui/SectionTitle'
import { useStore } from '../context/StoreContext'

// ==========================================
// FOOD HERO IMAGES
// ==========================================

const FOOD_HERO_IMAGES = [
  {
    src: 'https://www.tesco.com/assets/mfe-digital-content/8ca66585acc75e3dd0629faba2ec3d5c.jpg',
    bg: '#315C3D',
    name: 'Fresh Fruits'
  },
  {
    src: 'https://www.tesco.com/assets/mfe-digital-content/6bc9e5e16a33b663016582d6ba50a896.jpg',
    bg: '#477A50',
    name: 'Fresh Vegetables'
  },
  {
    src: 'https://www.tesco.com/assets/mfe-digital-content/a29ab4473a046538e27c0df8c2c3db7a.jpg',
    bg: '#183B2B',
    name: 'Healthy Meals'
  },
  {
    src: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=90',
    bg: '#3D6947',
    name: 'Grocery Essentials'
  }
]

// ==========================================
// HERO TEXT
// ==========================================

const heroCopy = [
  {
    title: 'Fresh Fruits',
    titleFa: 'میوه‌های تازه',
    description: 'Discover colourful fruits, naturally sweet and full of goodness.',
    descriptionFa: 'میوه‌های رنگارنگ، شیرین و سرشار از تازگی و انرژی.'
  },
  {
    title: 'Fresh Vegetables',
    titleFa: 'سبزیجات تازه',
    description: 'Bring home fresh vegetables and make every meal healthier.',
    descriptionFa: 'سبزیجات تازه را به خانه بیاورید و غذاهای سالم‌تر آماده کنید.'
  },
  {
    title: 'Healthy Meals',
    titleFa: 'غذاهای سالم',
    description: 'Everything you need to prepare delicious meals for your family.',
    descriptionFa: 'هر آنچه برای آماده‌کردن غذاهای خوشمزه برای خانواده نیاز دارید.'
  },
  {
    title: 'Grocery Essentials',
    titleFa: 'مواد ضروری خانه',
    description: 'Your everyday essentials, all in one convenient place.',
    descriptionFa: 'تمام نیازمندی‌های روزانه شما در یک مکان.'
  }
]

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold: 0.12 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transform transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-10 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

// ==========================================
// FOOD HERO CAROUSEL
// ==========================================

function FoodHeroCarousel({ fa }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < 640
  )

  const activeCopy = heroCopy[activeIndex]

  // PRELOAD IMAGES + RESPONSIVE SCREEN
  useEffect(() => {
    FOOD_HERO_IMAGES.forEach(item => {
      const image = new Image()
      image.src = item.src
    })

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // AUTOMATIC SLIDING EVERY 4 SECONDS
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setActiveIndex(prev =>
        (prev + 1) % FOOD_HERO_IMAGES.length
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [isPaused])

  // MANUAL CAROUSEL NAVIGATION
  const navigate = (direction) => {
    if (isAnimating) return

    setIsAnimating(true)

    setActiveIndex(prev =>
      direction === 'next'
        ? (prev + 1) % FOOD_HERO_IMAGES.length
        : (prev + FOOD_HERO_IMAGES.length - 1) %
          FOOD_HERO_IMAGES.length
    )

    setTimeout(() => {
      setIsAnimating(false)
    }, 650)
  }

  // IMAGE POSITIONS
  const getRole = (index) => {
    const total = FOOD_HERO_IMAGES.length

    if (index === activeIndex) return 'center'
    if (index === (activeIndex + 3) % total) return 'left'
    if (index === (activeIndex + 1) % total) return 'right'

    return 'back'
  }

  // IMAGE ANIMATION STYLES
  const getItemStyle = (role) => {
    const common = {
      position: 'absolute',
      transition: 'all 650ms cubic-bezier(0.4,0,0.2,1)',
      willChange: 'transform, filter, opacity, left',
      objectFit: 'contain'
    }

    if (role === 'center') {
      return {
        ...common,
        width: isMobile ? '68%' : '40%',
        height: isMobile ? '48%' : '70%',
        left: '50%',
        bottom: isMobile ? '25%' : '8%',
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(0px)',
        opacity: 1,
        zIndex: 20
      }
    }

    if (role === 'left') {
      return {
        ...common,
        width: isMobile ? '30%' : '22%',
        height: isMobile ? '18%' : '28%',
        left: isMobile ? '15%' : '27%',
        bottom: isMobile ? '32%' : '20%',
        transform: 'translateX(-50%) scale(0.85)',
        filter: 'blur(2px)',
        opacity: 0.8,
        zIndex: 10
      }
    }

    if (role === 'right') {
      return {
        ...common,
        width: isMobile ? '30%' : '22%',
        height: isMobile ? '18%' : '28%',
        left: isMobile ? '85%' : '73%',
        bottom: isMobile ? '32%' : '20%',
        transform: 'translateX(-50%) scale(0.85)',
        filter: 'blur(2px)',
        opacity: 0.8,
        zIndex: 10
      }
    }

    return {
      ...common,
      width: isMobile ? '25%' : '18%',
      height: isMobile ? '15%' : '22%',
      left: '50%',
      bottom: isMobile ? '32%' : '20%',
      transform: 'translateX(-50%) scale(0.7)',
      filter: 'blur(4px)',
      opacity: 0.5,
      zIndex: 5
    }
  }

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      className="relative w-full overflow-hidden rounded-b-[32px] shadow-xl"
      style={{
        backgroundColor: FOOD_HERO_IMAGES[activeIndex].bg,
        transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: 'calc(100svh - 80px)',
          minHeight: '520px',
          maxHeight: '760px'
        }}
      >

        {/* GRAIN OVERLAY */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: 50,
            opacity: 0.4,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}
        />

        {/* GIANT BACKGROUND TEXT */}
        <div
          className="pointer-events-none absolute inset-x-0 flex select-none items-center justify-center whitespace-nowrap text-white"
          style={{
            zIndex: 2,
            top: '18%',
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(44px, 13vw, 220px)',
            fontWeight: 900,
            opacity: 0.95,
            lineHeight: 1,
            letterSpacing: '-0.02em'
          }}
        >
          FRESH FOOD
        </div>

        {/* BRAND */}
        <div
          className="absolute left-4 top-6 text-xs font-semibold uppercase tracking-[0.18em] text-white sm:left-8"
          style={{ zIndex: 60 }}
        >
          FRESH MARKET
        </div>

        {/* AUTOMATIC FOOD CAROUSEL */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {FOOD_HERO_IMAGES.map((item, index) => {
            const role = getRole(index)

            return (
              <div
                key={item.name}
                style={getItemStyle(role)}
                className="overflow-hidden rounded-[28px] shadow-2xl"
              >
                <img
                  src={item.src}
                  alt={item.name}
                  draggable={false}
                  className="block h-full w-full rounded-[28px] object-cover object-center"
                  style={{ userSelect: 'none' }}
                />
              </div>
            )
          })}
        </div>

        {/* BOTTOM LEFT CONTENT */}
        <div
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24"
          style={{ zIndex: 60, maxWidth: 320 }}
        >
          <p className="mb-2 text-base font-bold uppercase tracking-wider text-white sm:mb-3 sm:text-xl">
            {fa ? activeCopy.titleFa : activeCopy.title}
          </p>

          <p className="mb-5 hidden max-w-[280px] text-sm leading-relaxed text-white/90 sm:block">
            {fa
              ? activeCopy.descriptionFa
              : activeCopy.description}
          </p>

          {/* PREVIOUS AND NEXT */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous food"
              onClick={() => navigate('prev')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/10 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white hover:text-[#315C3D] active:scale-95 sm:h-11 sm:w-11"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              aria-label="Next food"
              onClick={() => navigate('next')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/10 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white hover:text-[#315C3D] active:scale-95 sm:h-11 sm:w-11"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* SHOP FRESH BUTTON */}
        <Link
          to="/shop"
          className="group absolute bottom-6 right-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/10 px-4 py-3 text-xs font-bold tracking-wide text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#315C3D] active:scale-95 sm:bottom-20 sm:right-10 sm:px-6 sm:py-3.5 sm:text-sm"
          style={{ zIndex: 60 }}
        >
          {fa ? 'همین حالا بخرید' : 'SHOP FRESH'}

          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>

        {/* SLIDE INDICATORS */}
        <div
          className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 sm:bottom-7"
          style={{ zIndex: 60 }}
        >
          {FOOD_HERO_IMAGES.map((item, index) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Go to ${item.name}`}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeIndex === index
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

// ==========================================
// KABUL LOCATIONS
// ==========================================

const kabulSpots = [
  {
    name: 'ABC Supermarket',
    dari: 'سوپرمارکیت ای‌بی‌سی',
    address: '3rd Street, Old Taimani, Kabul',
    addressDari: 'سرک سوم، تایمنی کهنه، کابل',
    note: 'Supermarket · Taimani',
    map: 'https://www.google.com/maps/search/?api=1&query=ABC+Supermarket+Taimani+Kabul'
  },
  {
    name: 'Afghan Spinneys',
    dari: 'افغان سپینیز',
    address: 'Shepor Square, Kabul',
    addressDari: 'چهارراهی شیپور، کابل',
    note: 'Grocery store · Shepor',
    map: 'https://www.google.com/maps/search/?api=1&query=Afghan+Spinneys+Shepor+Square+Kabul'
  },
  {
    name: 'Kefayat Supermarket',
    dari: 'سوپرمارکیت کفایت',
    address: 'Service Road, Deh Mazang, Kabul',
    addressDari: 'سرک خدماتی، ده‌مزنگ، کابل',
    note: 'Supermarket · Deh Mazang',
    map: 'https://www.google.com/maps/search/?api=1&query=Kefayat+Supermarket+Deh+Mazang+Kabul'
  }
]

// ==========================================
// FOOD CATEGORY PHOTOS
// ==========================================

const foodPhotos = {
  fruits: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=900&q=85',
  vegetables: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=85',
  meat: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=900&q=85',
  fish: 'https://www.meatlandpk.com/cdn/shop/files/caroline-attwood-kC9KUtSiflw-unsplashcopy_dd7cf9d7-5f85-4888-b194-1b79bfbd006e.jpg?v=1765406163&width=990',
  dairy: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=900&q=85',
  oils: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=85',
  rice: 'https://img.magnific.com/free-psd/burlap-sack-brimming-with-uncooked-white-long-grain-rice-isolated-black-background_84443-63378.jpg?semt=ais_hybrid&w=740&q=80',
  pasta: 'https://cdn.apartmenttherapy.info/image/upload/v1580169242/k/Edit/2020-02-Boxed-Spaghetti-Taste-Test/spaghetti1.jpg',
  bakery: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI6cyrG3WzX9k_3X73ZDoJCYg0MwNNykCJu0cAymkm5ExU-pfuE5gsrFp_&s=10',
  biscuits: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVJ-pokHCYSeVmhqfQKLJOKQxTCfTqEHg4RaE1M1mFUQ&s',
  chocolate: 'https://ledamas.ae/wp-content/uploads/2025/07/3-3.jpg',
  drinks: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85',
  pantry: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=900&q=85',
  frozen: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=85',
  canned: 'https://images.unsplash.com/photo-1584263347416-85a696b4eda7?auto=format&fit=crop&w=900&q=85'
}

// ==========================================
// MAIN HOME PAGE
// ==========================================

export default function Home() {
  const { language } = useStore()
  const fa = language === 'fa'
  const arrow = <ArrowRight size={16} />

  return (
    <main className="overflow-hidden bg-white [&_img]:!rounded-2xl">

      {/* HERO */}
      <FoodHeroCarousel fa={fa} />

      {/* PROMISE SECTION */}
      <Reveal>
        <section className="border-b border-[#315C3D]/10 bg-[#F7FAF5] py-7 sm:py-9">
          <div className="container mx-auto grid grid-cols-2 gap-5 px-4 md:grid-cols-4 md:gap-7">

            {[
              {
                icon: Sprout,
                title: fa ? 'محصولات تازه' : 'Fresh produce',
                description: fa ? 'میوه و سبزی رنگارنگ' : 'Colourful fruit & veg'
              },
              {
                icon: ShieldCheck,
                title: fa ? 'انتخاب هوشمندانه' : 'Thoughtful choices',
                description: fa ? 'کیفیت در اولویت' : 'Quality comes first'
              },
              {
                icon: Truck,
                title: fa ? 'خرید آسان' : 'Easy shopping',
                description: fa ? 'از خانه تا سبد شما' : 'From our shop to you'
              },
              {
                icon: Heart,
                title: fa ? 'برای خانواده' : 'Made for families',
                description: fa ? 'خوبی در هر لقمه' : 'Goodness in every bite'
              }
            ].map((item, index) => {
              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className="group flex items-center gap-3 rounded-2xl p-3 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md sm:gap-4 sm:p-4"
                  style={{ transitionDelay: `${index * 70}ms` }}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#315C3D]/10 text-[#315C3D] transition-all duration-300 group-hover:rotate-6 group-hover:bg-[#315C3D] group-hover:text-white sm:h-12 sm:w-12">
                    <Icon size={23} />
                  </div>

                  <span className="min-w-0">
                    <b className="block text-xs font-bold text-[#183B2B] sm:text-sm">
                      {item.title}
                    </b>
                    <small className="mt-1 block text-[10px] text-gray-500 sm:text-xs">
                      {item.description}
                    </small>
                  </span>
                </div>
              )
            })}

          </div>
        </section>
      </Reveal>

      {/* CATEGORIES */}
      <Reveal>
        <section className="container mx-auto px-4 py-16 sm:py-20">

          <SectionTitle
            eyebrow={fa ? 'راهروهای ما' : 'EXPLORE OUR AISLES'}
            title={fa ? 'هر چیزی که نیاز دارید، پیدا کنید.' : 'Find your favourites.'}
            description={
              fa
                ? 'از محصولات تازه تا مواد ضروری آشپزخانه، دسته مورد نظر خود را انتخاب کنید.'
                : 'From vibrant produce to pantry staples, explore every aisle in one place.'
            }
            action={
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full border border-[#315C3D]/20 px-5 py-2.5 text-sm font-semibold text-[#315C3D] transition-all duration-300 hover:border-[#315C3D] hover:bg-[#315C3D] hover:text-white hover:shadow-lg"
              >
                {fa ? 'تمام محصولات' : 'Shop all'}
                {arrow}
              </Link>
            }
          />

          <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

            {categories
              .filter(c => c.id !== 'all')
              .slice(0, 12)
              .map((c, index) => (
                <Link
                  key={c.id}
                  to={`/shop?category=${c.id}`}
                  style={{ transitionDelay: `${index * 45}ms` }}
                  className="group relative aspect-[4/5] overflow-hidden rounded-[24px] border border-[#315C3D]/10 bg-[#F4F8F2] shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(24,59,43,0.16)]"
                >
                  <img
                    src={foodPhotos[c.id] || foodPhotos.pantry}
                    alt={fa ? c.dari : c.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#102B1C]/90 via-[#102B1C]/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="absolute inset-x-0 bottom-0 p-4 text-white transition-all duration-300 group-hover:pb-6">
                    <b className="block text-sm font-bold sm:text-base">
                      {fa ? c.dari : c.name}
                    </b>

                    <span className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-medium text-white/85 sm:text-xs">
                      {fa ? 'مشاهده محصولات' : 'Explore aisle'}
                      <ArrowRight
                        size={13}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              ))}

          </div>
        </section>
      </Reveal>

      {/* FEATURE */}
      <Reveal>
        <section className="bg-[#F4F8F2] py-16 sm:py-20">
          <div className="container mx-auto grid items-center gap-10 px-4 md:grid-cols-2 md:gap-16">

            <div className="group relative overflow-hidden rounded-[30px] shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=90"
                alt="Fresh green vegetables"
                loading="lazy"
                className="h-[300px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[430px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#183B2B]/25 to-transparent" />
            </div>

            <div className="py-3">
              <span className="inline-block rounded-full bg-[#315C3D]/10 px-4 py-2 text-[10px] font-bold tracking-[0.16em] text-[#315C3D] sm:text-xs">
                {fa ? 'از باغ تا سفره' : 'FROM THE GARDEN TO YOUR TABLE'}
              </span>

              <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-[#183B2B] sm:text-4xl lg:text-5xl">
                {fa ? (
                  <>
                    رنگ تازه را
                    <br />
                    <em className="not-italic text-[#6A9B5D]">به خانه بیاورید.</em>
                  </>
                ) : (
                  <>
                    Bring home a little
                    <br />
                    <em className="not-italic text-[#6A9B5D]">more goodness.</em>
                  </>
                )}
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-8 text-gray-600 sm:text-base">
                {fa
                  ? 'با انتخاب میوه و سبزی تازه، غذاهای روزانه خود را رنگین‌تر و خوش‌مزه‌تر بسازید.'
                  : 'Make everyday meals brighter with colourful fruit, crisp vegetables and ingredients you feel good about.'}
              </p>

              <Link
                to="/shop?category=vegetables"
                className="mt-7 inline-flex items-center justify-center gap-3 rounded-full bg-[#315C3D] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#183B2B] hover:shadow-xl active:scale-95"
              >
                {fa ? 'خرید محصولات تازه' : 'Shop fresh produce'}
                <ArrowRight size={17} />
              </Link>
            </div>

          </div>
        </section>
      </Reveal>

      {/* PRODUCTS */}
      <Reveal>
        <section className="container mx-auto px-4 py-16 sm:py-20">

          <SectionTitle
            eyebrow={fa ? 'انتخاب محبوب' : 'CUSTOMER FAVOURITES'}
            title={fa ? 'محصولات پرطرفدار' : 'A few good things.'}
            description={
              fa
                ? 'محصولات محبوب برای خرید روزانه شما.'
                : 'A handpicked mix of everyday essentials and fresh favourites.'
            }
            action={
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full border border-[#315C3D]/20 px-5 py-2.5 text-sm font-semibold text-[#315C3D] transition-all duration-300 hover:border-[#315C3D] hover:bg-[#315C3D] hover:text-white hover:shadow-lg"
              >
                {fa ? 'دیدن همه' : 'View all'}
                {arrow}
              </Link>
            }
          />

          <div className="mt-9">
            <ProductGrid products={products.slice(0, 8)} />
          </div>

        </section>
      </Reveal>

      {/* KABUL LOCATIONS */}
      <Reveal>
        <section className="bg-[#F4F8F2] py-16 sm:py-20">
          <div className="container mx-auto px-4">

            <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

              <div>
                <span className="text-xs font-bold tracking-[0.18em] text-[#6A9B5D]">
                  {fa ? 'در شهر کابل' : 'AROUND KABUL'}
                </span>

                <h2 className="mt-3 max-w-2xl text-2xl font-bold leading-tight text-[#183B2B] sm:text-4xl">
                  {fa
                    ? 'موقعیت‌های خرید مواد غذایی'
                    : 'Know your local grocery spots.'}
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600">
                  {fa
                    ? 'چند موقعیت شناخته‌شده خرید مواد غذایی در کابل را پیدا کنید.'
                    : 'A few listed grocery destinations around Kabul, with directions to help you find them.'}
                </p>
              </div>

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#315C3D] text-white shadow-lg">
                <MapPin size={28} />
              </div>

            </div>

            <div className="grid gap-5 md:grid-cols-3">

              {kabulSpots.map((spot, i) => (
                <article
                  key={spot.name}
                  className="group relative overflow-hidden rounded-[26px] border border-[#315C3D]/10 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#315C3D]/30 hover:shadow-[0_20px_40px_rgba(24,59,43,0.12)]"
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#315C3D]/5 transition-all duration-500 group-hover:scale-150" />

                  <div className="relative">

                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#315C3D]/10 text-sm font-bold text-[#315C3D] transition-all duration-300 group-hover:rotate-6 group-hover:bg-[#315C3D] group-hover:text-white">
                        0{i + 1}
                      </span>

                      <MapPin
                        size={22}
                        className="text-[#9DB99A] transition-all duration-300 group-hover:scale-125 group-hover:text-[#315C3D]"
                      />
                    </div>

                    <h3 className="mt-6 text-lg font-bold text-[#183B2B] transition-colors duration-300 group-hover:text-[#6A9B5D]">
                      {fa ? spot.dari : spot.name}
                    </h3>

                    <span className="mt-2 inline-block rounded-full bg-[#F1F6EF] px-3 py-1 text-[10px] font-semibold text-[#668466]">
                      {spot.note}
                    </span>

                    <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-gray-500">
                      <MapPin size={16} className="mt-1 shrink-0 text-[#6A9B5D]" />
                      {fa ? spot.addressDari : spot.address}
                    </p>

                    <a
                      href={spot.map}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#315C3D]/10 px-5 py-2.5 text-xs font-bold text-[#315C3D] transition-all duration-300 hover:translate-x-1 hover:bg-[#315C3D] hover:text-white"
                    >
                      {fa ? 'مشاهده در نقشه' : 'Get directions'}
                      <ArrowRight size={14} />
                    </a>

                  </div>
                </article>
              ))}

            </div>

            <p className="mt-6 text-xs leading-6 text-gray-500">
              {fa
                ? 'یادداشت: این‌ها موقعیت‌های فروشگاه‌های شناخته‌شده در کابل هستند، نه شعبه‌های تأییدشده فریش مارکت.'
                : 'Note: These are independently listed grocery locations in Kabul, not verified Fresh Market branches.'}
            </p>

          </div>
        </section>
      </Reveal>

      {/* CONTACT SECTION */}
      <Reveal>
        <section className="px-4 py-16 sm:py-20">
          <div className="container mx-auto overflow-hidden rounded-[30px] bg-[#183B2B] px-6 py-10 shadow-xl sm:px-12 sm:py-14">

            <div className="flex flex-col justify-between gap-9 md:flex-row md:items-center">

              <div className="max-w-xl">

                <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold tracking-[0.16em] text-[#C5E0B9] sm:text-xs">
                  {fa ? 'با ما در ارتباط باشید' : 'STAY IN THE LOOP'}
                </span>

                <h2 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl">
                  {fa
                    ? 'تازگی‌های بیشتر در راه است.'
                    : 'A fresher feed starts here.'}
                </h2>

                <p className="mt-4 max-w-lg text-sm leading-7 text-white/70">
                  {fa
                    ? 'برای پرسش درباره محصولات و سفارش‌ها با ما تماس بگیرید.'
                    : 'Questions about products or orders? Our contact page is ready for your message.'}
                </p>

              </div>

              <div className="flex flex-wrap items-center gap-3">

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#183B2B] shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#DCEBD5] hover:shadow-xl active:scale-95"
                >
                  {fa ? 'تماس با ما' : 'Contact us'}
                  <ArrowRight size={17} />
                </Link>

                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#183B2B] active:scale-95"
                >
                  <Instagram size={18} />
                  Instagram
                </a>

              </div>

            </div>
          </div>
        </section>
      </Reveal>

    </main>
  )
}

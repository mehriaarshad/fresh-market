
import { useState, useEffect } from 'react'
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

// FOOD HERO IMAGES
const FOOD_HERO_IMAGES = [
  {
    src: 'https://www.tesco.com/assets/mfe-digital-content/8ca66585acc75e3dd0629faba2ec3d5c.jpg',
    bg: '#315C3D',
    panel: '#477A50',
    name: 'Fresh Fruits'
  },
  {
    src: 'https://www.tesco.com/assets/mfe-digital-content/6bc9e5e16a33b663016582d6ba50a896.jpg',
    bg: '#477A50',
    panel: '#85B77A',
    name: 'Fresh Vegetables'
  },
  {
    src: 'https://www.tesco.com/assets/mfe-digital-content/a29ab4473a046538e27c0df8c2c3db7a.jpg',
    bg: '#183B2B',
    panel: '#315C3D',
    name: 'Healthy Meals'
  },
  {
    src: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=90',
    bg: '#3D6947',
    panel: '#A8C995',
    name: 'Grocery Essentials'
  }
]

// FOOD HERO CAROUSEL
function FoodHeroCarousel({ fa }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 640
  )

  useEffect(() => {
    // Preload all food images
    FOOD_HERO_IMAGES.forEach(item => {
      const image = new Image()
      image.src = item.src
    })

    // Responsive screen detection
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Carousel navigation
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

  // Image positions
  const getRole = (index) => {
    const total = FOOD_HERO_IMAGES.length

    if (index === activeIndex) return 'center'
    if (index === (activeIndex + 3) % total) return 'left'
    if (index === (activeIndex + 1) % total) return 'right'

    return 'back'
  }

  // Image animation styles
  const getItemStyle = (role) => {
  const common = {
    position: 'absolute',
    transition:
      'all 650ms cubic-bezier(0.4,0,0.2,1)',
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
      className="relative w-full overflow-hidden rounded-b-3xl"
      style={{
        backgroundColor: FOOD_HERO_IMAGES[activeIndex].bg,
        transition:
          'background-color 650ms cubic-bezier(0.4,0,0.2,1)',
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
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 50,
            opacity: 0.4,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat'
          }}
        />

        {/* GIANT BACKGROUND TEXT */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
          style={{
            zIndex: 2,
            top: '18%',
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(44px, 13vw, 220px)',
            fontWeight: 900,
            color: 'white',
            opacity: 1,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap'
          }}
        >
          FRESH FOOD
        </div>

        {/* BRAND */}
        <div
          className="absolute top-6 left-4 sm:left-8 text-xs font-semibold uppercase text-white"
          style={{
            zIndex: 60,
            opacity: 0.9,
            letterSpacing: '0.18em'
          }}
        >
          FRESH MARKET
        </div>

        {/* FOOD CAROUSEL */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {FOOD_HERO_IMAGES.map((item, index) => {
            const role = getRole(index)

            return (
              <div
                key={item.name}
                style={getItemStyle(role)}
                className="overflow-hidden rounded-3xl"
              >
                <img
                  src={item.src}
                  alt={item.name}
                  draggable={false}
                  className="block h-full w-full rounded-3xl object-cover object-center"
                  style={{ userSelect: 'none' }}
                />
              </div>
            )
          })}
        </div>

        {/* BOTTOM LEFT CONTENT */}
        <div
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24"
          style={{
            zIndex: 60,
            maxWidth: 320
          }}
        >
          <p
            className="mb-2 sm:mb-3 text-base font-bold uppercase tracking-widest text-white sm:text-[22px]"
            style={{
              opacity: 0.95,
              letterSpacing: '0.02em'
            }}
          >
            {fa
              ? 'تازگی برای زندگی بهتر'
              : 'FRESHNESS FOR LIFE'}
          </p>

          <p
            className="hidden mb-4 text-xs leading-relaxed text-white opacity-85 sm:mb-5 sm:block sm:text-sm"
            style={{ lineHeight: 1.6 }}
          >
            {fa
            ? 'میوه‌های تازه، سبزیجات باطراوت و مواد غذایی مورد نیاز روزانه. کیفیتی که می‌بینید و تازگی‌ای که احساس می‌کنید. محصولات مورد علاقه‌تان را در فریش مارکت پیدا کنید.'
            : 'Fresh fruit, crisp vegetables and everyday essentials. Quality you can see, freshness you can taste. Discover your favourites at Fresh Market.'}
          </p>

          {/* NAVIGATION BUTTONS */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              aria-label="Previous food"
              onClick={() => navigate('prev')}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-transparent text-white transition-all duration-150 hover:scale-105 hover:bg-white/10 sm:h-16 sm:w-16"
              style={{
                transition: 'transform 150ms, background-color 150ms'
              }}
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>

            <button
              type="button"
              aria-label="Next food"
              onClick={() => navigate('next')}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-transparent text-white transition-all duration-150 hover:scale-105 hover:bg-white/10 sm:h-16 sm:w-16"
              style={{
                transition: 'transform 150ms, background-color 150ms'
              }}
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* BOTTOM RIGHT SHOP LINK */}
        <Link
          to="/shop"
          className="absolute bottom-6 right-4 flex items-center gap-2 text-white opacity-95 transition-opacity duration-200 hover:opacity-100 sm:bottom-20 sm:right-10 sm:gap-3"
          style={{
            zIndex: 60,
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(20px, 4vw, 56px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            textDecoration: 'none'
          }}
        >
          {fa ? 'همین حالا بخرید' : 'SHOP FRESH'}

          <ArrowRight
            className="h-5 w-5 sm:h-8 sm:w-8"
            strokeWidth={2.25}
          />
        </Link>

      </div>
    </section>
  )
}

// EXISTING KABUL LOCATIONS
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

// EXISTING FOOD PHOTOS
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

// MAIN HOME PAGE
export default function Home() {
  const { language, t } = useStore()
  const fa = language === 'fa'
  const arrow = <ArrowRight size={16} />

  return (
    <main className="[&_img]:!rounded-2xl [&_img]:!overflow-hidden">
      {/* NEW GREEN FOOD CAROUSEL */}
      <FoodHeroCarousel fa={fa} />

      {/* EXISTING PROMISE SECTION */}
      <section className="wf-promise">
        <div className="container wf-promise-grid">
          <div>
            <Sprout />
            <span>
              <b>{fa ? 'محصولات تازه' : 'Fresh produce'}</b>
              <small>{fa ? 'میوه و سبزی رنگارنگ' : 'Colourful fruit & veg'}</small>
            </span>
          </div>

          <div>
            <ShieldCheck />
            <span>
              <b>{fa ? 'انتخاب هوشمندانه' : 'Thoughtful choices'}</b>
              <small>{fa ? 'کیفیت در اولویت' : 'Quality comes first'}</small>
            </span>
          </div>

          <div>
            <Truck />
            <span>
              <b>{fa ? 'خرید آسان' : 'Easy shopping'}</b>
              <small>{fa ? 'از خانه تا سبد شما' : 'From our shop to you'}</small>
            </span>
          </div>

          <div>
            <Heart />
            <span>
              <b>{fa ? 'برای خانواده' : 'Made for families'}</b>
              <small>{fa ? 'خوبی در هر لقمه' : 'Goodness in every bite'}</small>
            </span>
          </div>
        </div>
      </section>

      {/* EXISTING DEPARTMENTS SECTION */}
      <section className="section container wf-departments">
        <SectionTitle
          eyebrow={fa ? 'راهروهای ما' : 'EXPLORE OUR AISLES'}
          title={fa ? 'هر چیزی که نیاز دارید، پیدا کنید.' : 'Find your favourites.'}
          description={
            fa
              ? 'از محصولات تازه تا مواد ضروری آشپزخانه، دسته مورد نظر خود را انتخاب کنید.'
              : 'From vibrant produce to pantry staples, explore every aisle in one place.'
          }
          action={
            <Link to="/shop" className="text-link">
              {fa ? 'تمام محصولات' : 'Shop all'} {arrow}
            </Link>
          }
        />

        <div className="wf-category-grid">
          {categories
            .filter(c => c.id !== 'all')
            .slice(0, 12)
            .map(c => (
              <Link
                key={c.id}
                to={`/shop?category=${c.id}`}
                className="wf-category-card group overflow-hidden rounded-2xl"
              >
                <img
                 src={foodPhotos[c.id] || foodPhotos.pantry}
                 alt={fa ? c.dari : c.name}
                 loading="lazy"
                 className="block h-full w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <span className="wf-category-label">
                  <b>{fa ? c.dari : c.name}</b>
                  <small>
                    {fa ? 'مشاهده محصولات' : 'Explore aisle'}
                    <ArrowRight size={13} />
                  </small>
                </span>
              </Link>
            ))}
        </div>
      </section>

      {/* EXISTING FEATURE SECTION */}
      <section className="wf-feature">
        <div className="container wf-feature-grid">
          <div className="wf-feature-image overflow-hidden rounded-3xl">
        <img
          src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=90"
          alt="Fresh green vegetables"
          loading="lazy"
          className="block h-full w-full rounded-3xl object-cover"
         />
          </div>

          <div className="wf-feature-copy">
            <span className="wf-kicker">
              {fa ? 'از باغ تا سفره' : 'FROM THE GARDEN TO YOUR TABLE'}
            </span>

            <h2>
              {fa ? (
                <>
                  رنگ تازه را
                  <br />
                  <em>به خانه بیاورید.</em>
                </>
              ) : (
                <>
                  Bring home a little
                  <br />
                  <em>more goodness.</em>
                </>
              )}
            </h2>

            <p>
              {fa
                ? 'با انتخاب میوه و سبزی تازه، غذاهای روزانه خود را رنگین‌تر و خوش‌مزه‌تر بسازید.'
                : 'Make everyday meals brighter with colourful fruit, crisp vegetables and ingredients you feel good about.'}
            </p>

            <Link
              to="/shop?category=vegetables"
              className="button wf-primary"
            >
              {fa ? 'خرید محصولات تازه' : 'Shop fresh produce'}
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* EXISTING PRODUCTS SECTION */}
      <section className="section container wf-products">
        <SectionTitle
          eyebrow={fa ? 'انتخاب محبوب' : 'CUSTOMER FAVOURITES'}
          title={fa ? 'محصولات پرطرفدار' : 'A few good things.'}
          description={
            fa
              ? 'محصولات محبوب برای خرید روزانه شما.'
              : 'A handpicked mix of everyday essentials and fresh favourites.'
          }
          action={
            <Link to="/shop" className="text-link">
              {fa ? 'دیدن همه' : 'View all'} {arrow}
            </Link>
          }
        />

        <ProductGrid products={products.slice(0, 8)} />
      </section>

      {/* EXISTING KABUL LOCATIONS SECTION */}
      <section className="wf-kabul">
        <div className="container">
          <div className="wf-kabul-heading">
            <div>
              <span className="wf-kicker">
                {fa ? 'در شهر کابل' : 'AROUND KABUL'}
              </span>

              <h2>
                {fa
                  ? 'موقعیت‌های خرید مواد غذایی'
                  : 'Know your local grocery spots.'}
              </h2>

              <p>
                {fa
                  ? 'چند موقعیت شناخته‌شده خرید مواد غذایی در کابل را پیدا کنید.'
                  : 'A few listed grocery destinations around Kabul, with directions to help you find them.'}
              </p>
            </div>

            <MapPin size={36} />
          </div>

          <div className="wf-location-grid">
            {kabulSpots.map((spot, i) => (
              <article className="wf-location-card" key={spot.name}>
                <span className="wf-location-number">0{i + 1}</span>

                <h3>{fa ? spot.dari : spot.name}</h3>

                <small>{spot.note}</small>

                <p>
                  <MapPin size={15} />
                  {fa ? spot.addressDari : spot.address}
                </p>

                <a href={spot.map} target="_blank" rel="noreferrer">
                  {fa ? 'مشاهده در نقشه' : 'Get directions'}
                  <ArrowRight size={14} />
                </a>
              </article>
            ))}
          </div>

          <p className="wf-location-disclaimer">
            {fa
              ? 'یادداشت: این‌ها موقعیت‌های فروشگاه‌های شناخته‌شده در کابل هستند، نه شعبه‌های تأییدشده فریش مارکت.'
              : 'Note: These are independently listed grocery locations in Kabul, not verified Fresh Market branches.'}
          </p>
        </div>
      </section>

      {/* EXISTING CONTACT SECTION */}
      <section className="wf-connect">
        <div className="container wf-connect-inner">
          <div>
            <span className="wf-kicker">
              {fa ? 'با ما در ارتباط باشید' : 'STAY IN THE LOOP'}
            </span>

            <h2>
              {fa
                ? 'تازگی‌های بیشتر در راه است.'
                : 'A fresher feed starts here.'}
            </h2>

            <p>
              {fa
                ? 'برای پرسش درباره محصولات و سفارش‌ها با ما تماس بگیرید.'
                : 'Questions about products or orders? Our contact page is ready for your message.'}
            </p>
          </div>

          <div className="wf-connect-actions">
            <Link to="/contact" className="button wf-primary">
              {fa ? 'تماس با ما' : 'Contact us'}
              <ArrowRight size={17} />
            </Link>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="wf-social"
            >
              <Instagram size={18} />
              Instagram
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

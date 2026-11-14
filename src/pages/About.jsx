
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Leaf,
  Heart,
  Users,
  BadgeCheck,
  ArrowRight,
  ArrowUpRight,
  Sprout,
  ShoppingBasket,
  ShieldCheck,
  Truck
} from 'lucide-react'
import { useStore } from '../context/StoreContext'

const values = [
  {
    icon: Leaf,
    title: 'Freshness comes first',
    titleFa: 'تازگی در اولویت',
    description:
      'We put freshness and product quality at the centre of the shopping experience.',
    descriptionFa:
      'ما تازگی و کیفیت محصولات را در مرکز تجربه خرید قرار می‌دهیم.'
  },
  {
    icon: Heart,
    title: 'Made with care',
    titleFa: 'با توجه و دقت',
    description:
      'Thoughtful product details and a simple checkout help customers shop with confidence.',
    descriptionFa:
      'جزئیات روشن محصولات و پرداخت ساده، خرید مطمئن را آسان می‌سازد.'
  },
  {
    icon: Users,
    title: 'Shopping for everyone',
    titleFa: 'برای همه',
    description:
      'A responsive shopping experience designed for phones, tablets and computers.',
    descriptionFa:
      'تجربه‌ای واکنش‌گرا برای موبایل، تبلت و کمپیوتر.'
  },
  {
    icon: BadgeCheck,
    title: 'Simple and honest',
    titleFa: 'ساده و صادقانه',
    description:
      'Clear demo pricing and helpful order feedback at every important step.',
    descriptionFa:
      'قیمت‌گذاری آزمایشی شفاف و اطلاع‌رسانی روشن در هر مرحله.'
  }
]

const benefits = [
  {
    icon: Sprout,
    title: 'Fresh choices',
    titleFa: 'انتخاب تازه',
    description: 'Explore a variety of everyday grocery essentials.',
    descriptionFa: 'انواع مواد غذایی و نیازمندی‌های روزانه را پیدا کنید.'
  },
  {
    icon: ShoppingBasket,
    title: 'Easy shopping',
    titleFa: 'خرید آسان',
    description: 'Find your favourites and add them to your basket.',
    descriptionFa: 'محصولات مورد علاقه خود را پیدا و به سبد خرید اضافه کنید.'
  },
  {
    icon: ShieldCheck,
    title: 'Clear checkout',
    titleFa: 'پرداخت آسان',
    description: 'A simple and clear process from basket to order.',
    descriptionFa: 'روندی ساده و روشن از سبد خرید تا ثبت سفارش.'
  },
  {
    icon: Truck,
    title: 'Convenience',
    titleFa: 'آسایش بیشتر',
    description: 'Shop for your everyday needs from wherever you are.',
    descriptionFa: 'از هر مکانی نیازمندی‌های روزانه خود را سفارش دهید.'
  }
]

function Reveal({ children, delay = 0, className = '' }) {
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
      className={`transition-all duration-700 ease-out ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default function About() {
  const { language } = useStore()
  const fa = language === 'fa'

  return (
    <main
      dir={fa ? 'rtl' : 'ltr'}
      className="overflow-hidden bg-white text-[#183B2B]"
    >

      {/* PAGE INTRO */}
      <section className="relative overflow-hidden bg-[#F4F8F2]">
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#A8CD96]/20 blur-3xl" />

        <div className="container relative mx-auto px-5 pb-12 pt-16 sm:px-8 sm:pb-16 sm:pt-20">

          <Reveal>
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#315C3D]/10 px-4 py-2 text-[10px] font-bold tracking-[0.18em] text-[#315C3D] sm:text-xs">
                <Leaf size={14} />
                {fa ? 'درباره فریش مارکت' : 'GET TO KNOW US'}
              </span>

              <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-[#183B2B] sm:text-5xl lg:text-6xl">
                {fa
                  ? 'غذای خوب، زندگی بهتر.'
                  : 'Good food brings us together.'}
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-8 text-gray-600 sm:text-base">
                {fa
                  ? 'در فریش مارکت، محصولات تازه، مواد غذایی باکیفیت و نیازمندی‌های روزمره را در یک مکان برای شما فراهم می‌سازیم. هدف ما آسان‌تر، راحت‌تر و لذت‌بخش‌تر ساختن تجربه خرید برای همه است.'
                  : 'At Fresh Market, we bring fresh produce, quality groceries and everyday essentials together in one place. Our goal is to make shopping simple, convenient and enjoyable for everyone.'}
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* STORY SECTION */}
      <section className="container mx-auto px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* IMAGE */}
          <Reveal className="relative">
            <div className="group relative overflow-hidden rounded-[28px] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=90"
                alt="Fresh colourful produce in a grocery market"
                className="h-[340px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[470px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#183B2B]/30 to-transparent" />
            </div>

            {/* IMAGE DETAIL CARD */}
            <div className={`absolute -bottom-6 ${fa ? 'right-4 sm:-right-5' : 'left-4 sm:-left-5'} flex max-w-[230px] items-center gap-3 rounded-2xl border border-[#315C3D]/10 bg-white p-4 shadow-xl sm:p-5`}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#315C3D]/10 text-[#315C3D]">
                <Sprout size={23} />
              </span>

              <div>
                <p className="text-sm font-bold text-[#183B2B]">
                  {fa ? 'تازگی هر روز' : 'Fresh every day'}
                </p>
                <p className="mt-1 text-[11px] text-gray-500">
                  {fa ? 'انتخاب بهتر برای خانه' : 'Better choices for home'}
                </p>
              </div>
            </div>
          </Reveal>

          {/* STORY TEXT */}
          <Reveal delay={150}>
            <div className="pt-4 lg:pt-0">
              <span className="text-xs font-bold tracking-[0.18em] text-[#6A9B5D]">
                {fa ? 'داستان ما' : 'OUR STORY'}
              </span>

              <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#183B2B] sm:text-4xl lg:text-[46px]">
                {fa ? (
                  <>
                    نیازمندی‌های روزانه.
                    <br />
                    <span className="text-[#6A9B5D]">با توجه بیشتر.</span>
                  </>
                ) : (
                  <>
                    Everyday essentials.
                    <br />
                    <span className="text-[#6A9B5D]">A little more thoughtful.</span>
                  </>
                )}
              </h2>

              <p className="mt-6 text-sm leading-8 text-gray-600 sm:text-base">
                {fa
                  ? 'ما محصولات تازه و نیازمندی‌های خانه را در یک تجربه ساده خرید آنلاین گردهم می‌آوریم. شما می‌توانید محصولات را ببینید، انتخاب کنید و سفارش خود را در چند مرحله آسان ثبت نمایید.'
                  : 'We bring fresh produce and household favourites together in one simple online shopping experience. Browse our products, choose what you need and place your order in a few easy steps.'}
              </p>

              <p className="mt-4 text-sm leading-8 text-gray-600 sm:text-base">
                {fa
                  ? 'فریش مارکت با هدف فراهم‌سازی تجربه‌ای راحت، منظم و قابل دسترس برای خرید روزانه طراحی شده است.'
                  : 'Fresh Market is designed to make everyday grocery shopping more convenient, organised and accessible.'}
              </p>

              <Link
                to="/shop"
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#315C3D] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#183B2B] hover:shadow-xl active:scale-95"
              >
                {fa ? 'مشاهده محصولات' : 'Explore our products'}
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>
          </Reveal>

        </div>
      </section>

      {/* OUR VALUES */}
      <section className="bg-[#F5F8F3] py-16 sm:py-24">
        <div className="container mx-auto px-5 sm:px-8">

          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold tracking-[0.18em] text-[#6A9B5D]">
                {fa ? 'ارزش‌های ما' : 'WHAT MATTERS TO US'}
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#183B2B] sm:text-4xl">
                {fa ? 'چیزهایی که به آن باور داریم.' : 'The values behind every choice.'}
              </h2>

              <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
                {fa
                  ? 'این اصول، تجربه خریدی را شکل می‌دهند که می‌خواهیم برای شما فراهم کنیم.'
                  : 'The principles that shape the shopping experience we want to provide.'}
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {values.map((item, index) => {
              const Icon = item.icon

              return (
                <Reveal key={item.title} delay={index * 100}>
                  <article className="group h-full rounded-[24px] border border-[#315C3D]/10 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#315C3D]/25 hover:shadow-[0_20px_40px_rgba(24,59,43,0.10)] sm:p-7">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#315C3D]/10 text-[#315C3D] transition-all duration-500 group-hover:rotate-6 group-hover:bg-[#315C3D] group-hover:text-white">
                      <Icon size={25} strokeWidth={1.8} />
                    </div>

                    <h3 className="mt-6 text-lg font-bold text-[#183B2B]">
                      {fa ? item.titleFa : item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-gray-500">
                      {fa ? item.descriptionFa : item.description}
                    </p>

                    <div className="mt-6 h-1 w-9 rounded-full bg-[#A8CD96] transition-all duration-500 group-hover:w-16" />
                  </article>
                </Reveal>
              )
            })}

          </div>
        </div>
      </section>

      {/* SHOPPING EXPERIENCE */}
      <section className="container mx-auto px-5 py-16 sm:px-8 sm:py-24">

        <Reveal>
          <div className="grid items-center gap-12 lg:grid-cols-2">

            <div>
              <span className="text-xs font-bold tracking-[0.18em] text-[#6A9B5D]">
                {fa ? 'تجربه خرید شما' : 'THE FRESH MARKET EXPERIENCE'}
              </span>

              <h2 className="mt-5 text-3xl font-bold leading-tight text-[#183B2B] sm:text-4xl">
                {fa
                  ? 'خرید روزانه، به روشی ساده‌تر.'
                  : 'Everyday shopping, made simpler.'}
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-8 text-gray-600 sm:text-base">
                {fa
                  ? 'از پیدا کردن محصولات مورد نیاز تا ثبت سفارش، همه چیز برای آسان‌تر شدن خرید شما طراحی شده است.'
                  : 'From finding the products you need to placing an order, every step is designed to make shopping easier.'}
              </p>

              <div className="mt-9 space-y-6">
                {benefits.map((item, index) => {
                  const Icon = item.icon

                  return (
                    <div key={item.title} className="group flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#315C3D]/10 text-[#315C3D] transition-all duration-300 group-hover:bg-[#315C3D] group-hover:text-white">
                        <Icon size={21} />
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-[#183B2B]">
                          {fa ? item.titleFa : item.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-gray-500">
                          {fa ? item.descriptionFa : item.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-[28px] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1543083477-4f785aeafaa9?auto=format&fit=crop&w=1200&q=90"
                alt="Fresh grocery shopping basket with produce"
                loading="lazy"
                className="h-[360px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[520px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#183B2B]/40 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-white/90 p-5 shadow-lg backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-8">
                <p className="text-sm font-bold text-[#183B2B]">
                  {fa ? 'همه نیازهای شما در یک مکان' : 'Everything you need in one place'}
                </p>
                <p className="mt-2 text-xs leading-6 text-gray-600">
                  {fa
                    ? 'محصولات مورد علاقه خود را آسان‌تر پیدا کنید.'
                    : 'Discover your everyday favourites with ease.'}
                </p>
              </div>
            </div>

          </div>
        </Reveal>

      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="px-5 pb-16 sm:px-8 sm:pb-24">
        <Reveal>
          <div className="container mx-auto overflow-hidden rounded-[28px] bg-[#183B2B] px-6 py-12 text-center shadow-xl sm:px-12 sm:py-16">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#C5E0B9]">
              <Leaf size={27} />
            </div>

            <h2 className="mx-auto mt-6 max-w-2xl text-2xl font-bold leading-tight text-white sm:text-4xl">
              {fa
                ? 'خرید تازه‌تر خود را از همین‌جا آغاز کنید.'
                : 'Ready to make your shopping a little fresher?'}
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/65">
              {fa
                ? 'محصولات ما را ببینید و نیازمندی‌های روزانه خود را پیدا کنید.'
                : 'Explore our range and find the everyday essentials you need.'}
            </p>

            <Link
              to="/shop"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#C5E0B9] px-7 py-3.5 text-sm font-bold text-[#183B2B] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl active:scale-95"
            >
              {fa ? 'شروع خرید' : 'Start shopping'}
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

          </div>
        </Reveal>
      </section>

    </main>
  )
}

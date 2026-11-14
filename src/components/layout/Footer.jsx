
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Leaf,
  Instagram,
  Facebook,
  ArrowUpRight,
  MapPin,
  ArrowUp
} from 'lucide-react'
import { useStore } from '../../context/StoreContext'

export default function Footer() {
  const { t, language } = useStore()
  const fa = language === 'fa'

  const footerRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = footerRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const navigationGroups = [
    {
      title: t.exploreHeading,
      links: [
        { label: t.shopAllLink, to: '/shop' },
        { label: t.ourStoryLink, to: '/about' },
        { label: t.contactUs, to: '/contact' }
      ]
    },
    {
      title: t.customerCare,
      links: [
        { label: t.account, to: '/account' },
        { label: t.cart, to: '/cart' },
        { label: t.help, to: '/contact' }
      ]
    }
  ]

  return (
    <footer
      ref={footerRef}
      dir={fa ? 'rtl' : 'ltr'}
      className="relative mt-16 overflow-hidden bg-[#173B2A] text-white"
    >
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#91B985]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#91B985]/10 blur-3xl" />

      <div
        className={`container relative mx-auto px-5 pb-8 pt-14 transition-all duration-1000 sm:px-8 sm:pt-16 ${
          visible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-6 opacity-0'
        }`}
      >

        {/* MAIN FOOTER CONTENT */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-14">

          {/* BRAND */}
          <div className="flex flex-col items-start">

            <Link
              to="/"
              className="group inline-flex items-center gap-3"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C5E0B9] text-[#173B2A] shadow-lg transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                <Leaf size={25} />
              </span>

              <span className="text-[26px] font-extrabold tracking-tight">
                fresh<span className="text-[#A8CD96]">market</span>

                <small className="mt-0.5 block text-[9px] font-semibold tracking-[0.22em] text-white/50">
                  GOOD FOOD. GOOD MOOD.
                </small>
              </span>
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-7 text-white/60">
              {t.footerText}
            </p>

            {/* SOCIAL LINKS */}
            <div className="mt-6 flex items-center gap-3">

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-[#C5E0B9] hover:bg-[#C5E0B9] hover:text-[#173B2A]"
              >
                <Instagram size={19} />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-[#C5E0B9] hover:bg-[#C5E0B9] hover:text-[#173B2A]"
              >
                <Facebook size={19} />
              </a>

            </div>
          </div>

          {/* NAVIGATION */}
          {navigationGroups.map((group, index) => (
            <div
              key={group.title}
              className="transition-all duration-700"
              style={{
                transitionDelay: visible ? `${index * 120}ms` : '0ms'
              }}
            >
              <h4 className="mb-6 text-sm font-bold text-white">
                {group.title}
              </h4>

              <ul className="space-y-4">
                {group.links.map(link => (
                  <li key={link.to + link.label}>
                    <Link
                      to={link.to}
                      className="group inline-flex items-center gap-2 text-sm text-white/55 transition-all duration-300 hover:translate-x-1 hover:text-[#C5E0B9]"
                    >
                      <span className="h-1 w-1 rounded-full bg-[#8FB481] transition-all duration-300 group-hover:scale-150" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CONTACT INFORMATION */}
          <div>
            <h4 className="mb-6 text-sm font-bold text-white">
              {t.stay}
            </h4>

            <p className="mb-6 max-w-xs text-sm leading-7 text-white/55">
              {fa
                ? 'تازه‌ترین خبرها و محصولات فصلی را دنبال کنید.'
                : 'Fresh updates and seasonal inspiration, coming your way.'}
            </p>

            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#A8CD96]">
                <MapPin size={18} />
              </span>

              <div>
                <p className="text-sm font-semibold text-white">
                  {fa ? 'موقعیت ما' : 'Our location'}
                </p>
                <p className="mt-1 text-xs text-white/50">
                  {fa ? 'کابل، افغانستان' : 'Kabul, Afghanistan'}
                </p>
              </div>
            </div>

            <Link
              to="/contact"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#C5E0B9] transition-colors duration-300 hover:text-white"
            >
              {t.contactUs}
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="my-10 h-px bg-white/10" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Fresh Market. All rights reserved.
          </p>

          <p className="text-xs text-white/45">
            {fa
              ? 'برای زندگی تازه‌تر.'
              : 'Made for fresher everyday living.'}
          </p>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              })
            }
            aria-label="Back to top"
            className="group flex items-center gap-2 text-xs font-semibold text-white/60 transition-colors duration-300 hover:text-[#C5E0B9]"
          >
            {fa ? 'بازگشت به بالا' : 'Back to top'}

            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#C5E0B9] group-hover:bg-[#C5E0B9] group-hover:text-[#173B2A]">
              <ArrowUp size={15} />
            </span>
          </button>

        </div>

      </div>
    </footer>
  )
}

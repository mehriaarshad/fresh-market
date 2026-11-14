
import { Link, NavLink } from 'react-router-dom'
import { ShoppingBasket, Search, UserRound, Menu, X, Leaf, Languages } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '../../context/StoreContext'

export default function Header() {
  const { cartCount, user, language, setLanguage, t } = useStore()
  const [open, setOpen] = useState(false)

  const links = [
    [t.home, '/'],
    [t.shop, '/shop'],
    [t.about, '/about'],
    [t.contact, '/contact']
  ]

  return (
    <>
      {/* Announcement */}
      <div className="relative z-[1001] bg-[#315c3d] py-2 text-center text-xs font-medium tracking-wide text-white">
        {t.announcement} <strong className="font-bold">{t.delivery}</strong>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-[1000] border-b border-[#e8eee7] bg-white/90 shadow-[0_4px_20px_rgba(24,59,43,0.05)] backdrop-blur-xl animate-[headerDrop_0.6s_ease-out]">
        <div className="container mx-auto flex min-h-[78px] items-center justify-between gap-5 px-4">

          {/* Logo */}
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-2.5 text-[#183b2b] transition-transform duration-300 hover:-translate-y-1"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#315c3d] text-white shadow-md shadow-[#315c3d]/20 transition-all duration-500 group-hover:rotate-[-12deg] group-hover:scale-110 group-hover:bg-[#477b50]">
              <Leaf size={23} />
            </span>

            <span className="text-[25px] font-extrabold tracking-[-1.3px]">
              fresh<span className="text-[#76a66a]">market</span>
              <small className="mt-0.5 block text-[8px] font-bold tracking-[2px] text-[#89968b]">
                GOOD FOOD. GOOD MOOD.
              </small>
            </span>
          </Link>

          {/* Navigation */}
          <nav
            className={`absolute left-0 right-0 top-full flex flex-col gap-1 border-b border-[#e8eee7] bg-white px-6 py-0 shadow-xl shadow-[#183b2b]/5 transition-all duration-500 md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0 md:shadow-none ${
              open
                ? 'visible max-h-80 py-5 opacity-100'
                : 'invisible max-h-0 overflow-hidden opacity-0 md:visible md:max-h-none md:overflow-visible md:opacity-100'
            }`}
          >
            {links.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `group relative rounded-lg px-2 py-3 text-sm font-semibold transition-colors duration-300 md:px-0 ${
                    isActive
                      ? 'text-[#315c3d]'
                      : 'text-[#536357] hover:text-[#315c3d]'
                  }`
                }
              >
                {label}
                <span className="absolute bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#76a66a] transition-all duration-300 group-hover:w-full md:bottom-0" />
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2">

            {/* Language */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'fa' : 'en')}
              aria-label="Change language"
              className="flex h-10 items-center gap-2 rounded-xl border border-[#e8eee7] bg-white px-3 text-xs font-semibold text-[#315c3d] transition-all duration-300 hover:-translate-y-1 hover:border-[#315c3d] hover:bg-[#315c3d] hover:text-white"
            >
              <Languages size={16} />
              <span>{language === 'en' ? 'دری' : 'English'}</span>
            </button>

            {/* Search */}
            <Link
              className="search-shortcut grid h-10 w-10 place-items-center rounded-xl border border-[#e8eee7] text-[#315c3d] transition-all duration-300 hover:-translate-y-1 hover:bg-[#315c3d] hover:text-white"
              to="/shop"
              aria-label="Search products"
            >
              <Search size={19} />
            </Link>

            {/* Account */}
            <Link
              className="grid h-10 w-10 place-items-center rounded-xl border border-[#e8eee7] text-[#315c3d] transition-all duration-300 hover:-translate-y-1 hover:bg-[#315c3d] hover:text-white"
              to={user ? '/account' : '/login'}
              aria-label={t.account}
            >
              <UserRound size={19} />
            </Link>

            {/* Cart */}
            <Link
              className="group flex h-10 items-center gap-2 rounded-xl bg-[#315c3d] px-3 text-sm font-semibold text-white shadow-md shadow-[#315c3d]/15 transition-all duration-300 hover:-translate-y-1 hover:bg-[#234b32] hover:shadow-lg"
              to="/cart"
            >
              <ShoppingBasket size={19} />
              <span className="hidden sm:inline">{t.cart}</span>
              <b className="grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-[11px] text-[#315c3d] transition-transform duration-300 group-hover:scale-110">
                {cartCount}
              </b>
            </Link>

            {/* Mobile Menu */}
            <button
              className="grid h-10 w-10 place-items-center rounded-xl border border-[#e8eee7] text-[#315c3d] transition-all duration-300 hover:bg-[#315c3d] hover:text-white md:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </header>

      {/* Header animation */}
      <style>
        {`
          @keyframes headerDrop {
            from {
              opacity: 0;
              transform: translateY(-15px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </>
  )
}

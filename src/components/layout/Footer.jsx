import { Link } from 'react-router-dom'
import { Leaf, Instagram, Facebook, ArrowUpRight } from 'lucide-react'
import { useStore } from '../../context/StoreContext'
export default function Footer() {
  const { t, language } = useStore()
  return <footer className="footer">
    <div className="container footer-grid">
      <div><Link to="/" className="brand footer-brand"><span className="brand-mark"><Leaf size={22}/></span><span>fresh<span className="brand-light">market</span><small>GOOD FOOD. GOOD MOOD.</small></span></Link><p>{t.footerText}</p><div className="socials"><a href="https://instagram.com" aria-label="Instagram"><Instagram/></a><a href="https://facebook.com" aria-label="Facebook"><Facebook/></a></div></div>
      <div><h4>{t.exploreHeading}</h4><Link to="/shop">{t.shopAllLink}</Link><Link to="/about">{t.ourStoryLink}</Link><Link to="/contact">{t.contactUs}</Link></div>
      <div><h4>{t.customerCare}</h4><Link to="/account">{t.account}</Link><Link to="/cart">{t.cart}</Link><Link to="/contact">{t.help}</Link></div>
      <div><h4>{t.stay}</h4><p>{language === 'fa' ? 'تازه‌ترین خبرها و محصولات فصلی را دنبال کنید.' : 'Fresh updates and seasonal inspiration, coming your way.'}</p><Link className="footer-link" to="/shop">{t.shopFresh} <ArrowUpRight size={16}/></Link></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} Fresh Market. {language === 'fa' ? 'نمونه پروژه درسی.' : 'Student project demo.'}</span><span>{language === 'fa' ? 'برای زندگی تازه‌تر.' : 'Made for fresher everyday living.'}</span></div>
  </footer>
}

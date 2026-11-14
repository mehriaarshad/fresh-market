import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
export default function NotFound(){const {language}=useStore();const fa=language==='fa';return <div className="container page-section empty-state"><span className="not-found-number">404</span><h1>{fa?'راهرو اشتباه!':'Oops, wrong aisle.'}</h1><p>{fa?'صفحه مورد نظر شما پیدا نشد.':"We couldn't find the page you're looking for."}</p><Link to="/" className="button button-dark">{fa?'بازگشت به صفحه اصلی':'Back to home'}</Link></div>}

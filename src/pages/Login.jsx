import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
export default function Login() {
  const [email,setEmail]=useState(''),[password,setPassword]=useState(''),[error,setError]=useState('')
  const {login,language}=useStore(), navigate=useNavigate()
  const fa=language==='fa'
  const submit=e=>{e.preventDefault();if(!email||!password){setError(fa?'لطفاً ایمیل و رمز عبور خود را وارد کنید.':'Please enter your email and password.');return}const name=email.split('@')[0].replace(/[._-]/g,' ');login(email,name.replace(/\b\w/g,c=>c.toUpperCase()));navigate('/account')}
  return <div className="auth-page"><form className="auth-card" onSubmit={submit}><span className="eyebrow">{fa?'خوش آمدید':'WELCOME BACK'}</span><h1>{fa?'از دیدنتان خوشحالیم.':'Good to see you.'}</h1><p>{fa?'برای دیدن سفارش‌های فریش مارکت وارد شوید.':'Sign in to see your Fresh Market orders.'}</p>{error&&<div className="form-alert">{error}</div>}<label className="form-field"><span>{fa?'آدرس ایمیل':'Email address'}</span><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required/></label><label className="form-field"><span>{fa?'رمز عبور':'Password'}</span><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="رمز عبور خود را وارد کنید" required/></label><button className="button button-dark full-button">{fa?'ورود':'Sign in'}</button><small className="demo-note">{fa?'حساب آزمایشی: هر ایمیل و رمز عبور معتبر را وارد کنید.':'Demo account: enter any valid email and password.'}</small><div className="auth-switch">{fa?'در فریش مارکت تازه‌وارد هستید؟':'New to Fresh Market?'} <Link to="/register">{fa?'ایجاد حساب':'Create an account'}</Link></div></form></div>
}

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
export default function Register() {
  const [form,setForm]=useState({name:'',email:'',password:''}),[error,setError]=useState('')
  const {login,language}=useStore(),navigate=useNavigate()
  const fa=language==='fa'
  const change=e=>setForm({...form,[e.target.name]:e.target.value})
  const submit=e=>{e.preventDefault();if(form.password.length<6){setError(fa?'رمز عبور باید حداقل ۶ حرف داشته باشد.':'Password must contain at least 6 characters.');return}login(form.email,form.name);navigate('/account')}
  return <div className="auth-page"><form className="auth-card" onSubmit={submit}><span className="eyebrow">{fa?'به جمع فریش مارکت بپیوندید':'JOIN THE FRESH SIDE'}</span><h1>{fa?'حساب خود را ایجاد کنید.':'Create your account.'}</h1><p>{fa?'خرید بهتر روزانه از اینجا آغاز می‌شود.':'A better everyday shop starts here.'}</p>{error&&<div className="form-alert">{error}</div>}<label className="form-field"><span>{fa?'نام کامل':'Full name'}</span><input name="name" value={form.name} onChange={change} required placeholder="نام شما"/></label><label className="form-field"><span>{fa?'آدرس ایمیل':'Email address'}</span><input name="email" type="email" value={form.email} onChange={change} required placeholder="you@example.com"/></label><label className="form-field"><span>{fa?'رمز عبور':'Password'}</span><input name="password" type="password" value={form.password} onChange={change} required placeholder="حداقل ۶ حرف"/></label><button className="button button-dark full-button">{fa?'ایجاد حساب':'Create account'}</button><small className="demo-note">{fa?'ثبت‌نام آزمایشی تنها در همین مرورگر ذخیره می‌شود.':'Demo registration is stored in this browser only.'}</small><div className="auth-switch">{fa?'از قبل حساب دارید؟':'Already have an account?'} <Link to="/login">{fa?'ورود':'Sign in'}</Link></div></form></div>
}

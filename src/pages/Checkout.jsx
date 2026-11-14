
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CheckCircle2,
  LockKeyhole,
  Banknote,
  CreditCard
} from 'lucide-react'
import { useStore } from '../context/StoreContext'

export default function Checkout() {
  const { cart, subtotal, placeOrder, user, language } = useStore()

  const fa = language === 'fa'
  const navigate = useNavigate()

  const [submitted, setSubmitted] = useState(false)
  const [isPaying, setIsPaying] = useState(false)

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    notes: '',
    paymentMethod: 'cash'
  })

  const [errors, setErrors] = useState({})

  const delivery = subtotal >= 35 ? 0 : 3.5

  // UPDATE FORM FIELDS
  const change = (e) => {
    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // SUBMIT ORDER
  
const submit = async (e) => {
  e.preventDefault()

  const next = {}

  ;['name', 'email', 'phone', 'address', 'city'].forEach(k => {
    if (!form[k].trim()) {
      next[k] = fa
        ? 'این بخش ضروری است'
        : 'This field is required'
    }
  })

  // EMAIL VALIDATION
  if (
    form.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  ) {
    next.email = fa
      ? 'آدرس ایمیل معتبر وارد کنید'
      : 'Enter a valid email address'
  }

  setErrors(next)

  if (Object.keys(next).length) return

  // ONLINE PAYMENT
  if (form.paymentMethod === 'online') {
    try {
      setIsPaying(true)

      // Convert USD to AFN using test rate
      const amountAFN = Number(
        ((subtotal + delivery) * 65).toFixed(2)
      )

      const response = await fetch(
        'http://localhost:5000/api/payments/create-session',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            amountAFN,
            email: form.email
          })
        }
      )

      const data = await response.json()

      if (!response.ok || !data.paymentUrl) {
        throw new Error(
          data.message || 'Payment session could not be created'
        )
      }

      // Redirect to HesabPay checkout
      window.location.assign(data.paymentUrl)

      return

    } catch (error) {
      console.error('Payment error:', error)

      alert(
        fa
          ? 'ایجاد صفحه پرداخت موفق نشد. لطفاً دوباره تلاش کنید.'
          : 'Could not start payment. Please try again.'
      )

      setIsPaying(false)
      return
    }
  }

  // CASH ON DELIVERY
  const order = placeOrder(form)

  setSubmitted(true)

  setTimeout(() => {
    navigate('/account', {
      state: { newOrder: order.id }
    })
  }, 1800)
}


  // EMPTY CART
  if (!cart.length && !submitted) {
    return (
      <div className="container page-section empty-state">
        <h2>
          {fa
            ? 'سبد خرید شما خالی است'
            : 'Your cart is empty'}
        </h2>

        <Link to="/shop" className="button button-dark">
          {fa ? 'خرید مواد خوراکی' : 'Shop groceries'}
        </Link>
      </div>
    )
  }

  // SUCCESS MESSAGE
  if (submitted) {
    return (
      <div className="container page-section">
        <div className="success-card">
          <CheckCircle2 size={54} />

          <h1>
            {fa ? 'سفارش دریافت شد!' : 'Order received!'}
          </h1>

          <p>
            {fa
              ? 'از خرید شما از فریش مارکت تشکر. سفارش شما آماده می‌شود.'
              : 'Thank you for shopping with Fresh Market. Your order is being prepared.'}
          </p>

          <span>
            {fa
              ? 'در حال انتقال به خلاصه سفارش…'
              : 'Taking you to your order summary…'}
          </span>
        </div>
      </div>
    )
  }

  // TRANSLATIONS
  const labels = fa
    ? {
        almost: 'تقریباً تمام شد',
        checkout: 'تکمیل سفارش',
        subtitle: 'محصولات تازه را به کجا ارسال کنیم؟',
        details: 'جزئیات تحویل',
        name: 'نام کامل',
        email: 'آدرس ایمیل',
        phone: 'شماره تماس',
        city: 'شهر',
        address: 'آدرس تحویل',
        addressHint: 'سرک، تعمیر، آپارتمان',
        notes: 'یادداشت تحویل (اختیاری)',
        notesHint: 'رهنمایی برای تحویل؟',
        payment: 'روش پرداخت',
        cashOption: 'پرداخت نقدی هنگام تحویل',
        cashInfo: 'هنگام دریافت سفارش پول پرداخت کنید.',
        online: 'پرداخت آنلاین',
        onlineInfo: 'پرداخت آنلاین قبل از تأیید سفارش.',
        onlineNotice: 'مبلغ سفارش با نرخ آزمایشی هر دالر ۶۵ افغانی محاسبه می‌شود.',
        place: 'ثبت سفارش آزمایشی',
        yourOrder: 'سفارش شما',
        subtotal: 'مجموع فرعی',
        delivery: 'هزینه ارسال',
        total: 'مجموع'
      }
    : {
        almost: 'ALMOST THERE',
        checkout: 'Checkout',
        subtitle: 'Where should we bring your fresh finds?',
        details: 'Delivery details',
        name: 'Full name',
        email: 'Email address',
        phone: 'Phone number',
        city: 'City',
        address: 'Delivery address',
        addressHint: 'Street, building, apartment',
        notes: 'Delivery notes (optional)',
        notesHint: 'Any directions for delivery?',
        payment: 'Choose Payment Method',
        cashOption: 'Cash on Delivery',
        cashInfo: 'Pay when your order arrives.',
        online: 'Pay Online',
        onlineInfo: 'Pay online before your order is confirmed.',
        onlineNotice: 'Your order will be converted using the test rate of 1 USD = 65 AFN.',
        place: 'Place demo order',
        yourOrder: 'Your order',
        subtotal: 'Subtotal',
        delivery: 'Delivery',
        total: 'Total'
      }

  return (
    <div className="container page-section">

      <div className="page-heading">
        <span className="eyebrow">{labels.almost}</span>
        <h1>{labels.checkout}</h1>
        <p>{labels.subtitle}</p>
      </div>

      <div className="checkout-layout">

        {/* CHECKOUT FORM */}
        <form
          className="checkout-form"
          onSubmit={submit}
          noValidate
        >
          <h2>{labels.details}</h2>

          {/* CUSTOMER INFORMATION */}
          <div className="form-grid">
            {[
              ['name', labels.name, 'text'],
              ['email', labels.email, 'email'],
              ['phone', labels.phone, 'tel'],
              ['city', labels.city, 'text']
            ].map(([name, label, type]) => (
              <label key={name} className="form-field">
                <span>{label} *</span>

                <input
                  name={name}
                  type={type}
                  value={form[name]}
                  onChange={change}
                  placeholder={label}
                />

                {errors[name] && (
                  <small className="field-error">
                    {errors[name]}
                  </small>
                )}
              </label>
            ))}
          </div>

          {/* DELIVERY ADDRESS */}
          <label className="form-field">
            <span>{labels.address} *</span>

            <input
              name="address"
              value={form.address}
              onChange={change}
              placeholder={labels.addressHint}
            />

            {errors.address && (
              <small className="field-error">
                {errors.address}
              </small>
            )}
          </label>

          {/* DELIVERY NOTES */}
          <label className="form-field">
            <span>{labels.notes}</span>

            <textarea
              name="notes"
              rows="3"
              value={form.notes}
              onChange={change}
              placeholder={labels.notesHint}
            />
          </label>

          {/* PAYMENT METHOD */}
          <div className="mt-8">
            <h3 className="mb-4 text-base font-semibold text-[#183b2b]">
              {labels.payment}
            </h3>

            {/* CASH ON DELIVERY */}
            <label
              className={`mb-3 flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all duration-200 ${
                form.paymentMethod === 'cash'
                  ? 'border-[#315c3d] bg-[#f1f7ef] shadow-sm'
                  : 'border-gray-200 bg-white hover:border-[#9bb69d]'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={form.paymentMethod === 'cash'}
                onChange={change}
                className="h-4 w-4 accent-[#315c3d]"
              />

              <Banknote className="h-6 w-6 shrink-0 text-[#315c3d]" />

              <div>
                <h4 className="text-sm font-semibold text-gray-800">
                  {labels.cashOption}
                </h4>

                <p className="mt-1 text-xs text-gray-500">
                  {labels.cashInfo}
                </p>
              </div>
            </label>

            {/* ONLINE PAYMENT */}
            <label
              className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all duration-200 ${
                form.paymentMethod === 'online'
                  ? 'border-[#315c3d] bg-[#f1f7ef] shadow-sm'
                  : 'border-gray-200 bg-white hover:border-[#9bb69d]'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="online"
                checked={form.paymentMethod === 'online'}
                onChange={change}
                className="h-4 w-4 accent-[#315c3d]"
              />

              <CreditCard className="h-6 w-6 shrink-0 text-[#315c3d]" />

              <div>
                <h4 className="text-sm font-semibold text-gray-800">
                  {labels.online}
                </h4>

                <p className="mt-1 text-xs text-gray-500">
                  {labels.onlineInfo}
                </p>
              </div>
            </label>

            {/* ONLINE PAYMENT NOTICE */}
            {form.paymentMethod === 'online' && (
              <p className="mt-3 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
                {labels.onlineNotice}
              </p>
            )}
          </div>

          {/* PLACE ORDER BUTTON */}
          <button
            className="button button-dark full-button"
            type="submit"
          >
            {isPaying
           ? (fa ? 'در حال انتقال...' : 'Connecting...')
           : form.paymentMethod === 'online'
             ? (fa ? 'ادامه به پرداخت' : 'Continue to Payment')
             : labels.place
        } · ${(subtotal + delivery).toFixed(2)}
          </button>
        </form>

        {/* ORDER SUMMARY */}
        <aside className="order-summary">
          <h3>{labels.yourOrder}</h3>

          {cart.map(item => (
            <div className="checkout-item" key={item.id}>
              <span>
                {item.emoji} {fa ? item.dari : item.name} × {item.quantity}
              </span>

              <b>
                ${(item.price * item.quantity).toFixed(2)}
              </b>
            </div>
          ))}

          <div>
            <span>{labels.subtotal}</span>
            <b>${subtotal.toFixed(2)}</b>
          </div>

          <div>
            <span>{labels.delivery}</span>
            <b>
              {delivery === 0
                ? 'FREE'
                : `$${delivery.toFixed(2)}`}
            </b>
          </div>

          <div className="summary-total">
            <span>{labels.total}</span>
            <strong>
              ${(subtotal + delivery).toFixed(2)}
            </strong>
          </div>
        </aside>

      </div>
    </div>
  )
}

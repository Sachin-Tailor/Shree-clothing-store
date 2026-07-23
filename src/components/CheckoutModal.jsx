'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  X, ChevronRight, MapPin, CreditCard, Banknote, Smartphone,
  CheckCircle2, Package, Loader2, ArrowLeft, ShieldCheck
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

const STEPS = ['Cart', 'Delivery', 'Payment', 'Confirmed'];

export default function CheckoutModal({ isOpen, onClose }) {
  const { cart, checkoutItems, cartTotal, placeOrder, closeCheckout } = useApp();

  const items = checkoutItems || cart;
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const [step, setStep] = useState(1); // 1=address, 2=payment, 3=success
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Form state
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
  });
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [cardForm, setCardForm] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('');

  const handleClose = () => {
    onClose();
    closeCheckout();
    setTimeout(() => { setStep(1); setOrderId(''); }, 400);
  };

  const validateAddress = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = 'Enter a valid 10-digit mobile number';
    if (!form.address.trim()) e.address = 'Address is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.state.trim()) e.state = 'State is required';
    if (!form.pincode.match(/^\d{6}$/)) e.pincode = 'Enter a valid 6-digit pincode';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    if (paymentMethod === 'card') {
      const e = {};
      if (!cardForm.number.replace(/\s/g, '').match(/^\d{16}$/)) e.cardNumber = 'Enter a valid 16-digit card number';
      if (!cardForm.name.trim()) e.cardName = 'Name on card is required';
      if (!cardForm.expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) e.cardExpiry = 'Enter valid expiry (MM/YY)';
      if (!cardForm.cvv.match(/^\d{3,4}$/)) e.cardCvv = 'Enter valid CVV';
      setErrors(e);
      return Object.keys(e).length === 0;
    }
    if (paymentMethod === 'upi') {
      if (!upiId.includes('@')) {
        setErrors({ upiId: 'Enter a valid UPI ID (e.g., name@upi)' });
        return false;
      }
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validatePayment()) return;
    setLoading(true);
    try {
      const id = await placeOrder({
        shippingAddress: form,
        paymentMethod,
        paymentDetails: paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'upi' ? upiId : 'Card Payment',
      });
      setOrderId(id);
      setStep(3);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[60] bg-black/50 modal-overlay animate-fade-in" onClick={handleClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-2xl max-h-[92vh] rounded-sm shadow-2xl flex flex-col animate-scale-in overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-shree-bg bg-shree-dark">
            <div>
              <h2 className="font-serif text-xl text-white font-semibold">
                {step === 3 ? 'Order Confirmed! 🎉' : 'Secure Checkout'}
              </h2>
              {step < 3 && (
                <p className="text-shree-light text-xs mt-0.5">
                  Step {step} of 2 — {step === 1 ? 'Delivery Address' : 'Payment'}
                </p>
              )}
            </div>
            <button onClick={handleClose} className="text-white/60 hover:text-white transition p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress bar */}
          {step < 3 && (
            <div className="h-1 bg-shree-muted">
              <div
                className="h-full bg-shree transition-all duration-500"
                style={{ width: `${step === 1 ? 50 : 100}%` }}
              />
            </div>
          )}

          {/* Body */}
          <div className="flex-1 overflow-y-auto">
            
            {/* ── STEP 1: Address ── */}
            {step === 1 && (
              <div className="p-6 space-y-5">
                {/* Order summary mini */}
                <div className="bg-shree-bg rounded-sm p-4 space-y-2">
                  <p className="text-xs uppercase tracking-wider text-shree font-semibold mb-3">Order Summary</p>
                  {items.map(item => (
                    <div key={item.key} className="flex items-center gap-3">
                      <div className="relative w-12 h-14 flex-shrink-0 rounded-sm overflow-hidden">
                        <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-shree-dark truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.selectedSize} · {item.selectedColor} · Qty: {item.qty}</p>
                      </div>
                      <p className="text-xs font-semibold text-shree-dark">₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                  <div className="border-t border-shree-muted pt-2 mt-2 flex justify-between">
                    <span className="text-sm font-semibold text-shree-dark">Total</span>
                    <span className="text-sm font-bold text-shree">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Address form */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-shree" />
                    <h3 className="font-serif text-base text-shree-dark font-semibold">Delivery Address</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Full Name *" error={errors.name}>
                      <input type="text" placeholder="Priya Sharma" value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="input-field" />
                    </Field>
                    <Field label="Mobile Number *" error={errors.phone}>
                      <input type="tel" placeholder="9876543210" value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        className="input-field" maxLength={10} />
                    </Field>
                    <Field label="Email" error={errors.email} className="sm:col-span-2">
                      <input type="email" placeholder="priya@example.com" value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className="input-field" />
                    </Field>
                    <Field label="Full Address *" error={errors.address} className="sm:col-span-2">
                      <textarea rows={2} placeholder="House No., Street, Area, Colony" value={form.address}
                        onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                        className="input-field resize-none" />
                    </Field>
                    <Field label="Landmark (Optional)">
                      <input type="text" placeholder="Near landmark" value={form.landmark}
                        onChange={e => setForm(f => ({ ...f, landmark: e.target.value }))}
                        className="input-field" />
                    </Field>
                    <Field label="Pincode *" error={errors.pincode}>
                      <input type="text" placeholder="400001" value={form.pincode}
                        onChange={e => setForm(f => ({ ...f, pincode: e.target.value }))}
                        className="input-field" maxLength={6} />
                    </Field>
                    <Field label="City *" error={errors.city}>
                      <input type="text" placeholder="Mumbai" value={form.city}
                        onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                        className="input-field" />
                    </Field>
                    <Field label="State *" error={errors.state}>
                      <select value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} className="input-field">
                        <option value="">Select State</option>
                        {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </Field>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 2: Payment ── */}
            {step === 2 && (
              <div className="p-6 space-y-5">
                {/* Delivery address confirmation */}
                <div className="bg-shree-bg rounded-sm p-4 flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-shree mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-shree-dark">{form.name} · {form.phone}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{form.address}, {form.landmark && form.landmark + ', '}{form.city}, {form.state} - {form.pincode}</p>
                  </div>
                  <button onClick={() => setStep(1)} className="ml-auto text-xs text-shree hover:underline flex-shrink-0">
                    Change
                  </button>
                </div>

                {/* Payment methods */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    <h3 className="font-serif text-base text-shree-dark font-semibold">Choose Payment Method</h3>
                  </div>

                  <div className="space-y-3">
                    {/* COD */}
                    <PaymentOption
                      selected={paymentMethod === 'cod'}
                      onClick={() => setPaymentMethod('cod')}
                      icon={<Banknote className="w-5 h-5 text-green-600" />}
                      label="Cash on Delivery (COD)"
                      description="Pay when your order arrives at your doorstep"
                      badge="Recommended"
                    />

                    {/* UPI */}
                    <PaymentOption
                      selected={paymentMethod === 'upi'}
                      onClick={() => setPaymentMethod('upi')}
                      icon={<Smartphone className="w-5 h-5 text-purple-600" />}
                      label="UPI Payment"
                      description="Pay using any UPI app (GPay, PhonePe, Paytm)"
                    >
                      {paymentMethod === 'upi' && (
                        <div className="mt-3 pl-1">
                          <input
                            type="text"
                            placeholder="yourname@upi"
                            value={upiId}
                            onChange={e => setUpiId(e.target.value)}
                            className="input-field text-sm"
                          />
                          {errors.upiId && <p className="text-red-500 text-xs mt-1">{errors.upiId}</p>}
                        </div>
                      )}
                    </PaymentOption>

                    {/* Card */}
                    <PaymentOption
                      selected={paymentMethod === 'card'}
                      onClick={() => setPaymentMethod('card')}
                      icon={<CreditCard className="w-5 h-5 text-blue-600" />}
                      label="Credit / Debit Card"
                      description="Visa, Mastercard, Rupay and more"
                    >
                      {paymentMethod === 'card' && (
                        <div className="mt-3 space-y-3">
                          <div>
                            <input type="text" placeholder="Card Number" maxLength={19}
                              value={cardForm.number}
                              onChange={e => {
                                const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                                const formatted = v.replace(/(.{4})/g, '$1 ').trim();
                                setCardForm(f => ({ ...f, number: formatted }));
                              }}
                              className="input-field text-sm"
                            />
                            {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                          </div>
                          <div>
                            <input type="text" placeholder="Name on Card"
                              value={cardForm.name}
                              onChange={e => setCardForm(f => ({ ...f, name: e.target.value }))}
                              className="input-field text-sm"
                            />
                            {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <input type="text" placeholder="MM/YY" maxLength={5}
                                value={cardForm.expiry}
                                onChange={e => {
                                  let v = e.target.value.replace(/\D/g, '');
                                  if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2, 4);
                                  setCardForm(f => ({ ...f, expiry: v }));
                                }}
                                className="input-field text-sm"
                              />
                              {errors.cardExpiry && <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>}
                            </div>
                            <div>
                              <input type="password" placeholder="CVV" maxLength={4}
                                value={cardForm.cvv}
                                onChange={e => setCardForm(f => ({ ...f, cvv: e.target.value.replace(/\D/g, '') }))}
                                className="input-field text-sm"
                              />
                              {errors.cardCvv && <p className="text-red-500 text-xs mt-1">{errors.cardCvv}</p>}
                            </div>
                          </div>
                        </div>
                      )}
                    </PaymentOption>
                  </div>
                </div>

                {/* Order total */}
                <div className="bg-shree-bg rounded-sm p-4 space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery</span>
                    <span className="text-green-600">{total >= 999 ? 'FREE' : '₹49'}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-shree-dark border-t border-shree-muted pt-2">
                    <span className="font-serif text-base">Total Payable</span>
                    <span className="font-serif text-base">₹{(total + (total >= 999 ? 0 : 49)).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 3: Success ── */}
            {step === 3 && (
              <div className="p-10 flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-shree-dark font-bold mb-2">Order Placed Successfully!</h3>
                  <p className="text-gray-600 text-sm">Thank you for shopping with Shree A 🎉</p>
                </div>
                <div className="bg-shree-bg rounded-sm px-8 py-4 w-full max-w-xs">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Order ID</p>
                  <p className="font-mono font-bold text-shree-dark text-lg">{orderId}</p>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-shree" />
                    <span>Your order will be delivered in 5-7 business days</span>
                  </div>
                  {paymentMethod === 'cod' && (
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-green-600" />
                      <span>Pay <strong>₹{(total + (total >= 999 ? 0 : 49)).toLocaleString('en-IN')}</strong> in cash at delivery</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleClose}
                  className="mt-4 bg-shree-dark text-white px-8 py-3 text-sm uppercase tracking-wider font-semibold hover:bg-shree transition-colors rounded-sm"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>

          {/* Footer buttons */}
          {step < 3 && (
            <div className="border-t border-shree-bg px-6 py-4 flex items-center gap-3 bg-white">
              {step === 2 && (
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-shree-dark transition"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              )}
              <button
                id={step === 1 ? 'continue-to-payment' : 'place-order'}
                onClick={() => {
                  if (step === 1) {
                    if (validateAddress()) setStep(2);
                  } else {
                    handlePlaceOrder();
                  }
                }}
                disabled={loading}
                className="flex-1 bg-shree-dark text-white py-3.5 text-sm uppercase tracking-wider font-semibold hover:bg-shree transition-colors flex items-center justify-center gap-2 rounded-sm disabled:opacity-70"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Placing Order…</>
                ) : step === 1 ? (
                  <>Continue to Payment <ChevronRight className="w-4 h-4" /></>
                ) : (
                  <>Place Order · ₹{(total + (total >= 999 ? 0 : 49)).toLocaleString('en-IN')} <ChevronRight className="w-4 h-4" /></>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Inline CSS for input-field */}
      <style jsx global>{`
        .input-field {
          width: 100%;
          border: 1px solid #EFEBE9;
          background: #FAF8F5;
          color: #3E2723;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          border-radius: 2px;
          transition: border-color 0.2s;
        }
        .input-field:focus {
          border-color: #5D4037;
          outline: none;
          box-shadow: none;
        }
        .input-field::placeholder {
          color: #BCAAA4;
        }
      `}</style>
    </>
  );
}

// ── Sub-components ──

function Field({ label, error, children, className = '' }) {
  return (
    <div className={className}>
      <label className="block text-xs font-medium text-gray-600 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function PaymentOption({ selected, onClick, icon, label, description, badge, children }) {
  return (
    <div
      onClick={onClick}
      className={`border-2 rounded-sm p-4 cursor-pointer transition-all ${
        selected ? 'border-shree bg-shree/5' : 'border-shree-muted hover:border-shree-light'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
          selected ? 'border-shree' : 'border-gray-300'
        }`}>
          {selected && <div className="w-2.5 h-2.5 rounded-full bg-shree" />}
        </div>
        <div className="text-xl">{icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-shree-dark">{label}</span>
            {badge && (
              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry',
];

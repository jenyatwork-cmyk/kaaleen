"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Lock, CheckCircle } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/data";

type Step = "information" | "shipping" | "payment" | "confirmed";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState<Step>("information");

  const [info, setInfo] = useState({ email: "", firstName: "", lastName: "", address: "", city: "", state: "", pincode: "", phone: "" });
  const [shipping, setShipping] = useState("standard");
  const [payment, setPayment] = useState({ method: "card", card: "", expiry: "", cvv: "", name: "" });
  const [confirmedTotal, setConfirmedTotal] = useState(0);

  const shippingCost = total >= 5000 ? 0 : 299;
  const orderTotal = total + shippingCost;

  const handleInfoSubmit = (e: React.FormEvent) => { e.preventDefault(); setStep("shipping"); };
  const handleShippingSubmit = (e: React.FormEvent) => { e.preventDefault(); setStep("payment"); };
  const handlePaymentSubmit = (e: React.FormEvent) => { e.preventDefault(); setConfirmedTotal(orderTotal); setStep("confirmed"); clearCart(); };

  if (items.length === 0 && step !== "confirmed") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="font-serif text-2xl text-espresso">Your bag is empty</p>
        <Link href="/collections" className="text-sm text-terracotta underline underline-offset-4">Browse carpets</Link>
      </div>
    );
  }

  if (step === "confirmed") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 text-center max-w-md mx-auto px-4 py-16">
        <div className="w-16 h-16 bg-olive/10 rounded-full flex items-center justify-center">
          <CheckCircle size={32} className="text-olive" />
        </div>
        <div>
          <p className="font-serif text-3xl text-espresso mb-2">Thank you!</p>
          <p className="text-espresso-muted leading-relaxed">
            Your order has been placed. You'll receive a confirmation email shortly with your tracking details.
          </p>
        </div>
        <div className="bg-cream-100 rounded-xl p-5 w-full text-left">
          <p className="text-xs text-espresso-muted tracking-widest uppercase mb-3">Order summary</p>
          <div className="flex justify-between text-sm text-espresso mb-1">
            <span>Estimated delivery</span>
            <span className="font-medium">4–7 business days</span>
          </div>
          <div className="flex justify-between text-sm text-espresso">
            <span>Order total</span>
            <span className="font-medium">{formatPrice(confirmedTotal)}</span>
          </div>
        </div>
        <Link href="/" className="bg-espresso text-cream-50 px-8 py-3.5 rounded-full text-sm font-medium hover:bg-espresso-light transition-colors">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Top bar */}
      <div className="border-b border-cream-300 px-4 py-4 flex items-center justify-center gap-2">
        <Link href="/" className="font-serif text-xl text-espresso">kaaleen</Link>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid lg:grid-cols-[1fr_380px] gap-12">
        {/* Left — form */}
        <div>
          {/* Step breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            {(["information", "shipping", "payment"] as Step[]).map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                {i > 0 && <ChevronRight size={14} className="text-cream-400" />}
                <span className={`capitalize ${step === s ? "text-espresso font-medium" : "text-espresso-muted"}`}>{s}</span>
              </span>
            ))}
          </nav>

          {/* Information */}
          {step === "information" && (
            <form onSubmit={handleInfoSubmit} className="space-y-5">
              <h2 className="font-serif text-2xl text-espresso mb-6">Contact information</h2>
              <Input label="Email" type="email" value={info.email} onChange={(v) => setInfo({ ...info, email: v })} required placeholder="you@example.com" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="First name" value={info.firstName} onChange={(v) => setInfo({ ...info, firstName: v })} required />
                <Input label="Last name" value={info.lastName} onChange={(v) => setInfo({ ...info, lastName: v })} required />
              </div>
              <Input label="Address" value={info.address} onChange={(v) => setInfo({ ...info, address: v })} required placeholder="House / flat / street" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="City" value={info.city} onChange={(v) => setInfo({ ...info, city: v })} required />
                <Input label="State" value={info.state} onChange={(v) => setInfo({ ...info, state: v })} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="PIN code" value={info.pincode} onChange={(v) => setInfo({ ...info, pincode: v })} required maxLength={6} />
                <Input label="Phone" type="tel" value={info.phone} onChange={(v) => setInfo({ ...info, phone: v })} required placeholder="+91" />
              </div>
              <button type="submit" className="w-full bg-espresso text-cream-50 py-4 rounded-full text-sm font-medium hover:bg-espresso-light transition-colors">
                Continue to shipping
              </button>
            </form>
          )}

          {/* Shipping */}
          {step === "shipping" && (
            <form onSubmit={handleShippingSubmit} className="space-y-5">
              <h2 className="font-serif text-2xl text-espresso mb-6">Shipping method</h2>
              <div className="space-y-3">
                {[
                  { id: "standard", label: "Standard delivery", sub: "4–7 business days", price: shippingCost === 0 ? "Free" : `₹${shippingCost}` },
                  { id: "express", label: "Express delivery", sub: "2–3 business days", price: "₹599" },
                ].map((opt) => (
                  <label key={opt.id} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${shipping === opt.id ? "border-espresso bg-cream-100" : "border-cream-300 hover:border-cream-400"}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" value={opt.id} checked={shipping === opt.id} onChange={() => setShipping(opt.id)} className="accent-espresso" />
                      <div>
                        <p className="text-sm font-medium text-espresso">{opt.label}</p>
                        <p className="text-xs text-espresso-muted">{opt.sub}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-espresso">{opt.price}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep("information")} className="flex-1 py-4 rounded-full text-sm border border-cream-300 text-espresso hover:border-espresso transition-colors">
                  Back
                </button>
                <button type="submit" className="flex-[2] bg-espresso text-cream-50 py-4 rounded-full text-sm font-medium hover:bg-espresso-light transition-colors">
                  Continue to payment
                </button>
              </div>
            </form>
          )}

          {/* Payment */}
          {step === "payment" && (
            <form onSubmit={handlePaymentSubmit} className="space-y-5">
              <h2 className="font-serif text-2xl text-espresso mb-6">Payment</h2>
              <div className="space-y-3">
                {[
                  { id: "card", label: "Credit / Debit card" },
                  { id: "upi", label: "UPI" },
                  { id: "netbanking", label: "Net banking" },
                  { id: "cod", label: "Cash on delivery" },
                ].map((m) => (
                  <label key={m.id} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${payment.method === m.id ? "border-espresso bg-cream-100" : "border-cream-300 hover:border-cream-400"}`}>
                    <input type="radio" value={m.id} checked={payment.method === m.id} onChange={() => setPayment({ ...payment, method: m.id })} className="accent-espresso" />
                    <span className="text-sm font-medium text-espresso">{m.label}</span>
                  </label>
                ))}
              </div>

              {payment.method === "card" && (
                <div className="space-y-4 pt-2">
                  <Input label="Card number" value={payment.card} onChange={(v) => setPayment({ ...payment, card: v })} placeholder="1234 5678 9012 3456" maxLength={19} />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Expiry (MM/YY)" value={payment.expiry} onChange={(v) => setPayment({ ...payment, expiry: v })} placeholder="MM/YY" maxLength={5} />
                    <Input label="CVV" value={payment.cvv} onChange={(v) => setPayment({ ...payment, cvv: v })} placeholder="123" maxLength={4} type="password" />
                  </div>
                  <Input label="Name on card" value={payment.name} onChange={(v) => setPayment({ ...payment, name: v })} />
                </div>
              )}

              {payment.method === "upi" && (
                <Input label="UPI ID" value="" onChange={() => {}} placeholder="yourname@upi" />
              )}

              <div className="flex items-center gap-2 text-xs text-espresso-muted py-2">
                <Lock size={13} />
                Your payment information is encrypted and secure.
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep("shipping")} className="flex-1 py-4 rounded-full text-sm border border-cream-300 text-espresso hover:border-espresso transition-colors">
                  Back
                </button>
                <button type="submit" className="flex-[2] bg-espresso text-cream-50 py-4 rounded-full text-sm font-medium hover:bg-espresso-light transition-colors">
                  Place order · {formatPrice(orderTotal)}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right — order summary */}
        <div>
          <div className="sticky top-24">
            <h3 className="font-serif text-xl text-espresso mb-5">Order summary</h3>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                  <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-cream-200 flex-shrink-0">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" unoptimized />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-espresso-muted text-cream-50 text-[10px] rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-espresso line-clamp-2 leading-tight">{item.product.name}</p>
                    <p className="text-xs text-espresso-muted mt-1">{item.size}</p>
                  </div>
                  <span className="text-sm font-medium text-espresso flex-shrink-0">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Coupon */}
            <div className="flex gap-2 mb-5">
              <input placeholder="Discount code" className="flex-1 border border-cream-300 rounded-full px-4 py-2.5 text-sm text-espresso focus:outline-none focus:border-espresso" />
              <button className="px-4 py-2.5 border border-cream-300 rounded-full text-sm text-espresso hover:border-espresso transition-colors">Apply</button>
            </div>

            <div className="space-y-2 border-t border-cream-300 pt-4">
              <div className="flex justify-between text-sm text-espresso-muted">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm text-espresso-muted">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between text-base font-medium text-espresso border-t border-cream-300 pt-3 mt-3">
                <span>Total</span>
                <span>{formatPrice(orderTotal)}</span>
              </div>
              <p className="text-xs text-espresso-muted">Including all taxes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", placeholder, required, maxLength }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; required?: boolean; maxLength?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-espresso-muted mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        className="w-full border border-cream-300 rounded-xl px-4 py-3 text-sm text-espresso placeholder:text-cream-400 focus:outline-none focus:border-espresso transition-colors bg-white"
      />
    </div>
  );
}

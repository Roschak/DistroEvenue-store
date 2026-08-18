"use client";

import { useState } from "react";
import { Check, ArrowRight, ArrowLeft, Landmark, QrCode, Wallet, Lock, PartyPopper } from "lucide-react";
import { cn, formatIDR } from "@/lib/utils";
import { useBagStore } from "@/store/bag-store";
import { Button } from "@/components/ui/Button";
import { DemoBadge, Skeleton } from "@/components/ui/Misc";
import { useHydrated } from "@/hooks/use-hydrated";

const STEPS = ["CONTACT", "DELIVERY", "PAYMENT"] as const;
type Step = (typeof STEPS)[number];

const PAYMENTS = [
  { id: "bank", label: "BANK TRANSFER", desc: "Virtual account — BCA, BNI, Mandiri (demo)", icon: Landmark },
  { id: "qr", label: "QR PAYMENT", desc: "Scan & pay with any QRIS app (demo)", icon: QrCode },
  { id: "ewallet", label: "E-WALLET", desc: "GoPay, OVO, DANA, ShopeePay (demo)", icon: Wallet },
];

export function CheckoutClient() {
  const items = useBagStore((s) => s.items);
  const subtotal = useBagStore((s) => s.subtotal());
  const clear = useBagStore((s) => s.clear);

  const mounted = useHydrated();
  const [step, setStep] = useState<Step>("CONTACT");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [orderNo] = useState(() =>
    `DA-2026-${String(Math.floor(1000 + Math.random() * 9000))}`
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postal: "",
    payment: "bank",
  });

  const shipping = mounted && items.length > 0 ? (subtotal >= 750000 ? 0 : 25000) : 0;
  const total = subtotal + shipping;

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (step === "CONTACT") {
      if (!form.name.trim()) next.name = "REQUIRED";
      if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "ENTER A VALID EMAIL";
      if (form.phone.trim().length < 8) next.phone = "ENTER A VALID PHONE";
    }
    if (step === "DELIVERY") {
      if (!form.address.trim()) next.address = "REQUIRED";
      if (!form.city.trim()) next.city = "REQUIRED";
      if (!form.province.trim()) next.province = "REQUIRED";
      if (!/^\d{5}$/.test(form.postal)) next.postal = "5-DIGIT POSTAL CODE";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
  };

  const back = () => {
    const idx = STEPS.indexOf(step);
    if (idx > 0) setStep(STEPS[idx - 1]);
  };

  const confirm = () => {
    if (!validate()) return;
    setDone(true);
    clear();
  };

  if (!mounted) {
    return (
      <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
        <div>
          <Skeleton className="mb-10 h-9 w-64" />
          <Skeleton className="mb-6 h-9 w-48" />
          <Skeleton className="mb-5 h-12 w-full" />
          <Skeleton className="mb-5 h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
        <Skeleton className="h-72" />
      </div>
    );
  }

  if (items.length === 0) {
    if (done) {
      return (
        <div className="border border-lime/30 bg-lime/5 px-8 py-20 text-center md:py-28">
          <PartyPopper className="mx-auto h-12 w-12 text-lime" strokeWidth={1.2} />
          <p className="mt-5 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-lime">
            ORDER PLACED — DEMO
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-bone md:text-6xl">
            WELCOME TO THE AVENUE.
          </h2>
          <p className="mx-auto mt-4 max-w-md font-mono text-sm uppercase leading-relaxed tracking-[0.12em] text-concrete">
            Order <span className="text-lime">{orderNo}</span> has been recorded as a demo
            order. Check the account page to see it in your history.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLinkInline href="/account">VIEW ACCOUNT</ButtonLinkInline>
            <ButtonLinkInline href="/shop" variant="outline">KEEP SHOPPING</ButtonLinkInline>
          </div>
        </div>
      );
    }
    return (
      <div className="border border-dashed border-ink-line py-24 text-center">
        <p className="font-display text-4xl tracking-tight text-bone">NOTHING TO CHECK OUT.</p>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-concrete">
          Your bag is empty — add something from the shop first.
        </p>
        <div className="mt-8">
          <ButtonLinkInline href="/shop">EXPLORE THE SHOP</ButtonLinkInline>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
      {/* Steps */}
      <div>
        {/* Stepper */}
        <ol className="mb-10 flex items-center gap-2" aria-label="Checkout progress">
          {STEPS.map((s, i) => {
            const current = s === step;
            const complete = STEPS.indexOf(step) > i;
            return (
              <li key={s} className="flex flex-1 items-center gap-2">
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] font-bold",
                    complete
                      ? "border-lime bg-lime text-ink"
                      : current
                        ? "border-lime text-lime"
                        : "border-ink-line text-concrete"
                  )}
                >
                  {complete ? <Check className="h-3.5 w-3.5" /> : String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "hidden font-mono text-[10px] font-bold uppercase tracking-[0.18em] sm:block",
                    current ? "text-bone" : "text-concrete"
                  )}
                >
                  {s}
                </span>
                {i < STEPS.length - 1 && <span className="h-px flex-1 bg-ink-line" />}
              </li>
            );
          })}
        </ol>

        <div key={step} className="space-y-10">
          {/* STEP 1: CONTACT */}
          {step === "CONTACT" && (
            <section>
              <h2 className="mb-6 font-display text-3xl tracking-tight text-bone">01 · CONTACT</h2>
              <div className="space-y-5">
                <Field label="FULL NAME" error={errors.name}>
                  <input
                    name="contact-name"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Nama Lengkap"
                    autoComplete="name"
                    className={inputCls(!!errors.name)}
                    aria-invalid={!!errors.name}
                  />
                </Field>
                <Field label="EMAIL" error={errors.email}>
                  <input
                    name="contact-email"
                    value={form.email}
                    onChange={set("email")}
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={inputCls(!!errors.email)}
                    aria-invalid={!!errors.email}
                  />
                </Field>
                <Field label="PHONE" error={errors.phone}>
                  <input
                    name="contact-phone"
                    value={form.phone}
                    onChange={set("phone")}
                    type="tel"
                    placeholder="08xx xxxx xxxx"
                    autoComplete="tel"
                    className={inputCls(!!errors.phone)}
                    aria-invalid={!!errors.phone}
                  />
                </Field>
              </div>
            </section>
          )}

          {/* STEP 2: DELIVERY */}
          {step === "DELIVERY" && (
            <section>
              <h2 className="mb-6 font-display text-3xl tracking-tight text-bone">02 · DELIVERY</h2>
              <div className="space-y-5">
                <Field label="ADDRESS" error={errors.address}>
                  <input
                    name="delivery-address"
                    value={form.address}
                    onChange={set("address")}
                    placeholder="Street, RT/RW, Kelurahan"
                    autoComplete="street-address"
                    className={inputCls(!!errors.address)}
                    aria-invalid={!!errors.address}
                  />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="CITY" error={errors.city}>
                    <input
                      name="delivery-city"
                      value={form.city}
                      onChange={set("city")}
                      placeholder="Kota"
                      autoComplete="address-level2"
                      className={inputCls(!!errors.city)}
                      aria-invalid={!!errors.city}
                    />
                  </Field>
                  <Field label="PROVINCE" error={errors.province}>
                    <input
                      name="delivery-province"
                      value={form.province}
                      onChange={set("province")}
                      placeholder="Provinsi"
                      autoComplete="address-level1"
                      className={inputCls(!!errors.province)}
                      aria-invalid={!!errors.province}
                    />
                  </Field>
                </div>
                <Field label="POSTAL CODE" error={errors.postal}>
                  <input
                    name="delivery-postal"
                    value={form.postal}
                    onChange={set("postal")}
                    inputMode="numeric"
                    placeholder="16143"
                    maxLength={5}
                    autoComplete="postal-code"
                    className={inputCls(!!errors.postal)}
                    aria-invalid={!!errors.postal}
                  />
                </Field>
              </div>
            </section>
          )}

          {/* STEP 3: PAYMENT */}
          {step === "PAYMENT" && (
            <section>
              <h2 className="mb-2 font-display text-3xl tracking-tight text-bone">03 · PAYMENT</h2>
              <p className="mb-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">
                <Lock className="h-3.5 w-3.5 text-lime" /> Mock sandbox payment — no real credentials
              </p>
              <div className="space-y-3" role="radiogroup" aria-label="Payment method">
                {PAYMENTS.map((p) => {
                  const Icon = p.icon;
                  const active = form.payment === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setForm({ ...form, payment: p.id })}
                      role="radio"
                      aria-checked={active}
                      className={cn(
                        "flex w-full items-center gap-4 border p-4 text-left transition-colors",
                        active
                          ? "border-lime bg-lime/5"
                          : "border-ink-line hover:border-bone/40"
                      )}
                    >
                      <Icon className={cn("h-5 w-5", active ? "text-lime" : "text-concrete")} />
                      <span className="flex-1">
                        <span className="block font-mono text-xs font-bold uppercase tracking-[0.14em] text-bone">
                          {p.label}
                        </span>
                        <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-concrete">
                          {p.desc}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "flex h-4 w-4 items-center justify-center rounded-full border",
                          active ? "border-lime" : "border-ink-line"
                        )}
                      >
                        {active && <span className="h-2 w-2 rounded-full bg-lime" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Nav */}
        <div className="mt-10 flex items-center justify-between gap-3">
          <Button variant="ghost" onClick={back} disabled={step === "CONTACT"}>
            <ArrowLeft className="h-4 w-4" /> BACK
          </Button>
          {step === "PAYMENT" ? (
            <Button onClick={confirm} size="lg">
              PLACE ORDER — {formatIDR(total)}
              <Check className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={next} size="lg">
              CONTINUE <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Summary */}
      <aside className="h-fit border border-ink-line bg-ink-soft p-6 lg:sticky lg:top-44">
        <h2 className="mb-5 font-display text-2xl tracking-tight text-bone">ORDER SUMMARY</h2>
        <ul className="space-y-4">
          {items.map((i) => (
            <li key={i.key} className="flex items-center gap-3">
              <span className="relative h-14 w-12 shrink-0 overflow-hidden bg-ink-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={i.image} alt="" className="h-full w-full object-cover" />
                <span className="absolute -right-0 -top-0 flex h-4 min-w-4 items-center justify-center bg-lime px-0.5 font-mono text-[8px] font-bold text-ink">
                  {i.qty}
                </span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-bone">
                  {i.name}
                </p>
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-concrete">
                  {i.size}
                </p>
              </div>
              <p className="font-mono text-xs font-bold text-bone">
                {formatIDR((i.salePrice ?? i.price) * i.qty)}
              </p>
            </li>
          ))}
        </ul>
        <dl className="mt-6 space-y-2 border-t border-ink-line pt-4 font-mono text-sm">
          <div className="flex justify-between">
            <dt className="uppercase tracking-[0.14em] text-concrete">Subtotal</dt>
            <dd className="font-bold text-bone">{formatIDR(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="uppercase tracking-[0.14em] text-concrete">Shipping</dt>
            <dd className="font-bold text-bone">
              {shipping === 0 ? <span className="text-lime">FREE</span> : formatIDR(shipping)}
            </dd>
          </div>
          <div className="flex justify-between border-t border-ink-line pt-3 text-base">
            <dt className="font-bold uppercase tracking-[0.14em] text-bone">Total</dt>
            <dd className="font-bold text-lime">{formatIDR(total)}</dd>
          </div>
        </dl>
        <div className="mt-4">
          <DemoBadge label="DEMO CHECKOUT" />
        </div>
      </aside>
    </div>
  );
}

function inputCls(hasError?: boolean) {
  return cn(
    "h-12 w-full border bg-transparent px-4 font-mono text-sm text-bone placeholder:text-concrete/50 focus:outline-none transition-colors",
    hasError ? "border-avenue-red" : "border-ink-line focus:border-lime"
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-concrete">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function ButtonLinkInline({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
}) {
  const cls =
    variant === "primary"
      ? "bg-lime text-ink hover:bg-bone"
      : "border border-bone/30 text-bone hover:border-lime hover:text-lime";
  return (
    <a
      href={href}
      className={`inline-flex h-11 items-center justify-center gap-2 px-6 font-mono text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300 ${cls}`}
    >
      {children}
    </a>
  );
}

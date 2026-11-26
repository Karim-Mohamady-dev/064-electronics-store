
import { useEffect, useMemo, useRef, useState } from 'react'
import type { ComponentType, ReactNode } from 'react'
import { ArrowCounterClockwise, ArrowRight, BatteryCharging, Camera, Check, Cpu, CreditCard, DeviceMobile, GameController, Globe, Headphones, Heart, Keyboard, Laptop, MagnifyingGlass, Minus, Package, PaperPlaneTilt, Plus, Scales, ShieldCheck, ShoppingCart, SpeakerHigh, DeviceTablet, Television, Trash, Truck, Watch, X } from '@phosphor-icons/react'
import en from '../locales/en/common.json'
import ar from '../locales/ar/common.json'
import { PRODUCTS, CATEGORIES, BRANDS } from './data'
import type { Product } from './data'

type Lang = 'en' | 'ar'
type Dict = Record<string, string>
const DICTS: Record<Lang, Dict> = { en: en as unknown as Dict, ar: ar as unknown as Dict }
type CartItem = { id: string; qty: number }

const ICONS: Record<string, ComponentType<{ size?: number | string; weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'; className?: string }>> = {
  BatteryCharging: BatteryCharging,
  Camera: Camera,
  Cpu: Cpu,
  DeviceMobile: DeviceMobile,
  GameController: GameController,
  Headphones: Headphones,
  Keyboard: Keyboard,
  Laptop: Laptop,
  PaperPlaneTilt: PaperPlaneTilt,
  SpeakerHigh: SpeakerHigh,
  DeviceTablet: DeviceTablet,
  Television: Television,
  Watch: Watch,
}

function money(n: number, lang: Lang, currency: string): string {
  return n.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ' + currency
}

function Tagline({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { setShown(true); obs.disconnect() }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  const words = text.split(' ')
  return (
    <div ref={ref} className="mx-auto max-w-2xl px-4 py-16 text-center sm:py-24">
      <p className="heading-3" style={{ textWrap: 'balance' }}>
        {words.map((w, i) => (
          <span key={i} className="motion-base inline-block transition-opacity" style={{ opacity: shown ? 1 : 0.3, transitionDelay: shown ? (i * 70) + 'ms' : '0ms' }}>{w}{' '}</span>
        ))}
      </p>
    </div>
  )
}

function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { setShown(true); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className="motion-base transition-all duration-700" style={{ opacity: shown ? 1 : 0, transform: shown ? 'translateY(0)' : 'translateY(32px)' }}>
      {children}
    </div>
  )
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('064-electronics-store-lang')
    return saved === 'ar' || saved === 'en' ? saved : 'en'
  })
  const t = (key: string, vars?: Record<string, string | number>): string => {
    let s = DICTS[lang][key] ?? key
    if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace('{{' + k + '}}', String(v))
    return s
  }
  const L = (enS: string, arS: string) => (lang === 'ar' ? arS : enS)
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    localStorage.setItem('064-electronics-store-lang', lang)
  }, [lang])

  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('all')
  const [sort, setSort] = useState('featured')
    const [brand, setBrand] = useState('all')
  const [cart, setCart] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('064-electronics-store-cart') || '[]') as CartItem[] } catch { return [] }
  })
  const [wish, setWish] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('064-electronics-store-wish') || '[]') as string[] } catch { return [] }
  })
  const [cartOpen, setCartOpen] = useState(false)
  const [detail, setDetail] = useState<Product | null>(null)
  const [qty, setQty] = useState(1)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [order, setOrder] = useState<{ no: string; items: CartItem[] } | null>(null)
  const [toast, setToast] = useState('')
  const [legal, setLegal] = useState<'privacy' | 'terms' | null>(null)
  const [cookie, setCookie] = useState(() => localStorage.getItem('064-electronics-store-cookie') === 'yes')
    const [compare, setCompare] = useState<string[]>([])
  const [compareOpen, setCompareOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  const [errors, setErrors] = useState<string[]>([])
  const [faqOpen, setFaqOpen] = useState(0)

  useEffect(() => { localStorage.setItem('064-electronics-store-cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem('064-electronics-store-wish', JSON.stringify(wish)) }, [wish])
  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(''), 2400)
    return () => clearTimeout(id)
  }, [toast])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = PRODUCTS.filter((p) => {
      if (cat !== 'all' && p.category !== cat) return false
      if (q && !(p.nameEn + ' ' + p.nameAr + ' ' + p.descEn + ' ' + p.descAr).toLowerCase().includes(q)) return false
            if (brand !== 'all' && p.extra?.brand !== brand) return false
      return true
    })
    if (sort === 'priceAsc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'priceDesc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [query, cat, sort, brand])

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cart.reduce((s, i) => { const p = PRODUCTS.find((x) => x.id === i.id); return s + (p ? p.price * i.qty : 0) }, 0)
  const byId = (id: string) => PRODUCTS.find((p) => p.id === id)

  function addToCart(p: Product, n = 1) {
    setCart((c) => {
      const found = c.find((i) => i.id === p.id)
      if (found) return c.map((i) => (i.id === p.id ? { ...i, qty: Math.min(i.qty + n, p.stock) } : i))
      return [...c, { id: p.id, qty: n }]
    })
    setToast(t('product.added'))
  }
  function setCartQty(id: string, n: number) {
    if (n <= 0) setCart((c) => c.filter((i) => i.id !== id))
    else setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: n } : i)))
  }
  function toggleWish(id: string) {
    setWish((w) => {
      const has = w.includes(id)
      setToast(t(has ? 'wish.removed' : 'wish.added'))
      return has ? w.filter((x) => x !== id) : [...w, id]
    })
  }
    function toggleCompare(p: Product) {
    setCompare((c) => {
      if (c.includes(p.id)) return c.filter((x) => x !== p.id)
      if (c.length >= 3) { setToast(t('compare.max')); return c }
      setToast(t('product.addedCompare'))
      return [...c, p.id]
    })
  }
  function openDetail(p: Product) { setDetail(p); setQty(1) }
  function placeOrder() {
    const errs: string[] = []
    if (name.trim().length < 2) errs.push(t('checkout.invalidName'))
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.push(t('checkout.invalidEmail'))
        if (address.trim().length < 4) errs.push(t('checkout.invalidAddress'))
    setErrors(errs)
    if (errs.length > 0) return
    const no = 'ORD-' + String(Math.floor(100000 + Math.random() * 899999))
    setOrder({ no, items: cart })
    setCart([])
    setCheckoutOpen(false)
  }

  const badgeLabel = (b?: string) => (b === 'new' ? t('product.badgeNew') : b === 'sale' ? t('product.badgeSale') : b === 'best' ? t('product.badgeBest') : '')
  const tile = (p: Product, big = false) => {
    const Icon = ICONS[p.icon] || Package
    return (
      <div className="flex items-center justify-center rounded-2xl" style={{ backgroundColor: p.color, height: big ? 240 : 160 }}>
        <Icon size={big ? 96 : 64} weight="duotone" className="text-white opacity-90" />
      </div>
    )
  }
  const card = (p: Product) => (
    <article key={p.id} className="motion-hover flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-transform duration-300 hover:-translate-y-1">
      <button type="button" onClick={() => openDetail(p)} className="block w-full p-4 pb-0 text-start" aria-label={L(p.nameEn, p.nameAr)}>
        <div className="relative">
          {tile(p)}
          {p.badge && <span className="caption-4 absolute start-2 top-2 rounded-full bg-accent px-2 py-1 text-white" style={{ color: 'var(--color-accent-ink)' }}>{badgeLabel(p.badge)}</span>}
          <span className="caption-4 absolute end-2 top-2 rounded-full bg-black/50 px-2 py-1 text-white">{p.rating.toFixed(1)} ★</span>
        </div>
      </button>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="title-3">{L(p.nameEn, p.nameAr)}</h3>
          <button type="button" onClick={() => toggleWish(p.id)} aria-label={t('wish.added')} className="motion-hover rounded-full p-2 transition-colors duration-300 hover:bg-line active:scale-95">
            <Heart size={20} weight={wish.includes(p.id) ? 'fill' : 'regular'} className={wish.includes(p.id) ? 'text-accent' : 'text-muted'} />
          </button>
        </div>
        <p className="body-6 line-clamp-2 text-muted">{L(p.descEn, p.descAr)}</p>
        <p className="caption-5 text-muted">{p.reviews} {t('product.reviews')}</p>
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="title-2 font-semibold">{money(p.price, lang, t('common.currency'))}</span>
          {p.oldPrice && <span className="caption-2 text-muted line-through">{money(p.oldPrice, lang, t('common.currency'))}</span>}
        </div>
        <p className="caption-5">{p.stock <= 0 ? t('product.outStock') : p.stock <= 8 ? t('product.lowStock', { count: p.stock }) : t('product.inStock')}</p>
        <div className="flex gap-2 pt-2">
          <button type="button" onClick={() => addToCart(p)} disabled={p.stock <= 0} className="button-md motion-hover flex-1 rounded-xl bg-accent px-3 py-2 text-white transition-all duration-300 hover:opacity-90 active:scale-95 disabled:opacity-40" style={{ color: 'var(--color-accent-ink)' }}>
            {t('product.add')}
          </button>
          <button type="button" onClick={() => openDetail(p)} className="button-sm motion-hover rounded-xl border border-line px-3 py-2 transition-colors duration-300 hover:bg-line active:scale-95">{t('product.details')}</button>
          <button type="button" onClick={() => toggleCompare(p)} className="button-sm motion-hover rounded-xl border border-line px-3 py-2 transition-colors duration-300 hover:bg-line active:scale-95">{compare.includes(p.id) ? '✓ ' + t('product.compare') : t('product.compare')}</button>
        </div>
      </div>
    </article>
  )

  return (
    <div className="min-h-screen bg-bg font-sans text-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white">{t('common.skip')}</a>
      <header className="sticky top-4 z-40 mx-auto mt-4 max-w-6xl px-4">
        <nav className="flex items-center gap-2 rounded-2xl border border-line bg-surface/90 px-4 py-2 shadow-sm backdrop-blur" aria-label="Main">
          <a href="#top" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white" style={{ color: 'var(--color-accent-ink)' }}><Cpu size={18} weight="fill" /></span>
            <span className="title-2 font-semibold">Volt</span>
          </a>
          <div className="ms-4 hidden items-center gap-4 md:flex">
            <a href="#shop" className="title-4 text-muted hover:text-ink">{t('nav.shop')}</a>
            <a href="#how" className="title-4 text-muted hover:text-ink">{t('nav.how')}</a>
            <a href="#faq" className="title-4 text-muted hover:text-ink">{t('nav.faq')}</a>
          </div>
          <div className="ms-auto flex items-center gap-2">
            <button type="button" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="button-sm motion-hover flex items-center gap-2 rounded-xl border border-line px-3 py-2 transition-colors duration-300 hover:bg-line active:scale-95" aria-label={t('common.language')}>
              <Globe size={16} /> {lang === 'en' ? 'عربي' : 'English'}
            </button>
            <button type="button" onClick={() => setCartOpen(true)} className="button-sm motion-hover relative flex items-center gap-2 rounded-xl bg-accent px-3 py-2 text-white transition-all duration-300 hover:opacity-90 active:scale-95" style={{ color: 'var(--color-accent-ink)' }} aria-label={t('nav.cart')}>
              <ShoppingCart size={16} /> <span className="hidden sm:inline">{t('nav.cart')}</span>
              {cartCount > 0 && <span className="caption-3 absolute -end-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-white">{cartCount}</span>}
            </button>
          </div>
        </nav>
      </header>

      <main id="main">
        <section id="top" className="mx-auto max-w-6xl px-4 pb-8 pt-12 sm:pt-16">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <Reveal>
              <span className="caption-4 inline-block rounded-full border border-line px-3 py-1 text-muted">{t('hero.badge')}</span>
              <h1 className="heading-1 hero-gradient mt-4 max-w-xl" style={{ textWrap: 'balance' }}>{t('hero.title')}</h1>
              <p className="body-3 mt-4 max-w-xl text-muted" style={{ textWrap: 'pretty' }}>{t('hero.sub')}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#shop" className="button-md motion-hover inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-white transition-all duration-300 hover:opacity-90 active:scale-95" style={{ color: 'var(--color-accent-ink)' }}>{t('hero.cta')} <ArrowRight size={18} /></a>
                <a href="#how" className="button-md motion-hover inline-flex items-center rounded-xl border border-line px-6 py-3 transition-colors duration-300 hover:bg-line active:scale-95">{t('hero.cta2')}</a>
              </div>
              <p className="caption-2 mt-4 text-muted">{t('hero.note')}</p>
            </Reveal>
            <Reveal>
              <div className="grid grid-cols-2 gap-4">
                {PRODUCTS.slice(0, 4).map((p) => (
                  <button key={p.id} type="button" onClick={() => openDetail(p)} className="motion-hover rounded-2xl text-start transition-transform duration-300 hover:-translate-y-1 active:scale-95">
                    {tile(p)}
                    <span className="title-4 mt-2 block">{L(p.nameEn, p.nameAr)}</span>
                    <span className="caption-2 text-muted">{money(p.price, lang, t('common.currency'))}</span>
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <Tagline text={t('tagline')} />

        

        <section id="shop" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-8">
          <Reveal>
            <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <label className="relative flex-1">
                  <MagnifyingGlass size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted" />
                  <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('toolbar.searchPh')} className="body-3 w-full rounded-xl border border-line bg-bg py-2 pe-4 ps-10 outline-none focus:ring-2 focus:ring-accent" aria-label={t('common.search')} />
                </label>
                <label className="flex items-center gap-2">
                  <span className="caption-2 text-muted">{t('toolbar.sort')}</span>
                  <select value={sort} onChange={(e) => setSort(e.target.value)} className="body-3 rounded-xl border border-line bg-bg px-3 py-2 outline-none focus:ring-2 focus:ring-accent" aria-label={t('toolbar.sort')}>
                    <option value="featured">{t('toolbar.sortFeatured')}</option>
                    <option value="priceAsc">{t('toolbar.sortPriceAsc')}</option>
                    <option value="priceDesc">{t('toolbar.sortPriceDesc')}</option>
                    <option value="rating">{t('toolbar.sortRating')}</option>
                  </select>
                </label>
              </div>
              <div className="flex flex-wrap gap-2" role="group" aria-label={t('nav.shop')}>
                {CATEGORIES.map((c) => (
                  <button key={c.id} type="button" onClick={() => setCat(c.id)} aria-pressed={cat === c.id} className={'button-sm motion-hover rounded-full px-4 py-2 transition-all duration-300 active:scale-95 ' + (cat === c.id ? 'bg-accent text-white' : 'border border-line hover:bg-line')} style={cat === c.id ? { color: 'var(--color-accent-ink)' } : undefined}>
                    {L(c.en, c.ar)}
                  </button>
                ))}
              </div>
                            <label className="flex items-center gap-2">
                <span className="caption-2 text-muted">{t('brand.label')}</span>
                <select value={brand} onChange={(e) => setBrand(e.target.value)} className="body-3 rounded-xl border border-line bg-bg px-3 py-2 outline-none focus:ring-2 focus:ring-accent" aria-label={t('brand.label')}>
                  <option value="all">{t('brand.all')}</option>
                  {BRANDS.map((x) => <option key={x} value={x}>{x}</option>)}
                </select>
              </label>
              <p className="caption-2 text-muted">{t('toolbar.results', { count: filtered.length })}</p>
            </div>
          </Reveal>

          {filtered.length === 0 ? (
            <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-line bg-surface px-4 py-16 text-center">
              <Package size={48} className="text-muted" weight="duotone" />
              <h3 className="heading-6">{t('toolbar.noResults')}</h3>
              <p className="body-6 text-muted">{t('toolbar.noResultsHint')}</p>
              <button type="button" onClick={() => { setQuery(''); setCat('all'); setBrand('all');  }} className="button-md motion-hover rounded-xl bg-accent px-4 py-2 text-white transition-all duration-300 hover:opacity-90 active:scale-95" style={{ color: 'var(--color-accent-ink)' }}>{t('toolbar.clear')}</button>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => card(p))}
            </div>
          )}
        </section>

        <section className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {[{ i: Truck, a: 'benefits.shipping', b: 'benefits.shippingText' }, { i: ShieldCheck, a: 'benefits.secure', b: 'benefits.secureText' }, { i: ArrowCounterClockwise, a: 'benefits.returns', b: 'benefits.returnsText' }].map((x) => (
              <div key={x.a} className="flex gap-4 rounded-2xl border border-line bg-surface p-4">
                <x.i size={28} className="shrink-0 text-accent" weight="duotone" />
                <div><h3 className="title-3">{t(x.a)}</h3><p className="body-6 mt-1 text-muted">{t(x.b)}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section id="how" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-8">
          <Reveal>
            <h2 className="heading-3 text-center">{t('how.title')}</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="rounded-2xl border border-line bg-surface p-4">
                  <span className="caption-3 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white" style={{ color: 'var(--color-accent-ink)' }}>{n}</span>
                  <h3 className="title-2 mt-4">{t('how.s' + n)}</h3>
                  <p className="body-6 mt-2 text-muted">{t('how.s' + n + 't')}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-4 py-8">
          <Reveal>
            <h2 className="heading-3 text-center">{t('faq.title')}</h2>
            <div className="mt-8 flex flex-col gap-4">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="rounded-2xl border border-line bg-surface">
                  <button type="button" onClick={() => setFaqOpen(faqOpen === n ? 0 : n)} aria-expanded={faqOpen === n} className="flex w-full items-center justify-between gap-4 p-4 text-start">
                    <span className="title-3">{t('faq.q' + n)}</span>
                    <Plus size={18} className={'shrink-0 transition-transform duration-300 ' + (faqOpen === n ? 'rotate-45' : '')} />
                  </button>
                  {faqOpen === n && <p className="body-6 px-4 pb-4 text-muted">{t('faq.a' + n)}</p>}
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-8 pt-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="title-3">Volt</p>
            <p className="caption-2 mt-1 text-muted">{t('footer.demo')}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setLegal('privacy')} className="button-sm motion-hover rounded-xl border border-line px-3 py-2 transition-colors duration-300 hover:bg-line active:scale-95">{t('footer.privacy')}</button>
            <button type="button" onClick={() => setLegal('terms')} className="button-sm motion-hover rounded-xl border border-line px-3 py-2 transition-colors duration-300 hover:bg-line active:scale-95">{t('footer.terms')}</button>
            <a href="#top" className="button-sm motion-hover rounded-xl bg-accent px-3 py-2 text-white transition-all duration-300 hover:opacity-90 active:scale-95" style={{ color: 'var(--color-accent-ink)' }}>{t('common.back')}</a>
          </div>
        </div>
        <p className="caption-5 mt-4 text-center text-muted">© 2026 Volt. {t('footer.rights')}</p>
      </footer>

      {detail && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label={L(detail.nameEn, detail.nameAr)}>
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-surface p-4 sm:rounded-2xl">
            <div className="flex items-start justify-between gap-4">
              <h2 className="heading-6">{L(detail.nameEn, detail.nameAr)}</h2>
              <button type="button" onClick={() => setDetail(null)} className="motion-hover rounded-full p-2 transition-colors duration-300 hover:bg-line active:scale-95" aria-label={t('common.close')}><X size={20} /></button>
            </div>
            <div className="mt-4">{tile(detail, true)}</div>
            <p className="body-3 mt-4 text-muted">{L(detail.descEn, detail.descAr)}</p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="title-1 font-semibold">{money(detail.price, lang, t('common.currency'))}</span>
              {detail.oldPrice && <span className="caption-2 text-muted line-through">{money(detail.oldPrice, lang, t('common.currency'))}</span>}
              <span className="caption-2 text-muted">· {detail.reviews} {t('product.reviews')} · {detail.rating.toFixed(1)} ★</span>
            </div>
            <p className="caption-2 mt-2">{detail.stock <= 0 ? t('product.outStock') : detail.stock <= 8 ? t('product.lowStock', { count: detail.stock }) : t('product.inStock')}</p>
            
            <h3 className="title-2 mt-4">{t('product.specs')}</h3>
            <dl className="mt-2 flex flex-col gap-2">
              {detail.specs.map((s) => (
                <div key={s.labelEn} className="flex justify-between gap-4 rounded-xl border border-line px-3 py-2">
                  <dt className="caption-2 text-muted">{L(s.labelEn, s.labelAr)}</dt>
                  <dd className="body-6 text-end">{L(s.valueEn, s.valueAr)}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 flex items-center gap-2">
              <span className="caption-2 text-muted">{t('product.qty')}</span>
              <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="motion-hover rounded-lg border border-line p-2 transition-colors duration-300 hover:bg-line active:scale-95" aria-label="Decrease"><Minus size={16} /></button>
              <span className="title-3 w-8 text-center">{qty}</span>
              <button type="button" onClick={() => setQty(Math.min(detail.stock, qty + 1))} className="motion-hover rounded-lg border border-line p-2 transition-colors duration-300 hover:bg-line active:scale-95" aria-label="Increase"><Plus size={16} /></button>
            </div>
            <div className="mt-4 flex gap-2">
              <button type="button" onClick={() => { addToCart(detail, qty); setDetail(null) }} disabled={detail.stock <= 0} className="button-md motion-hover flex-1 rounded-xl bg-accent px-4 py-2 text-white transition-all duration-300 hover:opacity-90 active:scale-95 disabled:opacity-40" style={{ color: 'var(--color-accent-ink)' }}>{t('product.add')}</button>
              <button type="button" onClick={() => toggleCompare(detail)} className="button-md motion-hover rounded-xl border border-line px-4 py-2 transition-colors duration-300 hover:bg-line active:scale-95">{t('product.compare')}</button>
            </div>
          </div>
        </div>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" role="dialog" aria-modal="true" aria-label={t('cart.title')}>
          <div className="absolute inset-y-0 end-0 flex w-full max-w-md flex-col bg-surface shadow-xl">
            <div className="flex items-center justify-between border-b border-line p-4">
              <h2 className="heading-6">{t('cart.title')} ({cartCount})</h2>
              <button type="button" onClick={() => setCartOpen(false)} className="motion-hover rounded-full p-2 transition-colors duration-300 hover:bg-line active:scale-95" aria-label={t('common.close')}><X size={20} /></button>
            </div>
            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <ShoppingCart size={48} className="text-muted" weight="duotone" />
                <h3 className="title-2">{t('cart.empty')}</h3>
                <p className="body-6 text-muted">{t('cart.emptyHint')}</p>
                <button type="button" onClick={() => setCartOpen(false)} className="button-md motion-hover rounded-xl bg-accent px-4 py-2 text-white transition-all duration-300 hover:opacity-90 active:scale-95" style={{ color: 'var(--color-accent-ink)' }}>{t('cart.continue')}</button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4">
                  <ul className="flex flex-col gap-4">
                    {cart.map((item) => {
                      const p = byId(item.id)
                      if (!p) return null
                      return (
                        <li key={item.id} className="flex gap-4 rounded-2xl border border-line p-4">
                          <div className="w-20 shrink-0">{tile(p)}</div>
                          <div className="min-w-0 flex-1">
                            <h3 className="title-4">{L(p.nameEn, p.nameAr)}</h3>
                            <p className="caption-2 mt-1 text-muted">{money(p.price, lang, t('common.currency'))}</p>
                            <div className="mt-2 flex items-center gap-2">
                              <button type="button" onClick={() => setCartQty(item.id, item.qty - 1)} className="motion-hover rounded-lg border border-line p-1 transition-colors duration-300 hover:bg-line active:scale-95" aria-label="Decrease"><Minus size={14} /></button>
                              <span className="title-4 w-6 text-center">{item.qty}</span>
                              <button type="button" onClick={() => setCartQty(item.id, item.qty + 1)} className="motion-hover rounded-lg border border-line p-1 transition-colors duration-300 hover:bg-line active:scale-95" aria-label="Increase"><Plus size={14} /></button>
                              <button type="button" onClick={() => setCartQty(item.id, 0)} className="motion-hover ms-auto rounded-lg border border-line p-1 text-red-600 transition-colors duration-300 hover:bg-line active:scale-95" aria-label={t('cart.remove')}><Trash size={14} /></button>
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <div className="border-t border-line p-4">
                  <div className="flex justify-between"><span className="title-3">{t('cart.subtotal')}</span><span className="title-2 font-semibold">{money(cartTotal, lang, t('common.currency'))}</span></div>
                  <p className="caption-2 mt-1 text-muted">{t('cart.shipping')}</p>
                  <button type="button" onClick={() => { setCartOpen(false); setCheckoutOpen(true); setErrors([]) }} className="button-md motion-hover mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2 text-white transition-all duration-300 hover:opacity-90 active:scale-95" style={{ color: 'var(--color-accent-ink)' }}><CreditCard size={18} /> {t('cart.checkout')}</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {checkoutOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label={t('checkout.title')}>
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-surface p-4 sm:rounded-2xl">
            <div className="flex items-start justify-between gap-4">
              <h2 className="heading-6">{t('checkout.title')}</h2>
              <button type="button" onClick={() => setCheckoutOpen(false)} className="motion-hover rounded-full p-2 transition-colors duration-300 hover:bg-line active:scale-95" aria-label={t('common.close')}><X size={20} /></button>
            </div>
            <p className="caption-2 mt-2 rounded-xl border border-line bg-bg p-3 text-muted">{t('checkout.demo')}</p>
            {errors.length > 0 && (
              <div className="mt-4 rounded-xl border border-red-300 bg-red-50 p-3" role="alert">
                {errors.map((e) => <p key={e} className="body-6 text-red-700">{e}</p>)}
              </div>
            )}
            <div className="mt-4 flex flex-col gap-4">
              <label className="flex flex-col gap-2"><span className="title-4">{t('checkout.name')}</span>
                <input value={name} onChange={(e) => setName(e.target.value)} className="body-3 rounded-xl border border-line bg-bg px-3 py-2 outline-none focus:ring-2 focus:ring-accent" /></label>
              <label className="flex flex-col gap-2"><span className="title-4">{t('checkout.email')}</span>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="body-3 rounded-xl border border-line bg-bg px-3 py-2 outline-none focus:ring-2 focus:ring-accent" /></label>
                            <label className="flex flex-col gap-2"><span className="title-4">{t('checkout.address')}</span>
                <input value={address} onChange={(e) => setAddress(e.target.value)} className="body-3 rounded-xl border border-line bg-bg px-3 py-2 outline-none focus:ring-2 focus:ring-accent" /></label>
              
              <div className="flex justify-between rounded-xl border border-line p-3"><span className="title-3">{t('cart.total')}</span><span className="title-2 font-semibold">{money(cartTotal, lang, t('common.currency'))}</span></div>
              <button type="button" onClick={placeOrder} className="button-md motion-hover rounded-xl bg-accent px-4 py-2 text-white transition-all duration-300 hover:opacity-90 active:scale-95" style={{ color: 'var(--color-accent-ink)' }}>{t('checkout.place')}</button>
            </div>
          </div>
        </div>
      )}

      {order && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label={t('checkout.success')}>
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-surface p-4 text-center sm:rounded-2xl">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white" style={{ color: 'var(--color-accent-ink)' }}><Check size={24} /></span>
            <h2 className="heading-5 mt-4">{t('checkout.success')}</h2>
            <p className="caption-2 mt-2 text-muted">{t('checkout.orderNo')}: {order.no}</p>
            <p className="body-6 mt-2 text-muted">{t('checkout.successHint')}</p>
            
            <button type="button" onClick={() => setOrder(null)} className="button-md motion-hover mt-6 w-full rounded-xl bg-accent px-4 py-2 text-white transition-all duration-300 hover:opacity-90 active:scale-95" style={{ color: 'var(--color-accent-ink)' }}>{t('cart.continue')}</button>
          </div>
        </div>
      )}

      {legal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-surface p-4 sm:rounded-2xl">
            <div className="flex items-start justify-between gap-4">
              <h2 className="heading-6">{t(legal === 'privacy' ? 'footer.privacy' : 'footer.terms')}</h2>
              <button type="button" onClick={() => setLegal(null)} className="motion-hover rounded-full p-2 transition-colors duration-300 hover:bg-line active:scale-95" aria-label={t('common.close')}><X size={20} /></button>
            </div>
            <p className="body-3 mt-4 text-muted">{t(legal === 'privacy' ? 'footer.privacyText' : 'footer.termsText')}</p>
          </div>
        </div>
      )}

      
      {compare.length > 0 && (
        <button type="button" onClick={() => setCompareOpen(true)} className="button-md motion-hover fixed bottom-4 start-4 z-40 flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-white shadow-lg transition-all duration-300 hover:opacity-90 active:scale-95">
          <Scales size={18} /> {t('compare.view')} ({compare.length})
        </button>
      )}
      {compareOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label={t('compare.title')}>
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl bg-surface p-4 sm:rounded-2xl">
            <div className="flex items-start justify-between gap-4">
              <h2 className="heading-6">{t('compare.title')}</h2>
              <button type="button" onClick={() => setCompareOpen(false)} className="motion-hover rounded-full p-2 transition-colors duration-300 hover:bg-line active:scale-95" aria-label={t('common.close')}><X size={20} /></button>
            </div>
            {compare.length < 2 ? (
              <p className="body-3 mt-4 text-muted">{t('compare.empty')}</p>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead><tr><th className="p-2 text-start"></th>{compare.map((id) => { const p = byId(id); return p ? <th key={id} className="p-2 text-start"><span className="title-4 block">{L(p.nameEn, p.nameAr)}</span><span className="caption-2 text-muted">{money(p.price, lang, t('common.currency'))}</span></th> : null })}</tr></thead>
                  <tbody>
                    {Array.from(new Set(compare.flatMap((id) => (byId(id)?.specs || []).map((s) => s.labelEn)))).map((label) => (
                      <tr key={label} className="border-t border-line">
                        <td className="caption-2 p-2 text-muted">{label}</td>
                        {compare.map((id) => { const p = byId(id); const s = p?.specs.find((x) => x.labelEn === label); return <td key={id} className="body-6 p-2">{s ? L(s.valueEn, s.valueAr) : '—'}</td> })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="mt-4 flex gap-2">
              <button type="button" onClick={() => { setCompare([]); setCompareOpen(false) }} className="button-md motion-hover rounded-xl border border-line px-4 py-2 transition-colors duration-300 hover:bg-line active:scale-95">{t('compare.clear')}</button>
              <button type="button" onClick={() => setCompareOpen(false)} className="button-md motion-hover rounded-xl bg-accent px-4 py-2 text-white transition-all duration-300 hover:opacity-90 active:scale-95" style={{ color: 'var(--color-accent-ink)' }}>{t('common.close')}</button>
            </div>
          </div>
        </div>
      )}


      {!cookie && (
        <div className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-2xl rounded-2xl border border-line bg-surface p-4 shadow-lg" role="region" aria-label="Cookie consent">
          <p className="body-6 text-muted">{t('cookie.text')}</p>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => { localStorage.setItem('064-electronics-store-cookie', 'yes'); setCookie(true) }} className="button-sm motion-hover rounded-xl bg-accent px-3 py-2 text-white transition-all duration-300 hover:opacity-90 active:scale-95" style={{ color: 'var(--color-accent-ink)' }}>{t('cookie.accept')}</button>
            <button type="button" onClick={() => { localStorage.setItem('064-electronics-store-cookie', 'yes'); setCookie(true) }} className="button-sm motion-hover rounded-xl border border-line px-3 py-2 transition-colors duration-300 hover:bg-line active:scale-95">{t('cookie.decline')}</button>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-white shadow-lg" role="status">
          <p className="caption-2">{toast}</p>
        </div>
      )}
    </div>
  )
}

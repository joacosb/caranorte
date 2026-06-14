'use client'

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const services = [
  {
    id: "diag",
    title: "Diagnóstico Estratégico de Negocio & IA",
    short: "Relevamos procesos, identificamos cuellos de botella y definimos el roadmap de IA.",
    caseTag: "Energía · 90 días",
    caseTitle: "Empresa energética regional",
    caseBody: "12 procesos críticos ejecutados manualmente, con errores frecuentes y sin trazabilidad. Tras el diagnóstico, definimos un roadmap de 6 iniciativas priorizadas por ROI. En 90 días, 3 ya estaban implementadas con un 40% menos de tiempo operativo.",
  },
  {
    id: "auto",
    title: "Automatización Inteligente de Procesos",
    short: "Automatizamos tareas repetitivas e integramos sistemas para optimizar workflows.",
    caseTag: "Logística · 45 días",
    caseTitle: "Empresa de logística y distribución",
    caseBody: "Procesaban 800 facturas mensuales de forma manual, con un 12% de tasa de error. Automatizamos el proceso end-to-end: extracción, validación e integración con el ERP. Resultado: 94% de reducción en tiempo operativo y errores en cero.",
  },
  {
    id: "impl",
    title: "Implementación de Soluciones de IA",
    short: "Llevamos modelos de IA a producción: predictivos, recomendaciones, chatbots y más.",
    caseTag: "Retail · 3 meses",
    caseTitle: "Cadena de retail con 18 sucursales",
    caseBody: "40% de sobrestock en temporada alta generaba millones en inventario inmovilizado. Implementamos un modelo predictivo de demanda con 87% de precisión. Resultado: reducción de $2M en stock ocioso y mejora de 11 puntos en margen operativo.",
  },
  {
    id: "data",
    title: "Data Analytics & Visualización",
    short: "Traducimos datos en dashboards claros, KPIs accionables y análisis de performance.",
    caseTag: "Finanzas · 30 días",
    caseTitle: "Empresa de servicios financieros",
    caseBody: "15 reportes en Excel que tardaban 3 días en consolidarse cada semana. Construimos un dashboard en tiempo real con alertas automáticas por desvío de KPIs. El equipo directivo pasó de decidir en días a decidir en horas.",
  },
];

const steps = [
  {
    n: "01",
    title: "Escucha profunda",
    body: "Antes de proponer cualquier solución, entendemos el negocio en profundidad. Relevamos procesos, hablamos con los equipos clave y mapeamos el estado real sin suposiciones.",
  },
  {
    n: "02",
    title: "Diagnóstico y diseño",
    body: "Con el diagnóstico claro, diseñamos una solución a medida: objetivos concretos, hitos medibles y un roadmap realista. Sin promesas vacías, sin tecnología por la tecnología.",
  },
  {
    n: "03",
    title: "Implementación iterativa",
    body: "Ejecutamos en ciclos cortos, entregando valor desde las primeras semanas. Cada iteración se revisa con el cliente. El feedback es parte del proceso, no una excepción.",
  },
  {
    n: "04",
    title: "Medición y mejora continua",
    body: "Medimos el impacto con métricas reales acordadas desde el inicio. Acompañamos post-lanzamiento para asegurar que los resultados se mantengan y crezcan con el tiempo.",
  },
];

const team = [
  { name: "Camila Primo", role: "UX/UI", link: "https://www.linkedin.com/in/primo-camila/", photo: "/team/camila-primo.jpg", initials: "CP" },
  { name: "Julieta Chinkes", role: "Product Owner", link: "https://www.linkedin.com/in/julieta-chinkes-48a7b126a/", photo: "/team/julieta-chinkes.jpg", initials: "JC" },
  { name: "Renata Belén Moreno Vera", role: "UX/UI Designer", link: "https://www.linkedin.com/in/renatabmv/", photo: "/team/renata-moreno.jpg", initials: "RM" },
  { name: "Agustina Sol Forini", role: "Scrum Master", link: "https://www.linkedin.com/in/agustina-sol-forini/", photo: "/team/agustina-forini.jpg", initials: "AF" },
  { name: "Tabatha Cesar Castaño", role: "Product Analyst", link: "https://www.linkedin.com/in/tabatha-cesar-95a325213/", photo: "/team/tabatha-cesar.jpg", initials: "TC" },
  { name: "Tiago Harari", role: "Tech Leader", link: "https://www.linkedin.com/in/tiagoharari/", photo: "/team/tiago-harari.jpg", initials: "TH" },
  { name: "Joaquín Sosa Beláustegui", role: "Desarrollador", link: "https://www.linkedin.com/in/joaquinsb/", photo: "/team/joaquin-sosa.jpg", initials: "JS" },
];

const partners = ["Nodek Energía", "YPF Luz", "Edesur", "Enel Green Power", "Petrobras", "Cotec", "Globant", "Mercado Libre"];

const sections = [
  { id: "servicios", label: "Servicios" },
  { id: "proceso", label: "Proceso" },
  { id: "nosotros", label: "Nosotros" },
  { id: "equipo", label: "Equipo" },
];

export default function Home() {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const companyList = useMemo(() => partners.join("    ·    "), []);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("servicios");
  const [mountainDrawn, setMountainDrawn] = useState(false);
  const mountainRef = useRef<SVGSVGElement | null>(null);
  const [heroMountainDrawn, setHeroMountainDrawn] = useState(false);
  const [heroSummitGlow, setHeroSummitGlow] = useState(false);
  const [heroTransition, setHeroTransition] = useState(false);
  const heroSectionRef = useRef<HTMLElement | null>(null);

  function toggleFlip(id: string) {
    setFlipped((s) => ({ ...s, [id]: !s[id] }));
  }

  function handleImgError(name: string) {
    setImgErrors((s) => ({ ...s, [name]: true }));
  }

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Progreso de scroll para la línea guía
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = document.documentElement;
        const max = el.scrollHeight - el.clientHeight;
        setScrollProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Sección activa (scroll-spy) para resaltar en la línea guía
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Montaña del hero: loop animado mientras la sección esté visible en el viewport
  useEffect(() => {
    const section = heroSectionRef.current;
    if (!section) return;

    let active = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function clearTimers() {
      timers.forEach(clearTimeout);
      timers.length = 0;
    }

    function startCycle() {
      clearTimers();
      if (!active) return;

      // Reset instantáneo (sin transición)
      setHeroTransition(false);
      setHeroMountainDrawn(false);
      setHeroSummitGlow(false);

      requestAnimationFrame(() => {
        // Frame 1: habilitar transición
        setHeroTransition(true);
        requestAnimationFrame(() => {
          if (!active) return;
          // Frame 2: arrancar el trazado (la transición CSS ya está activa)
          setHeroMountainDrawn(true);

          timers.push(
            setTimeout(() => {
              if (!active) return;
              setHeroSummitGlow(true);
              // Mantener visible 5s y repetir
              timers.push(setTimeout(startCycle, 5000));
            }, 3500)
          );
        });
      });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) startCycle();
        else clearTimers();
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      clearTimers();
      active = false;
    };
  }, []);

  // La montaña de Cumbre se dibuja al entrar en viewport
  useEffect(() => {
    const el = mountainRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMountainDrawn(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-cream text-ink">

      {/* Línea guía de scroll: barra vertical que se llena al hacer scroll */}
      <div aria-hidden className="pointer-events-none fixed left-0 top-0 z-40 hidden h-full w-1 lg:block">
        <div className="absolute inset-0 bg-forest/10" />
        <div
          className="absolute left-0 top-0 w-full bg-gold transition-[height] duration-150 ease-out"
          style={{ height: `${scrollProgress * 100}%` }}
        />
        {/* punto guía que avanza */}
        <div
          className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_10px_2px_rgba(232,187,75,0.55)] transition-all duration-150 ease-out"
          style={{ top: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Etiquetas de sección que se resaltan (pantallas anchas) */}
      <aside aria-hidden className="pointer-events-none fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 2xl:block">
        <ul className="flex flex-col gap-7">
          {sections.map((s) => {
            const isActive = activeSection === s.id;
            return (
              <li key={s.id} className="flex items-center gap-2.5">
                <span className={`h-2 w-2 rounded-full transition-all duration-300 ${isActive ? "scale-125 bg-gold" : "bg-forest/25"}`} />
                <span className={`text-[11px] uppercase tracking-widest transition-colors duration-300 ${isActive ? "font-semibold text-forest" : "text-muted"}`}>{s.label}</span>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-forest-dark/40 bg-forest/95 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <a href="#" className="flex items-center gap-3 cursor-pointer">
            <p className="text-3xl font-extrabold tracking-tight text-cream leading-none">Cara<span className="text-gold">Norte</span></p>
            <span className="hidden sm:block h-6 w-px bg-cream/30" />
            <p className="hidden sm:block text-xs text-cream/70">Consultoría de negocio e inteligencia artificial</p>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-semibold text-cream/90">
            <a href="#servicios" className="transition hover:text-gold">Servicios</a>
            <a href="#proceso" className="transition hover:text-gold">Proceso</a>
            <a href="#nosotros" className="transition hover:text-gold">Nosotros</a>
            <a href="#equipo" className="transition hover:text-gold">Equipo</a>
            <a href="#contacto" className="transition hover:text-gold">Contacto</a>
            <Link href="/login" className="rounded-full bg-gold px-4 py-2 font-semibold text-forest-dark transition hover:bg-gold-dark">
              Iniciar sesión
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menú"
          >
            <span className={`block h-0.5 w-6 bg-cream transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-6 bg-cream transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-cream transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden border-t border-forest-dark/40 bg-forest px-6 py-5 flex flex-col gap-4 text-sm font-semibold text-cream/90">
            <a href="#servicios" onClick={() => setMenuOpen(false)} className="hover:text-gold">Servicios</a>
            <a href="#proceso" onClick={() => setMenuOpen(false)} className="hover:text-gold">Proceso</a>
            <a href="#nosotros" onClick={() => setMenuOpen(false)} className="hover:text-gold">Nosotros</a>
            <a href="#equipo" onClick={() => setMenuOpen(false)} className="hover:text-gold">Equipo</a>
            <a href="#contacto" onClick={() => setMenuOpen(false)} className="hover:text-gold">Contacto</a>
            <Link href="/login" onClick={() => setMenuOpen(false)} className="rounded-full bg-gold px-4 py-2 text-center font-semibold text-forest-dark hover:bg-gold-dark">
              Iniciar sesión
            </Link>
          </nav>
        )}
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-24 pt-12">

        {/* Hero */}
        <section
          ref={heroSectionRef}
          className="relative overflow-hidden rounded-3xl pt-12 pb-36 text-center sm:pb-48"
          style={{
            backgroundImage:
              "radial-gradient(rgba(26,74,56,0.07) 1px, transparent 1px), linear-gradient(to bottom, transparent 55%, rgba(255,255,255,0.7))",
            backgroundSize: "22px 22px, 100% 100%",
          }}
        >
          {/* Silueta de montaña — fondo decorativo */}
          <svg
            viewBox="0 0 1200 240"
            preserveAspectRatio="none"
            fill="none"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32 w-full sm:h-44"
          >
            <style>{`
              @keyframes summit-flash {
                0%   { opacity: 0.9; transform: scale(0.3); }
                30%  { opacity: 0.7; transform: scale(1);   }
                60%  { opacity: 0;   transform: scale(2.6); }
                100% { opacity: 0;   transform: scale(2.6); }
              }
            `}</style>
            <path
              d="M 0 215 L 150 195 L 260 205 L 400 165 L 560 72 L 600 45 L 640 72 L 800 175 L 950 200 L 1080 188 L 1200 205 L 1200 240 L 0 240 Z"
              fill="#2E5538"
              style={{ opacity: heroMountainDrawn ? 1 : 0, transition: heroTransition ? "opacity 1s ease 3s" : "none" }}
            />

            {/* Mitad izquierda: borde izquierdo → cumbre (600,45) */}
            <path
              d="M 0 215 L 150 195 L 260 205 L 400 165 L 560 72 L 600 45"
              pathLength={1}
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              className="text-gold"
              style={{
                strokeDasharray: 1,
                strokeDashoffset: heroMountainDrawn ? 0 : 1,
                strokeOpacity: heroMountainDrawn ? 1 : 0.3,
                transition: heroTransition
                  ? "stroke-dashoffset 3.5s ease-out, stroke-opacity 3.5s ease-out"
                  : "none",
              }}
            />
            {/* Mitad derecha: borde derecho → cumbre (600,45) */}
            <path
              d="M 1200 205 L 1080 188 L 950 200 L 800 175 L 640 72 L 600 45"
              pathLength={1}
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              className="text-gold"
              style={{
                strokeDasharray: 1,
                strokeDashoffset: heroMountainDrawn ? 0 : 1,
                strokeOpacity: heroMountainDrawn ? 1 : 0.3,
                transition: heroTransition
                  ? "stroke-dashoffset 3.5s ease-out, stroke-opacity 3.5s ease-out"
                  : "none",
              }}
            />
            {/* cumbre nevada — aparece justo antes de que converjan los trazos */}
            <path
              d="M 560 84 L 582 64 L 598 74 L 600 66 L 614 56 L 628 70 L 648 86"
              pathLength={1}
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              className="text-cream"
              style={{
                strokeDasharray: 1,
                strokeDashoffset: heroMountainDrawn ? 0 : 1,
                transition: heroTransition ? "stroke-dashoffset 0.8s ease-out 3.2s" : "none",
              }}
            />
            {/* destello dorado en la cumbre al converger los dos trazos */}
            {heroSummitGlow && (
              <>
                <circle
                  cx={600} cy={45} r={28}
                  fill="currentColor" fillOpacity={0.25}
                  className="text-gold"
                  style={{ animation: "summit-flash 1.8s ease-out infinite", transformBox: "fill-box", transformOrigin: "center" }}
                />
                <circle
                  cx={600} cy={45} r={10}
                  fill="currentColor" fillOpacity={0.9}
                  className="text-gold"
                  style={{ animation: "summit-flash 1.8s ease-out infinite", transformBox: "fill-box", transformOrigin: "center" }}
                />
              </>
            )}
          </svg>

          {/* Contenido sobre la montaña */}
          <div className="relative z-10 flex flex-col items-center">
            <p className="inline-block rounded-full bg-gold/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-forest">Consultoría estratégica</p>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-forest md:text-5xl lg:text-6xl">
              Combinamos inteligencia, artificial y humana, para escalar tu negocio
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              Acompañamos a organizaciones en su transformación combinando el criterio humano y la potencia de la inteligencia artificial. Diagnóstico honesto, implementación iterativa e impacto real y medible.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#proceso" className="rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-forest-dark transition hover:bg-gold-dark">Cómo trabajamos</a>
              <a href="#servicios" className="rounded-xl border border-forest px-6 py-3 text-sm font-semibold text-forest transition hover:bg-forest hover:text-white">Ver servicios</a>
            </div>
          </div>
        </section>

        {/* Clientes */}
        <section className="border-t border-b border-gray-200 py-10">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted mb-6">Empresas que confían en nosotros</p>
          <div
            className="overflow-hidden"
            style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
          >
            <div
              className="animate-marquee whitespace-nowrap text-sm font-bold uppercase tracking-widest text-forest/60"
              style={{ animationDuration: "40s", willChange: "transform" }}
            >
              {companyList}    ·    {companyList}    ·    {companyList}    ·    {companyList}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="servicios">
          <h2 className="text-3xl font-bold text-forest" data-reveal="left">Nuestros servicios</h2>
          <p className="mt-2 max-w-2xl text-muted" data-reveal="left" style={{ transitionDelay: '100ms' }}>Hacé clic en cada servicio para ver un caso concreto de impacto real.</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal="left" style={{ transitionDelay: '220ms' }}>
            {services.map((service) => {
              const isFlipped = flipped[service.id];
              return (
                <button
                  key={service.id}
                  onClick={() => toggleFlip(service.id)}
                  className="group relative h-48 cursor-pointer rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-lg focus:outline-none"
                  type="button"
                  style={{ perspective: 1200 }}
                >
                  <div className={`relative h-full w-full transition-transform duration-500 ease-in-out ${isFlipped ? "rotate-y-180" : ""}`} style={{ transformStyle: "preserve-3d" }}>
                    {/* Front */}
                    <div className="absolute inset-0 rounded-2xl border-l-4 border-l-gold bg-white p-4 text-left backface-hidden group-hover:ring-2 group-hover:ring-gold/60">
                      <h3 className="text-sm font-bold text-forest leading-snug">{service.title}</h3>
                      <p className="mt-2 text-xs text-muted leading-relaxed">{service.short}</p>
                      <p className="absolute bottom-4 left-4 text-[10px] text-gold-dark font-medium">Toca para ver caso real →</p>
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-forest to-forest-dark p-4 text-left backface-hidden rotate-y-180 flex flex-col justify-between">
                      <div>
                        <span className="inline-block rounded-full bg-gold/25 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-gold">{service.caseTag}</span>
                        <h3 className="mt-1.5 text-xs font-bold text-cream">{service.caseTitle}</h3>
                        <p className="mt-1.5 text-[11px] text-cream/85 leading-relaxed">{service.caseBody}</p>
                      </div>
                      <p className="text-[10px] text-cream/50">Toca para volver</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Process */}
        <section id="proceso">
          <h2 className="text-3xl font-bold text-forest" data-reveal="right">Cómo trabajamos</h2>
          <p className="mt-2 max-w-2xl text-muted" data-reveal="right" style={{ transitionDelay: '100ms' }}>Un proceso probado, diseñado para minimizar el riesgo y maximizar el impacto desde el primer día.</p>

          <div className="relative mt-10" data-reveal="right" style={{ transitionDelay: '220ms' }}>
            {/* Línea conectora (solo desktop) */}
            <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[3.6rem] hidden border-t-2 border-dashed border-gold/50 lg:block" />
            <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <div key={step.n} className="relative flex flex-col gap-3 rounded-2xl border border-forest/10 bg-white p-6 shadow-sm">
                  <span className="text-6xl font-black text-gold leading-none">{step.n}</span>
                  <h3 className="text-base font-bold text-forest">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nosotros */}
        <section id="nosotros" className="rounded-2xl border border-forest/15 bg-white p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-forest" data-reveal="left">Nosotros</h2>
          <p className="mt-4 text-ink max-w-2xl" data-reveal="left" style={{ transitionDelay: '100ms' }}>Consultora patagónica que combina criterio humano e inteligencia artificial para transformar organizaciones. Negocio primero, tecnología después.</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-reveal="left" style={{ transitionDelay: '220ms' }}>
            <article className="rounded-xl border border-forest/15 bg-cream p-4">
              <h3 className="text-base font-semibold text-forest">Misión</h3>
              <p className="mt-2 text-sm text-gray-600">Transformar el potencial de la IA en resultados concretos: mejores decisiones, procesos optimizados y valor sostenible.</p>
            </article>
            <article className="rounded-xl border border-forest/15 bg-cream p-4">
              <h3 className="text-base font-semibold text-forest">Visión</h3>
              <p className="mt-2 text-sm text-gray-600">Ser la consultora referente en América Latina en transformación inteligente, donde cada implementación tenga impacto real y medible.</p>
            </article>
            <article className="rounded-xl border border-forest/15 bg-cream p-4">
              <h3 className="text-base font-semibold text-forest">Estrategia</h3>
              <p className="mt-2 text-sm text-gray-600">Entender el negocio antes que la tecnología. Cada solución responde a un objetivo concreto acordado con el cliente.</p>
            </article>
          </div>

          <div className="mt-6">
            <h3 className="border-l-4 border-gold pl-3 text-xl font-semibold text-forest" data-reveal="left" style={{ transitionDelay: '340ms' }}>Valores</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal="right" style={{ transitionDelay: '460ms' }}>
              <article className="rounded-xl border border-forest/15 bg-cream p-4">
                <h4 className="text-base font-semibold text-forest">Orientación a resultados</h4>
                <p className="mt-2 text-sm text-gray-600">Resultados concretos y medibles. El impacto real es nuestro único indicador de éxito.</p>
              </article>
              <article className="rounded-xl border border-forest/15 bg-cream p-4">
                <h4 className="text-base font-semibold text-forest">Simplicidad y eficiencia</h4>
                <p className="mt-2 text-sm text-gray-600">Soluciones prácticas y escalables. La complejidad no es un valor; la claridad, sí.</p>
              </article>
              <article className="rounded-xl border border-forest/15 bg-cream p-4">
                <h4 className="text-base font-semibold text-forest">Compromiso y cercanía</h4>
                <p className="mt-2 text-sm text-gray-600">Nos involucramos de verdad. Entendemos el negocio, el equipo y el entorno antes de proponer cualquier solución.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="equipo">
          <h2 className="text-3xl font-bold text-forest" data-reveal="right">Equipo CaraNorte</h2>
          <p className="mt-2 text-muted" data-reveal="right" style={{ transitionDelay: '100ms' }}>Las personas detrás de cada proyecto.</p>
          <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4" data-reveal="right" style={{ transitionDelay: '220ms' }}>
            {team.map((member) => (
              <a
                key={member.name}
                href={member.link}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex flex-col items-center rounded-2xl border border-forest/15 bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lg"
              >
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full overflow-hidden bg-forest flex items-center justify-center shrink-0 mb-4">
                  {imgErrors[member.name] ? (
                    <span className="text-xl font-bold text-cream select-none">{member.initials}</span>
                  ) : (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={() => handleImgError(member.name)}
                    />
                  )}
                </div>
                <p className="text-sm font-bold text-forest leading-tight">{member.name}</p>
                <p className="mt-1 text-sm text-gray-500">{member.role}</p>
                <span className="mt-3 inline-block text-xs font-medium text-forest group-hover:underline">LinkedIn ↗</span>
              </a>
            ))}
          </div>
        </section>

        {/* Cumbre — oferta de servicio + montaña dibujada por la línea */}
        <section className="relative overflow-hidden rounded-2xl bg-forest px-6 py-16 text-center sm:px-10 sm:py-20 md:pb-56">
          <div className="relative z-10 mx-auto max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold" data-reveal="left">La cara norte</p>
            <h2 className="mt-3 text-3xl font-bold text-cream md:text-4xl" data-reveal="left" style={{ transitionDelay: "100ms" }}>
              Te acompañamos hasta la cumbre
            </h2>
            <p className="mt-4 text-cream/80" data-reveal="left" style={{ transitionDelay: "200ms" }}>
              Como en la cara norte del Lanín, llegar arriba exige método, ritmo y buena compañía. Trazamos la ruta, marcamos cada hito y subimos junto a tu equipo hasta el resultado.
            </p>
            <a href="#contacto" className="mt-8 inline-block rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-forest-dark transition hover:bg-gold-dark" data-reveal="left" style={{ transitionDelay: "300ms" }}>
              Empezá el ascenso
            </a>
          </div>

          {/* La línea dibuja la montaña (cara norte del Lanín) */}
          <svg
            ref={mountainRef}
            viewBox="0 0 1200 240"
            preserveAspectRatio="none"
            fill="none"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-44 w-full sm:h-56"
          >
            {/* relleno tenue que aparece tras el trazado */}
            <path
              d="M 0 215 L 150 195 L 260 205 L 400 165 L 560 72 L 600 45 L 640 72 L 800 175 L 950 200 L 1080 188 L 1200 205 L 1200 240 L 0 240 Z"
              className="fill-gold/10"
              style={{ opacity: mountainDrawn ? 1 : 0, transition: "opacity 1s ease 1.2s" }}
            />
            {/* contorno principal */}
            <path
              d="M 0 215 L 150 195 L 260 205 L 400 165 L 560 72 L 600 45 L 640 72 L 800 175 L 950 200 L 1080 188 L 1200 205"
              pathLength={1}
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              className="text-gold"
              style={{ strokeDasharray: 1, strokeDashoffset: mountainDrawn ? 0 : 1, transition: "stroke-dashoffset 2s ease" }}
            />
            {/* cumbre nevada */}
            <path
              d="M 560 84 L 582 64 L 598 74 L 600 66 L 614 56 L 628 70 L 648 86"
              pathLength={1}
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              className="text-cream"
              style={{ strokeDasharray: 1, strokeDashoffset: mountainDrawn ? 0 : 1, transition: "stroke-dashoffset 1s ease 1.6s" }}
            />
          </svg>
        </section>

        {/* Contact */}
        <section id="contacto" className="rounded-2xl bg-forest p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-cream" data-reveal="left">Contacto</h2>
          <p className="mt-2 text-cream/70" data-reveal="left" style={{ transitionDelay: '100ms' }}>Escríbenos y te responderemos en breve.</p>
          <form className="mt-6 grid gap-4 sm:grid-cols-2" data-reveal="right" style={{ transitionDelay: '220ms' }}>
            <input type="text" placeholder="Nombre" className="rounded-lg border border-forest/30 bg-white px-4 py-3 text-forest placeholder:text-forest/40 outline-none transition focus:border-gold focus:ring-1 focus:ring-gold" />
            <input type="email" placeholder="Email" className="rounded-lg border border-forest/30 bg-white px-4 py-3 text-forest placeholder:text-forest/40 outline-none transition focus:border-gold focus:ring-1 focus:ring-gold" />
            <input type="text" placeholder="Empresa" className="sm:col-span-2 rounded-lg border border-forest/30 bg-white px-4 py-3 text-forest placeholder:text-forest/40 outline-none transition focus:border-gold focus:ring-1 focus:ring-gold" />
            <textarea placeholder="Mensaje" rows={4} className="sm:col-span-2 resize-none rounded-lg border border-forest/30 bg-white px-4 py-3 text-forest placeholder:text-forest/40 outline-none transition focus:border-gold focus:ring-1 focus:ring-gold" />
            <button type="submit" className="sm:col-span-2 rounded-lg bg-gold px-4 py-3 font-semibold text-forest-dark transition hover:bg-gold-dark">Enviar mensaje</button>
          </form>
        </section>
      </main>

      <footer className="border-t border-white/20 bg-forest px-6 py-8 text-sm text-cream/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <span className="text-cream/80">CaraNorte · Combinamos inteligencia, artificial y humana, para escalar tu negocio</span>
          <span className="opacity-60">© {new Date().getFullYear()} · caranorte.online</span>
        </div>
      </footer>
    </div>
  );
}

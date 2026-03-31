'use client'

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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
  {
    id: "ux",
    title: "Diseño de Experiencia y Productos Digitales",
    short: "Diseñamos experiencias digitales centradas en el usuario, desde el prototipo al producto.",
    caseTag: "Construcción · 6 semanas",
    caseTitle: "Plataforma interna de gestión de obras",
    caseBody: "60% de abandono en el proceso de carga de datos por parte de los operarios en campo. Rediseñamos el flujo completo con validación en terreno. La adopción subió al 91% en el primer mes post-lanzamiento.",
  },
  {
    id: "dev",
    title: "Desarrollo de Soluciones a Medida",
    short: "Construimos aplicaciones internas, herramientas de gestión y sistemas personalizados.",
    caseTag: "Construcción · 4 meses",
    caseTitle: "Empresa constructora mediana",
    caseBody: "Usaban 4 herramientas distintas para gestionar proyectos sin integración entre ellas: planillas, emails y chats. Desarrollamos un sistema centralizado a medida. Ahorro de $28k/año en licencias y visibilidad 100% en tiempo real.",
  },
  {
    id: "acom",
    title: "Acompañamiento y Mejora Continua",
    short: "Soporte post-implementación, iteración de soluciones y optimización continua.",
    caseTag: "Energía · 6 meses",
    caseTitle: "Empresa de energía renovable",
    caseBody: "Tras implementar un modelo predictivo de fallas en activos, acompañamos al equipo durante 6 meses con revisiones mensuales. La precisión del modelo mejoró un 23% y se evitaron 4 paradas no programadas que representaban $180k en pérdidas.",
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

export default function Home() {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const companyList = useMemo(() => partners.join("    ·    "), []);

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

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      {/* Marquee */}
      <div className="border-b border-zinc-800/60 bg-zinc-900/90 py-4">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-3">Empresas que confían en nosotros</p>
        <div
          className="overflow-hidden"
          style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
        >
          <div
            className="animate-marquee whitespace-nowrap text-xs font-bold uppercase tracking-widest text-zinc-300"
            style={{ animationDuration: "40s", willChange: "transform" }}
          >
            {companyList}    ·    {companyList}    ·    {companyList}    ·    {companyList}
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/60 bg-zinc-950/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xl font-extrabold tracking-tight text-white">CaraNorte SAS</p>
            <p className="text-xs text-cyan-400 hidden sm:block">Consultoría de negocio e inteligencia artificial</p>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-semibold text-cyan-100">
            <a href="#servicios" className="transition hover:text-white">Servicios</a>
            <a href="#proceso" className="transition hover:text-white">Proceso</a>
            <a href="#nosotros" className="transition hover:text-white">Nosotros</a>
            <a href="#equipo" className="transition hover:text-white">Equipo</a>
            <a href="#contacto" className="transition hover:text-white">Contacto</a>
            <Link href="/login" className="rounded-full border border-cyan-300 px-4 py-2 text-cyan-100 transition hover:bg-cyan-500/20 hover:text-white">
              Iniciar sesión
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menú"
          >
            <span className={`block h-0.5 w-6 bg-cyan-100 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-6 bg-cyan-100 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-cyan-100 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden border-t border-zinc-800 bg-zinc-900 px-6 py-5 flex flex-col gap-4 text-sm font-semibold text-cyan-100">
            <a href="#servicios" onClick={() => setMenuOpen(false)} className="hover:text-white">Servicios</a>
            <a href="#proceso" onClick={() => setMenuOpen(false)} className="hover:text-white">Proceso</a>
            <a href="#nosotros" onClick={() => setMenuOpen(false)} className="hover:text-white">Nosotros</a>
            <a href="#equipo" onClick={() => setMenuOpen(false)} className="hover:text-white">Equipo</a>
            <a href="#contacto" onClick={() => setMenuOpen(false)} className="hover:text-white">Contacto</a>
            <Link href="/login" onClick={() => setMenuOpen(false)} className="rounded-full border border-cyan-300 px-4 py-2 text-center text-cyan-100 hover:bg-cyan-500/20">
              Iniciar sesión
            </Link>
          </nav>
        )}
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-24 pt-12">

        {/* Hero */}
        <section className="flex flex-col items-center text-center py-8">
          <p className="inline-block rounded-full bg-cyan-500/15 px-4 py-1 text-xs font-bold uppercase tracking-widest text-cyan-200">Consultoría estratégica</p>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Combinamos inteligencia, artificial y humana, para revolucionar tu negocio
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-cyan-200">
            Acompañamos a organizaciones en su transformación combinando el criterio humano y la potencia de la inteligencia artificial. Diagnóstico honesto, implementación iterativa e impacto real y medible.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#proceso" className="rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400">Cómo trabajamos</a>
            <a href="#servicios" className="rounded-xl border border-cyan-300 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:border-white hover:text-white">Ver servicios</a>
          </div>
        </section>

        {/* Services */}
        <section id="servicios">
          <h2 className="text-3xl font-bold text-white" data-reveal="left">Nuestros servicios</h2>
          <p className="mt-2 max-w-2xl text-cyan-300" data-reveal="left" style={{ transitionDelay: '100ms' }}>Hacé clic en cada servicio para ver un caso concreto de impacto real.</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3" data-reveal="left" style={{ transitionDelay: '220ms' }}>
            {services.map((service) => {
              const isFlipped = flipped[service.id];
              return (
                <button
                  key={service.id}
                  onClick={() => toggleFlip(service.id)}
                  className="group relative h-64 cursor-pointer rounded-2xl border border-cyan-500/30 p-1 shadow-2xl transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01] focus:outline-none"
                  type="button"
                  style={{ perspective: 1200 }}
                >
                  <div className={`relative h-full w-full transition-transform duration-500 ease-in-out ${isFlipped ? "rotate-y-180" : ""}`} style={{ transformStyle: "preserve-3d" }}>
                    {/* Front */}
                    <div className="absolute inset-0 rounded-2xl bg-zinc-900 p-5 text-left backface-hidden group-hover:ring-2 group-hover:ring-cyan-400/50">
                      <h3 className="text-lg font-bold text-white leading-snug">{service.title}</h3>
                      <p className="mt-3 text-sm text-cyan-200">{service.short}</p>
                      <p className="absolute bottom-5 left-5 text-xs text-zinc-500">Toca para ver caso real →</p>
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-800 to-cyan-900 p-5 text-left backface-hidden rotate-y-180 flex flex-col justify-between">
                      <div>
                        <span className="inline-block rounded-full bg-cyan-600/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-cyan-200">{service.caseTag}</span>
                        <h3 className="mt-2 text-sm font-bold text-white">{service.caseTitle}</h3>
                        <p className="mt-2 text-xs text-cyan-100 leading-relaxed">{service.caseBody}</p>
                      </div>
                      <p className="text-[10px] text-cyan-300/60">Toca para volver</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Process */}
        <section id="proceso">
          <h2 className="text-3xl font-bold text-white" data-reveal="right">Cómo trabajamos</h2>
          <p className="mt-2 max-w-2xl text-cyan-300" data-reveal="right" style={{ transitionDelay: '100ms' }}>Un proceso probado, diseñado para minimizar el riesgo y maximizar el impacto desde el primer día.</p>

          <div className="mt-10 grid gap-px bg-zinc-800/50 rounded-2xl overflow-hidden sm:grid-cols-2 lg:grid-cols-4" data-reveal="right" style={{ transitionDelay: '220ms' }}>
            {steps.map((step) => (
              <div key={step.n} className="bg-zinc-900 p-6 flex flex-col gap-3">
                <span className="text-5xl font-black text-cyan-500/25 leading-none">{step.n}</span>
                <h3 className="text-base font-bold text-white">{step.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Nosotros */}
        <section id="nosotros" className="rounded-2xl border border-cyan-700/30 bg-zinc-900/70 p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-white" data-reveal="left">Nosotros</h2>
          <p className="mt-4 text-cyan-100 max-w-3xl" data-reveal="left" style={{ transitionDelay: '100ms' }}>CaraNorte SAS es una consultora con raíces en la Patagonia argentina que combina inteligencia humana e inteligencia artificial para transformar organizaciones. Entendemos el negocio antes que la tecnología, y cada solución que proponemos responde a objetivos concretos alineados con los resultados que el cliente necesita alcanzar.</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-reveal="left" style={{ transitionDelay: '220ms' }}>
            <article className="rounded-xl border border-cyan-500/20 bg-cyan-900/50 p-4">
              <h3 className="font-semibold text-cyan-100">Misión</h3>
              <p className="mt-2 text-sm text-cyan-200">Guiamos a las organizaciones en la integración estratégica de la inteligencia artificial con sus procesos de negocio. Nuestro propósito es transformar el potencial tecnológico en resultados concretos, ayudando a las empresas a tomar mejores decisiones basadas en datos, optimizar sus operaciones y generar valor sostenible en el tiempo.</p>
            </article>
            <article className="rounded-xl border border-cyan-500/20 bg-cyan-900/50 p-4">
              <h3 className="font-semibold text-cyan-100">Visión</h3>
              <p className="mt-2 text-sm text-cyan-200">Aspiramos a ser la consultora referente en América Latina en la transformación inteligente de organizaciones, reconocida por nuestra capacidad de conectar tecnología, procesos y negocios. Buscamos liderar el camino hacia una adopción de inteligencia artificial con sentido, donde cada implementación tenga un impacto real y medible.</p>
            </article>
            <article className="rounded-xl border border-cyan-500/20 bg-cyan-900/50 p-4">
              <h3 className="font-semibold text-cyan-100">Estrategia</h3>
              <p className="mt-2 text-sm text-cyan-200">Actuamos con un enfoque claro: entender el negocio antes que la tecnología. Cada solución que proponemos responde a un objetivo concreto y ajustado con los resultados que el cliente necesita alcanzar.</p>
            </article>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-white" data-reveal="left" style={{ transitionDelay: '340ms' }}>Valores</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal="right" style={{ transitionDelay: '460ms' }}>
              <article className="rounded-xl border border-cyan-500/20 bg-cyan-900/30 p-4">
                <h4 className="font-semibold text-cyan-100">Orientación a resultados</h4>
                <p className="mt-2 text-sm text-cyan-200">Nos importan los resultados y cumplir objetivos predefinidos, pero también tener resultados ambientales sostenibles siendo responsables con el entorno.</p>
              </article>
              <article className="rounded-xl border border-cyan-500/20 bg-cyan-900/30 p-4">
                <h4 className="font-semibold text-cyan-100">Simplicidad y eficiencia</h4>
                <p className="mt-2 text-sm text-cyan-200">Diseñamos soluciones prácticas, escalables y fáciles de implementar. La complejidad no es un valor en sí mismo: nuestro objetivo es simplificar procesos y mejorar la operación.</p>
              </article>
              <article className="rounded-xl border border-cyan-500/20 bg-cyan-900/30 p-4">
                <h4 className="font-semibold text-cyan-100">Compromiso y cercanía</h4>
                <p className="mt-2 text-sm text-cyan-200">Con raíces en la Patagonia argentina, promovemos soluciones que respeten el medio ambiente y el uso sostenible de los recursos naturales. Nos involucramos entendiendo no solo el negocio, sino también su impacto en la comunidad y el entorno.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="equipo">
          <h2 className="text-3xl font-bold text-white" data-reveal="right">Equipo CaraNorte</h2>
          <p className="mt-2 text-cyan-300" data-reveal="right" style={{ transitionDelay: '100ms' }}>Las personas detrás de cada proyecto.</p>
          <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4" data-reveal="right" style={{ transitionDelay: '220ms' }}>
            {team.map((member) => (
              <a
                key={member.name}
                href={member.link}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex flex-col items-center rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:bg-zinc-900"
              >
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full overflow-hidden bg-cyan-800 flex items-center justify-center shrink-0 mb-4">
                  {imgErrors[member.name] ? (
                    <span className="text-xl font-bold text-white select-none">{member.initials}</span>
                  ) : (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={() => handleImgError(member.name)}
                    />
                  )}
                </div>
                <p className="text-sm font-bold text-white leading-tight">{member.name}</p>
                <p className="mt-1 text-xs text-cyan-300">{member.role}</p>
                <p className="mt-3 text-[10px] uppercase tracking-widest text-zinc-500 group-hover:text-cyan-400 transition-colors">LinkedIn →</p>
              </a>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contacto" className="rounded-2xl border border-cyan-800/60 bg-zinc-900/80 p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-white" data-reveal="left">Contacto</h2>
          <p className="mt-2 text-cyan-300" data-reveal="left" style={{ transitionDelay: '100ms' }}>Escríbenos y te responderemos en breve.</p>
          <form className="mt-6 grid gap-4 sm:grid-cols-2" data-reveal="right" style={{ transitionDelay: '220ms' }}>
            <input type="text" placeholder="Nombre" className="rounded-lg border border-cyan-700/50 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-cyan-300 transition" />
            <input type="email" placeholder="Email" className="rounded-lg border border-cyan-700/50 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-cyan-300 transition" />
            <input type="text" placeholder="Empresa" className="sm:col-span-2 rounded-lg border border-cyan-700/50 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-cyan-300 transition" />
            <textarea placeholder="Mensaje" rows={4} className="sm:col-span-2 rounded-lg border border-cyan-700/50 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-cyan-300 transition resize-none" />
            <button type="submit" className="sm:col-span-2 rounded-lg bg-cyan-500 px-4 py-3 font-semibold text-zinc-900 transition hover:bg-cyan-400">Enviar mensaje</button>
          </form>
        </section>
      </main>

      <footer className="border-t border-zinc-800 px-6 py-6 text-sm text-zinc-500">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 sm:flex-row text-center sm:text-left">
          <span className="text-zinc-400">CaraNorte SAS · Combinamos inteligencia, artificial y humana, para revolucionar tu negocio</span>
          <span>© {new Date().getFullYear()} · caranorte.online</span>
        </div>
      </footer>
    </div>
  );
}

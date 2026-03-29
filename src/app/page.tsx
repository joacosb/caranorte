'use client'

import Link from "next/link";
import { useMemo, useState } from "react";

const services = [
  {
    id: "diag",
    title: "Diagnóstico Estratégico de Negocio & IA",
    short: "Relevamos procesos, identificamos cuellos de botella y definimos el roadmap de IA.",
    details: "Evaluamos oportunidades de automatización e IA alineadas a los objetivos del negocio, proponiendo un roadmap con pasos concretos y medibles.",
    examples: ["Relevamiento de procesos actuales", "Identificación de cuellos de botella", "Evaluación de oportunidades de IA", "Definición de roadmap"]
  },
  {
    id: "auto",
    title: "Automatización Inteligente de Procesos",
    short: "Automatizamos tareas repetitivas e integramos sistemas para optimizar workflows.",
    details: "Diseñamos e implementamos automatizaciones que reducen el esfuerzo operativo y liberan tiempo para que los equipos se concentren en lo que importa.",
    examples: ["Automatización de tareas repetitivas", "Integración entre sistemas", "Optimización de workflows operativos"]
  },
  {
    id: "impl",
    title: "Implementación de Soluciones de IA",
    short: "Llevamos modelos de IA a producción: predictivos, recomendaciones, chatbots y más.",
    details: "Implementamos soluciones de IA end-to-end adaptadas al contexto de cada cliente, con supervisión de performance y métricas de impacto.",
    examples: ["Modelos predictivos", "Sistemas de recomendación", "Chatbots y asistentes inteligentes", "Procesamiento de datos"]
  },
  {
    id: "data",
    title: "Data Analytics & Visualización",
    short: "Traducimos datos en dashboards claros, KPIs accionables y análisis de performance.",
    details: "Desarrollamos plataformas de visualización en Power BI y Tableau con definición de KPIs y análisis orientado a la toma de decisiones.",
    examples: ["Dashboards en Power BI / Tableau", "Definición de KPIs", "Análisis de performance"]
  },
  {
    id: "ux",
    title: "Diseño de Experiencia y Productos Digitales",
    short: "Diseñamos experiencias digitales centradas en el usuario, desde el prototipo al producto.",
    details: "Combinamos diseño UX/UI con prototipado y validación para mejorar la experiencia en plataformas internas y externas.",
    examples: ["Diseño UX/UI", "Prototipado de soluciones", "Mejora de experiencia en plataformas"]
  },
  {
    id: "dev",
    title: "Desarrollo de Soluciones a Medida",
    short: "Construimos aplicaciones internas, herramientas de gestión y sistemas personalizados.",
    details: "Desarrollamos software robusto y escalable ajustado a las necesidades reales del cliente, con arquitectura limpia y despliegue continuo.",
    examples: ["Desarrollo de aplicaciones internas", "Herramientas de gestión", "Sistemas personalizados"]
  },
  {
    id: "acom",
    title: "Acompañamiento y Mejora Continua",
    short: "Soporte post-implementación, iteración de soluciones y optimización continua.",
    details: "Acompañamos a los equipos luego del lanzamiento, revisando métricas e iterando sobre las soluciones para maximizar el valor generado.",
    examples: ["Soporte post-implementación", "Iteración de soluciones", "Optimización continua"]
  }
];

const team = [
  { name: "Camila Primo", role: "UX/UI", link: "https://www.linkedin.com/in/primo-camila/" },
  { name: "Julieta Chinkes", role: "Product Owner", link: "https://www.linkedin.com/in/julieta-chinkes-48a7b126a/" },
  { name: "Renata Belén Moreno Vera", role: "UX/UI Designer", link: "https://www.linkedin.com/in/renatabmv/" },
  { name: "Agustina Sol Forini", role: "Scrum Master", link: "https://www.linkedin.com/in/agustina-sol-forini/" },
  { name: "Tabatha Veronica Cesar Castaño", role: "Product Analyst", link: "https://www.linkedin.com/in/tabatha-cesar-95a325213/" },
  { name: "Tiago Harari", role: "Tech Leader", link: "https://www.linkedin.com/in/tiagoharari/" },
  { name: "Joaquín Sosa Beláustegui", role: "Desarrollador", link: "https://www.linkedin.com/in/joaquinsb/" }
];

const partners = ["Nodek Energía", "YPF Luz", "Edesur", "Enel Green Power", "Petrobras", "Cotec", "Globant", "Mercado Libre"];

export default function Home() {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const companyList = useMemo(() => partners.join("    ·    "), []);

  function toggleFlip(id: string) {
    setFlipped((s) => ({ ...s, [id]: !s[id] }));
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="border-b border-zinc-800/60 bg-zinc-900/90 py-4">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-3">Empresas que confían en nosotros</p>
        <div
          className="overflow-hidden"
          style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
        >
          <div
            className="animate-marquee whitespace-nowrap text-xs font-bold uppercase tracking-widest text-zinc-300"
            style={{ animationDuration: "32s" }}
          >
            {companyList}    ·    {companyList}
          </div>
        </div>
      </div>

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div>
          <p className="text-2xl font-extrabold tracking-tight text-white">CaraNorte SAS</p>
          <p className="text-sm text-cyan-200">Consultoría de negocio e inteligencia artificial</p>
        </div>
        <nav className="flex items-center gap-4 text-sm font-semibold text-cyan-100">
          <a href="#servicios" className="transition hover:text-white">Servicios</a>
          <a href="#equipo" className="transition hover:text-white">Equipo</a>
          <a href="#contacto" className="transition hover:text-white">Contacto</a>
          <Link href="/login" className="rounded-full border border-cyan-300 px-4 py-2 text-cyan-100 transition hover:bg-cyan-500/20 hover:text-white">
            Iniciar sesión
          </Link>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-20">
        <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-block rounded-full bg-cyan-500/15 px-4 py-1 text-xs font-bold uppercase tracking-widest text-cyan-200">Consultoría estratégica</p>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-white md:text-6xl">Combinamos inteligencia, artificial y humana, para revolucionar tu negocio</h1>
            <p className="mt-5 max-w-xl text-lg text-cyan-200">Acompañamos a organizaciones en su transformación combinando experiencia humana e inteligencia artificial: diagnóstico, automatización, implementación y mejora continua, con foco en impacto real y medible.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/login" className="rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400">Panel de cliente</Link>
              <a href="#servicios" className="rounded-xl border border-cyan-300 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:border-white hover:text-white">Ver servicios</a>
            </div>
          </div>
          <div className="relative rounded-3xl border border-cyan-500/30 bg-cyan-900/40 p-8 backdrop-blur-xl shadow-[0_8px_30px_rgba(20,20,55,0.5)]">
            <h2 className="text-white text-2xl font-bold">Misión & Visión</h2>
            <p className="mt-4 text-cyan-100">Guiamos a las organizaciones en la integración estratégica de la inteligencia artificial con sus procesos de negocio. Transformamos el potencial tecnológico en resultados concretos, ayudando a tomar mejores decisiones, optimizar operaciones y generar valor sostenible.</p>
            <p className="mt-3 text-cyan-100">Aspiramos a ser la consultora referente en América Latina en la transformación inteligente de organizaciones, liderando una adopción de IA con sentido y con impacto real y medible.</p>
          </div>
        </section>

        <section id="servicios">
          <h2 className="text-3xl font-bold text-white">Nuestros servicios</h2>
          <p className="mt-2 max-w-2xl text-cyan-300">Soluciones prácticas y probadas para acelerar el valor de datos, IA y procesos en empresas en transformación.</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const isFlipped = flipped[service.id];
              const isHovered = hoveredService === service.id;

              return (
                <button
                  key={service.id}
                  onClick={() => toggleFlip(service.id)}
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                  className="group relative h-64 cursor-pointer rounded-2xl border border-cyan-500/30 p-1 shadow-2xl transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01] focus:outline-none"
                  type="button"
                  style={{ perspective: 1200 }}
                >
                  <div className={`relative h-full w-full transition-transform duration-500 ease-in-out transform ${isFlipped ? "rotate-y-180" : ""}`}>
                    <div className={`absolute inset-0 rounded-2xl bg-zinc-900 p-5 text-white backface-hidden ${isHovered ? "ring-2 ring-cyan-300" : ""}`}>
                      <h3 className="text-xl font-bold">{service.title}</h3>
                      <p className="mt-3 text-sm text-cyan-200">{service.short}</p>
                      <p className="mt-4 text-xs text-cyan-100">Click para ver ejemplos concretos</p>
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-cyan-700 p-5 text-white backface-hidden rotate-y-180">
                      <h3 className="text-lg font-bold">¿Qué hace CaraNorte?</h3>
                      <p className="mt-3 text-sm">{service.details}</p>
                      <ul className="mt-3 space-y-1 text-sm">
                        {service.examples.map((example) => (
                          <li key={example} className="list-disc pl-4 text-cyan-100">{example}</li>
                        ))}
                      </ul>
                      <p className="mt-4 text-xs text-cyan-50">Clic para volver</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section id="nosotros" className="rounded-2xl border border-cyan-700/30 bg-zinc-900/70 p-8">
          <h2 className="text-3xl font-bold text-white">Nosotros</h2>
          <p className="mt-4 text-cyan-100">CaraNorte SAS es una consultora con raíces en la Patagonia argentina que combina inteligencia humana e inteligencia artificial para transformar organizaciones. Entendemos el negocio antes que la tecnología, y cada solución que proponemos responde a objetivos concretos alineados con los resultados que el cliente necesita alcanzar.</p>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-xl border border-cyan-500/20 bg-cyan-900/50 p-4">
              <h3 className="font-semibold text-cyan-100">Misión</h3>
              <p className="mt-2 text-cyan-200">Guiamos a las organizaciones en la integración estratégica de la inteligencia artificial con sus procesos de negocio. Nuestro propósito es transformar el potencial tecnológico en resultados concretos, ayudando a las empresas a tomar mejores decisiones basadas en datos, optimizar sus operaciones y generar valor sostenible en el tiempo.</p>
            </article>
            <article className="rounded-xl border border-cyan-500/20 bg-cyan-900/50 p-4">
              <h3 className="font-semibold text-cyan-100">Visión</h3>
              <p className="mt-2 text-cyan-200">Aspiramos a ser la consultora referente en América Latina en la transformación inteligente de organizaciones, reconocida por nuestra capacidad de conectar tecnología, procesos y negocios. Buscamos liderar el camino hacia una adopción de inteligencia artificial con sentido, donde cada implementación tenga un impacto real y medible.</p>
            </article>
            <article className="rounded-xl border border-cyan-500/20 bg-cyan-900/50 p-4">
              <h3 className="font-semibold text-cyan-100">Estrategia</h3>
              <p className="mt-2 text-cyan-200">Actuamos con un enfoque claro: entender el negocio antes que la tecnología. Cada solución que proponemos responde a un objetivo concreto y ajustado con los resultados que el cliente necesita alcanzar.</p>
            </article>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-white">Valores</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

        <section id="equipo">
          <h2 className="text-3xl font-bold text-white">Equipo CaraNorte</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <a
                key={member.name}
                href={member.link}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex flex-col justify-between rounded-2xl border border-cyan-400/30 bg-zinc-900/80 p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:bg-cyan-900/40"
              >
                <div>
                  <p className="text-lg font-bold text-white">{member.name}</p>
                  <p className="mt-1 text-sm text-cyan-200">{member.role}</p>
                </div>
                <p className="mt-3 text-xs uppercase tracking-wide text-cyan-100/70 group-hover:text-cyan-50">LinkedIn</p>
              </a>
            ))}
          </div>
        </section>

        <section id="contacto" className="rounded-2xl border border-cyan-800/60 bg-zinc-900/80 p-8">
          <h2 className="text-3xl font-bold text-white">Contacto</h2>
          <p className="mt-2 text-cyan-300">Escríbenos y te responderemos en breve. Este sitio es proyecto de tesis UBA.</p>
          <form className="mt-6 grid gap-4 sm:grid-cols-2">
            <input type="text" placeholder="Nombre" className="rounded-lg border border-cyan-700/50 bg-zinc-950 px-4 py-2 text-white outline-none focus:border-cyan-300" />
            <input type="email" placeholder="Email" className="rounded-lg border border-cyan-700/50 bg-zinc-950 px-4 py-2 text-white outline-none focus:border-cyan-300" />
            <input type="text" placeholder="Empresa" className="sm:col-span-2 rounded-lg border border-cyan-700/50 bg-zinc-950 px-4 py-2 text-white outline-none focus:border-cyan-300" />
            <textarea placeholder="Mensaje" rows={4} className="sm:col-span-2 rounded-lg border border-cyan-700/50 bg-zinc-950 px-4 py-2 text-white outline-none focus:border-cyan-300" />
            <button type="submit" className="sm:col-span-2 rounded-lg bg-cyan-500 px-4 py-3 font-semibold text-zinc-900 transition hover:bg-cyan-400">Enviar mensaje</button>
          </form>
        </section>
      </main>

      <footer className="border-t border-zinc-800 px-6 py-6 text-sm text-cyan-200">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 sm:flex-row">
          <span>CaraNorte SAS · Combinamos inteligencia, artificial y humana, para revolucionar tu negocio</span>
          <span>© {new Date().getFullYear()} · caranorte.online</span>
        </div>
      </footer>
    </div>
  );
}

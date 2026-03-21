'use client'

import Link from "next/link";
import { useMemo, useState } from "react";

const services = [
  {
    id: "diag",
    title: "Diagnóstico Estratégico de Negocio & IA",
    short: "Identificación de oportunidades, riesgos y valor para alinear IA a objetivos.",
    details: "Mapeamos procesos, datos y capacidades, entregando roadmap corto/mediano plazo para resultados medibles.",
    examples: ["Análisis de eficiencia de consumo energético", "Evaluación de madurez de datos"]
  },
  {
    id: "auto",
    title: "Automatización Inteligente de Procesos",
    short: "Automatizamos tareas repetitivas con RPA + ML para liberar tiempo humano.",
    details: "Implementamos bots con estándares de control y supervisión, integrados a sistemas existentes.",
    examples: ["Facturación automática", "Gestión de workflows de compras"]
  },
  {
    id: "impl",
    title: "Implementación de Soluciones de IA",
    short: "Desarrollo de modelos y pipelines productivos adaptados al sector energético.",
    details: "Desde POC hasta deploy en cloud/híbrido, con monitoreo de desempeño y retraining.",
    examples: ["Predicción de demanda", "Mantenimiento predictivo"]
  },
  {
    id: "data",
    title: "Data Analytics & Visualización",
    short: "Insights accionables con dashboards, reports y análisis estadístico.",
    details: "Implementamos pipelines ETL/ELT con buenas prácticas de gobernanza de datos.",
    examples: ["Panel de KPIs de proyecto", "Análisis de temperatura de activos"]
  },
  {
    id: "ux",
    title: "Diseño de Experiencia y Productos Digitales",
    short: "Diseñamos interfaces humanas, coherentes y orientadas a la adopción.",
    details: "Prototipos interactivos y pruebas UX para validar con usuarios clave.",
    examples: ["Portal de seguimiento de proyectos", "App de control de consumo"]
  },
  {
    id: "dev",
    title: "Desarrollo de Soluciones a Medida",
    short: "Construimos sistemas hechos a medida para cada necesidad de negocio.",
    details: "Back-end, front-end y APIs escalables con documentación, pruebas e integración continua.",
    examples: ["Gestor de órdenes de trabajo", "Sistema de notificaciones multisensor"]
  },
  {
    id: "acom",
    title: "Acompañamiento y Mejora Continua",
    short: "Asesoría constante para iterar, medir y optimizar valor de la IA.",
    details: "Review mensual de métricas, OKRs y acciones para mantener evolución constante.",
    examples: ["Sprints de mejora", "Coaching de equipos de datos"]
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
  const companyList = useMemo(() => partners.join("   •   "), []);

  function toggleFlip(id: string) {
    setFlipped((s) => ({ ...s, [id]: !s[id] }));
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="border-b border-zinc-800 bg-gradient-to-r from-cyan-800 via-cyan-900 to-indigo-900 py-2 text-sm text-cyan-100">
        <div className="mx-auto flex w-full max-w-6xl overflow-hidden">
          <div className="animate-marquee whitespace-nowrap text-cyan-100 font-semibold" style={{ animationDuration: "24s" }}>
            {companyList}   •   {companyList}
          </div>
        </div>
      </div>

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div>
          <p className="text-2xl font-extrabold tracking-tight text-white">CaraNorte SAS</p>
          <p className="text-sm text-cyan-200">Consultoría de Sistemas de Información e IA</p>
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
            <h1 className="mt-6 text-4xl font-bold leading-tight text-white md:text-6xl">Transformamos la inteligencia artificial en resultados reales</h1>
            <p className="mt-5 max-w-xl text-lg text-cyan-200">Acompañamos a organizaciones en cada paso de su viaje IA: diagnóstico, automatización, implementación y mejora continua, con foco en impacto tangible.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/login" className="rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400">Panel de cliente</Link>
              <a href="#servicios" className="rounded-xl border border-cyan-300 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:border-white hover:text-white">Ver servicios</a>
            </div>
          </div>
          <div className="relative rounded-3xl border border-cyan-500/30 bg-cyan-900/40 p-8 backdrop-blur-xl shadow-[0_8px_30px_rgba(20,20,55,0.5)]">
            <h2 className="text-white text-2xl font-bold">Misión & Visión</h2>
            <p className="mt-4 text-cyan-100">Guiar a organizaciones en la integración estratégica de IA con sus procesos de negocio, transformando potencial tecnológico en resultados concretos.</p>
            <p className="mt-3 text-cyan-100">Ser la consultora referente en América Latina en transformación inteligente de organizaciones.</p>
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
                  className="group relative h-64 cursor-pointer rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-zinc-900/70 to-cyan-950/80 p-1 shadow-2xl transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01] focus:outline-none"
                  type="button"
                >
                  <div className={`relative h-full w-full rounded-2xl overflow-hidden transition-transform duration-500 ease-in-out ${isFlipped ? "rotate-y-180" : ""}`}>
                    <div className={`absolute inset-0 backface-hidden flex flex-col justify-between p-5 ${isHovered ? "bg-cyan-600/20" : "bg-zinc-900/80"}`}>
                      <div>
                        <h3 className="text-xl font-bold text-white">{service.title}</h3>
                        <p className="mt-3 text-sm text-cyan-100">{service.short}</p>
                      </div>
                      <p className="text-xs font-medium text-cyan-200">Haz clic para ver más</p>
                    </div>
                    <div className="absolute inset-0 rotate-y-180 backface-hidden bg-gradient-to-br from-cyan-500 to-indigo-600 p-6 text-white">
                      <h3 className="text-lg font-bold">{service.title}</h3>
                      <p className="mt-3 text-sm">{service.details}</p>
                      <ul className="mt-4 list-disc pl-5 text-sm text-cyan-50">
                        {service.examples.map((example) => (<li key={example}>{example}</li>))}
                      </ul>
                      <p className="mt-4 text-xs opacity-80">Haz clic para volver.</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section id="nosotros" className="rounded-2xl border border-cyan-700/30 bg-zinc-900/70 p-8">
          <h2 className="text-3xl font-bold text-white">Nosotros</h2>
          <p className="mt-4 text-cyan-100">CaraNorte SAS es una consultora de sistemas de información e inteligencia artificial. Trabajamos con enfoque minimalista, moderno y profesional para acompañar a empresas en su transformación digital.</p>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-xl border border-cyan-500/20 bg-cyan-900/50 p-4">
              <h3 className="font-semibold text-cyan-100">Misión</h3>
              <p className="mt-2 text-cyan-200">Guiar a organizaciones en la integración estratégica de IA con sus procesos de negocio. Transformar el potencial tecnológico en resultados concretos.</p>
            </article>
            <article className="rounded-xl border border-cyan-500/20 bg-cyan-900/50 p-4">
              <h3 className="font-semibold text-cyan-100">Visión</h3>
              <p className="mt-2 text-cyan-200">Ser la consultora referente en América Latina en transformación inteligente de organizaciones.</p>
            </article>
            <article className="rounded-xl border border-cyan-500/20 bg-cyan-900/50 p-4">
              <h3 className="font-semibold text-cyan-100">Valores</h3>
              <ul className="mt-2 list-disc pl-5 text-cyan-200">
                <li>Dirección estratégica</li>
                <li>Orientación a resultados</li>
                <li>Inteligencia aplicada</li>
                <li>Simplicidad y eficiencia</li>
                <li>Compromiso y cercanía</li>
              </ul>
            </article>
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
          <span>CaraNorte SAS · Transformación inteligente de organizaciones</span>
          <span>© {new Date().getFullYear()} · caranorte.online</span>
        </div>
      </footer>
    </div>
  );
}

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div>
          <p className="text-xl font-bold tracking-tight">CaraNorte SAS</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Consultoría de Sistemas de Información e IA</p>
        </div>
        <nav className="flex items-center gap-3 text-sm font-medium">
          <a href="#servicios" className="hover:text-cyan-700 dark:hover:text-cyan-300">Servicios</a>
          <a href="#equipo" className="hover:text-cyan-700 dark:hover:text-cyan-300">Equipo</a>
          <a href="#contacto" className="hover:text-cyan-700 dark:hover:text-cyan-300">Contacto</a>
          <Link
            href="/login"
            className="rounded-full border border-cyan-700 px-4 py-2 text-cyan-700 transition hover:bg-cyan-50 dark:border-cyan-300 dark:text-cyan-300 dark:hover:bg-cyan-900/20"
          >
            Iniciar sesión
          </Link>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-20">
        <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-block rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-200">
              Consultoría estratégica
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">Transformamos la inteligencia artificial en resultados reales</h1>
            <p className="mt-5 max-w-xl text-lg text-zinc-600 dark:text-zinc-300">
              En CaraNorte guiamos a empresas como Nodek Energía en la adopción inteligente de IA, integrando tecnología con negocio para maximizar impacto, eficiencia y continuidad.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/login" className="rounded-lg bg-cyan-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600">
                Acceder a panel de cliente
              </Link>
              <a href="#servicios" className="rounded-lg border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-800 hover:border-cyan-700 hover:text-cyan-700 dark:border-zinc-700 dark:text-zinc-200">
                Ver servicios
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-xl font-bold">Misión</h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-300">Guiar a organizaciones en la integración estratégica de IA con sus procesos de negocio, transformando potencial tecnológico en resultados concretos.</p>
            <h2 className="mt-6 text-xl font-bold">Visión</h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-300">Ser la consultora referente en América Latina en transformación inteligente de organizaciones.</p>
          </div>
        </section>

        <section id="servicios">
          <h2 className="text-3xl font-bold">Nuestros servicios</h2>
          <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-300">Soluciones integrales desde diagnóstico hasta implementación y mejora continua.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[
              "Diagnóstico Estratégico de Negocio & IA",
              "Automatización Inteligente de Procesos",
              "Implementación de Soluciones de IA",
              "Data Analytics & Visualización",
              "Diseño de Experiencia y Productos Digitales",
              "Desarrollo de Soluciones a Medida",
              "Acompañamiento y Mejora Continua",
            ].map((item) => (
              <article key={item} className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <h3 className="font-semibold">{item}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">Asesoramiento y ejecución especializados para acelerar valor en cada etapa de tu transformación digital.</p>
              </article>
            ))}
          </div>
        </section>

        <section id="equipo">
          <h2 className="text-3xl font-bold">Equipo CaraNorte</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Julieta Chinkes", role: "Product Owner" },
              { name: "Agustina Sol Forini", role: "Scrum Master" },
              { name: "Renata Belén Moreno Vera", role: "UX/UI Designer" },
              { name: "Camila Primo", role: "UX/UI" },
              { name: "Tabatha Veronica Cesar Castaño", role: "Product Analyst" },
              { name: "Tiago Harari", role: "Tech Leader" },
              { name: "Joaquín Sosa Beláustegui", role: "Desarrollador" },
            ].map((member) => (
              <div key={member.name} className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <p className="font-semibold">{member.name}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contacto" className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-3xl font-bold">Contacto</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300">Escríbenos y te responderemos a la brevedad. Esta página es parte del proyecto de tesis de la UBA.</p>
          <form className="mt-6 grid gap-4 sm:grid-cols-2">
            <input type="text" placeholder="Nombre" className="rounded-lg border border-zinc-300 px-4 py-2 outline-none focus:border-cyan-500 dark:border-zinc-700 dark:bg-zinc-950" />
            <input type="email" placeholder="Email" className="rounded-lg border border-zinc-300 px-4 py-2 outline-none focus:border-cyan-500 dark:border-zinc-700 dark:bg-zinc-950" />
            <input type="text" placeholder="Empresa" className="sm:col-span-2 rounded-lg border border-zinc-300 px-4 py-2 outline-none focus:border-cyan-500 dark:border-zinc-700 dark:bg-zinc-950" />
            <textarea placeholder="Mensaje" rows={4} className="sm:col-span-2 rounded-lg border border-zinc-300 px-4 py-2 outline-none focus:border-cyan-500 dark:border-zinc-700 dark:bg-zinc-950" />
            <button type="submit" className="sm:col-span-2 rounded-lg bg-cyan-700 px-4 py-3 font-semibold text-white hover:bg-cyan-600">Enviar mensaje</button>
          </form>
        </section>
      </main>

      <footer className="border-t border-zinc-200 px-6 py-6 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 sm:flex-row">
          <span>CaraNorte SAS · Transformación inteligente de organizaciones</span>
          <span>© {new Date().getFullYear()} · caranorte.online</span>
        </div>
      </footer>
    </div>
  );
}

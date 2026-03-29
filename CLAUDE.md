@AGENTS.md

# CLAUDE.md — caranorte

> Contexto del proyecto para Claude Code. Actualizar este archivo cuando haya cambios importantes.

## Proyecto

- **Repo**: https://github.com/joacosb/caranorte
- **Deploy**: caranorte.online (Vercel)
- **Base de datos**: Supabase (tablas ya creadas y con datos)
- **Cliente activo**: Kodek (único cliente por ahora, el sistema está diseñado para soportar múltiples)

## Stack técnico

- Next.js 16.2.1 con App Router
- React 19.2.4
- TypeScript 5
- Tailwind CSS 4 (usa sintaxis nueva con `@import`, no `@tailwind`)
- Supabase (Auth + PostgreSQL)
- Deploy en Vercel

## Equipo (Grupo 2)

| Nombre | Rol |
|--------|-----|
| Julieta Chinkes | Product Owner |
| Agustina Sol Forini | Scrum Master |
| Renata Belén Moreno Vera | Diseñadora UX/UI |
| Camila Primo | UX/UI |
| Tabatha Veronica Cesar Castaño | Product Analyst |
| Tiago Harari | Tech Leader |
| Joaquín Sosa Beláustegui | Desarrollador |

## Contexto académico

Materia: APLSI (Análisis y Planificación de LSI), cátedra Daniel Piorun, Prof. Iván Duarte. UBA FCE, cursada 2026-01.
El equipo trabaja con un cliente real (Kodek) a lo largo de 12 entregas organizadas en 4 épicas. Framework PMBOK para gestión, TOGAF para arquitectura empresarial.
Inicio de clases: 12/03/2026. Fin de clases: 03/07/2026.

## Las 12 entregas

Fechas según cronograma APLSI 2026-01.

| # | Temática | Épica | Fecha | Resultado Esperado |
|---|----------|-------|-------|--------------------|
| 1 | Selección del Caso | 1 | 20/03/2026 | Presentación del cliente en PowerPoint (4 slides) |
| 2 | Diagnóstico Organizacional | 1 | 27/03/2026 | Completar template de Diagnóstico Organizacional |
| 3 | Arquitectura Empresarial Origen | 1 | 03/04/2026 | Completar Template + Diagrama AE Origen |
| 4 | Innovación para la transformación | 2 | 10/04/2026 | Completar Template + Elevator Pitch de Innovación |
| 5 | Arquitectura Empresarial Destino | 2 | 17/04/2026 | Completar Template + Diagrama AE Destino |
| 6 | Matriz de Brechas y Escenarios | 2 | 24/04/2026 | Matriz de brechas en Excel + Modelo de Escenarios |
| 7 | Alcance del Proyecto | 3 | 01/05/2026 | Completar template de Alcance |
| 8 | Análisis del Mercado y Benchmarking | 3 | 08/05/2026 | RFI + Links videos de proveedores preseleccionados |
| 9 | Factibilidad | 3 | 15/05/2026 | Matriz RFP en Excel |
| 10 | Evaluación Económica | 4 | 22/05/2026 | Completar Template + aspecto económico en RFP |
| 11 | Análisis de la propuesta comercial | 4 | 29/05/2026 | Completar Template + Matriz RFP completa |
| 12 | Cierre del Proyecto | 4 | 05/06/2026 | Presentación final + Página Web + Resumen Ejecutivo |

Nombres de épicas en el frontend:
- Épica 1: "Diagnóstico y Arquitectura Origen"
- Épica 2: "Innovación y Arquitectura Destino"
- Épica 3: "Planificación y Factibilidad"
- Épica 4: "Evaluación y Cierre"

---

## Estado actual del código (marzo 2026)

### Páginas implementadas

| Ruta | Estado | Descripción |
|------|--------|-------------|
| `/` | ✅ | Landing público de CaraNorte SAS |
| `/login` | ✅ | Login con Supabase Auth |
| `/dashboard` | ✅ | Dashboard con épicas, entregas, fechas y estado por submission |

### Lo que NO existe aún

- Rutas `/[clientSlug]` y `/[clientSlug]/entregas/[number]` (el dashboard vive en `/dashboard` por ahora)
- API routes (no son necesarias por ahora, se usa Supabase directamente)
- El formulario de contacto en el landing **no tiene handler** — no envía nada

### Deuda técnica conocida

- Existe un directorio duplicado `src/src/app/` con copias de archivos. Hay que borrar `src/src/`.
- El formulario de contacto en el landing no tiene backend.

### Contenido del landing (`/`)

- **Slogan**: "Transformamos la Inteligencia Artificial en resultados reales" (en header, H1 hero y footer)
- **Marquee** full-width con fade en bordes (maskImage), fondo `zinc-900`, nombres en uppercase — partners: Nodek Energía, YPF Luz, Edesur, Enel Green Power, Petrobras, Cotec, Globant, Mercado Libre
- **7 service cards** con flip animation: Diagnóstico, Automatización, Implementación, Data Analytics, UX Design, Desarrollo, Acompañamiento (descripciones actualizadas al catálogo oficial)
- **Sección Nosotros**: Misión (texto completo), Visión (texto completo), Estrategia + sección Valores con 4 cards: Orientación a resultados, Inteligencia aplicada, Simplicidad y eficiencia, Compromiso y cercanía
- Sección Equipo con links a LinkedIn
- Formulario de contacto (sin backend)

---

## Supabase — Estado actual

### Tablas creadas y con datos

```sql
clients     (id, name, slug, description, created_at)
deliveries  (id, number, title, epic, expected_result, template_path, due_date, created_at)
submissions (id, client_id, delivery_id, status, file_url, notes, submitted_at, created_at)
-- status: 'pending' | 'submitted' | 'approved' | 'rejected'
```

- Las 12 entregas están cargadas con `due_date` según el cronograma.
- El cliente Kodek está cargado con `slug = 'kodek'`.
- RLS habilitado: cualquier usuario autenticado puede leer todas las tablas (modelo adecuado para tesis — equipo + profesores ven lo mismo, sin vincular usuarios a clientes).
- El schema completo está en `supabase/schema.sql`.

### Acceso de usuarios

No hay tabla `client_users`. Cualquier usuario autenticado en Supabase Auth ve el cliente Kodek. Para dar acceso al equipo o profesores: crear usuario en Supabase Dashboard → Authentication → Users → Add user.

---

## Templates

### Carpeta en el repo

```
/templates
  /01-seleccion-del-caso/
  /02-diagnostico-organizacional/
  /03-arquitectura-empresarial-origen/
  /04-innovacion-para-la-transformacion/
  /05-arquitectura-empresarial-destino/
  /06-matriz-de-brechas-y-escenarios/
  /07-alcance-del-proyecto/
  /08-analisis-del-mercado-y-benchmarking/
  /09-factibilidad/
  /10-evaluacion-economica/
  /11-analisis-de-la-propuesta-comercial/
  /12-cierre-del-proyecto/
  /presentaciones/
```

Cada carpeta tiene `.gitkeep`. Los archivos reales (Word, Excel, PowerPoint) se suben manualmente.

### Link a templates

Las cards del dashboard linkean a la carpeta de SharePoint donde están los templates actualizados:
`https://economicasuba-my.sharepoint.com/:f:/g/personal/29id33012909_campus_economicas_uba_ar/IgBf9lLv958yTI9Lfd7c0oHXAQKp3gnDEhEHOOaxYv6L1mc?e=7rcrOY`

---

## Comportamiento del dashboard (`/dashboard`)

- Carga el cliente Kodek por slug.
- Carga las 12 entregas desde Supabase ordenadas por número.
- Carga las submissions del cliente.
- Agrupa entregas por épica (4 secciones).
- Cada card muestra: número, título, resultado esperado, estado (badge), fecha de entrega, días restantes / "Vence hoy" / "Vencido" / "✓ Entregado".
- Click en card abre la carpeta de SharePoint en pestaña nueva.
- El badge de estado se calcula: si hay submission → usa su status; si no → 'pending'.
- Si status es 'submitted' o 'approved' → muestra "✓ Entregado" en lugar de días restantes.

---

## Convenciones

- Slugs de clientes en kebab-case (`kodek`)
- Carpetas de templates: número con dos dígitos + nombre en kebab-case
- Archivos de template nombrados `template.docx` / `template.xlsx` / `template.pptx`
- Código en inglés, comentarios y contenido en español

## Notas importantes

- El sistema debe escalar para múltiples clientes aunque por ahora solo existe Kodek.
- La ruta `/` es el landing público de la consultora, no el portal de clientes. El portal empieza en `/login` → `/dashboard`.
- Usar Vercel environment variables para las credenciales de Supabase (ya configuradas).

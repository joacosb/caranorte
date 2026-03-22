@AGENTS.md

# CLAUDE.md — caranorte

> Contexto del proyecto para Claude Code. Actualizar este archivo cuando haya cambios importantes.

## Proyecto

- **Repo**: https://github.com/joacosb/caranorte
- **Deploy**: caranorte.online (Vercel)
- **Base de datos**: Supabase
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

Materia universitaria de consultoría de transformación digital (UBA). El equipo trabaja con un cliente real (Kodek) a lo largo de 12 entregas organizadas en 4 épicas (sprints). El framework usado es PMBOK para gestión y TOGAF para arquitectura empresarial.

## Las 12 entregas

| # | Temática | Épica | Resultado Esperado |
|---|----------|-------|--------------------|
| 1 | Selección del Caso | 1 | Presentación PowerPoint (4 slides) |
| 2 | Diagnóstico Organizacional | 1 | Template Word completado |
| 3 | Arquitectura Empresarial Origen | 1 | Template Word + Diagrama AE Origen |
| 4 | Innovación para la transformación | 2 | Template Word + Elevator Pitch |
| 5 | Arquitectura Empresarial Destino | 2 | Template Word + Diagrama AE Destino |
| 6 | Matriz de Brechas y Escenarios | 2 | Matriz Excel + Modelo de Escenarios |
| 7 | Alcance del Proyecto | 3 | Template Word completado |
| 8 | Análisis del Mercado y Benchmarking | 3 | RFI + links videos de proveedores |
| 9 | Factibilidad | 3 | Matriz RFP en Excel |
| 10 | Evaluación Económica | 4 | Template Word + aspecto económico en RFP |
| 11 | Análisis de la propuesta comercial | 4 | Template Word + Matriz RFP completa |
| 12 | Cierre del Proyecto | 4 | Presentación final + Página Web + Resumen Ejecutivo |

---

## Estado actual del código (marzo 2026)

### Páginas implementadas

| Ruta | Estado | Descripción |
|------|--------|-------------|
| `/` | ✅ Implementada | Landing público de CaraNorte SAS (NO es lista de clientes) |
| `/login` | ✅ Implementada | Login con Supabase Auth |
| `/dashboard` | ✅ Básico | Muestra email del usuario logueado + "Próximamente..." |

### Lo que NO existe aún (arquitectura planeada pendiente)

- Rutas `/[clientSlug]` y `/[clientSlug]/entregas/[number]`
- API routes `/api/clients`, `/api/deliveries`, etc.
- Carpeta `/templates` con las consignas
- Tablas `clients`, `deliveries`, `submissions` en Supabase (o al menos no se consumen desde el frontend)
- El formulario de contacto en el landing **no tiene handler** — no envía nada

### Deuda técnica conocida

- Existe un directorio duplicado `src/src/app/` con copias de `login/page.tsx` y `dashboard/page.tsx`. Probablemente resto de una migración. Hay que borrar `src/src/`.
- El dashboard hardcodea el título "NODEK" en lugar de obtenerlo dinámicamente.

### Contenido actual del landing (`/`)

- Marquee con partners: Nodek Energía, YPF Luz, Edesur, Enel Green Power, Petrobras, Cotec, Globant, Mercado Libre
- 7 service cards con flip animation (Diagnóstico, Automatización, Implementación, Data Analytics, UX Design, Desarrollo, Acompañamiento)
- Sección Nosotros con Misión, Visión y Valores
- Sección Equipo con links a LinkedIn
- Formulario de contacto (sin backend)
- Valores corporativos: Dirección estratégica, Orientación a resultados, Inteligencia aplicada, Simplicidad y eficiencia, Compromiso y cercanía

---

## Arquitectura planeada (target state)

### Supabase — Tablas

```sql
-- Clientes
clients (id, name, slug, description, created_at)

-- Las 12 entregas fijas
deliveries (id, number, title, epic, expected_result, template_path, created_at)

-- Submissions de cada cliente por entrega
submissions (id, client_id, delivery_id, status, file_url, notes, submitted_at, created_at)
-- status: 'pending' | 'submitted' | 'approved' | 'rejected'
```

### Estructura de templates en el repo

```
/templates
  /01-seleccion-del-caso/
    consigna.md
    template.docx        ← subir cuando esté disponible
  /02-diagnostico-organizacional/
    consigna.md
    template.docx
  /03-arquitectura-empresarial-origen/
    consigna.md
    template.docx
  ... (hasta /12-cierre-del-proyecto/)
```

Los `consigna.md` se fetchean desde GitHub raw en el frontend para que los cambios en el repo se reflejen sin redeployar.

### API Routes planeadas

```
GET /api/clients
GET /api/clients/[slug]
GET /api/deliveries
GET /api/deliveries/[number]
GET /api/clients/[slug]/deliveries/[number]
```

### Páginas frontend planeadas

```
/                              → landing público (YA EXISTE)
/login                         → login (YA EXISTE)
/dashboard                     → redirigir a /[clientSlug] del usuario logueado (por implementar)
/[clientSlug]                  → dashboard del cliente, entregas agrupadas por épica
/[clientSlug]/entregas/[number] → detalle de entrega con consigna, template y submission
```

---

## Convenciones

- Los slugs de clientes van en kebab-case (ej: `kodek`)
- Las carpetas de templates usan el número con dos dígitos + nombre en kebab-case
- El contenido de cada `consigna.md` se redacta en español
- Los archivos de template van nombrados como `template.docx` / `template.xlsx` / `template.pptx` según corresponda

## Notas importantes

- El sistema debe escalar para múltiples clientes aunque por ahora solo existe Kodek.
- El frontend debe poder navegar las 12 entregas aunque no haya submissions reales.
- Usar Vercel environment variables para las credenciales de Supabase (ya deberían estar configuradas).
- La ruta `/` es el **landing público** de la consultora, no el portal de clientes. El portal empieza en `/login` → `/[clientSlug]`.

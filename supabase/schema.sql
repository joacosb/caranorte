-- =============================================================
-- CaraNorte — Schema Supabase
-- Correr en: Supabase Dashboard → SQL Editor
-- =============================================================

-- -------------------------------------------------------
-- TABLAS
-- -------------------------------------------------------

create table if not exists clients (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  description text,
  created_at  timestamptz default now()
);

create table if not exists deliveries (
  id              uuid primary key default gen_random_uuid(),
  number          int  not null unique,
  title           text not null,
  epic            int  not null,
  expected_result text not null,
  template_path   text,
  due_date        date,
  created_at      timestamptz default now()
);

create table if not exists submissions (
  id           uuid primary key default gen_random_uuid(),
  client_id    uuid references clients(id) on delete cascade,
  delivery_id  uuid references deliveries(id) on delete cascade,
  status       text not null default 'pending',
  file_url     text,
  notes        text,
  submitted_at timestamptz,
  created_at   timestamptz default now(),
  unique(client_id, delivery_id),
  constraint status_values check (status in ('pending', 'submitted', 'approved', 'rejected'))
);

-- -------------------------------------------------------
-- SEED: 12 entregas fijas
-- Fechas según cronograma APLSI 2026-01 (cátedra Piorun)
-- -------------------------------------------------------

insert into deliveries (number, title, epic, expected_result, template_path, due_date) values
  (1,  'Selección del Caso',                  1, 'Presentación del cliente en PowerPoint (4 slides)',         'templates/01-seleccion-del-caso',                  '2026-03-20'),
  (2,  'Diagnóstico Organizacional',          1, 'Completar template de Diagnóstico Organizacional',          'templates/02-diagnostico-organizacional',           '2026-03-27'),
  (3,  'Arquitectura Empresarial Origen',     1, 'Completar Template + Diagrama AE Origen',                  'templates/03-arquitectura-empresarial-origen',      '2026-04-03'),
  (4,  'Innovación para la transformación',   2, 'Completar Template + Elevator Pitch de Innovación',        'templates/04-innovacion-para-la-transformacion',    '2026-04-10'),
  (5,  'Arquitectura Empresarial Destino',    2, 'Completar Template + Diagrama AE Destino',                 'templates/05-arquitectura-empresarial-destino',     '2026-04-17'),
  (6,  'Matriz de Brechas y Escenarios',      2, 'Matriz de brechas en Excel + Modelo de Escenarios',        'templates/06-matriz-de-brechas-y-escenarios',       '2026-04-24'),
  (7,  'Alcance del Proyecto',                3, 'Completar template de Alcance',                            'templates/07-alcance-del-proyecto',                 '2026-05-01'),
  (8,  'Análisis del Mercado y Benchmarking', 3, 'RFI + Links videos de los proveedores preseleccionados',   'templates/08-analisis-del-mercado-y-benchmarking',  '2026-05-08'),
  (9,  'Factibilidad',                        3, 'Matriz RFP en Excel',                                      'templates/09-factibilidad',                         '2026-05-15'),
  (10, 'Evaluación Económica',                4, 'Completar Template + Completar aspecto económico en RFP',  'templates/10-evaluacion-economica',                 '2026-05-22'),
  (11, 'Análisis de la propuesta comercial',  4, 'Completar Template + Matriz RFP completa',                 'templates/11-analisis-de-la-propuesta-comercial',   '2026-05-29'),
  (12, 'Cierre del Proyecto',                 4, 'Presentación final + Página Web + Resumen Ejecutivo',      'templates/12-cierre-del-proyecto',                  '2026-06-05')
on conflict (number) do nothing;

-- Si ya corriste una versión anterior del schema, ejecutá esto para agregar la columna:
-- alter table deliveries add column if not exists due_date date;
-- update deliveries set due_date = '2026-03-20' where number = 1;
-- update deliveries set due_date = '2026-03-27' where number = 2;
-- update deliveries set due_date = '2026-04-03' where number = 3;
-- update deliveries set due_date = '2026-04-10' where number = 4;
-- update deliveries set due_date = '2026-04-17' where number = 5;
-- update deliveries set due_date = '2026-04-24' where number = 6;
-- update deliveries set due_date = '2026-05-01' where number = 7;
-- update deliveries set due_date = '2026-05-08' where number = 8;
-- update deliveries set due_date = '2026-05-15' where number = 9;
-- update deliveries set due_date = '2026-05-22' where number = 10;
-- update deliveries set due_date = '2026-05-29' where number = 11;
-- update deliveries set due_date = '2026-06-05' where number = 12;

-- -------------------------------------------------------
-- SEED: cliente Kodek
-- -------------------------------------------------------

insert into clients (name, slug, description)
values ('Kodek', 'kodek', 'Empresa de tecnología energética. Cliente de CaraNorte.')
on conflict (slug) do nothing;

-- -------------------------------------------------------
-- RLS: cualquier usuario autenticado puede leer todo
-- (modelo adecuado para tesis: equipo + profesores ven lo mismo)
-- -------------------------------------------------------

alter table clients     enable row level security;
alter table deliveries  enable row level security;
alter table submissions enable row level security;

create policy "authenticated users can read clients"
  on clients for select to authenticated using (true);

create policy "authenticated users can read deliveries"
  on deliveries for select to authenticated using (true);

create policy "authenticated users can read submissions"
  on submissions for select to authenticated using (true);

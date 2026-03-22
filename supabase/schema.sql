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
  created_at      timestamptz default now()
);

-- Une usuarios de Supabase Auth con clientes
create table if not exists client_users (
  id         uuid primary key default gen_random_uuid(),
  client_id  uuid references clients(id) on delete cascade,
  user_id    uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  unique(client_id, user_id)
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
-- -------------------------------------------------------

insert into deliveries (number, title, epic, expected_result, template_path) values
  (1,  'Selección del Caso',                      1, 'Presentación del cliente en PowerPoint (4 slides)',              'templates/01-seleccion-del-caso'),
  (2,  'Diagnóstico Organizacional',              1, 'Completar template de Diagnóstico Organizacional',               'templates/02-diagnostico-organizacional'),
  (3,  'Arquitectura Empresarial Origen',         1, 'Completar Template + Diagrama AE Origen',                        'templates/03-arquitectura-empresarial-origen'),
  (4,  'Innovación para la transformación',       2, 'Completar Template + Elevator Pitch de Innovación',              'templates/04-innovacion-para-la-transformacion'),
  (5,  'Arquitectura Empresarial Destino',        2, 'Completar Template + Diagrama AE Destino',                       'templates/05-arquitectura-empresarial-destino'),
  (6,  'Matriz de Brechas y Escenarios',          2, 'Matriz de brechas en Excel + Modelo de Escenarios',              'templates/06-matriz-de-brechas-y-escenarios'),
  (7,  'Alcance del Proyecto',                    3, 'Completar template de Alcance',                                  'templates/07-alcance-del-proyecto'),
  (8,  'Análisis del Mercado y Benchmarking',     3, 'RFI + Links videos de los proveedores preseleccionados',         'templates/08-analisis-del-mercado-y-benchmarking'),
  (9,  'Factibilidad',                            3, 'Matriz RFP en Excel',                                            'templates/09-factibilidad'),
  (10, 'Evaluación Económica',                    4, 'Completar Template + Completar aspecto económico en RFP',        'templates/10-evaluacion-economica'),
  (11, 'Análisis de la propuesta comercial',      4, 'Completar Template + Matriz RFP completa',                       'templates/11-analisis-de-la-propuesta-comercial'),
  (12, 'Cierre del Proyecto',                     4, 'Presentación final + Página Web + Resumen Ejecutivo',            'templates/12-cierre-del-proyecto')
on conflict (number) do nothing;

-- -------------------------------------------------------
-- SEED: cliente Kodek
-- -------------------------------------------------------

insert into clients (name, slug, description)
values ('Kodek', 'kodek', 'Empresa de tecnología energética. Primer cliente de CaraNorte.')
on conflict (slug) do nothing;

-- -------------------------------------------------------
-- RLS (Row Level Security)
-- -------------------------------------------------------

alter table clients      enable row level security;
alter table deliveries   enable row level security;
alter table client_users enable row level security;
alter table submissions  enable row level security;

-- deliveries: lectura pública para usuarios autenticados
create policy "authenticated users can read deliveries"
  on deliveries for select
  to authenticated
  using (true);

-- clients: un usuario solo ve los clientes a los que está vinculado
create policy "users see their own clients"
  on clients for select
  to authenticated
  using (
    id in (
      select client_id from client_users where user_id = auth.uid()
    )
  );

-- client_users: cada usuario ve solo sus propias filas
create policy "users see their own client_users rows"
  on client_users for select
  to authenticated
  using (user_id = auth.uid());

-- submissions: un usuario ve solo las submissions de su cliente
create policy "users see their client submissions"
  on submissions for select
  to authenticated
  using (
    client_id in (
      select client_id from client_users where user_id = auth.uid()
    )
  );

-- -------------------------------------------------------
-- VINCULAR usuario a Kodek
-- Reemplazá <USER_ID> con el UUID del usuario en Auth → Users
-- -------------------------------------------------------

-- insert into client_users (client_id, user_id)
-- select c.id, '<USER_ID>'::uuid
-- from clients c where c.slug = 'kodek';

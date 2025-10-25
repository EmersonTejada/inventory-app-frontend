# Inventory App — Frontend

Frontend de la Inventory App construida con React, Vite y TypeScript.

El backend está desplegado en Render en:

https://inventory-app-backend-jb2q.onrender.com

Descripción
-----------
Esta carpeta contiene la parte frontend de una aplicación full-stack para gestionar productos y sus categorías. Se utiliza:

- Vite + React + TypeScript
- Tailwind CSS (integrado)
- shadcn / componentes basados en Radix para la UI
- React Router para manejo de rutas y layouts
 - react-hook-form para manejo de formularios y validaciones
 - @tanstack/react-table para tablas avanzadas y rendimiento en listados

Características incluidas
-------------------------

- Estructura de rutas y `Layout` base (`src/routes/`, `src/layouts/Layout.tsx`).
- Sidebar de navegación implementado con componentes shadcn (`src/components/layout/Sidebar.tsx`).
- Páginas iniciales: `src/pages/Products.tsx` y `src/pages/Categories.tsx`.

Librerías y patrones clave
-------------------------

- `react-hook-form` se utiliza para gestionar formularios (creación/edición de productos y categorías) con validaciones y rendimiento óptimo.
- `@tanstack/react-table` (v8) se utiliza para construir tablas reusables y con alto rendimiento en listados de productos; permite paginación, ordenamiento y renderizado optimizado.

Instalación y ejecución (local)
------------------------------

1. Instala dependencias:

```bash
npm install
```

# Inventory App — Frontend (Portafolio)

Frontend de una aplicación para gestionar inventario de productos y categorías. Este repositorio está pensado como proyecto de portafolio: debe mostrar las decisiones técnicas, patrones y librerías que manejo con React y TypeScript.

## Backend

El backend está desplegado en Render y sirve como API para esta aplicación:

https://inventory-app-backend-jb2q.onrender.com

## Objetivo del proyecto

Crear una interfaz limpia y reusable para la gestión de inventario (listados, búsquedas, creación/edición/borrado de recursos) demostrando buenas prácticas en React:

- Arquitectura basada en componentes reutilizables y patterns (Context + Reducer).
- Formularios controlados y validados con `react-hook-form` + `zod`.
- Listados y tablas escalables usando `@tanstack/react-table`.
- UI compuesta con componentes accesibles (Radix) y estilizada con Tailwind (shadcn patterns).

## Tecnologías principales

- React 19 + TypeScript
- Vite (bundler y dev server)
- Tailwind CSS (clases utilitarias)
- shadcn / Radix UI — componentes accesibles y diseño consistente
- react-router — manejo de rutas y layouts declarativos
- react-hook-form + @hookform/resolvers + zod — formularios y validación basada en esquemas
- @tanstack/react-table — tablas reusables, paginación y ordenamiento
- Lucide-react — iconografía

## Arquitectura y patrones

### Context + Reducer

- Implementé un `CategoryProvider` que expone un `CategoryContext` para gestionar el estado de categorías en toda la aplicación. El provider usa `useReducer` con `categoryReducer` para mantener un state predecible (acciones: `setCategories`, `createCategory`, `updateCategory`, `deleteCategory`, `setLoading`, `setError`).
- Hook `useCategories` — wrapper sobre `useContext(CategoryContext)` que encapsula el acceso y lanza un error si se utiliza fuera del provider.

### Custom hooks

- `useIsMobile` — hook personalizado que usa `matchMedia` para determinar si la UI debe mostrarse en versión móvil.

### Servicios y separación de responsabilidad

- Las llamadas a la API están centralizadas en el directorio `src/services/` (por ejemplo `categoriesService`). Esto permite cambiar el origen de datos sin tocar los componentes.

### Componentes y UI

- `DataTable` — componente genérico construido sobre `@tanstack/react-table` que provee:
	- Filtrado por columna, búsqueda, ordenamiento, paginación y selección de filas.
	- Integración con un `Dialog` para mostrar formularios de creación/edición.
- Formularios (`ProductsForm`, `CategoriesForm`) — construidos con `react-hook-form` y `zodResolver`, usando componentes de formulario reutilizables (`Field`, `Input`, `Select`, `InputGroup`, etc.).
- `Sidebar` — navegación lateral construida con patrones shadcn y Radix.

## Qué busca mostrar este repositorio 

- Habilidades en diseño de la arquitectura: separación entre UI, lógica (hooks/providers) y servicios.
- Uso de patrones avanzados de React: Context + Reducer para estado derivado y efectos secundarios (fetching, creación, actualización).
- Formularios escalables y validados (react-hook-form + zod).
- Implementación de tablas complejas y optimizadas con `@tanstack/react-table`.
- Componentización y accesibilidad (Radix/shadcn) y composición de estilos con Tailwind.

## Instalación y ejecución (local)

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` (o la URL que indique Vite).

## Estructura relevante (resumen)

- `src/` — código fuente
	- `components/` — UI y componentes reusables (tables, forms, inputs, layout)
	- `context/` — contexto y providers (ej. `CategoryContext`, `CategoryProvider`)
	- `hooks/` — hooks reutilizables (`useIsMobile`, `useCategories`)
	- `layouts/` — layouts que envuelven rutas y providers
	- `pages/` — páginas (Products, Categories)
	- `reducers/` — reducers y estados iniciales (ej. `categoryReducer`)
	- `services/` — llamadas a la API (fetch / axios wrappers)

## Scripts

-+- `npm run dev` — servidor de desarrollo (Vite)
- `npm run build` — build para producción
- `npm run preview` — sirve la build localmente

## Buenas prácticas demostradas

- Centralización de efectos secundarios (servicios) y manejo de errores en providers.
- Validación a nivel de esquema con `zod` y resolución en `react-hook-form`.
- Componentes puros y reutilizables: `DataTable` y formularios desacoplados de la fuente de datos.
- Accesibilidad básica: uso de componentes Radix y atributos ARIA en formularios y diálogos.

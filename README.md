# Zara Web Challenge — Smartphone Catalog

Aplicación web de catálogo de smartphones desarrollada como prueba técnica para Zara / Inditex.

## Stack

- **Next.js 16** (App Router) — SSR en páginas de listado y detalle
- **TypeScript 5** — tipado estricto en toda la base de código
- **SCSS + CSS Modules** — estilos con variables CSS y mixins de breakpoints
- **React Context API** — estado del carrito con persistencia en `localStorage`
- **Jest 29 + React Testing Library** — tests de servicios, hooks, contexto y componentes

## Instalación y uso

```bash
npm install
npm run dev       # http://localhost:3000
npm run build && npm start  # producción
```

Variables de entorno necesarias (ver `.env.local`):

| Variable                   | Descripción                          |
| -------------------------- | ------------------------------------ |
| `API_BASE_URL`             | URL base de la API (server-side)     |
| `NEXT_PUBLIC_API_BASE_URL` | URL base de la API (client-side)     |
| `API_KEY`                  | Clave de autenticación (`x-api-key`) |

## Estructura del proyecto

```
src/
├── app/                        # Páginas (App Router)
│   ├── page.tsx                # / — Listado de productos (SSR)
│   ├── ProductListingClient.tsx
│   ├── product/[id]/           # /product/[id] — Detalle de producto (SSR)
│   │   ├── page.tsx
│   │   └── ProductDetailClient.tsx
│   └── cart/                   # /cart — Carrito
│       ├── page.tsx
│       └── CartPageClient.tsx
├── components/
│   ├── Header/                 # Cabecera con badge del carrito
│   ├── ProductCard/            # Tarjeta de producto
│   ├── ProductGrid/            # Grid responsive de tarjetas
│   ├── SearchBar/              # Buscador con debounce y contador
│   ├── StorageSelector/        # Selector de almacenamiento
│   ├── ColorSelector/          # Selector de color
│   ├── SpecsTable/             # Tabla de especificaciones técnicas
│   ├── CartItem/               # Fila de producto en el carrito
│   └── BackLink/               # Botón de navegación atrás
├── context/
│   └── CartContext.tsx         # Estado del carrito + persistencia
├── hooks/
│   ├── useDebounce.ts          # Hook genérico de debounce
│   ├── useProducts.ts          # Listado de productos con búsqueda
│   ├── useProductDetail.ts     # Detalle de producto por id
│   └── useProductActions.ts    # Selección de color/almacenamiento y carrito
├── services/
│   └── api.ts                  # Cliente HTTP con cabecera x-api-key
├── styles/
│   ├── globals.scss            # Reset, variables CSS, estilos globales
│   └── variables.scss          # Mixins de breakpoints SCSS
└── types/
    └── index.ts                # Interfaces TypeScript
```

## Decisiones técnicas

- **SSR + Client Components**: los datos se cargan en el servidor; la interactividad es mínima en cliente. Evita waterfalls y protege la API key.
- **CSS Modules + variables CSS**: cada componente tiene sus propios estilos sin riesgo de colisiones. Las variables CSS permiten theming y consistencia sin necesidad de una librería de diseño.
- **Debounce en búsqueda**: el hook `useDebounce` evita llamadas a la API en cada pulsación de tecla (300ms de espera).
- **API key solo en servidor**: `API_KEY` no tiene prefijo `NEXT_PUBLIC_`, por lo que nunca se expone al cliente.

## Tests

```bash
npm test                  # todos los tests
npm run test:watch        # modo watch
npm run test:coverage     # informe de cobertura
```

# 👗 StyleMind Frontend

Aplicación web moderna de gestión de guardarropa con **inteligencia artificial** para crear combinaciones de outfits personalizadas. Cataloga tus prendas, organízalas por categorías, y obtén sugerencias inteligentes para crear el outfit perfecto según la ocasión.

---

## ✨ Características

- 🎨 **Guardarropa Digital** - Gestiona todas tus prendas con imágenes y detalles
- 🤖 **Outfits con IA** - Genera combinaciones inteligentes según ocasión y preferencias
- 📱 **Diseño Responsive** - Experiencia optimizada para móvil, tablet y desktop
- 🔍 **Búsqueda Avanzada** - Filtra por categoría, color, estilo y temporada
- ♾️ **Infinite Scroll** - Carga optimizada con paginación automática
- 📊 **Perfil Personalizado** - Configura tus preferencias de estilo y tono de piel
- 🎯 **Validación Inteligente** - Formularios con validación en tiempo real

---

## 🛠️ Stack Tecnológico

### Core

- ⚛️ **React 19** - UI Library con las últimas optimizaciones
- 📘 **TypeScript** - Type safety y mejor DX
- ⚡ **Vite** - Build tool ultrarrápido

### Data Fetching & Forms

- 🔄 **TanStack Query v5** - Server state management con cache inteligente
- 📋 **React Hook Form** - Formularios performantes
- 🎯 **Zod** - Validación de schemas type-safe

### UI & Styling

- 🎨 **Tailwind CSS** - Utility-first styling
- 🧩 **Shadcn/ui** - Componentes accesibles y customizables
- 🎭 **Lucide React** - Iconografía moderna
- 🌈 **React Select** - Selectores con búsqueda integrada
- 🔔 **Sonner** - Toast notifications elegantes

### API Integration

- 🔧 **Orval** - Generación automática de código desde OpenAPI spec
- 📡 **Axios** - HTTP client configurado

### Routing & Storage

- 🗺️ **React Router v7** - Navegación SPA
- 🔥 **Firebase Storage** - Almacenamiento de imágenes en la nube

---

## 📋 Requisitos

- **Node.js** v18 o superior
- **npm** o **yarn**
- **Backend de StyleMind API** corriendo localmente o en servidor

---

## 🚀 Configuración e Instalación

### 1. Clonar e instalar

```bash
git clone <repository-url>
cd StyleMind_Frontend
npm install
```

### 2. Configurar conexión al backend

Edita el archivo `.env` y asegúrate de que apunte a tu backend:

```env
VITE_API_URL=http://localhost:3000
```

### 3. Iniciar la aplicación

```bash
npm run dev
```

La app estará disponible en `http://localhost:5173`

### 4. Generar cliente API (opcional)

Si hay cambios en el OpenAPI spec del backend:

```bash
npm run api:generate
```

Esto regenera automáticamente todos los hooks de React Query y tipos TypeScript.

---

## 🎯 Funcionalidades Principales

### 👕 Guardarropa Digital

- Agrega prendas con múltiples imágenes desde Firebase Storage
- Edita y elimina items de tu colección
- Búsqueda avanzada con múltiples filtros (categoría, color, estilo, temporada)
- Infinite scroll optimizado con React Query
- Visualización en grid responsive con detalles expandibles

### 🤖 Generación de Outfits con IA

- **Modo Rápido**: Selecciona prendas base y categorías, la IA genera combinaciones completas
- **Modo Manual**: Crea tus propias combinaciones personalizadas
- **Modo AI Completo**: La IA sugiere outfits basándose en tu guardarropa
- Especifica ocasión, clima y preferencias de estilo
- Guarda y gestiona tus outfits favoritos

### 👤 Perfil Personalizado

- Configuración de preferencias de estilo personal
- Selección de tono de piel para mejores recomendaciones
- Gestión de categorías personalizadas
- Historial de outfits generados

---

## 🧩 Componentes Clave

### ClothingSelector

Selector avanzado de prendas con optimización de performance:

- Vista previa de primeras 5 prendas
- Modal con todas las prendas y búsqueda en tiempo real
- Selección múltiple con límite configurable
- Memorización con React.memo para evitar re-renders innecesarios
- Integración directa con React Hook Form

### CategorySelect / CategoryMultiSelect

Selectores inteligentes con react-select:

- Búsqueda instantánea de categorías
- Modo single/multi selección
- Límite máximo de selecciones
- Validación integrada con Zod
- Control completo desde React Hook Form

### useInfiniteWardrobe

Custom hook para paginación optimizada:

- Usa useInfiniteQuery de TanStack Query
- Intersection Observer para detectar scroll
- Cache inteligente de páginas
- Loading states y error handling

---

## 🔧 Integración con Backend

### Generación Automática de Código (Orval)

El proyecto usa **Orval** para generar automáticamente el código del cliente API desde el OpenAPI spec:

```bash
npm run api:generate
```

**Beneficios:**

- 🎯 **Type-safety completo**: Tipos TypeScript generados automáticamente
- 🔄 **Hooks de React Query**: useGetMyWardrobe, useGenerateCombinations, etc.
- 📡 **Cliente Axios configurado**: Con interceptors y manejo de errores
- 🚀 **Siempre sincronizado**: Regenera cuando cambia el schema del backend

**Configuración en `orval.config.ts`:**

```typescript
{
  input: 'http://localhost:3000/api-json',  // OpenAPI spec URL
  output: {
    client: 'react-query',                   // Genera hooks de RQ
    target: 'src/api/generated'              // Directorio de salida
  }
}
```

---

## 💡 Características Técnicas Destacadas

- ⚡ **Optimización de Performance**: React.memo, useMemo, useCallback estratégicamente aplicados
- 🎨 **Componentes Accesibles**: Shadcn/ui con soporte ARIA completo
- 📱 **Mobile-First**: Diseño responsive desde mobile hacia desktop
- 🔐 **Autenticación con Cookies**: Manejo seguro de sesiones
- 🖼️ **Lazy Loading de Imágenes**: Carga progresiva con loading states
- 🎯 **Validación Robusta**: Zod schemas para formularios type-safe
- ♾️ **Infinite Scroll**: Paginación automática sin perder performance

---

## 🤝 Contribuir

```bash
# 1. Fork y clona
git clone <tu-fork-url>

# 2. Crea una rama
git checkout -b feature/nueva-funcionalidad

# 3. Haz tus cambios y commitea
git commit -m "feat: añade nueva funcionalidad"

# 4. Push y crea PR
git push origin feature/nueva-funcionalidad
```

---

## 👥 Equipo

Desarrollado con ❤️ para revolucionar la forma de gestionar tu guardarropa

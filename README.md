# 🫓 Sabores de El Salvador — Landing Page

> **Gastronomía auténtica salvadoreña** · Restaurante, pupusería y tour gastronómico en Santa Tecla, La Libertad.

[![Sitio en vivo](https://img.shields.io/badge/Ver%20sitio-GitHub%20Pages-blue?style=flat-square)](https://tu-usuario.github.io/sabores-sv/)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JS](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)

---

## 📋 Descripción

**Sabores de El Salvador** es una landing page interactiva de una sola página (SPA) que representa a un restaurante tradicional salvadoreño. Incluye todas las secciones requeridas, interacción con el DOM, validación de formularios con JavaScript y está publicada en producción.

---

## 🌐 URL del sitio publicado

```
https://ocontrers.github.io/sabores-sv/
```


---

## 📁 Estructura del repositorio

```
sabores-sv/
├── index.html      # Estructura HTML semántica completa
├── styles.css      # Estilos CSS con variables, Grid, Flexbox
├── script.js       # JavaScript: DOM, validación, interactividad
└── README.md       # Este archivo
```

---

## 📑 Secciones implementadas

| # | Sección | Descripción |
|---|---------|-------------|
| 1 | **Hero** | Imagen de fondo, título principal, subtítulo y botones CTA (Ver menú / Reservar mesa) |
| 2 | **Navbar** | Fija con `position: fixed`, anclas hacia todas las secciones, menú hamburguesa para móvil |
| 3 | **Nosotros** | Historia del restaurante, valores (sostenibilidad, comunidad, tradición), galería de fotos |
| 4 | **Servicios** | 6 tarjetas con CSS Grid: Restaurante, Pupusería, Tour, Clases, Eventos, Delivery |
| 5 | **Menú** | Tabs interactivos con 4 categorías (18+ platillos), renderizado dinámico con JS |
| 6 | **Formulario** | Reserva de mesa con validación completa en JavaScript (8 campos, feedback en tiempo real) |
| 7 | **Footer** | Redes sociales, horarios, navegación, año dinámico y créditos del equipo |

---

## ⚙️ Funcionalidades JavaScript

### Manipulación del DOM
- **Menú dinámico**: 4 tabs que renderizan tarjetas de platillos directamente en el DOM al hacer clic
- **Formulario de reserva**: inserción de mensajes de error/éxito en el DOM sin recargar la página
- **Año dinámico**: el año del footer se actualiza automáticamente con `new Date().getFullYear()`
- **Animaciones con `IntersectionObserver`**: elementos animados al entrar al viewport (scroll)

### Validación de formulario
El formulario tiene **8 campos validados** con reglas específicas:

| Campo | Validación |
|-------|-----------|
| Nombre | Mínimo 3 caracteres |
| Correo | Formato email válido (`/regex/`) |
| Teléfono | 7–15 dígitos, guiones permitidos |
| Personas | Campo requerido (select) |
| Fecha | Fecha igual o posterior a hoy |
| Hora | Campo requerido (select) |
| Servicio | Campo requerido (select) |
| Términos | Checkbox obligatorio |

- ✅ Validación **en tiempo real** al salir del campo (`blur`)
- ✅ Feedback visual: bordes rojos (error) / verdes (válido)
- ✅ Mensajes de error descriptivos por campo
- ✅ Scroll automático al primer error
- ✅ Simulación de envío con spinner de carga

### Otras funcionalidades
- Navbar: clase `.scrolled` al hacer scroll, resaltado de sección activa
- Menú hamburguesa: toggle de clase `.open`, cierre al hacer clic fuera
- Smooth scroll: todos los anclas de navegación usan scroll suave
- Animación de entrada del hero al cargar la página

---

## 🎨 Diseño y tecnologías

- **Fuentes**: Playfair Display + DM Sans + Libre Baskerville (Google Fonts)
- **Paleta**: Azul índigo `#1a2744` + Dorado `#e8a83e` + Paprika `#c0392b` + Crema `#faf8f4`
- **Layout**: CSS Grid + Flexbox, sin frameworks externos
- **Animaciones**: CSS puro + `IntersectionObserver` API
- **Responsive**: Breakpoints 1024px, 768px, 480px
- **Sin librerías externas** — HTML, CSS y JS vanilla puro

---

## 📦 Historial de commits

```
commit 1: init: estructura inicial del proyecto (index.html, estilos base, script vacío)
commit 2: feat(navbar): navbar fija con scroll y menú hamburguesa responsive
commit 3: feat(sections): hero, nosotros, servicios con Grid/Flexbox y diseño completo
commit 4: feat(menu): sección menú con tabs interactivos y renderizado dinámico del DOM
commit 5: feat(form): formulario de reserva con validación JavaScript completa (8 campos)
commit 6: feat(footer): footer con redes sociales, horarios, año dinámico y créditos
commit 7: fix(responsive): ajustes mobile para todas las secciones y hamburger
commit 8: docs: README completo con instrucciones de despliegue
```

---

## 👥 Equipo — Grupo 3

| Nombre | Rol |
|--------|-----|
| Integrante 1 | HTML semántico + estructura de secciones |
| Integrante 2 | CSS (diseño, Grid, Flexbox, responsive) |
| Integrante 3 | JavaScript (DOM, validación, interactividad) |

---

## 🚀 Instrucciones de despliegue

### GitHub Pages (gratis)
1. Crea un repositorio llamado `sabores-sv`
2. Sube los archivos: `index.html`, `styles.css`, `script.js`, `README.md`
3. Ve a **Settings → Pages → Source: main / root**
4. Confirma con **Save** — el sitio estará activo en ~2 minutos

### Netlify (alternativa)
1. Entra a [netlify.com](https://netlify.com) y crea una cuenta
2. Arrastra la carpeta del proyecto al área de deploy
3. Obtendrás una URL pública instantáneamente

### Vercel (alternativa)
1. Instala Vercel CLI: `npm i -g vercel`
2. En la carpeta del proyecto: `vercel`
3. Sigue las instrucciones del CLI

---

## 📄 Licencia

Proyecto académico — Desarrollo Frontend · 2025  
**Sabores de El Salvador** · Santa Tecla, La Libertad, El Salvador 🇸🇻

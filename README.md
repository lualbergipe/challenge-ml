# MercadoChallenge

¡Bienvenido/a! Este proyecto consiste en una **aplicación full-stack** que permite buscar productos y mostrar su detalle, consumiendo la [API pública de MercadoLibre](https://developers.mercadolibre.com/). Incluye:

- **Frontend**: React + Sass  
- **Backend**: Node.js (Express)

## Índice

1. [Descripción](#descripción)  
2. [Tecnologías y dependencias principales](#tecnologías-y-dependencias-principales)  
3. [Estructura del proyecto](#estructura-del-proyecto)  
4. [Variables de entorno](#variables-de-entorno)  
5. [Instalación y ejecución](#instalación-y-ejecución)  
6. [Scripts de npm](#scripts-de-npm)  
7. [Testing](#testing)  
8. [Notas y mejoras futuras](#notas-y-mejoras-futuras)  
9. [Autor](#autor)  

---

## Descripción

Este proyecto cumple con los siguientes **requerimientos**:

- **Caja de búsqueda** en la página principal (`/`) para ingresar un término y redirigir a los resultados (`/items?search=...`).
- **Listado de resultados** mostrando los primeros 4 productos relevantes.
- **Detalle de producto** mostrando la información completa (precio, envío, descripción, etc.).
- **Breadcrumb**:
  - En la **vista de resultados**, se arma con la categoría que más resultados obtuvo (según la API de búsqueda).
  - En la **vista de detalle**, se arma con la categoría propia del ítem (si está disponible).
- **Endpoints** en el backend:
  - `GET /api/items?q=:query` (consume `https://api.mercadolibre.com/sites/MLA/search?...`)
  - `GET /api/items/:id` (consume `https://api.mercadolibre.com/items/:id` y `https://api.mercadolibre.com/items/:id/description`)

Además, el proyecto pone énfasis en **usabilidad**, **SEO**, **performance** y **escalabilidad**.

---

## Tecnologías y dependencias principales

- **Frontend**:
  - [React](https://reactjs.org/)
  - [Sass](https://sass-lang.com/)  
  - [React Router Dom 6](https://reactrouter.com/en/main)
- **Backend**:
  - [Node.js >= 20](https://nodejs.org/en)
  - [Express](https://expressjs.com/)
  - [Axios](https://axios-http.com/)
- **Testing**:
  - [Jest](https://jestjs.io/)  
  - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) (frontend)  
  - [Supertest](https://www.npmjs.com/package/supertest) (backend)
- **Herramientas de desarrollo**:
  - [Concurrently](https://www.npmjs.com/package/concurrently) (ejecutar cliente y servidor en paralelo)

---

## Estructura del proyecto

La estructura sugerida es la siguiente (simplificada):


1. **Raíz**: Contiene un `package.json` que orquesta scripts para levantar ambos entornos (client y server).  
2. **`client/`**: Aplicación React (con Sass) y sus dependencias.  
3. **`server/`**: Servidor Express + Node, archivos de rutas, controladores, servicios y tests de backend.

---

## Variables de entorno

Este proyecto puede usar **variables de entorno** para centralizar ciertas configuraciones:

- **En el backend** (dentro de `server/.env` o variables del sistema):
  ```bash
  PORT=3001
  API_BASE_URL=https://api.mercadolibre.com

  - **En el front** (dentro de `cliet/.env` o variables del sistema):

  REACT_APP_API_URL=http://localhost:3001

## Instalación y ejecución

**Requisitos previos**:
- Node.js (>= 20)
- npm o yarn

**Pasos**:

1. **Clona** este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/mercadolibre-challenge.git

2. **Instala** las dependencias desde la raíz:
cd challenge
npm install

3. **Instala** las dependencias del frontend y del backend:
cd client
npm install
cd ../server
npm install
cd ..

4. **Inicia** la aplicación (cliente + servidor en paralelo) desde la raiz:
npm run dev

- El servidor quedará disponible en http://localhost:3001.
- El frontend quedará disponible en http://localhost:3000.
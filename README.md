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
- **Herramientas de desarrollo**:
  - [Concurrently](https://www.npmjs.com/package/concurrently) (ejecutar cliente y servidor en paralelo)

---

## Estructura del proyecto

La estructura sugerida es la siguiente (simplificada):


1. **Raíz**: Contiene un `package.json` que orquesta scripts para levantar ambos entornos (client y server).  
2. **`client/`**: Aplicación React (con Sass) y sus dependencias.  
3. **`server/`**: Servidor Express + Node, archivos de rutas, controladores, servicios y tests de backend.

---
## Hooks Personalizados
En este proyecto, hemos implementado un custom hook llamado useFetch para manejar la obtención de datos desde la API de MercadoLibre de manera eficiente y reutilizable. Este hook simplifica las solicitudes HTTP, gestiona automáticamente los estados de carga y error, y mejora la limpieza y mantenibilidad de los componentes.

**useFetch**
El hook useFetch permite realizar solicitudes HTTP de manera sencilla dentro de los componentes React, manejando los estados de carga, datos y errores de forma centralizada.

**Parámetros**
- fetchFunction (Function):
Una función que realiza la solicitud HTTP y retorna una promesa que resuelve con los datos obtenidos. Esta función puede ser una llamada a cualquiera de las funciones definidas en api.js.

-  dependencies (Array):
Un array de dependencias que, cuando cambian, reejecutan la solicitud. Es similar a las dependencias que se pasan a useEffect.

**Retorno**
El hook retorna un objeto con las siguientes propiedades:

- data (Object | null):
Los datos obtenidos de la solicitud HTTP. Inicialmente es null hasta que se complete la solicitud.

- loading (Boolean):
Indica si la solicitud está en curso. Inicialmente es false.

- error (String | null):
Contiene el mensaje de error si la solicitud falla. Inicialmente es null.

- refetch (Function):
Una función que permite reintentar la solicitud manualmente. Útil en casos donde la solicitud falla y deseas permitir al usuario intentar nuevamente. En este caso no se utiliza esa opción 

## Variables de entorno

Este proyecto puede usar **variables de entorno** para centralizar ciertas configuraciones:

- **En el backend** (dentro de `server/.env` o variables del sistema):
  ```bash
  PORT=3001
  API_BASE_URL=https://api.mercadolibre.com

- **En el front** (dentro de `cliet/.env` o variables del sistema):
  ```bash
  REACT_APP_API_URL=http://localhost:3001

## Instalación y ejecución

**Requisitos previos**:
- Node.js (>= 20)
- npm o yarn

**Pasos**:

1. **Clona** este repositorio:
   ```bash
   git clone https://github.com/lualbergipe/challenge-ml.git

2. **Instala** las dependencias desde la raíz:
    ```bash
    cd challenge
    npm install

3. **Instala** las dependencias del frontend y del backend:
    ```bash
    cd client
    npm install
    cd ../server
    npm install
    cd ..

4. **Inicia** la aplicación (cliente + servidor en paralelo) desde la raiz:
    ```bash
    npm run dev

- El servidor quedará disponible en:
    ```bash
    http://localhost:3001

- El frontend quedará disponible en:
    ```bash
    http://localhost:3000


## Testing

Este proyecto utiliza **Jest** para la ejecución de pruebas unitarias. A continuación se detalla la prueba implementada para el servicio de items.

### Prueba: `fetchItemsByQuery`

La función `fetchItemsByQuery` realiza una petición a la API de MercadoLibre para obtener resultados de búsqueda, procesando la respuesta para extraer dos elementos clave:

- **Categorías:** Se determina el breadcrumb (cadena de categorías) a partir de la información devuelta por la API.
- **Items:** Se transforman y limitan los resultados a los primeros 4 items, utilizando una función auxiliar `parseItemData`.

#### ¿Qué se prueba?

Esta prueba unitaria se centra en verificar que:
- La función retorne las **categorías** correctas, en este caso, el breadcrumb basado en la categoría identificada.
- La función retorne el número correcto de **items** (en este ejemplo, 1 item) y que la información de cada item se mapea correctamente (por ejemplo, se verifica el `id`).

#### Configuración de la prueba

Se utiliza **Jest** para mockear la librería `axios` y simular la respuesta de la API. De esta forma, se evita depender de la API real y se puede testear la lógica de procesamiento de datos de forma aislada.

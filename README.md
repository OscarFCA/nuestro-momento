# Nuestro Momento × BubbleMesh — One Page

Propuesta de crecimiento digital para **Nuestro Momento** (mezcal), con cotizador interactivo.
Publicada en GitHub Pages: https://oscarfca.github.io/nuestro-momento/

- Material privado de cliente: `noindex, nofollow` + `robots.txt` con `Disallow: /`.
- Sitio estático sin dependencias: `index.html`, `css/styles.css`, `js/app.js`.
- Fuente original: `Hel3na/documentos/Nuestro Momento one page/Nuestro Momento One Page v2.dc.html`.

## Estructura

```
index.html        una sola página, 9 secciones (01 contenido → 09 cierre)
css/styles.css    mobile-first; cortes en 560 / 620 / 700 / 820 / 860 / 900 / 1024 / 1180 px
js/app.js         cotizador, slideshow, carrusel de video, FAQ
assets/           imágenes WebP (2 tamaños) + videos 720p + posters
```

## Cotizador

La lógica de precios (planes, alcances, Shopify, FAQ) vive en `js/app.js` en los objetos
`QUOTE`, `SCOPE`, `SHOP` y `FAQ`. Cambiar un precio ahí lo propaga al resumen, al texto
que se copia, al correo y al PDF.

Comportamiento adaptativo:

| Ancho | Cotizador |
|---|---|
| < 1024 px | pasos plegables (`<details>`), resumen en barra fija + hoja inferior |
| ≥ 1024 px | dos columnas, pasos siempre abiertos, resumen pegado (sticky) |

## Assets

Los originales en PNG/MP4 (36 MB) se recomprimieron a WebP y H.264 720p (4.1 MB).
Para regenerarlos desde la carpeta fuente: `cwebp -q 82 -resize <w> 0` y
`ffmpeg -vf scale=720:-2 -crf 27 -movflags +faststart`.

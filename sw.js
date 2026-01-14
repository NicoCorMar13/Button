self.addEventListener("install", () => {
    console.log("Service Worker instalado");
});

self.addEventListener("activate", () => {
    console.log("Service Worker activado");
});

const cacheName = 'mi-app-cache-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/main.js'
];

// Instalación
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
});

// Activación
self.addEventListener('activate', e => {
  console.log('Service Worker activado');
});

// Interceptar requests
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});

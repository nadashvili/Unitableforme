const CACHE_NAME = 'unitable-v4'; // ვერსია შეცვალე ყოველთვის, როცა კოდს განაახლებ
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com', // დავამატოთ ეს, რომ ოფლაინში დიზაინი არ აირიოს
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=JetBrains+Mono:wght@700&display=swap',
  'https://i.postimg.cc/mDfb97jf/Picsart-26-03-06-23-42-26-071.jpg'
];

// ინსტალაცია
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // აიძულებს ახალ ვერსიას მაშინვე გააქტიურდეს
});

// გააქტიურება და ძველი ქეშის წაშლა
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// მოთხოვნების მართვა (Network First სტრატეგია უკეთესია განრიგისთვის)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

/* Service worker: deixa o conversor funcionar offline depois da primeira visita. */
var CACHE = 'shorts-converter-v1';
var ARQUIVOS = [
    './',
    'index.html',
    'css/style.css',
    'js/converter.js',
    'js/i18n.js',
    'js/app.js',
    'manifest.webmanifest',
    'img/favicon.png',
    'img/icon-192.png',
    'img/icon-512.png'
];

self.addEventListener('install', function (evento) {
    evento.waitUntil(caches.open(CACHE).then(function (cache) { return cache.addAll(ARQUIVOS); }));
    self.skipWaiting();
});

self.addEventListener('activate', function (evento) {
    evento.waitUntil(
        caches.keys().then(function (nomes) {
            return Promise.all(nomes.filter(function (n) { return n !== CACHE; }).map(function (n) { return caches.delete(n); }));
        }).then(function () { return self.clients.claim(); })
    );
});

self.addEventListener('fetch', function (evento) {
    var req = evento.request;
    var url = new URL(req.url);
    // só arquivos do próprio site; miniaturas e fontes passam direto pela rede
    if (req.method !== 'GET' || url.origin !== location.origin) return;

    evento.respondWith(
        caches.match(req, { ignoreSearch: true }).then(function (guardado) {
            var rede = fetch(req).then(function (resposta) {
                if (resposta && resposta.ok) {
                    var copia = resposta.clone();
                    caches.open(CACHE).then(function (cache) { cache.put(req, copia); });
                }
                return resposta;
            }).catch(function () { return guardado; });
            return guardado || rede;
        })
    );
});

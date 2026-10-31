/*
 * Conversor de links do YouTube.
 * Funções puras, sem acesso à página, para poder ser testado em tests.html.
 */
(function (global) {
    'use strict';

    var ID_VALIDO = /^[A-Za-z0-9_-]{11}$/;
    var HOSTS = [
        'youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com',
        'youtube-nocookie.com', 'www.youtube-nocookie.com', 'youtu.be', 'www.youtu.be'
    ];

    /** Converte "90", "90s" ou "1h2m3s" em segundos. Devolve 0 quando não entende. */
    function lerTempo(valor) {
        if (!valor) return 0;
        var v = String(valor).trim().toLowerCase();
        if (/^\d+$/.test(v)) return parseInt(v, 10);
        var m = v.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
        if (!m || (!m[1] && !m[2] && !m[3])) return 0;
        return (+m[1] || 0) * 3600 + (+m[2] || 0) * 60 + (+m[3] || 0);
    }

    /** Acha links do YouTube dentro de um texto qualquer (ex.: mensagem compartilhada). */
    function extrairLinks(texto) {
        var achados = String(texto || '').match(
            /(?:https?:\/\/|www\.|(?:m\.|music\.)?youtube(?:-nocookie)?\.com\/|youtu\.be\/)[^\s<>"']+/gi
        );
        return (achados || []).map(function (link) {
            return link.replace(/[).,;!?]+$/, '');
        });
    }

    /**
     * Lê um link e devolve { ok: true, id, tipo, tempo }
     * ou { ok: false, erro } com erro = vazio | formato | dominio | sem-id.
     */
    function analisar(entrada) {
        var texto = String(entrada || '').trim();
        if (!texto) return { ok: false, erro: 'vazio' };
        if (/\s/.test(texto)) return { ok: false, erro: 'formato' };
        if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(texto)) texto = 'https://' + texto;

        var url;
        try {
            url = new URL(texto);
        } catch (e) {
            return { ok: false, erro: 'formato' };
        }

        var host = url.hostname.toLowerCase();
        if (HOSTS.indexOf(host) === -1) return { ok: false, erro: 'dominio' };

        var partes = url.pathname.split('/').filter(Boolean);
        var id = null;
        var tipo = null;

        if (host === 'youtu.be' || host === 'www.youtu.be') {
            id = partes[0];
            tipo = 'curto';
        } else if (partes[0] === 'shorts') {
            id = partes[1];
            tipo = 'shorts';
        } else if (partes[0] === 'embed' || partes[0] === 'live' || partes[0] === 'v') {
            id = partes[1];
            tipo = partes[0];
        } else if (partes[0] === 'watch') {
            id = url.searchParams.get('v');
            tipo = 'watch';
        }

        if (!id || !ID_VALIDO.test(id)) return { ok: false, erro: 'sem-id' };

        return {
            ok: true,
            id: id,
            tipo: tipo,
            tempo: lerTempo(url.searchParams.get('t') || url.searchParams.get('start'))
        };
    }

    /** Monta os links finais a partir de um resultado de analisar(). */
    function montar(resultado, opcoes) {
        var manterTempo = !opcoes || opcoes.manterTempo !== false;
        var tempo = manterTempo && resultado.tempo ? resultado.tempo : 0;
        return {
            padrao: 'https://www.youtube.com/watch?v=' + resultado.id + (tempo ? '&t=' + tempo + 's' : ''),
            curto: 'https://youtu.be/' + resultado.id + (tempo ? '?t=' + tempo : '')
        };
    }

    function miniatura(id) {
        return 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
    }

    /**
     * Converte um texto com um ou mais links.
     * Devolve uma lista de { entrada, ok, id, tipo, tempo, padrao, curto, erro }.
     * Vídeos repetidos aparecem uma vez só.
     */
    function converterTexto(texto, opcoes) {
        var limpo = String(texto || '').trim();
        if (!limpo) return [];
        var links = extrairLinks(limpo);
        if (!links.length) links = [limpo];

        var vistos = {};
        var itens = [];
        links.forEach(function (link) {
            var r = analisar(link);
            if (r.ok) {
                if (vistos[r.id]) return;
                vistos[r.id] = true;
                var m = montar(r, opcoes);
                itens.push({ entrada: link, ok: true, id: r.id, tipo: r.tipo, tempo: r.tempo, padrao: m.padrao, curto: m.curto });
            } else {
                itens.push({ entrada: link, ok: false, erro: r.erro });
            }
        });
        return itens;
    }

    global.Conversor = {
        lerTempo: lerTempo,
        extrairLinks: extrairLinks,
        analisar: analisar,
        montar: montar,
        miniatura: miniatura,
        converterTexto: converterTexto
    };
})(typeof window !== 'undefined' ? window : this);

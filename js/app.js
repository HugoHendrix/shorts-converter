(function () {
    'use strict';

    var t = I18n.t;
    var $ = function (id) { return document.getElementById(id); };

    var MAX_HISTORICO = 10;
    var ERROS = { vazio: 'erroVazio', formato: 'erroFormato', dominio: 'erroDominio', 'sem-id': 'erroSemId' };
    var TIPOS = { shorts: 'tipoShorts', watch: 'tipoWatch', curto: 'tipoCurto', embed: 'tipoEmbed', live: 'tipoLive', v: 'tipoV' };

    var itensAtuais = [];
    var erroAtual = null;
    var promptInstalacao = null;

    /* ---------- armazenamento (com tratamento de erro) ---------- */
    function lerHistorico() {
        try {
            var lista = JSON.parse(localStorage.getItem('historico:v1') || '[]');
            return Array.isArray(lista) ? lista : [];
        } catch (e) {
            return [];
        }
    }

    function gravarHistorico(lista) {
        try {
            localStorage.setItem('historico:v1', JSON.stringify(lista));
        } catch (e) { /* sem armazenamento: o histórico só não será guardado */ }
    }

    /* ---------- utilidades ---------- */
    function el(tag, props) {
        var no = document.createElement(tag);
        Object.keys(props || {}).forEach(function (chave) {
            if (chave === 'className') no.className = props[chave];
            else if (chave === 'text') no.textContent = props[chave];
            else no.setAttribute(chave, props[chave]);
        });
        for (var i = 2; i < arguments.length; i++) no.append(arguments[i]);
        return no;
    }

    function formatarTempo(segundos) {
        var h = Math.floor(segundos / 3600);
        var m = Math.floor((segundos % 3600) / 60);
        var s = segundos % 60;
        var dois = function (n) { return String(n).padStart(2, '0'); };
        return h ? h + ':' + dois(m) + ':' + dois(s) : m + ':' + dois(s);
    }

    function copiar(texto) {
        function plano() {
            var temp = document.createElement('textarea');
            temp.value = texto;
            temp.setAttribute('readonly', '');
            temp.style.position = 'fixed';
            temp.style.opacity = '0';
            document.body.appendChild(temp);
            temp.select();
            var ok = false;
            try { ok = document.execCommand('copy'); } catch (e) { /* ignora */ }
            document.body.removeChild(temp);
            return ok;
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(texto).then(function () { return true; }, function () { return plano(); });
        }
        return Promise.resolve(plano());
    }

    function avisar(status, mensagem) {
        status.textContent = mensagem;
        clearTimeout(status._timer);
        status._timer = setTimeout(function () { status.textContent = ''; }, 2500);
    }

    /* botão que copia e mostra "Copiado!" só se deu certo */
    function botaoCopiar(texto, rotulo, statusEl, extra) {
        var botao = el('button', { type: 'button', className: 'botao botao-pequeno ' + (extra || ''), text: rotulo });
        botao.addEventListener('click', function () {
            copiar(texto()).then(function (ok) {
                if (ok) {
                    botao.textContent = t('copiado');
                    setTimeout(function () { botao.textContent = rotulo; }, 1800);
                    avisar(statusEl, t('copiado'));
                } else {
                    avisar(statusEl, t('copiarFalhou'));
                }
            });
        });
        return botao;
    }

    /* ---------- exibição do resultado ---------- */
    function mostrarErro(chave) {
        erroAtual = chave;
        $('erro').textContent = chave ? t(ERROS[chave]) : '';
    }

    function desenharItem(item) {
        if (!item.ok) {
            return el('li', { className: 'item-erro' },
                el('p', { text: t('erroItem', { entrada: item.entrada }) }),
                el('p', { text: t(ERROS[item.erro]) }));
        }

        var statusItem = el('span', { className: 'status', role: 'status', 'aria-live': 'polite' });
        var idLink = 'link-' + item.id;
        var idCurto = 'curto-' + item.id;

        var etiquetas = el('div', { className: 'etiquetas' }, el('span', { className: 'etiqueta', text: t(TIPOS[item.tipo] || 'tipoWatch') }));
        if (item.tempo) etiquetas.append(el('span', { className: 'etiqueta', text: t('tempoEm', { t: formatarTempo(item.tempo) }) }));

        var campoLink = el('input', { type: 'text', id: idLink, readonly: '', value: item.padrao });
        var campoCurto = el('input', { type: 'text', id: idCurto, readonly: '', value: item.curto });

        var abrir = el('a', { className: 'botao botao-pequeno botao-sec', href: item.padrao, target: '_blank', rel: 'noopener noreferrer', text: t('abrir') });
        var acoes = el('div', { className: 'acoes' },
            botaoCopiar(function () { return item.padrao; }, t('copiar'), statusItem), abrir);

        if (navigator.share) {
            var compartilhar = el('button', { type: 'button', className: 'botao botao-pequeno botao-sec', text: t('compartilhar') });
            compartilhar.addEventListener('click', function () {
                navigator.share({ url: item.padrao }).catch(function () { /* o usuário cancelou */ });
            });
            acoes.append(compartilhar);
        }
        acoes.append(statusItem);

        var acoesCurto = el('div', { className: 'acoes' },
            botaoCopiar(function () { return item.curto; }, t('copiar'), statusItem, 'botao-sec'));

        var miniatura = el('img', { src: Conversor.miniatura(item.id), alt: t('miniaturaAlt', { id: item.id }), loading: 'lazy', width: '480', height: '360' });

        return el('li', { className: 'item' }, miniatura,
            el('div', { className: 'item-corpo' }, etiquetas,
                el('label', { for: idLink, text: t('linkVideo') }), campoLink, acoes,
                el('label', { for: idCurto, text: t('linkCurto'), style: 'margin-top:0.8rem' }), campoCurto, acoesCurto));
    }

    function desenharResultado() {
        var lista = $('lista-resultados');
        lista.textContent = '';
        var boas = itensAtuais.filter(function (i) { return i.ok; });
        var erros = itensAtuais.length - boas.length;

        $('resultado').hidden = itensAtuais.length === 0;
        $('copiar-todos').hidden = boas.length < 2;
        if (!itensAtuais.length) return;

        itensAtuais.forEach(function (item) { lista.appendChild(desenharItem(item)); });

        var resumo = boas.length === 1 ? t('resumoUm') : t('resumoVarios', { n: boas.length });
        if (erros) resumo += erros === 1 ? t('resumoComUmErro') : t('resumoComErros', { e: erros });
        $('resumo').textContent = boas.length ? resumo : '';
    }

    /* ---------- histórico ---------- */
    function registrarHistorico(itens) {
        var lista = lerHistorico();
        itens.filter(function (i) { return i.ok; }).reverse().forEach(function (item) {
            lista = lista.filter(function (h) { return h.id !== item.id; });
            lista.unshift({ id: item.id, padrao: item.padrao, em: Date.now() });
        });
        gravarHistorico(lista.slice(0, MAX_HISTORICO));
        desenharHistorico();
    }

    function desenharHistorico() {
        var lista = lerHistorico();
        var ul = $('lista-historico');
        ul.textContent = '';
        $('historico-vazio').hidden = lista.length > 0;
        $('limpar-historico').hidden = lista.length === 0;
        lista.forEach(function (h) {
            var statusItem = el('span', { className: 'status', role: 'status', 'aria-live': 'polite' });
            ul.appendChild(el('li', {},
                el('span', { className: 'historico-link', text: h.padrao }),
                botaoCopiar(function () { return h.padrao; }, t('copiar'), statusItem),
                el('a', { className: 'botao botao-pequeno botao-sec', href: h.padrao, target: '_blank', rel: 'noopener noreferrer', text: t('abrir') }),
                statusItem));
        });
    }

    /* ---------- conversão ---------- */
    function converter() {
        var texto = $('entrada').value;
        mostrarErro(null);
        itensAtuais = [];

        if (!texto.trim()) {
            desenharResultado();
            mostrarErro('vazio');
            return;
        }

        var itens = Conversor.converterTexto(texto, { manterTempo: $('manter-tempo').checked });
        var boas = itens.filter(function (i) { return i.ok; });

        if (!boas.length) {
            desenharResultado();
            mostrarErro(itens[0].erro);
            return;
        }
        itensAtuais = itens;
        desenharResultado();
        registrarHistorico(itens);
    }

    /* ---------- eventos ---------- */
    $('formulario').addEventListener('submit', function (e) {
        e.preventDefault();
        converter();
    });

    $('entrada').addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            converter();
        }
    });

    $('entrada').addEventListener('paste', function () {
        setTimeout(converter, 0);
    });

    $('manter-tempo').addEventListener('change', function () {
        if ($('entrada').value.trim()) converter();
    });

    $('limpar').addEventListener('click', function () {
        $('entrada').value = '';
        itensAtuais = [];
        mostrarErro(null);
        desenharResultado();
        $('entrada').focus();
    });

    if (navigator.clipboard && navigator.clipboard.readText) {
        $('colar').hidden = false;
        $('colar').addEventListener('click', function () {
            navigator.clipboard.readText().then(function (texto) {
                $('entrada').value = texto;
                converter();
            }, function () {
                $('entrada').focus();
            });
        });
    }

    $('copiar-todos').addEventListener('click', function () {
        var todos = itensAtuais.filter(function (i) { return i.ok; }).map(function (i) { return i.padrao; }).join('\n');
        copiar(todos).then(function (ok) {
            avisar($('status-global'), ok ? t('copiado') : t('copiarFalhou'));
        });
    });

    $('limpar-historico').addEventListener('click', function () {
        gravarHistorico([]);
        desenharHistorico();
        avisar($('status-historico'), t('historicoLimpo'));
    });

    $('idioma').addEventListener('click', function () { I18n.alternar(); });

    document.addEventListener('idioma-mudou', function () {
        desenharResultado();
        desenharHistorico();
        if (erroAtual) mostrarErro(erroAtual);
    });

    /* ---------- instalação como app ---------- */
    window.addEventListener('beforeinstallprompt', function (e) {
        e.preventDefault();
        promptInstalacao = e;
        $('instalar').hidden = false;
    });
    $('instalar').addEventListener('click', function () {
        if (!promptInstalacao) return;
        promptInstalacao.prompt();
        promptInstalacao = null;
        $('instalar').hidden = true;
    });

    if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
        navigator.serviceWorker.register('sw.js').catch(function () { /* sem offline, o site segue normal */ });
    }

    /* ---------- início ---------- */
    I18n.iniciar();
    desenharHistorico();

    /* link recebido pelo botão Compartilhar (PWA instalado): ?url=...&text=...&title=... */
    var params = new URLSearchParams(location.search);
    var recebido = ['url', 'text', 'title'].map(function (nome) { return params.get(nome) || ''; }).join('\n').trim();
    if (recebido) {
        $('entrada').value = recebido;
        history.replaceState(null, '', location.pathname);
        converter();
    }
})();

/*
 * Textos em português e inglês.
 * O HTML já vem em português (para buscadores e para quem não usa JavaScript);
 * este arquivo troca os textos quando o idioma é inglês.
 */
(function (global) {
    'use strict';

    var TEXTOS = {
        pt: {
            docTitulo: 'Conversor de YouTube Shorts para link de vídeo normal',
            docDescricao: 'Converta links do YouTube Shorts em links de vídeo comuns. Cole vários links de uma vez, veja a miniatura, copie, abra, compartilhe e use no celular como app.',
            idioma: 'English',
            idiomaRotulo: 'Mudar o idioma para inglês',
            pular: 'Pular para o conversor',
            titulo: 'Conversor de Shorts',
            subtitulo: 'Transforme links do YouTube Shorts em links de vídeo comuns, em segundos.',
            entradaRotulo: 'Cole um ou mais links do YouTube',
            entradaDica: 'Aceita vários links, um por linha, ou o texto inteiro de uma mensagem. Os links são achados automaticamente.',
            entradaPlaceholder: 'https://www.youtube.com/shorts/...',
            converter: 'Converter',
            colar: 'Colar',
            limpar: 'Limpar',
            manterTempo: 'Manter o tempo do vídeo, quando o link tiver um',
            resultadoTitulo: 'Resultado',
            resumoUm: '1 link convertido.',
            resumoVarios: '{n} links convertidos.',
            resumoComErros: ' {e} não puderam ser convertidos.',
            resumoComUmErro: ' 1 não pôde ser convertido.',
            linkVideo: 'Link de vídeo',
            linkCurto: 'Link curto',
            copiar: 'Copiar',
            copiado: 'Copiado!',
            copiarFalhou: 'Não foi possível copiar. Selecione o texto e copie manualmente.',
            copiarTodos: 'Copiar todos os links',
            abrir: 'Abrir vídeo',
            compartilhar: 'Compartilhar',
            miniaturaAlt: 'Miniatura do vídeo {id}',
            tipoShorts: 'Short',
            tipoWatch: 'Vídeo',
            tipoCurto: 'Link curto',
            tipoEmbed: 'Incorporado',
            tipoLive: 'Ao vivo',
            tipoV: 'Vídeo',
            tempoEm: 'a partir de {t}',
            erroVazio: 'Cole um link do YouTube para converter.',
            erroFormato: 'Isso não parece um link. Cole o endereço completo, como https://www.youtube.com/shorts/...',
            erroDominio: 'Esse link não é do YouTube.',
            erroSemId: 'Não encontrei um vídeo nesse link. Confira se o endereço está completo.',
            erroItem: 'Não foi possível converter: {entrada}',
            historicoTitulo: 'Histórico recente',
            historicoVazio: 'Nenhuma conversão ainda. Os links convertidos aparecem aqui, só neste navegador.',
            historicoLimpar: 'Limpar histórico',
            historicoLimpo: 'Histórico apagado.',
            atalhosTitulo: 'Atalhos úteis',
            bookmarkletTitulo: 'Botão no navegador (bookmarklet)',
            bookmarkletTexto: 'Arraste o botão abaixo para a barra de favoritos. Quando estiver assistindo a um Short no computador, clique nele para abrir o mesmo vídeo no player normal.',
            bookmarkletBotao: 'Short para vídeo',
            appTitulo: 'Instalar como app no celular',
            appTexto: 'Instale esta página na tela inicial e use o botão Compartilhar do YouTube: escolha o Conversor de Shorts e o link já chega convertido. Funciona em navegadores compatíveis, como o Chrome no Android.',
            instalar: 'Instalar app',
            comoTitulo: 'Como funciona',
            comoTexto: 'A ferramenta lê o endereço do Short, pega o código de 11 caracteres do vídeo e monta um link de vídeo comum, no formato youtube.com/watch?v=CÓDIGO. Tudo acontece no seu navegador: nenhum link é enviado a servidor algum.',
            faqTitulo: 'Perguntas frequentes',
            faq1p: 'Por que converter um link de Short?',
            faq1r: 'O link de vídeo comum abre no player normal, com controles de tempo e velocidade, e facilita adicionar o vídeo a playlists e assistir no computador.',
            faq2p: 'Quais links funcionam?',
            faq2r: 'Shorts (youtube.com/shorts), links do celular (m.youtube.com), links curtos (youtu.be), vídeos comuns, vídeos incorporados (embed) e transmissões ao vivo.',
            faq3p: 'Meus links são guardados?',
            faq3r: 'Não em servidor. O histórico fica apenas neste navegador e você pode apagá-lo quando quiser. A miniatura é carregada do servidor de imagens do YouTube.',
            faq4p: 'Funciona sem internet?',
            faq4r: 'A conversão funciona offline depois que a página carregou uma vez. Só a miniatura precisa de internet.',
            rodape: 'Feito por Hugo Hendrix. Projeto independente, sem vínculo com o YouTube ou o Google.',
            testes: 'Ver os testes',
            codigo: 'Código no GitHub'
        },
        en: {
            docTitulo: 'YouTube Shorts to regular video link converter',
            docDescricao: 'Convert YouTube Shorts links into regular video links. Paste several links at once, see the thumbnail, copy, open, share, and use it on your phone as an app.',
            idioma: 'Português',
            idiomaRotulo: 'Change language to Portuguese',
            pular: 'Skip to the converter',
            titulo: 'Shorts Converter',
            subtitulo: 'Turn YouTube Shorts links into regular video links in seconds.',
            entradaRotulo: 'Paste one or more YouTube links',
            entradaDica: 'Accepts several links, one per line, or the whole text of a message. Links are found automatically.',
            entradaPlaceholder: 'https://www.youtube.com/shorts/...',
            converter: 'Convert',
            colar: 'Paste',
            limpar: 'Clear',
            manterTempo: 'Keep the video start time, when the link has one',
            resultadoTitulo: 'Result',
            resumoUm: '1 link converted.',
            resumoVarios: '{n} links converted.',
            resumoComErros: ' {e} could not be converted.',
            resumoComUmErro: ' 1 could not be converted.',
            linkVideo: 'Video link',
            linkCurto: 'Short link',
            copiar: 'Copy',
            copiado: 'Copied!',
            copiarFalhou: 'Could not copy. Select the text and copy it manually.',
            copiarTodos: 'Copy all links',
            abrir: 'Open video',
            compartilhar: 'Share',
            miniaturaAlt: 'Video thumbnail {id}',
            tipoShorts: 'Short',
            tipoWatch: 'Video',
            tipoCurto: 'Short link',
            tipoEmbed: 'Embedded',
            tipoLive: 'Live',
            tipoV: 'Video',
            tempoEm: 'starting at {t}',
            erroVazio: 'Paste a YouTube link to convert.',
            erroFormato: 'That does not look like a link. Paste the full address, like https://www.youtube.com/shorts/...',
            erroDominio: 'That link is not from YouTube.',
            erroSemId: 'I could not find a video in that link. Check that the address is complete.',
            erroItem: 'Could not convert: {entrada}',
            historicoTitulo: 'Recent history',
            historicoVazio: 'No conversions yet. Converted links show up here, only in this browser.',
            historicoLimpar: 'Clear history',
            historicoLimpo: 'History cleared.',
            atalhosTitulo: 'Handy shortcuts',
            bookmarkletTitulo: 'Browser button (bookmarklet)',
            bookmarkletTexto: 'Drag the button below to your bookmarks bar. While watching a Short on a computer, click it to open the same video in the regular player.',
            bookmarkletBotao: 'Short to video',
            appTitulo: 'Install as a phone app',
            appTexto: 'Install this page on your home screen and use YouTube\'s Share button: pick Shorts Converter and the link arrives already converted. Works in compatible browsers, such as Chrome on Android.',
            instalar: 'Install app',
            comoTitulo: 'How it works',
            comoTexto: 'The tool reads the Short address, takes the 11-character video code and builds a regular video link in the youtube.com/watch?v=CODE format. Everything happens in your browser: no link is sent to any server.',
            faqTitulo: 'Frequently asked questions',
            faq1p: 'Why convert a Short link?',
            faq1r: 'The regular video link opens in the normal player, with time and speed controls, and makes it easier to add the video to playlists and watch on a computer.',
            faq2p: 'Which links work?',
            faq2r: 'Shorts (youtube.com/shorts), mobile links (m.youtube.com), short links (youtu.be), regular videos, embedded videos and live streams.',
            faq3p: 'Are my links stored?',
            faq3r: 'Not on a server. The history stays only in this browser and you can erase it whenever you want. The thumbnail is loaded from YouTube\'s image server.',
            faq4p: 'Does it work offline?',
            faq4r: 'Conversion works offline once the page has loaded one time. Only the thumbnail needs internet.',
            rodape: 'Made by Hugo Hendrix. Independent project, not affiliated with YouTube or Google.',
            testes: 'View the tests',
            codigo: 'Code on GitHub'
        }
    };

    var idioma = 'pt';

    function detectar() {
        var salvo = null;
        try { salvo = localStorage.getItem('idioma'); } catch (e) { /* sem armazenamento */ }
        if (salvo === 'pt' || salvo === 'en') return salvo;
        var navegador = (navigator.language || 'pt').toLowerCase();
        return navegador.indexOf('pt') === 0 ? 'pt' : 'en';
    }

    function t(chave, vars) {
        var texto = (TEXTOS[idioma] && TEXTOS[idioma][chave]) || TEXTOS.pt[chave] || chave;
        Object.keys(vars || {}).forEach(function (nome) {
            texto = texto.split('{' + nome + '}').join(vars[nome]);
        });
        return texto;
    }

    function aplicar() {
        document.documentElement.lang = idioma === 'pt' ? 'pt-BR' : 'en';
        document.title = t('docTitulo');
        var desc = document.querySelector('meta[name="description"]');
        if (desc) desc.content = t('docDescricao');
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            el.textContent = t(el.getAttribute('data-i18n'));
        });
        ['placeholder', 'aria-label', 'title'].forEach(function (attr) {
            document.querySelectorAll('[data-i18n-' + attr + ']').forEach(function (el) {
                el.setAttribute(attr, t(el.getAttribute('data-i18n-' + attr)));
            });
        });
    }

    function definir(novo) {
        idioma = novo === 'en' ? 'en' : 'pt';
        try { localStorage.setItem('idioma', idioma); } catch (e) { /* sem armazenamento */ }
        aplicar();
        document.dispatchEvent(new CustomEvent('idioma-mudou'));
    }

    global.I18n = {
        t: t,
        atual: function () { return idioma; },
        iniciar: function () {
            idioma = detectar();
            if (idioma !== 'pt') aplicar();
        },
        alternar: function () { definir(idioma === 'pt' ? 'en' : 'pt'); }
    };
})(window);

import React, { useState, useCallback, useMemo } from 'react';

const translations = {
    en: {
        title: "Shorts Converter",
        subtitle: "Instantly convert YouTube Shorts links to regular video links.",
        placeholder: "Paste the YouTube Shorts URL here...",
        convertButton: "Convert",
        errorEnterUrl: "Please enter a URL.",
        errorValidYouTubeUrl: "Please enter a valid YouTube URL.",
        errorNoVideoId: "Could not find a valid video ID in the URL. Please check the URL and try again.",
        errorInvalidFormat: "Invalid URL format. Please enter a full URL (e.g., https://...).",
        convertedUrlLabel: "Converted URL:",
        copyButton: "Copy",
        copiedButton: "Copied!",
        howItWorksTitle: "How does it work?",
        howItWorksP1: "This tool extracts the video ID from a YouTube Shorts URL (like",
        howItWorksP2: ") and transforms it into a standard YouTube video URL (",
        howItWorksP3: ").",
        howItWorksP4: "This allows you to watch the video in the standard player, add it to playlists, and share a link that works better on desktops.",
        footer: "Made for a better viewing experience.",
        languageToggle: "Português",
    },
    pt: {
        title: "Conversor de Shorts",
        subtitle: "Converta instantaneamente links do YouTube Shorts para links de vídeo normais.",
        placeholder: "Cole a URL do YouTube Shorts aqui...",
        convertButton: "Converter",
        errorEnterUrl: "Por favor, insira uma URL.",
        errorValidYouTubeUrl: "Por favor, insira uma URL válida do YouTube.",
        errorNoVideoId: "Não foi possível encontrar um ID de vídeo válido na URL. Verifique a URL e tente novamente.",
        errorInvalidFormat: "Formato de URL inválido. Por favor, insira uma URL completa (ex: https://...).",
        convertedUrlLabel: "URL Convertida:",
        copyButton: "Copiar",
        copiedButton: "Copiado!",
        howItWorksTitle: "Como Funciona?",
        howItWorksP1: "Esta ferramenta extrai o ID do vídeo de uma URL do YouTube Shorts (como",
        howItWorksP2: ") e a transforma em uma URL de vídeo padrão do YouTube (",
        howItWorksP3: ").",
        howItWorksP4: "Isso permite que você assista ao vídeo no player padrão, adicione-o a playlists e compartilhe um link que funciona melhor em computadores.",
        footer: "Feito para uma melhor experiência de visualização.",
        languageToggle: "English",
    }
}

const YouTubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 28 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M27.3506 3.03906C27.0156 1.84375 26.0312 0.859375 24.8359 0.523438C22.6641 0 14 0 14 0C14 0 5.33594 0 3.16406 0.523438C1.96875 0.859375 0.984375 1.84375 0.649375 3.03906C0 5.21094 0 10 0 10C0 10 0 14.7891 0.649375 16.9609C0.984375 18.1562 1.96875 19.1406 3.16406 19.4766C5.33594 20 14 20 14 20C14 20 22.6641 20 24.8359 19.4766C26.0312 19.1406 27.0156 18.1562 27.3506 16.9609C28 14.7891 28 10 28 10C28 10 28 5.21094 27.3506 3.03906Z"
      fill="#FF0000"
    />
    <path d="M11.1992 14.2852V5.71484L18.4844 10.0001L11.1992 14.2852Z" fill="white" />
  </svg>
);

const CopyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 4.625v2.625a2.625 2.625 0 01-2.625 2.625H12a2.625 2.625 0 01-2.625-2.625V12a2.625 2.625 0 012.625-2.625h2.625a2.625 2.625 0 012.625 2.625v2.625" />
    </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93-.91 0-1.38.61-1.38 1.93V19h-3v-9h3v1.38h.04c.41-.69 1.48-1.38 3.12-1.38 3.34 0 3.88 2.21 3.88 5.06V19z" />
  </svg>
);

const GitHubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const getInitialLanguage = (): 'en' | 'pt' => {
    if (typeof navigator !== 'undefined') {
        const browserLang = navigator.language.split('-')[0];
        return browserLang === 'pt' ? 'pt' : 'en';
    }
    return 'en';
};

export default function App() {
  const [language, setLanguage] = useState<'en' | 'pt'>(getInitialLanguage());
  const [inputUrl, setInputUrl] = useState('');
  const [convertedUrl, setConvertedUrl] = useState('');
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const t = useMemo(() => translations[language], [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'pt' : 'en');
  };

  const handleConvert = useCallback(() => {
    setError('');
    setConvertedUrl('');
    setIsCopied(false);

    if (!inputUrl.trim()) {
      setError(t.errorEnterUrl);
      return;
    }

    try {
        const url = new URL(inputUrl);
        if (url.hostname !== 'www.youtube.com' && url.hostname !== 'youtube.com' && url.hostname !== 'youtu.be') {
            setError(t.errorValidYouTubeUrl);
            return;
        }

        let videoId: string | null = null;
        const pathname = url.pathname;

        if (pathname.startsWith('/shorts/')) {
            videoId = pathname.substring('/shorts/'.length);
        } else if (url.hostname === 'youtu.be') {
            videoId = pathname.substring(1);
        } else {
             videoId = url.searchParams.get('v');
             if (pathname.startsWith('/watch')) {
                setConvertedUrl(inputUrl);
                return;
             }
        }

        if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId.split('?')[0])) {
            setConvertedUrl(`https://www.youtube.com/watch?v=${videoId.split('?')[0]}`);
        } else {
            setError(t.errorNoVideoId);
        }

    } catch (e) {
        setError(t.errorInvalidFormat);
    }
  }, [inputUrl, t]);

  const handleCopy = useCallback(() => {
    if (convertedUrl) {
      navigator.clipboard.writeText(convertedUrl);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [convertedUrl]);

  return (
    <div className="min-h-screen bg-brand-dark text-white flex flex-col items-center justify-center p-4 font-sans relative">
       <div className="absolute top-4 right-4">
        <button
          onClick={toggleLanguage}
          className="bg-brand-light-dark hover:bg-brand-gray/20 text-white font-semibold py-2 px-4 border border-brand-light-dark rounded-lg shadow transition-colors duration-300"
        >
          {t.languageToggle}
        </button>
      </div>

      <main className="w-full max-w-2xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <YouTubeIcon className="w-16 h-auto" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t.title}
            </h1>
          </div>
          <p className="text-lg text-brand-gray">
            {t.subtitle}
          </p>
        </header>

        <div className="bg-brand-light-dark p-6 rounded-xl shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleConvert()}
              placeholder={t.placeholder}
              className="flex-grow bg-brand-dark border-2 border-brand-light-dark focus:border-brand-red focus:ring-brand-red rounded-lg p-3 text-white placeholder-brand-gray transition-colors duration-300"
              aria-label="YouTube URL Input"
            />
            <button
              onClick={handleConvert}
              className="bg-brand-red hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-transform duration-200 ease-in-out active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              {t.convertButton}
            </button>
          </div>
          {error && <p className="text-red-400 text-center animate-pulse">{error}</p>}
        </div>

        {convertedUrl && (
          <div className="bg-brand-light-dark p-6 rounded-xl shadow-lg animate-fade-in space-y-4">
            <label className="font-semibold text-brand-gray">{t.convertedUrlLabel}</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                readOnly
                value={convertedUrl}
                className="flex-grow bg-brand-dark border-2 border-brand-light-dark rounded-lg p-3 text-green-400 font-mono"
                aria-label="Converted YouTube URL"
              />
              <button
                onClick={handleCopy}
                className={`flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50 w-full sm:w-auto ${
                  isCopied
                    ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                }`}
              >
                {isCopied ? (
                  <>
                    <CheckIcon className="w-6 h-6" /> {t.copiedButton}
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-6 h-6" /> {t.copyButton}
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        <div className="bg-brand-light-dark p-6 rounded-xl shadow-lg space-y-4">
            <h2 className="text-2xl font-bold text-center">{t.howItWorksTitle}</h2>
            <p className="text-brand-gray text-center">
                {t.howItWorksP1} <code className="bg-brand-dark px-1 rounded">youtube.com/shorts/VIDEO_ID</code> {t.howItWorksP2} <code className="bg-brand-dark px-1 rounded">youtube.com/watch?v=VIDEO_ID</code>{t.howItWorksP3}
            </p>
            <p className="text-brand-gray text-center">
                {t.howItWorksP4}
            </p>
        </div>

        <footer className="text-center text-brand-gray text-sm pt-8 space-y-4">
            <p>{t.footer}</p>
            <div className="flex justify-center items-center gap-6">
                <a href="https://www.linkedin.com/in/hugohendrix/" target="_blank" rel="noopener noreferrer" aria-label="Hugo Hendrix's LinkedIn Profile">
                    <LinkedInIcon className="w-6 h-6 text-brand-gray hover:text-white transition-colors duration-300" />
                </a>
                <a href="https://github.com/HugoHendrix" target="_blank" rel="noopener noreferrer" aria-label="Hugo Hendrix's GitHub Profile">
                    <GitHubIcon className="w-6 h-6 text-brand-gray hover:text-white transition-colors duration-300" />
                </a>
            </div>
        </footer>
      </main>
    </div>
  );
}

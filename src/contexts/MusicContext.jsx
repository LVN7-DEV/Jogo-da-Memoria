import { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react';

const MusicContext = createContext({});

export function MusicProvider({ children }) {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(true);
  const backgroundMusicRef = useRef(null);

  // FUNÇÃO: useEffect (inicializar áudio)
  // Cria o elemento de áudio da música de fundo e configura loop/volume
  useEffect(() => {
    const audio = new Audio("/sounds/floresta.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    backgroundMusicRef.current = audio;

    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current = null;
      }
    };
  }, []);

  // FUNÇÃO: toggleMusic
  // Alterna entre play/pause da música de fundo
  const toggleMusic = useCallback(() => {
    if (!backgroundMusicRef.current) return;
    
    if (isMusicPlaying) {
      backgroundMusicRef.current.pause();
    } else {
      backgroundMusicRef.current.play().catch(() => {});
    }
    setIsMusicPlaying(prev => !prev);
  }, [isMusicPlaying]);

  // FUNÇÃO: toggleSoundEffects
  // Ativa/desativa os efeitos sonoros do jogo
  const toggleSoundEffects = useCallback(() => {
    setSoundEffectsEnabled(prev => !prev);
  }, []);

  const value = {
    isMusicPlaying,
    toggleMusic,
    soundEffectsEnabled,
    toggleSoundEffects
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
}

// FUNÇÃO: useMusic (hook personalizado)
// Hook para acessar o contexto de música em qualquer componente
export function useMusic() {
  const context = useContext(MusicContext);
  if (!context || Object.keys(context).length === 0) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
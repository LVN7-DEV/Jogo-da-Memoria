import { useState } from "react";
import Game from "./Game";
import Ranking from "./Ranking";
import ModalVideo from 'react-modal-video';
import 'react-modal-video/scss/modal-video.scss';
import { useMusic } from '../contexts/MusicContext';
import "./App.css";

function App() {
  const [currentScreen, setCurrentScreen] = useState("menu");
  const [showInstructions, setShowInstructions] = useState(false);
  const [showRanking, setShowRanking] = useState(false);
  const { isMusicPlaying, toggleMusic } = useMusic();
  
  // Dados das lendas
  const legends = [
    { id: 'saci', emoji: '🌿', name: 'Saci', text: 'Um menino travesso de uma perna só que aparece em redemoinhos.', videoId: 'um1WHr1ejow' },
    { id: 'iara', emoji: '💧', name: 'Iara', text: 'A sereia dos rios que encanta os pescadores com seu canto.', videoId: 'gDEnVgMcJDA' },
    { id: 'boitata', emoji: '🔥', name: 'Boitatá', text: 'A cobra de fogo que protege as matas contra incêndios.', videoId: '6gErX5pNLbU' },
    { id: 'boibumba', emoji: '🐂', name: 'Boi-Bumbá', text: 'Boi colorido, tradição no Norte e Nordeste.', videoId: 'CQ7ma59SBn8' },
    { id: 'caipora', emoji: '🦊', name: 'Caipora', text: 'Protetora dos animais e da floresta, gosta de pregar peças em caçadores.', videoId: '7UxylJ4XChI' },
    { id: 'curupira', emoji: '👣', name: 'Curupira', text: 'Guardião da floresta com pés virados para trás, confunde invasores.', videoId: 'gKpiIzfNQA8' },
    { id: 'lobisomem', emoji: '🐺', name: 'Lobisomem', text: 'Homem que se transforma em lobo nas noites de lua cheia.', videoId: 'oHHhl07EdWk' },
    { id: 'cuca', emoji: '🐊', name: 'Cuca', text: 'Bruxa com cabeça de jacaré que rouba crianças desobedientes.', videoId: '9eLv1r6Fgsc' },
    { id: 'mula', emoji: '🐴', name: 'Mula', text: 'Mula que solta fogo pelo pescoço, assombra estradas à noite.', videoId: 'lDuTbuu5FPk' },
    { id: 'boto', emoji: '🐬', name: 'Boto', text: 'Boto que se transforma em um belo rapaz para seduzir mulheres.', videoId: '1Oluc3iLFi4' }
  ];

  // Estado para vídeos
  const [videoOpen, setVideoOpen] = useState(
    Object.fromEntries(legends.map(l => [l.id, false]))
  );

  const handleStartGame = () => setCurrentScreen("game");
  const handleBackToMenu = () => setCurrentScreen("menu");
  const openVideo = (id) => setVideoOpen(prev => ({ ...prev, [id]: true }));
  const closeVideo = (id) => setVideoOpen(prev => ({ ...prev, [id]: false }));

  // Elementos decorativos reutilizáveis
  const Decorations = () => (
    <>
      {/* Animais */}
      {['🐆','🐒','🦜','🐊','🦉','🐍','🐸','🦎','🐅','🦌','🦦','🦥','🐃','🦧','🐆'].map((emoji, i) => (
        <div key={`animal-${i}`} className={`animal animal-${i+1}`}>{emoji}</div>
      ))}

      {/* Insetos */}
      {['🐝','🐞','🦟','🐜','🦗','🐛','🕷️','🦂'].map((emoji, i) => (
        <div key={`insect-${i}`} className={`insect insect-${i+1}`}>{emoji}</div>
      ))}

      {/* Borboletas */}
      <div className="butterfly butterfly-1">🦋</div>
      <div className="butterfly butterfly-2">🦋</div>

      {/* Pássaros */}
      {['🐦','🦩','🦚','🦢','🐧','🦜','🕊️'].map((emoji, i) => (
        <div key={`bird-${i}`} className={`bird bird-${i+1}`}>{emoji}</div>
      ))}

      {/* Natureza */}
      {['🌿','🍃','🌱','🍄','🌻','🌺','🌸','🌿','🍂','💧','🌴','🍌','🥥','🌳','🌿'].map((emoji, i) => (
        <div key={`nature-${i}`} className={`nature nature-${i+1}`}>{emoji}</div>
      ))}
    </>
  );

  const renderMenu = () => (
    <div className="forest-menu">
      <button onClick={toggleMusic} className="music-corner-btn">
        {isMusicPlaying ? "🔊" : "🔈"}
      </button>
      
      {/* Modais de vídeo */}
      {legends.map(legend => (
        <ModalVideo
          key={legend.id}
          channel='youtube'
          autoplay
          isOpen={videoOpen[legend.id]}
          videoId={legend.videoId}
          onClose={() => closeVideo(legend.id)}
        />
      ))}

      <Decorations />
      
      <div className="menu-content glass-effect">
        <div className="title-container">
          <h1 className="main-title">
            <span className="title-icon">🌳</span>
            <span className="title-text">JOGO DA MEMÓRIA</span>
            <span className="title-icon">🌳</span>
          </h1>
          <h2 className="subtitle">LENDAS DA AMAZÔNIA</h2>
        </div>

        <div className="menu-quote">
          <p>"Descubra os mistérios da floresta encantada..."</p>
        </div>

        <div className="menu-buttons">
          <button className="menu-btn primary-btn" onClick={handleStartGame}>
            <span className="btn-icon">🔥</span> ENTRAR NA FLORESTA <span className="btn-icon">🔥</span>
          </button>
          <button className="menu-btn secondary-btn" onClick={() => setShowInstructions(true)}>
            <span className="btn-icon">📖</span> LENDAS <span className="btn-icon">📖</span>
          </button>
          <button className="menu-btn ranking-btn" onClick={() => setShowRanking(true)}>
            <span className="btn-icon">🏆</span> RANKING <span className="btn-icon">🏆</span>
          </button>
        </div>

        <div className="menu-footer">
          <p>🌿 5 fases · 25 personagens · Curiosidades educativas 🌿</p>
        </div>
      </div>

      {/* Modal de Lendas */}
      {showInstructions && (
        <div className="instructions-modal" onClick={() => setShowInstructions(false)}>
          <div className="modal-content-forest" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowInstructions(false)}>✕</button>
            <h3>LENDAS DA FLORESTA</h3>
            
            <div className="legends-grid">
              {legends.map(legend => (
                <div key={legend.id} className="legend-item video-legend">
                  <div className="legend-header">
                    <span className="legend-emoji">{legend.emoji}</span>
                    <strong>{legend.name}</strong>
                  </div>
                  <button className="video-btn" onClick={() => openVideo(legend.id)}>
                    ▶ Ver Vídeo
                  </button>
                  <p>{legend.text}</p>
                </div>
              ))}
            </div>

            <div className="legends-footer">
              <p>🌿 10 lendas brasileiras para conhecer e se encantar! 🌿</p>
            </div>
          </div>
        </div>
      )}

      {showRanking && <Ranking onClose={() => setShowRanking(false)} />}
    </div>
  );

  return (
    <>
      {currentScreen === "menu" && renderMenu()}
      {currentScreen === "game" && <Game onBackToMenu={handleBackToMenu} />}
    </>
  );
}

export default App;
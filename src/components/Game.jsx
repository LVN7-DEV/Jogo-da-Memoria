import { useState, useCallback, useEffect, useRef } from "react";
import { useMusic } from '../contexts/MusicContext';
import "./App.css";

// Personagens
const characters = [
  // Fase 1 (3 pares)
  { name: "Saci", img: "/assets/saci.png" },
  { name: "Saci", img: "/assets/saci.png" },
  { name: "Iara", img: "/assets/iara.png" },
  { name: "Iara", img: "/assets/iara.png" },
  { name: "Curupira", img: "/assets/curupira.png" },
  { name: "Curupira", img: "/assets/curupira.png" },
  
  // Fase 2 (4 pares)
  { name: "Boitatá", img: "/assets/boitata.png" },
  { name: "Boitatá", img: "/assets/boitata.png" },
  { name: "Mapinguari", img: "/assets/mapinguari.png" },
  { name: "Mapinguari", img: "/assets/mapinguari.png" },
  { name: "Caipora", img: "/assets/caipora.png" },
  { name: "Caipora", img: "/assets/caipora.png" },
  { name: "Mula sem Cabeça", img: "/assets/mula.png" },
  { name: "Mula sem Cabeça", img: "/assets/mula.png" },
  
  // Fase 3 (5 pares)
  { name: "Boto", img: "/assets/boto.png" },
  { name: "Boto", img: "/assets/boto.png" },
  { name: "Vitória-Régia", img: "/assets/vitoriaregia.png" },
  { name: "Vitória-Régia", img: "/assets/vitoriaregia.png" },
  { name: "Tucuxi", img: "/assets/tucuxi.png" },
  { name: "Tucuxi", img: "/assets/tucuxi.png" },
  { name: "Pirarucu", img: "/assets/pirarucu.png" },
  { name: "Pirarucu", img: "/assets/pirarucu.png" },
  { name: "Cobra Grande", img: "/assets/cobragrande.png" },
  { name: "Cobra Grande", img: "/assets/cobragrande.png" },
  
  // Fase 4 (6 pares)
  { name: "Lobisomem", img: "/assets/lobisomem.png" },
  { name: "Lobisomem", img: "/assets/lobisomem.png" },
  { name: "Matinta Perera", img: "/assets/matinta.png" },
  { name: "Matinta Perera", img: "/assets/matinta.png" },
  { name: "Boi-Bumbá", img: "/assets/boibumba.png" },
  { name: "Boi-Bumbá", img: "/assets/boibumba.png" },
  { name: "Pisadeira", img: "/assets/pisadeira.png" },
  { name: "Pisadeira", img: "/assets/pisadeira.png" },
  { name: "Cuca", img: "/assets/cuca.png" },
  { name: "Cuca", img: "/assets/cuca.png" },
  { name: "Negrinho do Pastoreio", img: "/assets/negrinho.png" },
  { name: "Negrinho do Pastoreio", img: "/assets/negrinho.png" },
  
  // Fase 5 (7 pares)
  { name: "Papa-Figo", img: "/assets/papafigo.png" },
  { name: "Papa-Figo", img: "/assets/papafigo.png" },
  { name: "Quibungo", img: "/assets/quibungo.png" },
  { name: "Quibungo", img: "/assets/quibungo.png" },
  { name: "Cabeça de Cuia", img: "/assets/cabecadecuia.png" },
  { name: "Cabeça de Cuia", img: "/assets/cabecadecuia.png" },
  { name: "Corpo Seco", img: "/assets/corpseco.png" },
  { name: "Corpo Seco", img: "/assets/corpseco.png" },
  { name: "Romãozinho", img: "/assets/romao.png" },
  { name: "Romãozinho", img: "/assets/romao.png" },
  { name: "Maria Caninana", img: "/assets/mariacaninana.png" },
  { name: "Maria Caninana", img: "/assets/mariacaninana.png" },
  { name: "João Galafuz", img: "/assets/joaogalafuz.png" },
  { name: "João Galafuz", img: "/assets/joaogalafuz.png" },
];

// Curiosidades para TODOS os personagens
const curiosidadesPorFase = {
  1: {
    titulo: "🌿 Fase 1 - Personagens Clássicos",
    texto: "Saci é um menino travesso de uma perna só que aparece em redemoinhos, Iara é uma sereia dos rios que encanta os pescadores com seu canto e o Curupira é o protetor da floresta com os pés virados para trás para enganar caçadores."
  },
  2: {
    titulo: "🔥 Fase 2 - Protetores da Floresta",
    texto: "Boitatá é uma cobra de fogo que protege as matas contra incêndios, o Mapinguari é uma criatura peluda com boca no umbigo que solta um fedor insuportável, a Caipora é a protetora dos animais que assusta caçadores e a Mula sem Cabeça e uma mula que solta fogo pelo pescoço e assusta viajantes."
  },
  3: {
    titulo: "💧 Fase 3 - Seres das Águas",
    texto: " O Boto se transforma em um homem bonito nas festas juninas para seduzir as moças, a Vitória-Régia nasceu do amor de uma índia pela Lua, o Tucuxi é um golfinho de água doce presente nas lendas amazônicas, o Pirarucu é um guerreiro que virou peixe gigante e a Cobra Grande é a mãe de todos os rios da Amazônia."
  },
  4: {
    titulo: "🌙 Fase 4 - Criaturas Místicas",
    texto: "O Lobisomem é o sétimo filho homem que vira lobo nas noites de lua cheia, a Matinta Perera é uma bruxa que assombra as noites e pede tabaco, o Boi-Bumbá é uma tradição cultural do Norte celebrada no Festival de Parintins, a Pisadeira é uma assombração que pisa em quem dorme de barriga vazia, a Cuca é uma bruxa que rouba crianças desobedientes e o Negrinho do Pastoreio é um menino que ajuda a encontrar objetos perdidos."
  },
  5: {
    titulo: "🏞️ Fase 5 - Lendas Regionais",
    texto: "O Papa-Figo é um ser que rouba fígados de quem enterra mal os mortos, o Quibungo é uma criatura com buraco nas costas que engole crianças o Cabeça de Cuia é uma assombração com cabeça grande que vive nos rios, o Corpo Seco é uma alma amaldiçoada que nunca morre, o Romãozinho é um menino amaldiçoado que vaga pelas estradas, Maria Caninana é uma cobra que vira balsa para afogar pessoas e o João Galafuz é um pescador fantasma que navega pelos rios."
  }
};

// Funções auxiliares
function shuffle(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function generateCards(level) {
  const pairsPerLevel = { 1: 3, 2: 4, 3: 5, 4: 6, 5: 7 };
  const pairs = pairsPerLevel[level] || 3;
  
  let startIndex = 0;
  for (let i = 1; i < level; i++) {
    startIndex += pairsPerLevel[i] * 2;
  }
  
  const phaseCards = characters.slice(startIndex, startIndex + (pairs * 2));
  
  return shuffle(phaseCards).map((card, index) => ({
    ...card,
    id: `${card.name}-${index}-${Date.now()}-${Math.random()}`,
    flipped: false,
    matched: false,
  }));
}

// Função para formatar o tempo (mm:ss)
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Componente Game
function Game({ onBackToMenu }) {
  const { isMusicPlaying, toggleMusic, soundEffectsEnabled, toggleSoundEffects } = useMusic();
  
  const [playerName, setPlayerName] = useState("");
  const [showNameInput, setShowNameInput] = useState(true);
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState(() => generateCards(1));
  const [selected, setSelected] = useState([]);
  const [lock, setLock] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [curiosity, setCuriosity] = useState({ titulo: "", texto: "" });
  const [showVictoryAnimation, setShowVictoryAnimation] = useState(false);
  const [previewMode, setPreviewMode] = useState(true);
  const [showAudioMenu, setShowAudioMenu] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [playerRecords, setPlayerRecords] = useState({});
  
  // REFS
  const matchSoundRef = useRef(null);
  const victorySoundRef = useRef(null);
  const timerRef = useRef(null);

  // Carregar rankings do localStorage
  useEffect(() => {
    const savedRankings = localStorage.getItem("folcloreRankings");
    if (savedRankings) setPlayerRecords(JSON.parse(savedRankings));
  }, []);

  // Salvar rankings no localStorage
  useEffect(() => {
    if (Object.keys(playerRecords).length) {
      localStorage.setItem("folcloreRankings", JSON.stringify(playerRecords));
    }
  }, [playerRecords]);

  // Preview mode
  useEffect(() => {
    if (!previewMode) return;
    const timeout = setTimeout(() => {
      setPreviewMode(false);
      setIsTimerActive(true);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [previewMode]);

  // Timer
  useEffect(() => {
    if (isTimerActive) {
      timerRef.current = setInterval(() => setTimer(prev => prev + 1), 1000);
    }
    return () => timerRef.current && clearInterval(timerRef.current);
  }, [isTimerActive]);

  // Sons de efeito
  useEffect(() => {
    matchSoundRef.current = new Audio("/sounds/acerto.mp3");
    matchSoundRef.current.volume = 0.6;
    victorySoundRef.current = new Audio("/sounds/vitoria.mp3");
    victorySoundRef.current.volume = 0.7;
  }, []);

  const playSound = (soundRef) => {
    if (soundRef.current && soundEffectsEnabled) {
      soundRef.current.currentTime = 0;
      soundRef.current.play().catch(() => {});
    }
  };

  const handleStartGame = () => {
    if (!playerName.trim()) {
      alert("Por favor, digite seu nome!");
      return;
    }
    setShowNameInput(false);
    setPreviewMode(true);
  };

  const handleFlip = useCallback((card) => {
    if (lock || card.flipped || card.matched || previewMode) return;

    const updatedCards = cards.map(c => 
      c.id === card.id ? { ...c, flipped: true } : c
    );
    setCards(updatedCards);

    const newSelected = [...selected, card];
    setSelected(newSelected);

    if (newSelected.length !== 2) return;

    setLock(true);
    const [first, second] = newSelected;

    if (first.name !== second.name) {
      setTimeout(() => {
        setCards(prev => prev.map(c => 
          c.id === first.id || c.id === second.id ? { ...c, flipped: false } : c
        ));
        setSelected([]);
        setLock(false);
      }, 800);
      return;
    }

    playSound(matchSoundRef);
    
    setTimeout(() => {
      const matchedCards = updatedCards.map(c => 
        c.name === first.name ? { ...c, matched: true } : c
      );
      setCards(matchedCards);
      setSelected([]);
      setLock(false);

      if (matchedCards.every(c => c.matched)) {
        setIsTimerActive(false);
        
        const playerKey = `${playerName}-fase${level}`;
        const currentBest = playerRecords[playerKey] || Infinity;
        
        if (timer < currentBest) {
          setPlayerRecords(prev => ({ ...prev, [playerKey]: timer }));
        }
        
        playSound(victorySoundRef);
        setShowVictoryAnimation(true);
        setTimeout(() => setShowVictoryAnimation(false), 2000);
        
        setCuriosity(curiosidadesPorFase[level]);
        setShowModal(true);
      }
    }, 500);
  }, [cards, lock, selected, level, timer, playerRecords, playerName, previewMode, soundEffectsEnabled]);

  const nextLevel = useCallback(() => {
    const next = level >= 5 ? 1 : level + 1;
    setLevel(next);
    setCards(generateCards(next));
    setSelected([]);
    setLock(false);
    setShowModal(false);
    setShowVictoryAnimation(false);
    setTimer(0);
    setPreviewMode(true);
    setIsTimerActive(false);
  }, [level]);

  const resetGame = useCallback(() => {
    setLevel(1);
    setCards(generateCards(1));
    setSelected([]);
    setLock(false);
    setShowModal(false);
    setShowVictoryAnimation(false);
    setTimer(0);
    setPreviewMode(true);
    setIsTimerActive(false);
  }, []);

  // Tela de entrada do nome
  if (showNameInput) {
    return (
      <div className="game-wrapper">
        <button onClick={onBackToMenu} className="back-to-menu-btn">← Voltar</button>
        <div className="audio-control-container">
          <button onClick={toggleMusic} className="music-corner-btn">
            {isMusicPlaying ? "🔊" : "🔈"}
          </button>
        </div>
        
        <div className="name-input-container">
          <div className="name-input-card glass-effect">
            <h2>🌳 Bem-vindo! 🌳</h2>
            <p>Digite seu nome para começar:</p>
            <input
              type="text"
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
              placeholder="Seu nome"
              className="name-input"
              autoFocus
            />
            <button onClick={handleStartGame} className="menu-btn primary-btn">
              INICIAR O JOGO
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-wrapper">
      <button onClick={onBackToMenu} className="back-to-menu-btn">← Voltar</button>
      
      <div className="audio-control-container">
        <button onClick={() => setShowAudioMenu(prev => !prev)} className="music-corner-btn">
          🔊
        </button>
        {showAudioMenu && (
          <div className="audio-menu">
            <button onClick={toggleMusic}>
              {isMusicPlaying ? "🔊 Música" : "🔈 Música"}
            </button>
            <button onClick={toggleSoundEffects}>
              {soundEffectsEnabled ? "🔊 Efeitos" : "🔈 Efeitos"}
            </button>
          </div>
        )}
      </div>
      
      {showVictoryAnimation && (
        <div className="victory-animation">🎉✨ PARABÉNS! ✨🎉</div>
      )}

      <div className="content">
        <h1>🌳 Jogo da Memória - Folclore Brasileiro 🌳</h1>

        <div className="game-info">
          <span className="player-name-badge">👤 {playerName}</span>
          <h2>Fase {level} / 5</h2>
          <div className="timer-display">⏱️ {formatTime(timer)}</div>
          <button onClick={resetGame} className="reset-btn">Reiniciar</button>
        </div>

        <div className="board" style={{
          gridTemplateColumns: `repeat(${Math.min(4, Math.ceil(Math.sqrt(cards.length)))}, 1fr)`
        }}>
          {cards.map(card => (
            <div
              key={card.id}
              className={`card ${previewMode || card.flipped || card.matched ? "flip" : ""} ${card.matched ? "matched" : ""}`}
              onClick={() => handleFlip(card)}
            >
              <div className="front">?</div>
              <div className="back">
                <img src={card.img} alt={card.name} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{curiosity.titulo}</h3>
            <p>{curiosity.texto}</p>
            <div className="modal-buttons">
              <button onClick={nextLevel} className="modal-btn primary">
                {level >= 5 ? "Jogar Novamente?" : "Próxima Fase"}
              </button>
              <button onClick={onBackToMenu} className="modal-btn secondary">
                ← Voltar ao Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
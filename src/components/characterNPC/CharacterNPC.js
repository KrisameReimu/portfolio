import React, {useState, useEffect} from "react";
import ReimhuCharacter from "./ReimhuCharacter";
import "./CharacterNPC.scss";

const CharacterNPC = ({useReimhu = true}) => {
  const [state, setState] = useState("idle");
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState("bottom-right");

  const actions = [
    {id: "idle", label: "😌", name: "闲置", duration: 3000},
    {id: "sitting", label: "🪑", name: "坐下", duration: 4000},
    {id: "standing", label: "🧍", name: "站起", duration: 2000},
    {id: "drinking", label: "☕", name: "喝茶", duration: 3500},
    {id: "waving", label: "👋", name: "招手", duration: 2500},
    {id: "thinking", label: "🤔", name: "思考", duration: 3000}
  ];

  // Auto-switch actions every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      setState(randomAction.id);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleActionClick = actionId => {
    setState(actionId);
  };

  const handlePositionChange = () => {
    const positions = ["bottom-right", "bottom-left", "top-right"];
    const currentIndex = positions.indexOf(position);
    const nextPosition = positions[(currentIndex + 1) % positions.length];
    setPosition(nextPosition);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  if (!isVisible) {
    return (
      <div className="character-toggle-btn" onClick={toggleVisibility}>
        <span>👤</span>
      </div>
    );
  }

  // Use Reimhu SVG version if enabled
  if (useReimhu) {
    return (
      <div className={`character-npc-container ${position}`}>
        <ReimhuCharacter
          action={state}
          position={position}
          isVisible={isVisible}
        />

        {/* Action control panel */}
        <div className="character-controls-panel">
          {/* Main action buttons */}
          <div className="action-buttons-group">
            {actions.map(action => (
              <button
                key={action.id}
                className={`action-btn ${state === action.id ? "active" : ""}`}
                onClick={() => handleActionClick(action.id)}
                title={`${action.label} ${action.name}`}
              >
                <span>{action.label}</span>
              </button>
            ))}
          </div>

          {/* Control buttons */}
          <div className="control-buttons-group">
            <button
              className="control-btn move-btn"
              onClick={handlePositionChange}
              title="Move"
            >
              📍
            </button>
            <button
              className="control-btn hide-btn"
              onClick={toggleVisibility}
              title="Hide"
            >
              👁️
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fallback to emoji version if useReimhu is false
  return (
    <div className={`character-npc ${position}`}>
      {/* Character sprite - emoji version */}
      <div className={`character-sprite ${state}`}>
        <div className="character-body">
          <div className="character-head">👸</div>
          <div className="character-torso"></div>
          <div className="character-legs"></div>
        </div>

        {/* Action effects */}
        {state === "drinking" && (
          <div className="action-effect drinking">
            <div className="tea-cup">☕</div>
          </div>
        )}
        {state === "waving" && (
          <div className="action-effect waving">
            <div className="wave-hand">👋</div>
          </div>
        )}
        {state === "thinking" && (
          <div className="action-effect thinking">
            <div className="thought-bubble">💭</div>
          </div>
        )}
      </div>

      {/* Control panel */}
      <div className="character-controls">
        {/* Main action buttons */}
        <div className="action-buttons">
          {actions.map(action => (
            <button
              key={action.id}
              className={`action-btn ${state === action.id ? "active" : ""}`}
              onClick={() => handleActionClick(action.id)}
              title={action.name}
            >
              <span className="btn-emoji">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Control buttons */}
        <div className="control-buttons">
          <button
            className="control-btn move-btn"
            onClick={handlePositionChange}
            title="Move"
          >
            📍
          </button>
          <button
            className="control-btn hide-btn"
            onClick={toggleVisibility}
            title="Hide"
          >
            👁️
          </button>
        </div>
      </div>

      {/* Character name and dialogue */}
      <div className="character-info">
        <div className="character-name">小精灵助手</div>
        <div className={`speech-bubble ${state}`}>
          {getRandomDialogue(state)}
        </div>
      </div>
    </div>
  );
};

// Get random dialogue based on state
function getRandomDialogue(state) {
  const dialogues = {
    idle: ["嘿，你在忙什么呢？", "👀 看着你呢", "有什么需要帮助的吗？"],
    sitting: ["🪑 坐下舒服了", "好累呀～", "休息一会儿"],
    standing: ["站起来啦！", "⬆️ 伸个懒腰", "准备继续工作"],
    drinking: ["☕ 喝点茶定定神", "这茶真香～", "要来一杯吗？"],
    waving: ["👋 向你招手～", "嗨！", "有事找我呀"],
    thinking: ["🤔 在想什么呢...", "嗯...让我想想", "思考人生"]
  };

  const stateDialogues = dialogues[state] || dialogues.idle;
  return stateDialogues[Math.floor(Math.random() * stateDialogues.length)];
}

export default CharacterNPC;

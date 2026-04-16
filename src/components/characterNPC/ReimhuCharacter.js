import React, {useState, useEffect} from "react";
import "./ReimhuCharacter.scss";

const ReimhuCharacter = ({
  action = "idle",
  position = "bottom-right",
  isVisible = true,
  onActionsMenu = () => {}
}) => {
  const [displayAction, setDisplayAction] = useState(action);
  const [mouth, setMouth] = useState(0); // 0 = normal, 1 = smile, 2 = surprised
  const [eyes, setEyes] = useState(0); // 0 = normal, 1 = happy, 2 = closed

  useEffect(() => {
    setDisplayAction(action);
  }, [action]);

  // Update mouth and eyes based on action
  useEffect(() => {
    switch (displayAction) {
      case "idle":
        setMouth(0);
        setEyes(0);
        break;
      case "sitting":
        setMouth(1); // smile
        setEyes(1); // happy
        break;
      case "standing":
        setMouth(0);
        setEyes(0);
        break;
      case "drinking":
        setMouth(2); // surprised (while drinking)
        setEyes(1); // narrow/happy
        break;
      case "waving":
        setMouth(1); // smile
        setEyes(1); // happy
        break;
      case "thinking":
        setMouth(0);
        setEyes(2); // closed/thinking
        break;
      default:
        setMouth(0);
        setEyes(0);
    }
  }, [displayAction]);

  const renderEyes = () => {
    switch (eyes) {
      case 1: // happy eyes
        return (
          <>
            <ellipse cx="34" cy="48" rx="8" ry="6" fill="#201b18" />
            <ellipse cx="66" cy="48" rx="8" ry="6" fill="#201b18" />
            <path
              d="M 32 52 Q 34 54 36 52"
              stroke="#201b18"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M 64 52 Q 66 54 68 52"
              stroke="#201b18"
              strokeWidth="1.5"
              fill="none"
            />
          </>
        );
      case 2: // closed/thinking eyes
        return (
          <>
            <path
              d="M 30 48 Q 34 46 38 48"
              stroke="#201b18"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 62 48 Q 66 46 70 48"
              stroke="#201b18"
              strokeWidth="2"
              fill="none"
            />
          </>
        );
      default: // normal eyes
        return (
          <>
            <circle cx="34" cy="48" r="6" fill="#201b18" />
            <circle cx="66" cy="48" r="6" fill="#201b18" />
            <circle cx="35" cy="47" r="2.5" fill="#ffffff" />
            <circle cx="67" cy="47" r="2.5" fill="#ffffff" />
          </>
        );
    }
  };

  const renderMouth = () => {
    switch (mouth) {
      case 1: // smile
        return (
          <path
            d="M 45 62 Q 50 66 55 62"
            stroke="#201b18"
            strokeWidth="2"
            fill="none"
          />
        );
      case 2: // surprised
        return <circle cx="50" cy="62" r="4" fill="#201b18" />;
      default: // normal
        return <path d="M 45 62 L 55 62" stroke="#201b18" strokeWidth="1.5" />;
    }
  };

  const reimhuBody = (
    <g className={`reimhu-body reimhu-${displayAction}`}>
      {/* Outer hair shadow (black silhouette) */}
      <ellipse cx="50" cy="40" rx="38" ry="42" fill="#1a1410" opacity="0.3" />

      {/* Hair (black) - main body */}
      <defs>
        <radialGradient id="hairGrad" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#2a2420" />
          <stop offset="100%" stopColor="#0f0c0a" />
        </radialGradient>
      </defs>

      <ellipse cx="50" cy="40" rx="35" ry="40" fill="url(#hairGrad)" />

      {/* Hair strands (left side) */}
      <path
        d="M 20 30 Q 18 50 22 70"
        stroke="#0f0c0a"
        strokeWidth="8"
        fill="none"
      />
      <path
        d="M 15 35 Q 12 55 16 75"
        stroke="#0f0c0a"
        strokeWidth="6"
        fill="none"
      />

      {/* Hair strands (right side) */}
      <path
        d="M 80 30 Q 82 50 78 70"
        stroke="#0f0c0a"
        strokeWidth="8"
        fill="none"
      />
      <path
        d="M 85 35 Q 88 55 84 75"
        stroke="#0f0c0a"
        strokeWidth="6"
        fill="none"
      />

      {/* Red Bow (top center) */}
      <g className="red-bow">
        <ellipse cx="50" cy="18" rx="12" ry="14" fill="#d32f2f" />
        {/* Left ribbon */}
        <path d="M 40 18 L 32 14 Q 30 18 32 22 L 40 20" fill="#c41c1c" />
        {/* Right ribbon */}
        <path d="M 60 18 L 68 14 Q 70 18 68 22 L 60 20" fill="#c41c1c" />
        {/* Center knot */}
        <circle cx="50" cy="18" r="3" fill="#ff6b6b" />
      </g>

      {/* Face - skin tone */}
      <circle cx="50" cy="55" r="28" fill="#f4d4bc" />

      {/* Face outline */}
      <circle
        cx="50"
        cy="55"
        r="28"
        stroke="#daa885"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
      />

      {/* Left cheek blush */}
      <ellipse cx="28" cy="60" rx="6" ry="4" fill="#e64980" opacity="0.4" />
      {/* Right cheek blush */}
      <ellipse cx="72" cy="60" rx="6" ry="4" fill="#e64980" opacity="0.4" />

      {/* Eyes container */}
      <g className="eyes">{renderEyes()}</g>

      {/* Mouth */}
      <g className="mouth">{renderMouth()}</g>

      {/* Neck */}
      <rect x="45" y="80" width="10" height="12" fill="#f4d4bc" />

      {/* Red robe/dress - top white section */}
      <g className="dress">
        {/* White collar/chest */}
        <path
          d="M 25 85 L 35 80 Q 50 75 65 80 L 75 85 Q 70 90 50 95 Q 30 90 25 85"
          fill="#f5f1ea"
        />

        {/* Red inner robe */}
        <ellipse cx="50" cy="110" rx="32" ry="30" fill="#d32f2f" />
        <path
          d="M 25 85 Q 22 100 25 120 L 50 130 L 75 120 Q 78 100 75 85"
          fill="#c41c1c"
        />

        {/* White trim details */}
        <line
          x1="35"
          y1="80"
          x2="32"
          y2="100"
          stroke="#f5f1ea"
          strokeWidth="2"
        />
        <line
          x1="65"
          y1="80"
          x2="68"
          y2="100"
          stroke="#f5f1ea"
          strokeWidth="2"
        />
      </g>

      {/* Arms (simplified) */}
      <g className="arms">
        {/* Left arm */}
        <line
          x1="28"
          y1="90"
          x2="15"
          y2="110"
          stroke="#f4d4bc"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <circle cx="15" cy="110" r="5" fill="#f4d4bc" />

        {/* Right arm */}
        <line
          x1="72"
          y1="90"
          x2="85"
          y2="110"
          stroke="#f4d4bc"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <circle cx="85" cy="110" r="5" fill="#f4d4bc" />
      </g>

      {/* Legs (simplified) */}
      <g className="legs">
        {/* Left leg */}
        <rect x="38" y="130" width="6" height="25" fill="#1a1410" rx="3" />
        {/* Right leg */}
        <rect x="56" y="130" width="6" height="25" fill="#1a1410" rx="3" />
      </g>
    </g>
  );

  return (
    <div
      className={`reimhu-character-container ${position} ${
        !isVisible ? "hidden" : ""
      }`}
    >
      <svg
        width="100"
        height="160"
        viewBox="0 0 100 160"
        className="reimhu-svg"
      >
        {reimhuBody}
      </svg>

      {/* Action effects */}
      {displayAction === "drinking" && (
        <div className="action-effect drink">☕</div>
      )}
      {displayAction === "waving" && (
        <div className="action-effect wave">👋</div>
      )}
      {displayAction === "thinking" && (
        <div className="action-effect think">💭</div>
      )}

      {/* Dialogue bubble placeholder */}
      <div className="dialogue-small">
        {(() => {
          const dialogues = {
            idle: ["享受宁静...", "Enjoying peace..."],
            sitting: ["很舒适呢", "So comfortable~"],
            standing: ["随时准备出发", "Ready to go!"],
            drinking: ["很好喝~", "Delicious!"],
            waving: ["你好啊!", "Hey there!"],
            thinking: ["有什么想的呢...", "Thinking..."]
          };
          const msgs = dialogues[displayAction] || ["...", "..."];
          return msgs[Math.floor(Math.random() * msgs.length)];
        })()}
      </div>
    </div>
  );
};

export default ReimhuCharacter;

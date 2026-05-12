import React, {useContext} from "react";
import StyleContext from "../../contexts/StyleContext";
import "./ToggleSwitch.scss";

const ToggleSwitch = () => {
  const {isDark, changeTheme} = useContext(StyleContext);

  return (
    <label className="switch">
      <input
        type="checkbox"
        aria-label="Toggle dark mode"
        checked={isDark}
        onChange={changeTheme}
      />
      <span className="slider round">
        <span className="emoji">
          {isDark ? (
            <i className="fas fa-moon"></i>
          ) : (
            <i className="fas fa-sun"></i>
          )}
        </span>
      </span>
    </label>
  );
};
export default ToggleSwitch;

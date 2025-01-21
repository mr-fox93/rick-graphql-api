import React from "react";
import styles from "./Input.module.scss";
interface InputProps {
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
}

const Input: React.FC<InputProps> = ({ value, onChange, onEnter }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnter) {
      onEnter();
    }
  };
  return (
    <input
      className={styles.input}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Find your Morty..."
      onKeyDown={handleKeyDown}
    />
  );
};

export default Input;

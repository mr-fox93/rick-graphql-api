import React from "react";
import styles from "./Input.module.scss";
interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ value, onChange }) => {
  return (
    <input
      className={styles.input}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Find your Morty..."
    />
  );
};

export default Input;

import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onVoid: () => void;
  disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onVoid,
  disabled = false,
}) => {
  return (
    <button
      className={`${styles.button} ${disabled ? styles.disabled : ""}`}
      onClick={onVoid}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;

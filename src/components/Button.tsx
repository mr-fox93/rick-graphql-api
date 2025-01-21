import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onVoid: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onVoid }) => {
  return (
    <button className={styles.button} onClick={onVoid}>
      {children}
    </button>
  );
};
export default Button;

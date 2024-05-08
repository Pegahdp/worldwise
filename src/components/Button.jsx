import styels from "./Button.module.css";
export default function Button({ children, onClick, type }) {
  return (
    <button onClick={onClick} className={`${styels.btn} ${styels[type]}`}>
      {children}
    </button>
  );
}

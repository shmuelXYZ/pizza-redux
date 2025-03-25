import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const baseClassName =
    "focus: inline-block text-sm rounded-full bg-yellow-400  font-semibold uppercase tracking-wide text-stone-800 transition-all duration-300 hover:bg-yellow-300 hover:font-bold focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-1 disabled:cursor-not-allowed ";
  const styles = {
    primary: baseClassName + "px-4 py-2 md:px-6 md:py-4",
    small: baseClassName + "px-3 py-2 md:px-5 md:py-2.5 text-xs",
    secondery:
      "focus: inline-block text-sm px-4 py-1.5 md:px-6 md:py-3.5 rounded-full transperent border-2 border-stone-300  font-semibold uppercase tracking-wide text-stone-500 transition-all duration-300 hover:bg-stone-300 hover:font-bold hover:text-stone-600 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-1 disabled:cursor-not-allowed ",
  };
  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }
  if (onClick) {
    return (
      <Link className={styles[type]} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;

function Button({ children, disabled }) {
  return (
    <button
      disabled={disabled}
      className="focus: inline-block rounded-full bg-yellow-400 px-4 py-2 font-semibold uppercase tracking-wide text-stone-800 transition-all duration-300 hover:bg-yellow-300 hover:font-bold focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-1 disabled:cursor-not-allowed sm:px-6 sm:py-4"
    >
      {children}
    </button>
  );
}

export default Button;

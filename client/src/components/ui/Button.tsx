interface PropType {
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: any;
  customStyle: string;
  handleOnClick: () => void;
  title: string;
}

// Used by MainMenu.tsx, GameOverMenu.tsx, and many others
function Button(props: PropType) {
  const { text, customStyle, handleOnClick, ...rest } = props;
  return (
    <button
      {...rest}
      onClick={handleOnClick}
      className={`${customStyle} rounded-md tracking-wider hover:brightness-105 hover:scale-[1.03]`}
    >
      {text}
    </button>
  );
}

export default Button;

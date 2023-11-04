interface PropType {
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: any;
  customStyle: string;
  handleOnClick: () => void;
}

function Button({ text, customStyle, handleOnClick, type }: PropType) {
  return (
    <button
      type={type}
      onClick={handleOnClick}
      className={`${customStyle} rounded-md tracking-wider hover:brightness-105`}
    >
      {text}
    </button>
  );
}

export default Button;

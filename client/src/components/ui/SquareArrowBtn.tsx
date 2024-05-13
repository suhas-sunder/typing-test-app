import Icon from "../../utils/Icon";

interface PropType {
  customStyle: string;
  handleClick: () => void;
}

//Used by DateMenuWeekly.tsx component
function SquareArrowBtn({ customStyle, handleClick }: PropType) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${customStyle} flex cursor-pointer items-center justify-center hover:scale-105 hover:text-defaultgreen`}
    >
      <Icon
        icon="chevron"
        title="Left Arrow Button"
        customStyle="inline-flex rotate-90 text-white scale-75 md:scale-100 "
      />
      <div className="absolute flex h-6 w-6 items-center justify-center rounded-md border-2 bg-white bg-opacity-30 hover:border-defaultgreen hover:bg-defaultgreen hover:bg-opacity-50 md:h-7 md:w-7"></div>
    </button>
  );
}

export default SquareArrowBtn;

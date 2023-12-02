import Icon from "../../utils/Icon";
interface PropType {
  customStyle: string;
}

function SquareArrowBtn({ customStyle }: PropType) {
  return (
    <button
      type="button"
      className={`${customStyle} flex cursor-pointer items-center justify-center hover:text-defaultgreen hover:scale-105`}
    >
      <Icon
        icon="chevron"
        title="Left Arrow Button"
        customStyle="inline-flex rotate-90 text-white"
      />
      <div className="absolute flex h-7 w-7 items-center justify-center rounded-md border-2 bg-white bg-opacity-30 hover:border-defaultgreen hover:bg-defaultgreen hover:bg-opacity-50"></div>
    </button>
  );
}

export default SquareArrowBtn;

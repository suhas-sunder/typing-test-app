import Icon from "../utility/Icon";

interface PropType {
  [key: string]: string | null;
}

function DropDownLabel({ iconName, labelText }: PropType) {
  return (
    <span
      aria-label="label for custom select menu"
      className="flex justify-center items-center relative p-1 cursor-pointer gap-2"
    >
      {iconName && (
        <Icon
          icon={iconName}
          title={`${iconName}}-icon`}
          customStyle="inline-flex"
        />
      )}
      {labelText}
    </span>
  );
}

export default DropDownLabel;

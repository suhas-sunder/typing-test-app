import Icon from "../utility/Icon";
import { useEffect } from "react";

interface PropType {
  iconName: string;
  iconStyle: string;
  labelText: string;
}

function DropDownLabel({ iconName, iconStyle, labelText }: PropType) {
  useEffect(() => {}, []);

  return (
    <span
      aria-label="label for custom select menu"
      className="flex justify-center items-center relative p-1 cursor-pointer gap-2"
    >
      {iconName && (
        <Icon
          icon={iconName}
          title={`${iconName}}-icon`}
          customStyle={`inline-flex ${iconStyle}`}
        />
      )}
      {labelText}
    </span>
  );
}

export default DropDownLabel;

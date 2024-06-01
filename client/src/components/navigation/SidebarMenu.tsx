import { useNavigate } from "react-router-dom";
import Icon from "../../utils/Icon";

function SidebarMenu({ displayMenuItem, setDisplayMenuItem, menuData }) {
  const navigate = useNavigate();

  const handleMenuAction = (index: number) => {
    menuData[index].url && navigate(menuData[index].url); //If a url is provided, redirect to url

    setDisplayMenuItem(index); //Update state with menu item being displayed
  };

  return (
    <ul className="flex w-full justify-center overflow-y-hidden md:w-auto md:flex-col md:justify-start">
      {menuData.map((data, index) => (
        <li key={data.id} className="flex w-full">
          <button
            className={`${
              index === displayMenuItem
                ? "bg-white text-defaultblue"
                : "bg-slate-200 text-slate-950"
            } ${index === 0 && "rounded-tl-2xl"} ${
              index === menuData.length - 1 &&
              "rounded-tr-2xl md:rounded-bl-2xl md:rounded-tr-none"
            } group flex w-full cursor-pointer flex-col items-center gap-4 py-3 font-nunito hover:bg-white hover:text-defaultblue sm:px-2 sm:py-5 md:flex-row md:px-6 `}
            onClick={() => handleMenuAction(index)}
          >
            <span>
              <Icon
                icon={data.icon}
                title={`${data.icon}-icon`}
                customStyle={`${
                  index === displayMenuItem ? "text-sky-600" : "text-slate-950"
                } group-hover:text-sky-600`}
              />
            </span>
            <span className="hidden whitespace-nowrap text-xs sm:flex md:text-base">
              {data.title}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default SidebarMenu;

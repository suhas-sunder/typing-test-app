import { useContext } from "react";
import { MenuContext } from "../../providers/MenuProvider";

//Used to simplify context fetching for auth context
export default function useMenu() {
  return useContext(MenuContext);
}

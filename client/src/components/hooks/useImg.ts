import { useContext } from "react";
import { ImageContext } from "../../providers/ImageProvider";

//Used to simplify context fetching for auth context
export default function useImg() {
  return useContext(ImageContext);
}

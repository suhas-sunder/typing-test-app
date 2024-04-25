import styles from "../components/layout/styles/TextBox.module.css";

//Used by all typing test and game components: textbox.tsx, speedcalculatorgame.tsx
function HandleCharStyling(status: string) {
  switch (status) {
    case "cursor":
      return `${styles.cursor} text-sky-700 border-current`; //Styling for current char to be typed
    case "error":
      return "text-red-700 bg-red-600/10 rounded-lg"; //Styling for incorrect user input
    case "correct":
      return "text-sky-700 bg-sky-100 rounded-lg"; //Styling for correct user input
    default:
      return;
  }
}

export default HandleCharStyling;

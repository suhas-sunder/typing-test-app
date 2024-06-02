interface PropType {
  showMenu: boolean;
}

// Handle modal screen lock
function LockScreenForModal({ showMenu }: PropType) {
  const bodyElement = document.getElementsByTagName("body")[0];

  if (showMenu) {
    if (bodyElement) bodyElement.style.overflow = "hidden"; //Prevents background from scrolling
  } else {
    if (bodyElement) bodyElement.style.overflow = "auto"; //Reset scroll on body
  }
}

export default LockScreenForModal;

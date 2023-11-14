interface PropType {
  showMenu: boolean;
}

// Handle modal screen lock
function LockScreenForModal({ showMenu }: PropType) {
  const navBarElement = document.getElementById("nav");
  const menuElement = document.getElementById("main-menu");
  const bodyElement = document.getElementsByTagName("body");

  if (showMenu) {
    if (navBarElement) navBarElement.style.zIndex = "1"; //Adjust nav bar so modal can overlay all elements
    if (bodyElement) bodyElement[0].style.overflow = "hidden"; //Prevents background from scrolling
  } else {
    if (navBarElement) navBarElement.style.zIndex = "10"; //Reset navbar
    if (bodyElement) bodyElement[0].style.overflow = "auto"; //Reset scroll on body
  }
}

export default LockScreenForModal;

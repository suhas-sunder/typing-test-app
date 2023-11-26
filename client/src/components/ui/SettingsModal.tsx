import DifficultySettings from "../forms/DifficultySettings";
import Icon from "../../utils/Icon";

interface PropType {
  setShowDifficultyMenu: (value: boolean) => void;
}

function SettingsModal({ setShowDifficultyMenu }: PropType) {
  return (
    <div className="flex top-0 left-0 bottom-0 right-0 fixed justify-center items-center w-full h-full max-h-[100%] z-50 m-auto">
      <div
        id="modal-backdrop"
        data-testid="modal backdrop"
        aria-label="close settings menu button as background underlay"
        className="flex absolute w-full h-full bg-black opacity-40 items-center justify-center z-30"
        onClick={() => setShowDifficultyMenu(false)}
      ></div>
      <div className="flex relative flex-col w-full max-w-3xl min-h-[10em] justify-center items-center gap-6 px-10 py-10 rounded-xl bg-white z-30">
        <button
          className="absolute top-0 right-0 mx-3 my-2"
          onClick={() => setShowDifficultyMenu(false)}
        >
          <Icon
            icon="closeBtn"
            customStyle=" cursor-pointer hover:text-sky-500"
            title="close-btn-icon"
          />
        </button>
        <DifficultySettings setShowDifficultyMenu={setShowDifficultyMenu} />
      </div>
    </div>
  );
}

export default SettingsModal;

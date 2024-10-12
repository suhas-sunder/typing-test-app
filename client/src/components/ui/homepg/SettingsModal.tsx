import Icon from "../../../utils/other/Icon";
import DifficultySettings from "../../forms/homepg/DifficultySettings";

interface PropType {
  setShowDifficultyMenu: (value: boolean) => void;
}

//Used by StartMenu.tsx component
function SettingsModal({ setShowDifficultyMenu }: PropType) {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 m-auto flex h-full w-full items-center justify-center">
      <div
        id="modal-backdrop"
        data-testid="modal backdrop"
        aria-label="close settings menu button as background underlay"
        className="absolute z-30 flex h-full w-full items-center justify-center bg-black opacity-40 "
        onClick={() => setShowDifficultyMenu(false)}
      ></div>
      <div className="relative z-30 flex max-h-[100vh] justify-center sm:min-h-[10em] w-full max-w-3xl flex-col items-center gap-6 overflow-auto min-h-[30em] sm:overflow-visible rounded-xl bg-white px-10 py-10">
        <button
          className="absolute right-0 top-0 mx-3 my-2"
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

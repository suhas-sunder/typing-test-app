import { useEffect } from "react";
import DifficultySettings from "../forms/DifficultySettings";
import Icon from "../utility/Icon";

interface Data {
  difficulty: string;
  customStyle: string;
  selected: boolean;
}

interface PropType {
  difficultySetting: Data[];
  setShowDifficultyMenu: (value: boolean) => void;
  setDifficultySetting: (value: Data[]) => void;
}

function SettingsModal({
  setShowDifficultyMenu,
  difficultySetting,
  setDifficultySetting,
}: PropType) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute justify-center items-center w-full h-full z-30">
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
            customStyle=" cursor-pointer hover:text-default-sky-blue"
            title="close-btn-icon"
          />
        </button>
        <DifficultySettings
          setShowDifficultyMenu={setShowDifficultyMenu}
          difficultySetting={difficultySetting}
          setDifficultySetting={setDifficultySetting}
        />
      </div>
    </div>
  );
}

export default SettingsModal;

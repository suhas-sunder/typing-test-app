import { useEffect } from "react";
import DifficultySettings from "../forms/DifficultySettings";

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
      <DifficultySettings
        setShowDifficultyMenu={setShowDifficultyMenu}
        difficultySetting={difficultySetting}
        setDifficultySetting={setDifficultySetting}
      />
    </div>
  );
}

export default SettingsModal;

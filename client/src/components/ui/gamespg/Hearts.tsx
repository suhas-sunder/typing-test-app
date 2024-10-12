
//Display hearts for games

import Icon from "../../../utils/other/Icon";

//Used by SpeedCalculatorGame.tsx
function Hearts({ lives }) {

  return (
    <div className="absolute -top-12 right-8 flex w-full max-w-[9.1em] scale-125 justify-end">
      {lives.map((heart, index) => (
        <div key={`heart-${index}`}>
          <Icon
            title="heart-icon"
            customStyle={`${
              heart === "full" ? "text-red-500" : "text-slate-700"
            }`}
            icon={heart === "full" ? "heart" : "brokenHeart"}
          />
        </div>
      ))}
    </div>
  );
}

export default Hearts;

function SpeedCalculatorGame() {
  return (
    <div className="mx-auto flex max-w-[900px] flex-col gap-14 py-10">
      <header>
        <h1 className="flex w-full justify-center font-nunito text-2xl text-defaultblue">
          Speed Calculator
        </h1>
      </header>
      <main>
        <div>
          {/* Typing test bar where you can enter numbers and symbols: /*-+Enter
          This is designed as the head of calc */}
        </div>
        <div>
          {/* Calc keys displayed which reflects keys to be pressed (fill highlight)
          and keys being pressed (outline highlight or animation) Easy (numbers)
          medium (decimals) hard (addition & enter key) very hard (/*-)
          exteremely hard ( 3 lives) Impossibly Hard (1 life) 6 lives Timer
          counts up to calculate best score */}
        </div>
      </main>
    </div>
  );
}

export default SpeedCalculatorGame;

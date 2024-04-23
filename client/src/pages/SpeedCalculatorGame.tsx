function SpeedCalculatorGame() {
  return (
    <div className="mx-5 flex max-w-[900px] flex-col gap-14 py-10 md:mx-auto">
      <header>
        <h1 className="flex w-full justify-center font-nunito text-2xl text-defaultblue">
          Speed Calculator
        </h1>
      </header>
      <main className="mx-auto block w-full max-w-[45em] rounded-2xl border-2 p-10 ">
        <div className="flex h-32 w-full max-w-[40em] items-center justify-end rounded-lg border-2 bg-default-light-sky-blue px-7 font-mono text-3xl text-white">
          {/* Typing test bar where you can enter numbers and symbols: /*-+Enter
          This is designed as the head of calc */}
          1 + 1 Enter
        </div>
        <div>
          <div className="mt-8 grid grid-cols-4 items-center justify-center gap-4 rounded-xl border-2 bg-defaultblue p-8 font-nunito text-defaultblue sm:gap-8 sm:px-14">
            <div></div>
            <div className="col-span-1 mx-auto grid rounded-lg border-2  bg-white px-5 py-3">
              /
            </div>
            <div className="col-span-1 mx-auto grid rounded-lg border-2  bg-white px-5 py-3">
              *
            </div>
            <div className="col-span-1 mx-auto grid rounded-lg border-2  bg-white px-5 py-3">
              -
            </div>
            <div className="col-span-1 mx-auto grid rounded-lg border-2  bg-white px-5 py-3">
              7
            </div>
            <div className="col-span-1 mx-auto grid rounded-lg border-2  bg-white px-5 py-3">
              8
            </div>
            <div className="col-span-1 mx-auto grid rounded-lg border-2  bg-white px-5 py-3">
              9
            </div>
            <div className="row-span-2 mx-auto grid rounded-lg border-2  bg-white px-5 py-8">
              +
            </div>
            <div className="col-span-1 mx-auto grid rounded-lg border-2  bg-white px-5 py-3">
              4
            </div>
            <div className="col-span-1 mx-auto grid rounded-lg border-2  bg-white px-5 py-3">
              5
            </div>
            <div className="col-span-1 mx-auto grid rounded-lg border-2  bg-white px-5 py-3">
              6
            </div>
            <div className="col-span-1 mx-auto grid rounded-lg border-2  bg-white px-5 py-3">
              1
            </div>
            <div className="col-span-1 mx-auto grid rounded-lg border-2  bg-white px-5 py-3">
              2
            </div>
            <div className="col-span-1 mx-auto grid rounded-lg border-2  bg-white px-5 py-3">
              3
            </div>
            <div className="text-s row-span-1 mx-auto grid rounded-lg border-2  bg-white px-3 py-3 sm:px-5 sm:text-base">
              Enter
            </div>
          </div>
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

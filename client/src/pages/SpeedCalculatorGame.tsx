function SpeedCalculatorGame() {
  return (
    <div className="mx-auto flex max-w-[500px] flex-col gap-14 px-5 py-8">
      <header>
        <h1 className="flex w-full justify-center font-nunito text-2xl text-defaultblue">
          Speed Calculator
        </h1>
      </header>
      <main className="mx-auto  flex w-full max-w-[45em] flex-col rounded-2xl border-[3px] p-10 ">
        <div className="flex h-24 w-full max-w-[40em] items-center justify-end gap-2 rounded-lg border-[3px] px-6 font-mono text-2xl leading-10 tracking-tight text-default-light-sky-blue sm:text-3xl">
          {/* Typing test bar where you can enter numbers and symbols: /*-+Enter
          This is designed as the head of calc */}
          <span className="flex w-5 items-center justify-center border-b-2 border-default-light-sky-blue">
            9
          </span>
          <span className="flex w-5 items-center justify-center border-default-light-sky-blue">
            +
          </span>
          <span className="flex w-5 items-center justify-center  border-default-light-sky-blue">
            9
          </span>
          <span className="flex w-5 items-center justify-center border-default-light-sky-blue">
            +
          </span>
          <span className="flex w-5 items-center justify-center  border-default-light-sky-blue">
            9
          </span>
          <span className="flex w-5 items-center justify-center border-default-light-sky-blue">
            +
          </span>
          <span className="flex w-5 items-center justify-center border-default-light-sky-blue">
            9
          </span>
          <span className="flex w-5 items-center justify-center border-default-light-sky-blue">
            *
          </span>
          <span className="flex w-5 items-center justify-center border-default-light-sky-blue">
            9
          </span>
          <span className="flex w-5 items-center justify-center border-default-light-sky-blue">
            +
          </span>
          <span className="flex w-5 items-center justify-center border-default-light-sky-blue">
            9
          </span>
          <span className="flex w-5 items-center justify-center border-default-light-sky-blue">
            ↵
          </span>
        </div>
        <div>
          <div className="mt-8 grid w-full grid-cols-4 gap-8 gap-y-6 rounded-xl border-2 bg-defaultblue px-5 py-8 font-nunito  text-defaultblue sm:px-8">
            <div className="col-span-1 grid h-full w-full  rounded-lg  border-2 bg-white px-5"></div>
            <div className="col-span-1 mx-auto grid  rounded-lg  border-2 bg-white px-5 py-3 ">
              /
            </div>
            <div className="col-span-1 mx-auto grid  rounded-lg  border-2 bg-white px-5 py-3 ">
              *
            </div>
            <div className="sm: col-span-1 mx-auto grid rounded-lg  border-2 bg-white px-5 py-3">
              -
            </div>
            <div className="col-span-1 mx-auto grid  rounded-lg  border-2 bg-white px-5 py-3 ">
              7
            </div>
            <div className="col-span-1 mx-auto grid  rounded-lg  border-2 bg-white px-5 py-3 ">
              8
            </div>
            <div className="col-span-1 mx-auto grid  rounded-lg  border-2 bg-white px-5 py-3 ">
              9
            </div>
            <div className="sm: row-span-2 mx-auto grid items-center  justify-center rounded-lg border-2 bg-white px-5 py-8">
              +
            </div>
            <div className="col-span-1 mx-auto grid  rounded-lg  border-2 bg-white px-5 py-3 ">
              4
            </div>
            <div className="col-span-1 mx-auto grid  rounded-lg  border-2 bg-white px-5 py-3 ">
              5
            </div>
            <div className="col-span-1 mx-auto grid  rounded-lg  border-2 bg-white px-5 py-3 ">
              6
            </div>
            <div className="col-span-1 mx-auto grid  rounded-lg  border-2 bg-white px-5 py-3 ">
              1
            </div>
            <div className="col-span-1 mx-auto grid  rounded-lg  border-2 bg-white px-5 py-3 ">
              2
            </div>
            <div className="col-span-1 mx-auto grid  rounded-lg  border-2 bg-white px-5 py-3 ">
              3
            </div>
            <div className="text-s row-span-2 mx-auto grid items-center justify-center rounded-lg border-2 bg-white px-4 py-3 text-3xl tracking-wider">
              ↵
            </div>
            <div className="col-span-1 mx-auto grid  rounded-lg  border-2 bg-white px-5 py-3 ">
              0
            </div>
            <div className="col-span-1 mx-auto grid  rounded-lg  border-2 bg-white px-5 py-3">
              1
            </div>
            <div className="col-span-1 grid  rounded-lg  border-2 bg-white px-5 py-3"></div>
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

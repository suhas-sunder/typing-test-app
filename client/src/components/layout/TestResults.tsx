interface PropType {
  [key: string]: number;
}

//Used by GameOverMenu.tsx component
function TestResults({ mistakes, correct }: PropType) {
  return (
    <div
      className={`relative flex flex-col gap-6 overflow-hidden rounded-md bg-opacity-50 pb-1 sm:flex-row`}
    >
      <table className="flex min-w-[7em] flex-col items-center justify-center rounded-md border-2 border-sky-200 bg-white p-3 text-base text-sky-700">
        <thead>
          <tr className="mb-1 flex w-full justify-center border-b-2 border-sky-200 text-xl">
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr className="flex w-full flex-col">
            <td className="flex w-full justify-around gap-2">
              <span>Words:</span>
              <span>{Math.ceil((mistakes + correct) / 5) || 0}</span>
            </td>
            <td className="flex w-full justify-around gap-2">
              <span>Chars:</span>
              <span>{mistakes + correct}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="flex min-w-[7em] flex-col items-center justify-center rounded-md border-2 border-green-200 bg-white p-3 text-base text-green-700">
        <thead>
          <tr className="mb-1 flex w-full justify-center border-b-2 border-green-200 text-lg sm:text-xl">
            <th>Correct</th>
          </tr>
        </thead>
        <tbody>
          <tr className="flex w-full flex-col">
            <td className="flex w-full justify-around gap-2">
              <span>Words:</span>
              <span>{Math.floor(correct / 5) || 0}</span>
            </td>
            <td className="flex w-full justify-around gap-2">
              <span>Chars:</span>
              <span>{correct}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <table className="flex min-w-[7em] flex-col items-center justify-center rounded-md border-2 border-red-200 bg-white p-3 text-base text-red-700">
        <thead>
          <tr className="mb-1 flex w-full justify-center border-b-2 border-red-200 text-lg sm:text-xl">
            <th>Misspelled</th>
          </tr>
        </thead>
        <tbody>
          <tr className="flex w-full flex-col">
            <td className="flex w-full justify-around gap-2">
              <span>Words:</span>
              <span>{Math.ceil(mistakes / 5) || 0}</span>
            </td>
            <td className="flex w-full justify-around gap-2">
              <span>Chars:</span>
              <span>{mistakes}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TestResults;

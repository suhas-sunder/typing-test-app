interface PropType {
  [key: string]: number;
}

function TestResults({ mistakes, correct }: PropType) {
  return (
    <div
      className={`relative flex gap-6 overflow-hidden rounded-md bg-opacity-50 pb-1`}
    >
      <table className="flex min-w-[7em] flex-col items-center justify-center rounded-md border-2 border-sky-200 bg-white p-2 text-base text-sky-500">
        <tr className="mb-1 flex w-full justify-center border-b-2 border-sky-200">
          <th>Total</th>
        </tr>
        <tr className="flex w-full flex-col">
          <td className="flex w-full justify-around">
            <span>Chars:</span>
            <span>{mistakes + correct}</span>
          </td>
          <td className="flex w-full justify-around">
            <span>Words:</span>
            <span>{Math.ceil((mistakes + correct) / 5)}</span>
          </td>
        </tr>
      </table>

      <table className="flex min-w-[7em] flex-col items-center justify-center rounded-md border-2 border-green-300 bg-white p-2 text-base text-green-500">
        <tr className="mb-1 flex w-full justify-center border-b-2 border-green-300">
          <th>Correct</th>
        </tr>
        <tr className="flex w-full flex-col">
          <td className="flex w-full justify-around">
            <span>Chars:</span>
            <span>{correct}</span>
          </td>
          <td className="flex w-full justify-around">
            <span>Words:</span>
            <span>{Math.floor(correct / 5)}</span>
          </td>
        </tr>
      </table>
      <table className="flex min-w-[7em] flex-col items-center justify-center rounded-md border-2 border-red-200 bg-white p-2 text-base text-red-400">
        <tr className="mb-1 flex w-full justify-center border-b-2 border-red-200">
          <th>Misspelled</th>
        </tr>
        <tr className="flex w-full flex-col">
          <td className="flex w-full justify-around">
            <span>Chars:</span>
            <span>{mistakes}</span>
          </td>
          <td className="flex w-full justify-around">
            <span>Words:</span>
            <span>{Math.ceil(mistakes / 5)}</span>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default TestResults;

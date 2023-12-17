function HeaderStatsSummary() {
  return (
    <table
      className="flex w-full flex-col gap-2 font-nunito
    "
    >
      <thead className="flex w-full items-center text-[0.9rem]">
        <tr className="flex w-full">
          <th className="flex w-full flex-col items-center justify-center gap-1">
            <span className="whitespace-pre">Time Spent</span>
            <span>Typing</span>
          </th>
          <th className="flex w-full flex-col items-center justify-center gap-1">
            <span className="whitespace-pre">Average Speed</span>
            <span>(WPM)</span>
          </th>
          <th className="flex w-full flex-col items-center justify-center gap-1">
            <span>Lessons</span>
            <span>Mastered</span>
          </th>
          <th className="flex w-full flex-col items-center justify-center gap-1">
            <span className="whitespace-pre">Total Points</span>
            <span>Earned</span>
          </th>
        </tr>
      </thead>
      <tbody className="flex w-full items-center text-sky-100">
        <tr className="flex w-full justify-center">
          <td className="flex w-full justify-center">00:00:00</td>
          <td className="flex w-full  justify-center ">0 </td>
          <td className="flex w-full justify-center">0/200</td>
          <td className="flex w-full  justify-center">10,000,000</td>
        </tr>
      </tbody>
    </table>
  );
}

export default HeaderStatsSummary;

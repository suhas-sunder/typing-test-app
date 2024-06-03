interface PropType {
  date: string;
}
function FormatDate({ date }: PropType) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = months[parseInt(date.slice(5, 7)) - 1];
  const day = date.slice(8, 10);
  const year = date.slice(0, 4);

  return `${month} ${day}, ${year}`;
}

export default FormatDate;

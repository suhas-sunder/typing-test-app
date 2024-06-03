interface PropType {
  date: string;
}
export default function FormatDate({ date }: PropType) {
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

  const month = months[parseInt(date.split("/")[0]) - 1];
  const day = date.split("/")[1];
  const year = date.split("/")[2];

  return `${month} ${day}, ${year}`;
  return date;
}

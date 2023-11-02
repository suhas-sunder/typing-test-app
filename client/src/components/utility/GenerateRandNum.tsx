interface PropTypes {
  [key: string]: number;
}
function GenerateRandNum({ max }: PropTypes) {
  return Math.floor(Math.random() * max);
}

export default GenerateRandNum;

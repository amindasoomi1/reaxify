export default function twoDigitNumber(num: number) {
  return num < 10 ? `0${num}` : `${num}`;
}

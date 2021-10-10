export function checkCandleDisable(time: number) {
  return (time / 1000 / 60) % 2 === 1;
}

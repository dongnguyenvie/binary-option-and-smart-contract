export function checkCandleDisable(time: number) {
  console.log('(time / 60) % 2', (time / 60) % 2);
  return (time / 1000 / 60) % 2 === 0;
}

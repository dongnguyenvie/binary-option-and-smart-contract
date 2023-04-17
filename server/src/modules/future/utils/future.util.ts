import dayjs from 'src/modules/shared/helpers/dayjs';

export function isCanCalculateBetting(time: number) {
  // const nextCandleTime = dayjs().startOf('minute').unix() * 1000;

  return time && (time / 1000 / 60) % 2 === 1;
}

export const formatPrice = (price: number) =>
  price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const formatNumberWithUnit = (number: number, unit: string = '') => {
  return `${new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(
    number,
  )} ${Math.abs(number) > 1 && unit ? `${unit}s` : `${unit}`}`.replace(
    '.',
    ',',
  );
};

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

export const formatUSPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');

  if (digits.length !== 10) {
    return phone; // Return as-is if not a valid 10-digit US number
  }

  const areaCode = digits.slice(0, 3);
  const centralOfficeCode = digits.slice(3, 6);
  const lineNumber = digits.slice(6);

  return `(${areaCode}) ${centralOfficeCode}-${lineNumber}`;
};

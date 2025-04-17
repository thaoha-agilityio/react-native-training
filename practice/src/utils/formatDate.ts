export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US');
};

export const isEarlierThanCurrentDate = (date: string) => {
  if (!date) return;

  return new Date(date) < new Date();
};

export const isAtLeast18 = (birthdate: string): boolean => {
  const currentDate = new Date();
  const birthDate = new Date(birthdate);

  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDifference = currentDate.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= 18;
};

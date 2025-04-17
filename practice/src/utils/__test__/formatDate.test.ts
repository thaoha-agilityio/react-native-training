import {formatDate, isAtLeast18, isEarlierThanCurrentDate} from '@/utils';

describe('formatDate', () => {
  it('should format the date to en-US format', () => {
    const date = '2025-04-11T00:00:00.000Z';
    expect(formatDate(date)).toBe('4/11/2025'); // Adjust depending on your timezone
  });
});

describe('isEarlierThanCurrentDate', () => {
  it('should return true if the date is before today', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    expect(isEarlierThanCurrentDate(yesterday.toISOString())).toBe(true);
  });

  it('should return false if the date is after today', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    expect(isEarlierThanCurrentDate(tomorrow.toISOString())).toBe(false);
  });

  it('should return undefined if date is not provided', () => {
    expect(isEarlierThanCurrentDate('')).toBeUndefined();
  });
});

describe('isAtLeast18', () => {
  it('should return true if user is at least 18 years old', () => {
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    eighteenYearsAgo.setDate(eighteenYearsAgo.getDate() - 1); // Just to make sure it's fully 18

    expect(isAtLeast18(eighteenYearsAgo.toISOString())).toBe(true);
  });

  it('should return false if user is younger than 18', () => {
    const fifteenYearsAgo = new Date();
    fifteenYearsAgo.setFullYear(fifteenYearsAgo.getFullYear() - 15);

    expect(isAtLeast18(fifteenYearsAgo.toISOString())).toBe(false);
  });
});

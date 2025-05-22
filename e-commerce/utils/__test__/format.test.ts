import { formatNumberWithUnit, formatPrice } from '../format';

describe('formatPrice', () => {
  it('formats numbers with two decimal places', () => {
    expect(formatPrice(1000)).toBe('1,000.00');
    expect(formatPrice(1234.5)).toBe('1,234.50');
    expect(formatPrice(0)).toBe('0.00');
    expect(formatPrice(99.9)).toBe('99.90');
  });

  it('rounds numbers correctly', () => {
    expect(formatPrice(1234.567)).toBe('1,234.57');
    expect(formatPrice(99.999)).toBe('100.00');
    expect(formatPrice(1.005)).toBe('1.01');
  });
});

describe('formatNumberWithUnit', () => {
  it('formats number without unit', () => {
    expect(formatNumberWithUnit(1200)).toBe('1,2K ');
  });

  it('formats number with singular unit (number = 1)', () => {
    expect(formatNumberWithUnit(1, 'item')).toBe('1 item');
  });

  it('formats number with plural unit (number > 1)', () => {
    expect(formatNumberWithUnit(1500, 'item')).toBe('1,5K items');
  });

  it('formats number with plural unit (number < -1)', () => {
    expect(formatNumberWithUnit(-2300, 'like')).toBe('-2,3K likes');
  });

  it('formats number with singular unit (number = -1)', () => {
    expect(formatNumberWithUnit(-1, 'vote')).toBe('-1 vote');
  });

  it('returns "0 unit" correctly', () => {
    expect(formatNumberWithUnit(0, 'star')).toBe('0 star');
  });
});

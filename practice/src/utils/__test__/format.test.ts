import {formatPrice} from '../format';

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

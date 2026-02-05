import { formatCurrency, formatDate, truncateText, formatNumber } from '../utils';

describe('Utility Functions', () => {
  describe('formatCurrency', () => {
    it('formats numbers as currency', () => {
      expect(formatCurrency(100)).toBe('$100.00');
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
    });
  });

  describe('formatDate', () => {
    it('formats date correctly', () => {
      const result = formatDate('2024-01-15');
      expect(result).toMatch(/Jan 15, 2024/);
    });
  });

  describe('truncateText', () => {
    it('truncates text longer than specified length', () => {
      expect(truncateText('Hello World', 5)).toBe('Hello...');
    });

    it('does not truncate text shorter than specified length', () => {
      expect(truncateText('Hi', 5)).toBe('Hi');
    });
  });

  describe('formatNumber', () => {
    it('formats large numbers', () => {
      expect(formatNumber(1000000)).toBe('1.0M');
      expect(formatNumber(1500)).toBe('1.5K');
      expect(formatNumber(100)).toBe('100');
    });
  });
});

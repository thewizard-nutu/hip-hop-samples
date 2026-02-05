// Mock validators
const validators = {
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidPassword: (password: string): boolean => {
    return password.length >= 8;
  },

  isValidZipCode: (zip: string): boolean => {
    return /^\d{5}(-\d{4})?$/.test(zip);
  },

  formatPrice: (price: number): string => {
    return `$${price.toFixed(2)}`;
  },

  validateCardNumber: (cardNumber: string): boolean => {
    const cleaned = cardNumber.replace(/\s/g, '');
    return /^\d{13,19}$/.test(cleaned);
  },
};

describe('Validators', () => {
  describe('isValidEmail', () => {
    it('returns true for valid email', () => {
      expect(validators.isValidEmail('test@example.com')).toBe(true);
    });

    it('returns false for invalid email', () => {
      expect(validators.isValidEmail('invalid-email')).toBe(false);
      expect(validators.isValidEmail('test@')).toBe(false);
      expect(validators.isValidEmail('@example.com')).toBe(false);
    });

    it('returns false for empty string', () => {
      expect(validators.isValidEmail('')).toBe(false);
    });
  });

  describe('isValidPassword', () => {
    it('returns true for valid password', () => {
      expect(validators.isValidPassword('SecurePass123!')).toBe(true);
      expect(validators.isValidPassword('12345678')).toBe(true);
    });

    it('returns false for short password', () => {
      expect(validators.isValidPassword('short')).toBe(false);
      expect(validators.isValidPassword('1234567')).toBe(false);
    });

    it('returns false for empty password', () => {
      expect(validators.isValidPassword('')).toBe(false);
    });
  });

  describe('isValidZipCode', () => {
    it('returns true for valid 5-digit zip', () => {
      expect(validators.isValidZipCode('94105')).toBe(true);
    });

    it('returns true for valid zip+4', () => {
      expect(validators.isValidZipCode('94105-1234')).toBe(true);
    });

    it('returns false for invalid zip', () => {
      expect(validators.isValidZipCode('9410')).toBe(false);
      expect(validators.isValidZipCode('941050')).toBe(false);
      expect(validators.isValidZipCode('ABCDE')).toBe(false);
    });
  });

  describe('formatPrice', () => {
    it('formats price correctly', () => {
      expect(validators.formatPrice(29.99)).toBe('$29.99');
      expect(validators.formatPrice(100)).toBe('$100.00');
      expect(validators.formatPrice(0.5)).toBe('$0.50');
    });
  });

  describe('validateCardNumber', () => {
    it('returns true for valid card numbers', () => {
      expect(validators.validateCardNumber('4242424242424242')).toBe(true);
      expect(validators.validateCardNumber('4242 4242 4242 4242')).toBe(true);
    });

    it('returns false for invalid card numbers', () => {
      expect(validators.validateCardNumber('1234')).toBe(false);
      expect(validators.validateCardNumber('12345678901234567890')).toBe(false);
      expect(validators.validateCardNumber('ABCD1234')).toBe(false);
    });
  });
});

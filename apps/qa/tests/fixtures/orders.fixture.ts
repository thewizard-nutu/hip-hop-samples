export const testOrders = {
  validCheckout: {
    items: [
      { productId: 'prod-001', quantity: 1 },
      { productId: 'prod-002', quantity: 1 },
    ],
    shippingInfo: {
      address: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'US',
    },
    paymentInfo: {
      cardNumber: '4242424242424242',
      expiryMonth: '12',
      expiryYear: '2025',
      cvc: '123',
      cardholderName: 'Test User',
    },
  },
  invalidPayment: {
    items: [
      { productId: 'prod-001', quantity: 1 },
    ],
    shippingInfo: {
      address: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'US',
    },
    paymentInfo: {
      cardNumber: '4000000000000002', // Declined card
      expiryMonth: '12',
      expiryYear: '2025',
      cvc: '123',
      cardholderName: 'Test User',
    },
  },
};

export const stripeTestCards = {
  success: '4242424242424242',
  declined: '4000000000000002',
  amexRequiresAuth: '378282246310005',
  visaRequiresAuth: '4000002500003155',
};

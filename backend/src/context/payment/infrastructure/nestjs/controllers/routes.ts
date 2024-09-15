export const V1_ROUTES = {
  NAME: 'payment',
  BASE: '/v1/payment',
  PAYMENT: {
    FIND_ONE: ':id',
    UPDATE: ':id',
    DELETE: ':id',
    SUCCESS: 'success/:id',
    CANCEL: 'cancel/:id',
  },
};

export const responseCodes = {
  SUCCESS: 200,
  SUCCESS_NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORISED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const pathRoutes = {
  customerSearch: {
    path: 'customers',
  },
  customerCreate: {
    path: 'customers/new',
  },
  customerUpdate: {
    path: 'customer/edit/:id',
  },
};

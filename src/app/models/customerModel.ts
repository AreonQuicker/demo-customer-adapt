export interface CustomerModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  invoiceTotal: number;
}

export interface Result<T> {
  message: string;
  errors: string[];
  errorCode: string;
  data: T;
  failed: boolean;
}

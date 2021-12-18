export interface ResponseData<T> {
  data?: T;
  errors: { message: string; field?: string }[];
}

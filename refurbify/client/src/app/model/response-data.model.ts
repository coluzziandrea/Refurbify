export interface ResponseData<T> {
  body?: T;
  errors: { message: string; field?: string }[];
}

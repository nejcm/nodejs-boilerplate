export interface Response<T> {
  success?: boolean;
  message?: string;
  data?: T;
  errors?: unknown;
}

export const response = <T>({
  success = true,
  ...rest
}: Response<T>): Response<T> => ({
  success,
  ...rest,
});

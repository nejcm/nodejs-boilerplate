export const isTrue = (value: string | number | undefined): boolean => {
  return (
    value !== undefined &&
    (value.toString().toLowerCase() === 'true' || value == 1)
  );
};

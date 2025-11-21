export const selectData = <T>(response: { data: T } | undefined) => {
  return response?.data;
};

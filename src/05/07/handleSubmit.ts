export function handleSubmitHelper(
  callback: (values: any) => Promise<void> | void
) {
  return (values: any) => {
    return callback(values);
  };
}

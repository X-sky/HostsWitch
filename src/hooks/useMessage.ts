// TODO: message hooks with @mui/material/Snackbar
export default function useMessage() {
  const error = (msg: string) => {
    console.error(msg);
  };
  const warn = (msg: string) => {
    console.warn(msg);
  };
  const success = (msg: string) => {
    console.log(msg);
  };
  return {
    success,
    error,
    warn
  };
}

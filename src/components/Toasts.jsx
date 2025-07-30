import { useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";
import { toastsActions } from "../store/toasts-slice";
import Toast from "./Toast";

export function toastThunk(status, message) {
  return (dispatch, getState) => {
    const toastData = {
      counter: 1,
      id: uuidv4(),
      message,
      status,
    };

    // Check if the content of this toast is active, if so just increment the counter
    const initialToasts = getState().toasts.toasts;
    let sameToastIndex = -1;
    const sameToast = initialToasts.find((toast, index) => {
      if (
        toast.status === toastData.status &&
        toast.message === toastData.message
      ) {
        sameToastIndex = index;
        return true;
      }
      return false;
    });
    if (sameToast === undefined) {
      dispatch(toastsActions.addToast(toastData));
    } else {
      dispatch(toastsActions.incToastCounter(sameToastIndex));
    }
  };
}

export default function Toasts() {
  const toasts = useSelector((state) => state.toasts.toasts);

  return (
    <section
      id="gui-toast-group"
      className="fixed top-[17.5vh] right-10 w-[30vw]"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toastData={toast} />
      ))}
    </section>
  );
}

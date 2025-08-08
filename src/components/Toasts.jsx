import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";

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
  const dispatch = useDispatch();
  const location = useLocation();
  const toasts = useSelector((state) => state.toasts.toasts);

  useEffect(() => {
    dispatch(toastsActions.clearToasts());
  }, [dispatch, location]);

  return (
    <section id="gui-toast-group" className="fixed top-30 right-10 w-[30vw] flex flex-col gap-3">
      {toasts.map((toast) => (
        <Toast key={toast.id} toastData={toast} />
      ))}
    </section>
  );
}

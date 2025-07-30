import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastsActions } from "../store/toasts-slice";

export default function Toast({ toastData, ...props }) {
  const dispatch = useDispatch();
  const toasts = useSelector((state) => state.toasts.toasts);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const toastIndex = toasts.findIndex((toast) => toast.id === toastData.id);
    //   console.log("toastIndex:", toastIndex);
      dispatch(toastsActions.removeToast(toastIndex));
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch]);

  const status = toastData.status;
  let statusColor;
  if (status === "Success") {
    statusColor = "bg-green-600";
  } else if (status === "Error") {
    statusColor = "bg-red-600";
  } else {
    statusColor = "bg-orange-600";
  }

  return (
    <output
      role="status"
      className="flex flex-col bg-white py-3 rounded-xl"
      {...props}
    >
      <div className="w-full flex flex-row justify-between items-center border-b border-b-neutral-200 px-5 pb-2">
        <div className="flex flex-row gap-1 items-center align-middle text-[1.15rem]">
          <div className={`size-5 ${statusColor} rounded-full mr-2`}></div>
          <p>{status}</p>
          {toastData.counter > 1 && <p>{`(${toastData.counter})`}</p>}
        </div>
        <button
          onClick={() => {
            const toastIndex = toasts.findIndex(
              (toast) => toast.id === toastData.id
            );
            dispatch(toastsActions.removeToast(toastIndex));
          }}
          className="text-[1.15rem] text-gray-300 hover:text-gray-700 font-semibold align-middle"
        >
          X
        </button>
      </div>
      <p className="text-[1.15rem] px-5 pt-2">{toastData.message}</p>
    </output>
  );
}

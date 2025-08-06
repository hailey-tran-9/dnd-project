import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRepeatTimer } from "../../../hooks/RepeatTimer";

import { copyToClipboard } from "../../../util/util";
import { toastThunk } from "../../Toasts";
import ms from "ms";

export default function ActiveInvite({
  gameID,
  refreshFn,
  invData,
  invIndex,
  ...props
}) {
  const dispatch = useDispatch();
  const { time } = useRepeatTimer(invData.exp - Date.now());

  useEffect(() => {
    // console.log("time: " + time);
    if (time <= 0) {
      console.log("INVITE HAS EXPIRED");
      refreshFn(`gameInvites/${gameID}/invites`);
    }
  }, [time]);

  const dateFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return (
    <Fragment {...props}>
      <p
        onClick={() => {
          copyToClipboard(invData.inviteLink);
          dispatch(toastThunk("Success", "Invite link copied to clipboard."));
        }}
        className="text-sky-300 hover:text-sky-200 select-none"
      >
        Invite {invIndex + 1}
      </p>
      <p className="truncate">{time >= 1000 ? ms(time) : "1s"}</p>
      <p className="truncate">
        {new Date(invData.createdOn).toLocaleDateString(
          undefined,
          dateFormatOptions
        )}
      </p>
    </Fragment>
  );
}

import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function HomePage() {
  const { currentUser } = useContext(CurrentUserContext);
  const isLoggedIn = !!currentUser?.id;

  const neetoCalUrl = `/api/neeto/${currentUser?.id}/neetocal`;
  const neetoRecordUrl = `/api/neeto/${currentUser?.id}/neetorecord`;

  return (
    <>
      <h1>Home</h1>
      <div>
        {isLoggedIn && (
          <a href={neetoCalUrl} target="_blank">
            Go to NeetoCal
          </a>
        )}
      </div>
      <div>
        {isLoggedIn && (
          <a href={neetoRecordUrl} target="_blank">
            Go to NeetoRecord
          </a>
        )}
      </div>
    </>
  );
}

import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function HomePage() {
  const { currentUser } = useContext(CurrentUserContext);
  const isLoggedIn = !!currentUser?.id;

  const neetoDeskUrl = `/api/neeto/consumer/${currentUser?.id}/neetodesk`;

  return (
    <>
      <h1>Home</h1>
      <div>
        {isLoggedIn && (
          <a href={neetoDeskUrl} target="_blank">
            Go to NeetoDesk
          </a>
        )}
      </div>
    </>
  );
}

import React from "react";
import { AuthticatedApp } from "./authenticated-app";
import { useAuth } from "./context/auth-context";
import { UnauthenticatedApp } from "./unauthenticated-app";


function App() {
  const {user} = useAuth()

  return (
    <div>
      {
        user ? <AuthticatedApp/> : <UnauthenticatedApp/>
      }
    </div>
  );
}

export default App;

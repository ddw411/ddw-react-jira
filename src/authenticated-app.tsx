import React from "react";
import { useAuth } from "./context/auth-context";
import ProjectList from "./screen/project-list";

export const AuthticatedApp = () => {
    const {logout} = useAuth()

    return (
        <div>
            <button onClick={logout}>logout</button>
            <ProjectList/>
        </div>
    )
}
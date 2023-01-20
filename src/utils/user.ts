import { useEffect } from "react";
import { cleanObject } from ".";
import { User } from "../screen/project-list/search-panel";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";

export const useUsers = (param?: Partial<User>) => {
    const client = useHttp()
    const {run,...result} = useAsync<User[]>()

    useEffect(() => {
        run(client('users',{data: cleanObject(param || {})}))
    },[param])

    return result
}
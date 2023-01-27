import { useEffect } from "react";
import { cleanObject } from ".";
import { User } from "../types/User";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";

// 请求负责人user列表，和用户user不一样
export const useUsers = (param?: Partial<User>) => {
    const client = useHttp()
    const {run,...result} = useAsync<User[]>()

    useEffect(() => {
        run(client('users',{data: cleanObject(param || {})}))
    },[param])

    return result
}
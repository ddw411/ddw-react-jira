import { useEffect } from "react"
import { cleanObject } from "."
import { Project } from "../screen/project-list/list"
import { useHttp } from "./http"
import { useAsync } from "./useAsync"


export const useProject = (param?: Partial<Project>) => {
    const client = useHttp()
    const {run,...result} = useAsync<Project[]>()

    useEffect(() => {
        run(client('projects',{data: cleanObject(param || {})}))
    },[param])

    return result
}
import { useEffect } from "react"
import { cleanObject } from "."
import { Project } from "../screen/project-list/list"
import { useHttp } from "./http"
import { useAsync } from "./useAsync"

// 自定义hook返回封装属性与方法，hook只能在顶层调用
// 请求项目列表数据
export const useProject = (param?: Partial<Project>) => {
    const client = useHttp()
    const {run,...result} = useAsync<Project[]>()
    const fetchProjects = () => client('projects',{data: cleanObject(param || {})})

    useEffect(() => {
        run(fetchProjects(), {
            retry: fetchProjects
        })
    },[param])

    return result
}

// 修改编辑project方法
export const useEditProject = () => {
    const {run, ...asyncResult} = useAsync()
    const client = useHttp()
    const mutate = (params: Partial<Project>) => {
        return run(client(`projects/${params.id}`, {
            data: params,
            method: 'PATCH',
        }))
    }

    return {
        mutate,
        ...asyncResult,
    }
}

export const useAddProject = () => {
    const {run, ...asyncResult} = useAsync()
    const client = useHttp()
    const mutate = (params: Partial<Project>) => {
        return run(client(`projects/${params.id}`, {
            data: params,
            method: 'POST'
        }))
    }

    return {
        mutate,
        ...asyncResult,
    }
}
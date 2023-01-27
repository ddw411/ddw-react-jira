import { Project } from "../types/Project"
import { useHttp } from "./http"
import { QueryKey, useMutation, useQuery, useQueryClient} from "react-query"
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-options"

// 自定义hook返回封装属性与方法，hook只能在顶层调用
// 请求项目列表数据
export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()
    
    // ['projects',param] --> [状态标识符，监听依赖]
    return useQuery<Project[]>(['projects',param], () => client('projects', {data: param}))
}

// 修改编辑project方法
export const useEditProject = (queryKey: QueryKey) => {
    const client = useHttp()
    
    // useMutation会暴露mutate和mutateAsync方法
    return useMutation(
        (params: Partial<Project>) => client(`projects/${params.id}`, {
            method: 'PATCH',
            data: params
        }),
        useEditConfig(queryKey)
    )
}

export const useAddProject = (queryKey: QueryKey) => {
    const client = useHttp()
    
    return useMutation(
        (params: Partial<Project>) => client(`projects`, {
            data: params,
            method: "POST"
        }),
        useAddConfig(queryKey)
    )
}

export const useDeleteProject = (queryKey: QueryKey) => {
    const client = useHttp()
    
    return useMutation(
        ({id} : {id: number}) => client(`projects/${id}`, {
            method: "DELETE"
        }),
        useDeleteConfig(queryKey)
    )
}

export const useProjectDetail = (id?:number) => {
    const client = useHttp()

    return useQuery<Project>(['project', {id}], () => client(`projects/${id}`),
    {
        enabled: !!id
    })
}
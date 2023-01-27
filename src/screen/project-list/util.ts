import { useMemo } from "react"
import { useProjectDetail } from "../../utils/project"
import { useUrlQueryParam } from "../../utils/url"

export const useProjectsSearchParams = () => {
    // 从url获得的参数都是string类型
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])

    // personId转为number
    return [
        useMemo(() => ({...param, personId: Number(param.personId) || undefined}),[param]),
        setParam
    ] as const
}

export const useProjectsQueryKey = () => {
    const [params] = useProjectsSearchParams()
    return ['projects', params]
}

// 通过url管理创建或修改指定id的project
export const useProjectModal = () => {
    // 通过url管理状态，全局，useUrlQueryParam连接了url和路由
    // projectCreate,控制创建页面的打开
    const [{projectCreate}, setProjectCreate] = useUrlQueryParam([
        'projectCreate'
    ])
    const [{editingProjectId}, setEditingProjectId] = useUrlQueryParam([
        'editingProjectId'
    ])

    // editingProject:编辑项目的数据
    const {data: editingProject, isLoading} = useProjectDetail(Number(editingProjectId))

    const open = () => setProjectCreate({projectCreate: true})
    const close = () => {
        setProjectCreate({projectCreate: false})
        setEditingProjectId({editingProjectId: undefined})
    }

    // 修改了url参数，通过控制url参数实现页面跳转
    const startEdit = (id:number) => setEditingProjectId({editingProjectId: id})

    return {
        // 两种条件打开修改界面
        projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
        open,
        close,
        startEdit,
        editingProject,
        isLoading
    }
}
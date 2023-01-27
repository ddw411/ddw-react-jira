import { useCallback, useMemo } from "react";
import { useLocation } from "react-router"
import { useDebounce } from "../../utils";
import { useProjectDetail } from "../../utils/project"
import { useTaskDetail } from "../../utils/task";
import { useUrlQueryParam } from "../../utils/url";

export const useProjectIdInUrl = () => {
    const { pathname } = useLocation();
    const id = pathname.match(/projects\/(\d+)/)?.[1];
    return Number(id);
};

// 获取看板对应的project：通过url获取id去获取对应细节
export const useProjectInUrl = () => useProjectDetail(useProjectIdInUrl())

// 返回含projectId属性的对象，请求参数配置
export const useKanbanSearchParams = () => ({projectId: useProjectIdInUrl()})

// 配置react-query的queryKey，第二项用于监听
export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()]

export const useTasksSearchParams = () => {
    const [param, setParam] = useUrlQueryParam([
        'name',
        'typeId',
        'processorId',
        'tagId'
    ])
    const projectId = useProjectIdInUrl()
    const debouncedName = useDebounce(param.name, 200)
    return [
        useMemo(() => ({
            projectId,
            typeId: Number(param.typeId) || undefined,
            processorId: Number(param.processorId) || undefined,
            tagId: Number(param.tagId) || undefined,
            name: debouncedName
        }),[projectId, param]),
        setParam
    ] as const
}

export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]

export const useTasksModal = () => {
    // 获取参数id
    const [{editingTaskId}, setEditingTaskId] = useUrlQueryParam([
        "editingTaskId"
    ])
    // 请求数据
    // startEdit:更新id,重新获取data
    const { data: editingTask, isLoading } = useTaskDetail(Number(editingTaskId))
    // 更新id
    const startEdit = useCallback((id:number) => {
        setEditingTaskId({editingTaskId: id})
    }, [setEditingTaskId])
    const close = useCallback(() => {
        setEditingTaskId({editingTaskId:""})
    }, [setEditingTaskId])

    return {
        editingTaskId,
        editingTask,
        startEdit,
        close,
        isLoading
    }
}
import { useMemo } from "react"
import { useUrlQueryParam } from "../../utils/url"

export const useProjectsSearchParams = () => {
    // 从url获得的参数都是string类型
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    return [
        useMemo(() => ({...param, personId: Number(param.personId) || undefined}),[param]),
        setParam
    ] as const
}
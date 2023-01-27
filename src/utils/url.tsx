import { useMemo } from "react"
import {URLSearchParamsInit, useSearchParams} from "react-router-dom"
import { cleanObject } from "."

// 获取url参数
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParam] = useSearchParams()

    // 0：根据传入键值，利用searchParams赋值，返回对象
    // 1：更新参数
    return [
        useMemo(() =>  keys.reduce((prev, key) => {
                return {...prev, [key]: searchParams.get(key) || ''}
            }, {} as {[key in string]: string}),[searchParams]
        ),
        (params: Partial<{[key in K]: unknown}>) => {
            const o = cleanObject({...Object.fromEntries(searchParams), ...params}) as URLSearchParamsInit
            return setSearchParam(o)
        }
    ] as const
}
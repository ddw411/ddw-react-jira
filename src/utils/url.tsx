import { useMemo } from "react"
import {URLSearchParamsInit, useSearchParams} from "react-router-dom"
import { cleanObject } from "."

// 获取url参数
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParam] = useSearchParams()

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
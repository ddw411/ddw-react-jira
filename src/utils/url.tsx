import { useMemo } from "react"
import {URLSearchParamsInit, useSearchParams} from "react-router-dom"
import { cleanObject } from "."

// 获取url参数
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    // 获取url中的param
    const [searchParams, setSearchParam] = useSearchParams()
    
    // 处理searchParams
    // 0：根据传入键值，searchParams.get(key)获取参数，返回对象
    // 1：更新参数
    return [
        useMemo(() =>  keys.reduce((prev, key) => {
                // 返回的键值都为string
                // console.log({...prev, [key]: searchParams.get(key) || ''},"111")
                return {...prev, [key]: searchParams.get(key) || ''}
            }, {} as {[key in string]: string}),[searchParams]
        ),
        (params: Partial<{[key in K]: unknown}>) => {
            const o = cleanObject({...Object.fromEntries(searchParams), ...params}) as URLSearchParamsInit
            return setSearchParam(o)
        }
    ] as const
}
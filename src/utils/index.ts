import { useEffect, useState } from "react"

export const isFalsy = (value: unknown) => value === 0 ? false : !value

// 清除对象空值属性
export const cleanObject = (object: object) => {
    // 防止对原对象的改变
    const result = {...object}
    Object.keys(result).forEach((key) => {
        // @ts-ignore
        const value = result[key]
        if(isFalsy(value)) {
            // @ts-ignore
            delete result[key]
        }
    })
    return result
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
    }, [])
}

export const useDebounce = <V>(value: V, delay?: number) => {
    const [inputValue, setInputValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setInputValue(value)
        }, delay)
        return clearTimeout(timer)
    },[inputValue, delay])

    return inputValue
}
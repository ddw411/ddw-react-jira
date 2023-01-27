import React,{ useEffect, useRef, useState } from "react"

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

// 后面用泛型来规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // 每次在value变化以后，设置一个定时器
        const timeout = setTimeout(() => setDebouncedValue(value), delay);
        // 每次在上一个useEffect处理完以后再运行
        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
};

export const useDocumentTitle = (title:string,keepOnUnmount = true) => {
    // Document接口表示任何在浏览器中载入的网页,dom树
    const oldTitle = useRef(document.title).current

    useEffect(() => {
        document.title = title
    },[title])

    useEffect(() => {
        // 当前页面卸载时（后退），用oldtitle
        return () => {
            if(!keepOnUnmount) {
                document.title = oldTitle
            }
        }
    },[keepOnUnmount, oldTitle])
}

export const resetRoute = () => window.location.href = window.location.origin
import React,{ useState } from "react";

interface State<D> {
    error: Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}

const defaultConfig = {
    throwOnError: false
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = {...defaultConfig, initialConfig}
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })
    // retry的目的是重新发一次请求，而不是setstate
    // 可用useRef替代此方法
    const [retry, setRetry] = useState(() => () => {})

    // 成功的回调
    const setData = (data: D) => setState({
        data:data,
        stat: 'success',
        error: null
    })

    // 失败的回调
    const setError = (error: Error) => setState({
        error,
        stat: 'error',
        data: null
    })

    // 处理异步，并处理promise的结果
    const run = (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
        if(!promise) {
            throw new Error('请传入promise')
        }
        setRetry(() => () => {
            if(runConfig?.retry) {
                run(runConfig?.retry(), runConfig)
            }
        })
        setState({...state, stat:'loading'})
        return promise.then(data => {
            setData(data)
            return data
        }).catch(error => {
            // catch会消耗异常，所以需要返回promise进行链式调用
            setError(error)
            // 抛出同异步错误
            if(config.throwOnError) return Promise.reject(error)
            return error            
        })
    }

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        retry,
        setData,
        setError,
        ...state
    }
}
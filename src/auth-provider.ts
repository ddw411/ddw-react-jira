import { User } from "./types/User";

const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

// 为user绑定token
export const handleUserResponse = ({user}: {user: User}) => {
    window.localStorage.setItem(localStorageKey, user.token || '')
    return user
}

// 登录注册请求以及结果返回绑定token的封装
export const login = (data: {username: string; password: string}) => {
    return fetch(`${apiUrl}/login`, {
        method: "POST",
        // 请求头，设置参数格式
        headers: {
            "Content-Type": "application/json",
        },
        // 参数放在以JSON格式放在body里
        body: JSON.stringify(data)
    }).then(async (response) => {
        // then(onFulfill,onReject),有response返回都进入onFulfill
        if(response.ok) {
            return handleUserResponse(await response.json())
        } else {
            // 抛出错误
            return Promise.reject(await response.json())
        }
    })
}

export const register = (data: {username: string; password: string}) => {
    return fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then(async (response) => {
        if(response.ok) {
            return handleUserResponse(await response.json())
        } else {
            return Promise.reject(await response.json())
        }
    })
}

// 清空token
export const logout = async () => window.localStorage.removeItem(localStorageKey)
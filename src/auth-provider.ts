import { User } from "../src/screen/project-list/search-panel"

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
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then(async (response) => {
        if(response.ok) {
            return handleUserResponse(await response.json())
        } else {
            return Promise.reject(data)
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
            return Promise.reject(data)
        }
    })
}

// 清空token
export const logout = async () => window.localStorage.removeItem(localStorageKey)
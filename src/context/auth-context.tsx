import React, { ReactNode, useState } from "react";
import * as auth from '../auth-provider'
import { User } from "../screen/project-list/search-panel";
import { useMount } from "../utils";
import { http } from "../utils/http";

interface AuthForm {
    username: string;
    password: string
}

// 初始化user
const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if(token) {
        const data = await http('me', {token})
        user = data.user
    }
    return user
}

const AuthContext = React.createContext<{
    user: User|null,
    register: (form: AuthForm) => Promise<void>,
    login: (form: AuthForm) => Promise<void>,
    logout: () => Promise<void>,
}|undefined>(undefined)
AuthContext.displayName = 'AuthContext'

// 填充AuthContext，建立provider
export const AuthProvider = ({children}:{children: ReactNode}) => {
    // 管理了user信息
    // 默认值是null，页面刷新后丢失user信息
    // 例如，登录后发送get请求，获取数据后重新刷新渲染页面导致user丢失，调用logout
    const [user, setUser] = useState<User|null>(null)

    const login = (form: AuthForm) => auth.login(form).then(user => setUser(user))
    const register = (form: AuthForm) => auth.register(form).then(user => setUser(user))
    const logout = () => auth.logout().then(() => setUser(null))

    // 页面挂载初始化user，进行持久化
    useMount(() => {
        bootstrapUser().then(user => setUser(user))
    })

    return <AuthContext.Provider children={children} value={{user, login, logout, register}}/>
}

export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if(!context) {
        throw Error('wrong')
    }

    // context本质是个对象，是AuthContext的实例
    return context
}
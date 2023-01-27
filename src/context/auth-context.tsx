import React, { ReactNode } from "react";
import { useQueryClient } from "react-query";
import * as auth from '../auth-provider'
import { FullPageErrorFallback, FullPageLoading } from "../components/lib";
import { User } from "../types/User";
import { useMount } from "../utils";
import { http } from "../utils/http";
import { useAsync } from "../utils/useAsync";

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
    // const [user, setUser] = useState<User|null>(null)
    const {data:user, error, isLoading,isIdle, isError, run, setData: setUser} = useAsync<User|null>()
    const queryClient = useQueryClient()

    const login = (form: AuthForm) => auth.login(form).then(user => setUser(user))
    const register = (form: AuthForm) => auth.register(form).then(user => setUser(user))
    const logout = () => auth.logout().then(() => {
        setUser(null)
        // 清空react-query缓存
        queryClient.clear()
    })

    // 页面挂载初始化user，进行持久化
    useMount(() => {
        run(bootstrapUser())
    })

    if(isIdle || isLoading) {
        return <FullPageLoading/>
    }

    if(isError) {
        return <FullPageErrorFallback error={error}/>
    }

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
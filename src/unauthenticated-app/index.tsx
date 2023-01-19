import React,{ useState } from "react"
import Login from "./login"
import Register from "./register"

export const UnauthenticatedApp = () => {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <div>
            {
                isLogin ? <Login/> : <Register/>
            }
            <button onClick={() => setIsLogin(!isLogin)}>切换到{isLogin ? '登录' : '注册'}</button>
        </div>
    )
}
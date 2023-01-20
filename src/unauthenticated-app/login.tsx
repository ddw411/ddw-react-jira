import { Form, Input } from "antd";
import React from "react";
import { LongButton } from ".";
import { useAuth } from "../context/auth-context";
import { useAsync } from "../utils/useAsync";


export const Login = ({onError}: {onError: (error:Error) => void}) => {

    const {login} = useAuth()
    const {run, isLoading} = useAsync(undefined,{throwOnError: true})

    const handleSubmit = async (values: {username:string,password:string}) => {
        try{
            await run(login(values))
        } catch(e) {
            onError(e as Error)
        }
    }

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name={'username'} rules={[{required:true, message:"请输入用户名"}]}>
                <Input placeholder={'用户名'} type="text" id={'username'}/>
            </Form.Item>
            <Form.Item name={'password'} rules={[{required:true, message:"请输入密码"}]}>
                <Input placeholder={'密码'} type="password" id={'password'}/>
            </Form.Item>
            <Form.Item>
                <LongButton loading={isLoading} htmlType={'submit'} type={"primary"}>login</LongButton>
            </Form.Item>
        </Form>
    )
}

export default Login
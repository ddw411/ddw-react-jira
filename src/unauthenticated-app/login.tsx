import { Form, Input } from "antd";
import React from "react";
import { LongButton } from ".";
import { useAuth } from "../context/auth-context";


export const Login = () => {

    const {login} = useAuth()

    const handleSubmit = (values: {username:string,password:string}) => {
        login(values)
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
                <LongButton htmlType={'submit'} type={"primary"}>login</LongButton>
            </Form.Item>
        </Form>
    )
}

export default Login
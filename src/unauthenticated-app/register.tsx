import React, { FormEvent } from "react";
import { Form, Button,Input } from "antd";
import { useAuth } from "../context/auth-context";
import { LongButton } from ".";


export const Register = () => {

    const {register} = useAuth()

    const handleSubmit = (values: {username:string;password:string}) => {
        register(values)
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
                <LongButton htmlType={'submit'} type={"primary"}>register</LongButton>
            </Form.Item>
        </Form>
    )
}

export default Register
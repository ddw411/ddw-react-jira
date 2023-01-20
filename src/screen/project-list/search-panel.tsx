import React from "react"
import { Form, Select,Input } from "antd";

export interface User {
    id: string;
    name: string;
    email: string;
    title: string;
    organization: string;
    token: string
}

interface SearchPanelProps {
    users: User[];
    param: {
        name: string;
        personId: string
    };
    setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = (props: SearchPanelProps) => {
    const {param, setParam, users} = props
    return (
        <Form style={{marginBottom: '2rem'}}layout={"inline"}>
            <Form.Item>
                <Input placeholder={'项目名'} type="text" value={param.name} onChange={e => setParam({
                    ...param,
                    name: e.target.value
                })}/>
            </Form.Item>
            <Form.Item>
                <Select value={param.personId} onChange={value => setParam({
                    ...param,
                    personId: value
                })}>
                    <Select.Option value={' '}>负责人</Select.Option>
                    {
                        // 函数体内只有一句，则可省略{}，自带return
                        users.map((user) => <Select.Option value={user.id} key={user.id}>{user.name}</Select.Option>)
                    }
                </Select>
            </Form.Item>
        </Form>
    )
}

export default SearchPanel
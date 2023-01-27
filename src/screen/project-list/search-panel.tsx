import React from "react"
import { Form, Select,Input } from "antd";
import { Project } from "../../types/Project";
import { UserSelect } from "../../components/user-select";
import { User } from "../../types/User";

interface SearchPanelProps {
    users: User[];
    // pick取出<A, b|c>A中bc
    param: Partial<Pick<Project, 'name' | 'personId'>>
    setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = (props: SearchPanelProps) => {
    const {param, setParam, users} = props
    return (
        <Form style={{marginBottom: '2rem'}} layout={"inline"}>
            <Form.Item>
                <Input placeholder={'项目名'} type="text" value={param.name} onChange={evt => setParam({
                    ...param,
                    name: evt.target.value
                })}/>
            </Form.Item>
            <Form.Item>
                <UserSelect
                    defaultOptionName={'负责人'}
                    value={param.personId}
                    onChange={(value) => setParam({
                        ...param,
                        personId: value
                    })}
                />
            </Form.Item>
        </Form>
    )
}

export default SearchPanel
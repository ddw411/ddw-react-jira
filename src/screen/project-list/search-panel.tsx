import React from "react"

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
        <form action="">
            <input type="text" value={param.name} onChange={e => setParam({
                ...param,
                name: e.target.value
            })}/>
            <select value={param.personId} onChange={e => setParam({
                ...param,
                personId: e.target.value
            })}>
                <option value={' '}>负责人</option>
                {
                    // 函数体内只有一句，则可省略{}，自带return
                    users.map((user) => <option value={user.id} key={user.id}>{user.name}</option>)
                }
            </select>
        </form>
    )
}

export default SearchPanel
import React from "react"
import { User } from "./search-panel";

interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string
}

interface ListProject {
    list: Project[],
    users: User[]
}

export const List = (props:ListProject) => {
    const {list, users} = props
    return (
        <table>
            <thead>
                <tr>
                    <th>名称</th>
                    <th>负责人</th>
                </tr>
            </thead>
            <tbody>
                {
                    list.map(project => 
                        <tr key={project.id}>
                            <td>{project.name}</td>
                            <td>{users.find(user => user.id === project.personId)?.name}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export default List
import React from "react"
import { User } from "../../types/User";
import {Dropdown, Menu, Modal, Table} from 'antd'
import dayjs from "dayjs";
import { TableProps } from "antd/lib/table";
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";
import { useDeleteProject, useEditProject } from "../../utils/project";
import { ButtonNoPadding } from "../../components/lib";
import { useProjectModal, useProjectsQueryKey } from "./util";
import { Project } from "../../types/Project";

interface ListProps extends TableProps<Project>{
    users: User[]
}

export const List = ({users,...props} :ListProps) => {
    const {mutate} = useEditProject(useProjectsQueryKey())
    // 参数获取时间顺序
    // 点击pin修改后刷新
    const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })
    

    return <Table pagination={false} columns={[
        {
            title: <Pin checked={true} disabled={true}/>,
            render(value, project){
                // pin => pinProject(project.id)(pin) ==> pinProject(project.id)
                return (<Pin checked={project.pin} onCheckedChange={pinProject(project.id)}/>)
            }
        },
        {
            title:'名称',
            sorter:(a,b) => a.name.localeCompare(b.name),
            render(value, project) {
                // @ts-ignore
                return <Link to={String(project.id)}>{project.name}</Link>
            }
        }, 
        {
            title:'部门',
            dataIndex:"organization"
        },
        {
            title:'负责人',
            render(value,project) {
                return <span>
                    {users.find(user => user.id === project.personId)?.name}
                </span>
            }
        },
        {
            title:'创建时间',
            render(value,project) {
                return <span>
                    {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
                </span>
            }
        },
        {
            render(value,project) {
                return <More project={project}/>
            }
        }
    ]} {...props}/>
    
}

const More = ({project}: {project:Project}) => {
    const {startEdit} = useProjectModal()
    const goToEditProject = (id:number) => () => startEdit(id)
    const {mutate: deleteProject} = useDeleteProject(useProjectsQueryKey())
    const confirmDeleteProject = (id: number) => {
        Modal.confirm({
            title:'are you sure',
            content: 'click to sure',
            okText: 'sure',
            onOk() {
                deleteProject({id})
            }
        })
    }

    return (
        //@ts-ignore
        <Dropdown
            overlay={
                <Menu>
                    <Menu.Item onClick={goToEditProject(project.id)} key={"edit"}>编辑</Menu.Item>
                    <Menu.Item onClick={() => confirmDeleteProject(project.id)} key={"delete"}>删除</Menu.Item>
                </Menu>
            }
        >
            <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
        </Dropdown>
    )
}

export default List
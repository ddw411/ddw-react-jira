import React, { useState } from "react"
import { useDebounce, useDocumentTitle } from "../../utils"
import SearchPanel from "./search-panel"
import styled from "@emotion/styled"
import { useProjects } from "../../utils/project"
import { useUsers } from "../../utils/user"
import List from "./list"
import { useProjectModal, useProjectsSearchParams } from "./util"
import { ButtonNoPadding, ErrorBox } from "../../components/lib"


export const ProjectList = () => {
    // 管理搜索框输入值
    const [param, setParam] = useProjectsSearchParams()
    //@ts-ignore
    const { isLoading, error, data: list} = useProjects(useDebounce(param, 200))
    const {data: users} = useUsers()

    useDocumentTitle("项目列表", false)
    const { open } = useProjectModal();
 
    return (
        <Container>
            <h1>项目列表</h1>
            <ButtonNoPadding onClick={open} type={"link"}>
                创建项目
            </ButtonNoPadding>
            <SearchPanel 
                users={users || []}
                param={param}
                setParam={setParam} 
            />
            <ErrorBox error={error}/>
            <List 
                loading={isLoading}
                dataSource={list || []}
                users={users || []}
            />
        </Container>
    )
}

export default ProjectList

const Container = styled.div`
    padding: 3.2rem;
`
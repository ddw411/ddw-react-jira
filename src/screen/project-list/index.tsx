import React, { useState } from "react"
import { useDebounce, useDocumentTitle } from "../../utils"
import SearchPanel from "./search-panel"
import styled from "@emotion/styled"
import { useProject } from "../../utils/project"
import { useUsers } from "../../utils/user"
import List from "./list"
import { useProjectsSearchParams } from "./util"


export const ProjectList = () => {
    
    const [param, setParam] = useProjectsSearchParams()
    //@ts-ignore
    const { isLoading, data: list, retry} = useProject(useDebounce(param, 200))
    const {data: users} = useUsers()

    useDocumentTitle("项目列表", false)
 
    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel 
                users={users || []}
                param={param}
                setParam={setParam} 
            />
            <List 
                loading={isLoading}
                dataSource={list || []}
                users={users || []}
                refresh={retry}
            />
        </Container>
    )
}

export default ProjectList

const Container = styled.div`
    padding: 3.2rem;
`
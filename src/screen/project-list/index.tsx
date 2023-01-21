import React, { useState } from "react"
import { useDebounce, useDocumentTitle } from "../../utils"
import SearchPanel from "./search-panel"
import styled from "@emotion/styled"
import { useProject } from "../../utils/project"
import { useUsers } from "../../utils/user"
import List from "./list"
import { useUrlQueryParam } from "../../utils/url"


export const ProjectList = () => {
    
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    const debouncedParam = useDebounce(param, 2000)
    const { isLoading, data: list} = useProject(debouncedParam)
    const {data: users} = useUsers()

    useDocumentTitle("项目列表", false)

    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel 
                users={users || []}
                // @ts-ignore
                param={param}
                setParam={setParam} 
            />
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
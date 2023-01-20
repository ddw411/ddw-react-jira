import React, { useEffect, useState } from "react"
import { cleanObject, useDebounce, useMount } from "../../utils"
import List from "./list"
import SearchPanel from "./search-panel"
import { useHttp } from "../../utils/http"
import styled from "@emotion/styled"

interface Param {
    name: string;
    personId: string
}

export const ProjectList = () => {
    const [param, setParam] = useState<Param>({
        name:'',
        personId:''
    })
    const debouncedParam = useDebounce(param, 2000)
    const [list, setList] = useState([])
    const [users, setUsers] = useState([])
    const client = useHttp()

    useEffect(() => {
        client('projects',{data: cleanObject(debouncedParam)}).then(setList)
    },[debouncedParam])

    useMount(() => {
        client('users').then(setUsers)
    })

    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel 
                param={param}
                setParam={setParam} 
                users={users}
            />
            <List 
                list={list}
                users={users}
            />
        </Container>
    )
}

export default ProjectList

const Container = styled.div`
    padding: 3.2rem;
`
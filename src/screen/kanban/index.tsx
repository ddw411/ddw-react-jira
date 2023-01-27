import styled from "@emotion/styled";
import { Spin } from "antd";
import React from "react";
import { ScreenContainer } from "../../components/lib";
import { useDocumentTitle } from "../../utils";
import { useKanbans } from "../../utils/kanban";
import { useTasks } from "../../utils/task";
import { CreateKanban } from "./create-kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import TaskModal from "./task-modal";
import { useKanbanSearchParams, useProjectInUrl, useTasksSearchParams } from "./util";

export const KanbanScreen = () => {
    useDocumentTitle('看板列表')

    const {data: currentProject} = useProjectInUrl()
    const {data: kanbans, isLoading: kanbanIsLoading} = useKanbans(useKanbanSearchParams())
    const {isLoading: taskIsLoading} = useTasks(useTasksSearchParams()[0])
    const isLoading = taskIsLoading || kanbanIsLoading

    console.log(kanbans,"kanbans");
    console.log("hi");
    

    return (
        <ScreenContainer>
            <h1>{currentProject?.name}</h1>
            <SearchPanel/>
            { isLoading ? <Spin size={"large"}/>: <ColumnsContainer>
                {
                    kanbans?.map((kanban) => <KanbanColumn key={kanban.id} kanban={kanban}/>)
                }
                <CreateKanban/>
            </ColumnsContainer>
            }
            <TaskModal/>
        </ScreenContainer>
    )
}

export const ColumnsContainer = styled.div`
  display: flex;
  flex: 1;
  overflow-x: scroll;
  margin-top: 2rem;
`;
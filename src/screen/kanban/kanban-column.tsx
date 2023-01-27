import styled from "@emotion/styled";
import { Card } from "antd";
import React from "react";
import { Kanban } from "../../types/kanban";
import { useTasks } from "../../utils/task";
import { useTaskTypes } from "../../utils/task-type";
import { CreateTask } from "./create-task";
import { useTasksModal, useTasksSearchParams } from "./util";


const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data: taskTypes } = useTaskTypes();
    const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
    
    if (!name) {
      return null;
    }
    return (
      <div>
        {name === "task" ? <span>'√'</span> : <span>'x'</span>}
      </div>
    )
};

export const KanbanColumn = ({kanban}: {kanban: Kanban}) => {
    const {data: tasks} = useTasks(useTasksSearchParams()[0])
    const {startEdit} = useTasksModal()
    
    return (
        <Container>
          <h3>{kanban.name} {tasks?.length}</h3>
            <TasksContainer>
              {
                tasks?.map((task) => (
                    <Card onClick={() => startEdit(task.id)} style={{marginBottom: '0.5rem'}} key={task.id}>
                      <div>
                        {task.name}
                      </div>
                      <TaskTypeIcon id={task.id}/>
                    </Card>
                ))
              }
              <CreateTask kanbanId={kanban.id}/>
            </TasksContainer>
        </Container>
    )
}

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
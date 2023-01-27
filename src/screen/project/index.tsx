import React from "react";
import { Link } from "react-router-dom";
import {Routes, Route, Navigate, useLocation} from "react-router"
import { KanbanScreen } from "../kanban";
import { EpicScreen } from "../epic";
import styled from "@emotion/styled";
import { Menu } from "antd";

const useRouteType = () => {
    const units = useLocation().pathname.split('/')
    return units[units.length - 1]
}

export const ProjectScreen = () => {
    const routeType = useRouteType()

    return (
        <Container>
            <Aside>
                <Menu mode="inline" selectedKeys={[routeType]}>
                    <Menu.Item key="kanban">
                        <Link to={"kanban"}>看板</Link>
                    </Menu.Item>
                    <Menu.Item key="epic">
                        <Link to={"epic"}>任务组</Link>
                    </Menu.Item>
                </Menu>
            </Aside>
            <Main>
                <Routes>
                    {/*projects/:projectId/kanban*/}
                    <Route path={"/kanban"} element={<KanbanScreen />} />
                    {/*projects/:projectId/epic*/}
                    <Route path={"/epic"} element={<EpicScreen />} />
                    {/* location.pathname：url路径与文件名 */}
                    <Navigate to={window.location.pathname + "/kanban"} replace={true} />
                </Routes>
            </Main>
        </Container>
    )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
`;

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

// overflow: hidden 可以让一个flex容器不扩张
const Main = styled.main`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 2rem 2rem 0;
  display: flex;
  align-items: stretch;
`;
import React from "react";
import { useAuth } from "./context/auth-context";
import ProjectList from "./screen/project-list";
import styled from '@emotion/styled'
import { Row } from "./components/lib";
import {ReactComponent as SoftwareLogo} from './assets/software-logo.svg'
import {Dropdown, Menu, Button} from 'antd'
import {Navigate, Route, Routes} from 'react-router'
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "./screen/project";
import { resetRoute } from "./utils";
import { ProjectModal } from "./screen/project-list/project-modal";

export const AuthticatedApp = () => {
    

    return (
        <Container>
            <PageHeader/>
            <Router>
                <Main>
                    <Routes>
                        <Route path={'/projects'} element={<ProjectList/>} />
                        <Route path={'/projects/:projectId/*'} element={<ProjectScreen/>} />
                        <Navigate to={'/projects'}/>
                    </Routes>
                </Main>
                {/* 有url参数控制，并展示 */}
                <ProjectModal/>
            </Router>
        </Container>
    )
}

const PageHeader = () => {
    const {logout, user} = useAuth()

    return (
        <Header>
            <HeaderLeft gap={true}>
                <Button type={'link'} onClick={resetRoute}>
                    <SoftwareLogo width={'18rem'}/>
                </Button>
                <h2>项目</h2>
                <h2>用户</h2>
            </HeaderLeft>
            <HeaderRight>
                {/* @ts-ignore */}
                <Dropdown overlay={<Menu>
                    <Menu.Item key={'logout'}>
                        <Button type={"link"} onClick={logout}>logout</Button>
                    </Menu.Item>
                </Menu>}>
                    <Button type={"link"} onClick={e => e.preventDefault()}>
                        Hi, {user?.name}
                    </Button>
                </Dropdown>
            </HeaderRight>
        </Header>
    ) 
}

// temporal dead zone(暂时性死区)
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
`;
import React from "react";
import { useAuth } from "./context/auth-context";
import ProjectList from "./screen/project-list";
import styled from '@emotion/styled'
import { Row } from "./components/lib";
import {ReactComponent as SoftwareLogo} from './assets/software-logo.svg'
import {Dropdown,Menu} from 'antd'

export const AuthticatedApp = () => {
    const {logout, user} = useAuth()

    return (
        <Container>
            <Header>
                <HeaderLeft gap={true}>
                    <SoftwareLogo width={'18rem'}/>
                    <h2>项目</h2>
                    <h2>用户</h2>
                </HeaderLeft>
                <HeaderRight>
                    {/* @ts-ignore */}
                    <Dropdown overlay={<Menu>
                        <Menu.Item key={'logout'}>
                            <a onClick={logout}>logout</a>
                        </Menu.Item>
                    </Menu>}>
                        <a onClick={e => e.preventDefault()}>
                            Hi, {user?.name}
                        </a>
                    </Dropdown>
                </HeaderRight>
            </Header>
            <Main>
                <ProjectList/>
            </Main>
        </Container>
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
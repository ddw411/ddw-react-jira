import React,{ useState } from "react"
import {Card, Divider,Button} from 'antd'
import Login from "./login"
import Register from "./register"
import styled from '@emotion/styled'
import logo from '../assets/logo.svg'
import left from '../assets/left.svg'
import right from '../assets/right.svg'
import { useDocumentTitle } from "../utils"
import { ErrorBox } from "../components/lib"

export const UnauthenticatedApp = () => {
    // setXXX是异步操作
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useDocumentTitle("登录注册")

    return (
        <Container>
            <Header/>
            <Background/>
            <ShadowCard>
                <Title>{ isLogin ? "请登录" : "请注册"}</Title>
                <ErrorBox error={error}/>
                {
                    isLogin ? <Login onError={setError}/> : <Register onError={setError}/>
                }
                <Divider/>
                <Button type={"link"} onClick={() => setIsLogin(!isLogin)}>{!isLogin ? "已经有账号了？直接登录" : "没有账号？注册新账号"}</Button>
            </ShadowCard>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

export const LongButton = styled(Button)`
  width: 100%;
`;
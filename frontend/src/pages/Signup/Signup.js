import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import styled from "styled-components"
import LoadingAnimation from "../../components/LoadingAnimation"


const Signup = (props) => {
    const search = useLocation().search
    const uid = new URLSearchParams(search).get('uid')

    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState(null)
    const [isErrored, setIsErrored] = useState(false)
    const [isSubmitted, setIsSumbitted] = useState(false)

    const HandleSubmit = (e) => {
        localStorage.setItem('isAuthed', true)
        localStorage.setItem('userType', userInfo.userType)
        navigate('/')
    }

    useEffect(() => {
        fetch(`http://localhost:5000/users/signup/${uid}`)
            .then((res) => {
                if (res.ok) 
                    return res.json()
                else {
                    setIsErrored(true)
                    return res
                }
                    
            })
            .then((json) => {
                if (json.data) {
                    setUserInfo(json.data)
                }
            })
    }, [uid])

    if (isErrored) {
        return (
            <>
            <Wrapper>
                <Container>
                    <Logo src="/static/logo.png" />
                    <h1 style={{ padding: '16px 0' }}>No user found</h1>
                </Container>
            </Wrapper>
            </>
        )
    }
    return (
        <Wrapper>
            <Container>
                <Logo src="/static/logo.png" />
                    {userInfo && <>
                        <label style={{ paddingBottom: '8px' }}>Welcome, </label>
                        {userInfo && <>
                            <span style={{ paddingBottom: '8px' }}>{userInfo.first_name} {userInfo.last_name}</span>
                            <div style={{ paddingTop: '16px', paddingBottom: '8px' }}>
                            <WelcomeLabal>Please use the username below to sign-in</WelcomeLabal>
                            <Email>{userInfo.username}</Email>
                            </div>
                            </>
                        }
                        <LoginBtn
                            onClick={ e => HandleSubmit() }
                        >
                            Sign In
                        </LoginBtn>
                        {isSubmitted && <LoadingAnimation />}
                    </> }
                    {!userInfo && <LoadingAnimation /> }
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 100vh;
    color: #f3f4f6;
  
`
const Container = styled.div`
    padding: 24px 48px;
    border: 2px solid #6b7280;
    border-radius: 5px;
    width: 400px;
    text-align: left;
`
const Logo = styled.img`
    height: 60px;
    margin-bottom: 24px;
    margin-left: -6px;
`
const WelcomeLabal = styled.h2`
    color: #6b7280
`
const Email = styled.h1`
    font-size: 18px;
    padding-bottom: 8px
`
const LoginBtn = styled.button`
    width: 100%;
    margin-top: 24px;
    background-color: #10b981;
    padding: 12px;
    border-radius: 5px;
    border: none;
    transition-property: background-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    color: #f3f4f6;
    font-weight: 600;
    font-size: 14px;

    :hover {
        background-color: #6ee7b7;
        cursor: pointer;
    }
    :disabled {
        background-color: #4b5563;
        color: #9ca3af;
        :hover {
            cursor: not-allowed
        }
    }
`
export default Signup

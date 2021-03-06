import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

import GetAPI from "../../utils/api"

const Login = () => {
    const URL = GetAPI()
    const navigate = useNavigate()
    const [user, setUser] = useState("")
    const [canSubmit, setCanSubmit] = useState(false)
    const [isSubmitted, setIsSumbitted] = useState(false)
    const [isErrored, setIsErrored] = useState(false)

    const ValidateUser = (e) => {
        if (user.length < 3) {
            document.getElementById('email').style.border = "1px solid #ef4444"
            document.getElementById('email').style.color = "#ef4444"
            setCanSubmit(false)
        } else {
            document.getElementById('email').style.border = "1px solid #9ca3af"
            document.getElementById('email').style.color = "#f3f4f6"
            setCanSubmit(true)
        }
    }

    const HandleSubmit = () => {
        setIsSumbitted(true)
        setIsErrored(false)
        fetch(`${URL}users/signin`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",    
            },
            body: JSON.stringify({
                username: user
            })
        })
            .then(res => {
                if (res.status === 200)
                    return res.json()
                else {
                    setIsSumbitted(false)
                    setIsErrored(true)
                }
            })
            .then((json) => {
                localStorage.setItem('isAuthed', json.data.isAuthed)
                localStorage.setItem('userType', json.data.userType)
                navigate("/")
            })
    }

    return (
        <Wrapper>
            <Container>
                <Logo src="/static/logo.png" />
                <label style={{ paddingBottom: '8px' }}>Login</label>
                <Input 
                    type="email"
                    id="email"
                    onBlur={ e => ValidateUser(e)}
                    value={user}
                    onChange={ e => setUser(e.target.value) }
                    placeholder="JeremyR"
                />
                <LoginBtn
                    disabled={!canSubmit}
                    onClick={ e => HandleSubmit() }
                >
                    Sign In
                </LoginBtn>
                <Logins>
                    <p>Admin (Can do all): <span>admin</span></p>
                    <p>Manager (All but user manage): <span>manager</span></p>
                    <p>Host (Can update reservations): <span>host</span></p>
                </Logins>
                {isSubmitted && 
                <div className="overlay">
                    <div className="overlay__inner">
                        <div className="overlay__content"><span className="spinner"></span></div>
                    </div>
                </div>
                }
                {isErrored && 
                    <p style={{color: '#ef4444', marginTop: '8px'}}>Login error occured, please check your details and try again</p>
                }
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
const Logins = styled.div`
    margin-top: 16px;
    color: #6b7280;
    font-size: 14px;

    span {
        font-weight: bold;
        color: #e5e7eb;
    }
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
const Input = styled.input`
    width: calc(100% - 16px);
    border: 1px solid #9ca3af;
    background-color: transparent;
    border-radius: 5px;
    padding: 8px;
    color: #f3f4f6;
    font-size: 16px;
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
export default Login

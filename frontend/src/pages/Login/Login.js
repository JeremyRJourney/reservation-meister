import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"


const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [canSubmit, setCanSubmit] = useState(false)
    const [isSubmitted, setIsSumbitted] = useState(false)
    const [isErrored, setIsErrored] = useState(false)

    const ValidateEmail = (e) => {
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
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
        fetch("https://reqres.in/api/users?page=2")
            .then(res => {
                if(res.status === 404) {
                    console.log('err')
                    setIsSumbitted(false)
                    setIsErrored(true)
                } else {
                    localStorage.setItem('isAuthed', true)
                    navigate("/")
                }
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
                    onBlur={ e => ValidateEmail(e)}
                    value={email}
                    onChange={ e => setEmail(e.target.value) }
                    placeholder="you@example.com"
                />
                <LoginBtn
                    disabled={!canSubmit}
                    onClick={ e => HandleSubmit() }
                >
                    Sign In
                </LoginBtn>
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

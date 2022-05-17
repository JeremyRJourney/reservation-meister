import { useState } from "react";
import styled from "styled-components";

const New = (props) => {
    const { setShowNewModal } = props

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [userType, setUserType] = useState("host")

    const [isWaiting, setIsWaiting] = useState(false)
    const [responseId, setResponseId] = useState(null)

    const HandleSubmit = (e) => {
        e.preventDefault()
        setIsWaiting(true)
        fetch("http://localhost:5000/users/create", {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",    
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                userType: userType,
                username: username
            })
        })
        .then(res => {
            if (res.status === 201)
                return res.json()
        })
        .then((json) => {
            setIsWaiting(false)
            console.log(json)
            setResponseId(json.data.uid)
        })
        

    }

    return (
        <Container>
        <Wrapper>
            <TitleWrapper>
                <Title>Create new user</Title>
                <Close onClick={ () => setShowNewModal(false) }>✖</Close>
            </TitleWrapper>
            <form onSubmit={HandleSubmit}>

                <div style={{ display: 'flex' }}>
                    <div>
                        <InputLabel>* First name</InputLabel>
                        <Input
                            type="text"
                            onChange={ (e) => setFirstName(e.target.value)}
                            value={firstName}
                            name="fname" 
                            id="fname" 
                            placeholder="First name" 
                        />
                    </div>
                    <div style={{ marginLeft: '24px' }}>
                        <InputLabel>* Last name</InputLabel>
                        <Input
                            type="text" 
                            onChange={ (e) => setLastName(e.target.value)}
                            value={lastName}
                            name="lname" 
                            id="lname" 
                            placeholder="Last name" 
                        />
                    </div>
                </div>
                <div style={{ margin: '16px 0' }}>
                    <InputLabel>* Username</InputLabel>
                    <Input
                        type="text" 
                        onChange={ (e) => setUsername(e.target.value)}
                        value={username}
                        name="username" 
                        id="username" 
                        placeholder="Username" 
                    />
                </div>
                <div style={{ margin: '16px 0' }}>
                    <InputLabel>* User type</InputLabel>
                    <StatusDropdown
                        onChange={ (e) => setUserType(e.target.value)}
                        value={userType}
                    >
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="host">Host</option>
                    </StatusDropdown>
                </div>

                <Button type="submit">Create user</Button>
            </form>
            {responseId && <Title style={{ marginTop: '24px' }}>
                <a style={{ color: 'currentcolor' }} href={`http://localhost:3000/signup?uid=${responseId}`} target="_blank">Sign-up now</a>
                </Title>
            }

            {isWaiting &&
                <span className="spinner-small"></span>
            }

        </Wrapper>
        </Container>
    )
}


const Container = styled.div`
    width: 100%;
    height: 100%;
    z-index: 100;
    position: absolute;
    top: 0;
    left: 0;
`
const Wrapper = styled.div`
    background-color: rgba(30,41,67,1);
    border: 1px solid #F1F1F1;
    box-shadow: 0 10px 15px -3px rgb(255 255 255 / 0.1), 0 4px 6px -4px rgb(255 255 255 / 0.1);
    padding: 24px;
    position: absolute;
    top: 85px;
    left: 395px;
    z-index: 10;
`
const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #4b5563;
    margin-bottom: 24px;
`

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 8px;
`
const Close = styled.h1`
margin-right: 16px;
:hover {
    cursor: pointer
} 
`
const InputLabel = styled.label`
    display: block;
    font-size: 1rem; 
    line-height: 1.25rem;
    font-weight: 500;
`
const Input = styled.input`
    filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
    display: block;
    padding: 8px;
    border: none;
    border-radius: 4px;
    margin-top: 8px;
    min-width: 225px;
`
const StatusDropdown = styled.select`
    filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
    display: block;
    padding: 8px;
    border: none;
    border-radius: 4px;
    margin-top: 8px;
    min-width: 225px;
`
const Button = styled.button`
display: inline-flex;
align-items: center;
padding-left: 0.75rem; /* 12px */
padding-right: 0.75rem; /* 12px */
padding-top: 0.5rem; /* 8px */
padding-bottom: 0.5rem; /* 8px */
border: 1px solid #fff;
font-weight: 500;
border-radius: 0.375rem; /* 6px */
background-color: transparent;
color: #fff;
font-size: 1rem;

:hover {
    background-color: rgba(255,255,255,1);
    color: #000;
    transition-property: background-color, color;
    transition-duration: 0.25s;   
    cursor: pointer;
}
`


export default New

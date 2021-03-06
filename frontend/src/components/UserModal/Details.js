import { useState } from "react";
import styled from "styled-components";

import GetAPI from "../../utils/api"

const Details = (props) => {
    const URL = GetAPI()
    const { setShowDetailsModal, data, GetUserList, setUsers } = props

    const [firstName, setFirstName] = useState(data.firstName)
    const [lastName, setLastName] = useState(data.lastName)
    const [username, setUsername] = useState(data.username)
    const [userType, setUserType] = useState(data.userType)

    const [isWaiting, setIsWaiting] = useState(false)

    const ValidateForm = () => {
        let isError = false
        if (firstName.length == 0) {
            document.getElementById('fname').style = "border: 2px solid #ef4444; background-color: #ef444433"
            isError = true
        } else {
            document.getElementById('fname').style = "border: none; background-color: none"
        }
        if (lastName.length == 0) {
            document.getElementById('lname').style = "border: 2px solid #ef4444; background-color: #ef444433"
            isError = true
        } else {
            document.getElementById('lname').style = "border: none; background-color: none"
        }
        if (username.length == 0) {
            document.getElementById('username').style = "border: 2px solid #ef4444; background-color: #ef444433"
            isError = true
        } else {
            document.getElementById('username').style = "border: none; background-color: none"
        }
        return !isError
    }


    const HandleSubmit = (e) => {
        e.preventDefault()

        if (ValidateForm()) {
            setIsWaiting(true)
            fetch(`${URL}users/${data._id}`, {
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
                if (res.status === 200)
                    return res.json()
            })
            .then((json) => {
                setIsWaiting(false)
                setShowDetailsModal(false)
                setUsers(null)
                GetUserList()
            })
        }
    }

    const DeleteUser = () => {
        setIsWaiting(true)
        fetch(`${URL}users/${data._id}`, {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",    
            }
        })
        .then(res => {
            if (res.status === 200)
                return res.json()
        })
        .then((json) => {
            setIsWaiting(false)
            setShowDetailsModal(false)
            setUsers(null)
            GetUserList()
        })

    }

    return (
        <Container>
        <Wrapper>
            <TitleWrapper>
                <Title>User details</Title>
                <Close onClick={ () => setShowDetailsModal(false) }>???</Close>
            </TitleWrapper>
            <form onSubmit={HandleSubmit}>

                <div style={{ display: 'flex' }}>
                    <div>
                        <InputLabel>* First name</InputLabel>
                        <Input
                            type="text"
                            value={firstName}
                            onChange={ (e) => setFirstName(e.target.value)}
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
                        { localStorage.getItem('userType') == 'admin' && <option value="admin">Admin</option> }
                        <option value="manager">Manager</option>
                        <option value="host">Host</option>
                    </StatusDropdown>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button type="submit">Update user</Button>
                    <Button onClick={ () => DeleteUser() } type="button">Delete</Button>
                </div>
            </form>
            {isWaiting &&
                <span style={{ marginTop: '16px' }} className="spinner-small"></span>
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


export default Details

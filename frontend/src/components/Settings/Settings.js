import { useEffect, useState } from "react"

import styled from "styled-components"
import Details from "../UserModal/Details"
import New from "../UserModal/New"

import GetAPI from "../../utils/api"

const Settings = () => {

    const URL = GetAPI()
    
    const [users, setUsers] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)
    const [showNewModal, setShowNewModal] = useState(false)
    const [showDetailsModal, setShowDetailsModal] = useState(false)

    const GetUserList = () => {
        fetch(`${URL}users/list`)
        .then((res) => {
            if (res.ok) 
                return res.json()
            else {
                return res
            }            
        })
        .then((json) => {
            if (json.data) {
                setUsers(json.data)
            }
        })

    }

    useEffect( () => {
        GetUserList()
    }, [])

    const SetUserModals = (user) => {
        if (localStorage.getItem('userType') !== 'host') {
            setSelectedUser(user)
            setShowDetailsModal(true)
        }
    }

    return (
        <div>
            <UsersContainer>
                <TitleContainer>
                    <SectionTitle>
                        User List
                    </SectionTitle>
                    { localStorage.getItem('userType') != 'host' && <Button onClick={ () => setShowNewModal(true)}>New</Button> }
                </TitleContainer>
                {!users && 
                    <span className="spinner-small align"></span>
                }
                {users && users.map(item => {
                    return (
                        <div key={item._id}>
                        <User 
                            style={{ paddingBottom: '8px', borderBottom: '2px solid #6b7280' }}
                            onClick={ () => SetUserModals(item) }
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Name>{item.firstName} {item.lastName}</Name>
                                { localStorage.getItem('userType') != 'host' && <Name style={{ textTransform: 'capitalize' }}>{item.userType}</Name> }
                            </div>
                            { localStorage.getItem('userType') != 'host' && <div>
                                <Username>Username
                                    <span>{item.username}</span>
                                </Username>
                            </div> }
                        </User>
                        {showDetailsModal && <Details setUsers={setUsers} GetUserList={GetUserList} setShowDetailsModal={setShowDetailsModal} data={selectedUser} style={{ position: 'fixed', zIndex: 5 }} /> }
                        </div>
                    )
                }) }
            </UsersContainer>
            {showNewModal && <New setUsers={setUsers} GetUserList={GetUserList} setShowNewModal={setShowNewModal} style={{ position: 'fixed', zIndex: 5 }} /> }

        </div>
    )
}

const UsersContainer = styled.section`
    margin-top: 16px;
    padding: 0 8px
`
const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const User = styled.div`
    transition-property: background-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    padding: 8px;

    :hover {
        background-color: rgba(255,255,255,0.2);
        cursor: pointer;
    }
`
const SectionTitle = styled.h1`
    font-size: 22px;
    padding: 0 8px;
    font-weight: medium;
    margin-bottom: 16px;
`
const Name = styled.h1`
    font-size: 18px
`
const Username = styled.h1`
    color: rgba(255,255,255,0.75);
    margin-top: 8px;

    span {
        color: rgb(255,255,255);
        margin-left: 16px;
    }
`
const Button = styled.button`
display: inline-flex;
align-items: center;
border: 1px solid #fff;
padding: 4px 6px;
height: min-content;
font-weight: 500;
border-radius: 0.375rem; /* 6px */
background-color: transparent;
color: #fff;
font-size: 0.95rem;

:hover {
    background-color: rgba(255,255,255,1);
    color: #000;
    transition-property: background-color, color;
    transition-duration: 0.25s;   
    cursor: pointer;
}
`

export default Settings

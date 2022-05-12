import { useState } from "react"
import styled from "styled-components"
import NewReservation from "../NewReservation"

const Header = (props) => {
    const { currentNav, setCurrentNav, fetchCurrentNav, updateTables } = props
    const [navItems] = useState(['Bar','Gallery', 'Lounge'])
    const [showReservationCreate, setShowReservationCreate] = useState(false)

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  
    const date = new Date()
    const today = days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate()

    return (
        <div>
            <ListWrapper>
                {navItems.map((item) => {
                    return (
                        <Item
                            key={item}
                            onClick={e => { setCurrentNav(item); fetchCurrentNav(item); updateTables(item) }}
                            style={ item === currentNav ? { borderBottom: '2px solid #FFF' } : {} }
                        >
                            <h1>{ item }</h1>
                        </Item>
                    )
                })}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <CreateReservation
                    onClick={ () => setShowReservationCreate(true) }
                >
                    <svg fill="currentColor" style={{ paddingTop: '4px' }} width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"/></svg>
                </CreateReservation>
                <DateItem>
                    {today}
                </DateItem>
                </div>
            </ListWrapper>
            {showReservationCreate && <NewReservation setShowReservationCreate={setShowReservationCreate} style={{ position: 'fixed', zIndex: 5 }} /> }

        </div>
    )
}

const ListWrapper = styled.ul`
    padding: 0 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 64px;
    border-bottom: 2px solid #6b7280;
`
const Item = styled.li`
    list-style: none;
    font-size: 18px;
    padding: 24px 24px;
    margin-bottom: 4px;
    :hover {
        cursor: pointer
    }
`
const CreateReservation = styled.li`
list-style: none;
font-size: 14px;
border: 1px solid #6b7280;
padding: 0px 16px;
margin-bottom: 4px;
:hover {
    cursor: pointer
}

`
const DateItem = styled.li`
    margin-left: 16px;
    list-style: none;
    font-size: 14px;
    border: 1px solid #6b7280;
    padding: 8px 24px;
    margin-bottom: 4px;
`

export default Header

import { useState } from "react"
import styled from "styled-components"

const Header = (props) => {
    const { currentNav, setCurrentNav, fetchCurrentNav, updateTables } = props
    const [navItems] = useState(['Bar','Gallery', 'Lounge', 'twoFloor'])

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
                <DateItem>
                    {today}
                </DateItem>
            </ListWrapper>
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
const DateItem = styled.li`
    list-style: none;
    font-size: 14px;
    border: 1px solid #6b7280;
    padding: 8px 24px;
    margin-bottom: 4px;
`

export default Header

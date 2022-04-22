import { useState } from "react"
import styled from "styled-components"

const Header = (props) => {
    //const { currentNav } = props
    const currentNav = "Bar"
    const [navItems, setNavItems] = useState(['Bar','Gallery', 'Lounge', '2nd Floor'])

    return (
        <div>
            <ListWrapper>
                {navItems.map((item) => {
                    return (
                        <Item
                            key={item}
                            style={ item == currentNav ? { borderBottom: '2px solid #FFF' } : {} }
                        >
                            <h1>{ item }</h1>
                        </Item>
                    )
                })}
                <DateItem>
                    Saturday, April 2nd
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
    border-bottom: 2px solid #000;
`
const Item = styled.li`
    list-style: none;
    font-size: 18px;
    padding: 24px 24px;
    margin-bottom: 4px;
`
const DateItem = styled.li`
    list-style: none;
    font-size: 14px;
    border: 1px solid #6b7280;
    padding: 8px 24px;
    margin-bottom: 4px;
`

export default Header

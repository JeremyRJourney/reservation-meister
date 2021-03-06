import { useState } from "react"
import styled from "styled-components"
import Reservation from "../Reservation/Reservation"
import Settings from "../Settings"
import Tables from "../Tables"

const Navbar = (props) => {
    const { data } = props
    const [currentNav, setCurrentNav] = useState("Reservations")

    return (
        <>
        <Wrapper>
            <Nav>
                <Logo src="/static/logo.png" />
            </Nav>
            <NavOptions>
                <NavItem
                    onClick={e => setCurrentNav('Reservations')}
                    className={currentNav === 'Reservations' ? 'active': undefined}
                >
                    <div style={{ backgroundColor:"#d1d5db", borderRadius: '1000px', width: "32px", height: "32px" }}>
                        <img alt="bookings" width="20px" style={{ marginTop: "5px" }} src="/static/booking.png" />
                    </div>
                </NavItem>
                <NavItem 
                    onClick={e => setCurrentNav('Tables')}
                    className={currentNav === 'Tables' ? 'active': undefined}
                >
                <div style={{ backgroundColor:"#d1d5db", borderRadius: '1000px', width: "32px", height: "32px" }}>
                        <img alt="tables" width="20px" style={{ marginTop: "5px" }} src="/static/circle-table.png" />
                    </div>
                </NavItem>
                <NavItem
                    onClick={e => setCurrentNav('Settings')}
                    className={currentNav === 'Settings' ? 'active': undefined}
                >
                <div style={{ backgroundColor:"#d1d5db", borderRadius: '1000px', width: "32px", height: "32px" }}>
                        <img alt="settings" width="20px" style={{ marginTop: "5px" }} src="/static/settings.png" />
                    </div>
                </NavItem>
            </NavOptions>
            {currentNav === 'Reservations' && <Reservation data={data}/>}
            {currentNav === 'Tables' && <Tables />}
            {currentNav === 'Settings' && <Settings />}
        </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    min-width: 375px;
    max-width: 375px;
    height: 100vh;
`
const Nav = styled.div`
    height: 64px;
    border-bottom: 2px solid #6b7280;
`
const Logo = styled.img`
    height: 42px;
    align-items: center;
    margin-top: 8px;
    margin-left: 8px;
    margin-right: 8px;
`
const NavOptions = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #6b7280;

`
const NavItem = styled.div`
    padding: 12px 0;
    border-right: 1px solid #6b7280;
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    
    :hover {
        cursor: pointer;
        background-color: #29375a;
        transition-property: background-color;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
    }
    :last-child {
        border: none;
    }
    &.active {
        background-color: #29375a;
    }

`

export default Navbar

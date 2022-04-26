import { useState } from 'react'

import Navbar from "../../components/Navbar"
import Header from "../../components/Header"
import FloorPlan from '../../components/FloorPlan'

const Bar = [
    {
        id: 142,
        tableType: 2,
        tableStatus: 'seated',
        tableLocationX: 0,
        tableLocationY: 0,
        reservation: {
            firstName: 'Alfred',
            lastName: 'Jones',
            time: '2022-05-01T16-00-00-000Z'
        }
    },
    {
        id: 14,
        tableType: 4,
        tableStatus: 'seated',
        tableLocationX: 0.3,
        tableLocationY: 0,
        reservation: {
            firstName: 'Alfred',
            lastName: 'Jones',
            time: '2022-05-01T16-00-00-000Z'
        }
    },
    {
        id: 102,
        tableType: 8,
        tableStatus: 'seated',
        tableLocationX: 0.7,
        tableLocationY: 0.0,
        reservation: {
            firstName: 'Alfred',
            lastName: 'Jones',
            time: '2022-05-01T16-00-00-000Z'
        }
    },
    {
        id: 4200,
        tableType: 4,
        tableStatus: 'seated',
        tableLocationX: 0,
        tableLocationY: 0.25,
        reservation: {
            firstName: 'Alfred',
            lastName: 'Jones',
            time: '2022-05-01T16-00-00-000Z'
        }
    },
    {
        id: 402,
        tableType: 2,
        tableStatus: 'seated',
        tableLocationX: 0.375,
        tableLocationY: 0.25,
        reservation: {
            firstName: 'Alfred',
            lastName: 'Jones',
            time: '2022-05-01T16-00-00-000Z'
        }
    },
    {
        id: 442,
        tableType: 6,
        tableStatus: 'seated',
        tableLocationX: 0.0,
        tableLocationY: 0.5,
        reservation: {
            firstName: 'Alfred',
            lastName: 'Jones',
            time: '2022-05-01T16-00-00-000Z'
        }
    },
    {
        id: 42030,
        tableType: 4,
        tableStatus: 'seated',
        tableLocationX: 0.45,
        tableLocationY: 0.55,
        reservation: {
            firstName: 'Alfred',
            lastName: 'Jones',
            time: '2022-05-01T16-00-00-000Z'
        }
    },
    

]
const Gallery = [
    {
        id: 142,
        tableType: 8,
        tableStatus: 'seated',
        tableLocationX: 0,
        tableLocationY: 0,
        reservation: {
            firstName: 'Alfred',
            lastName: 'Jones',
            time: '2022-05-01T16-00-00-000Z'
        }
    },

]


const Main = () => {
    const fetchCurrentNav = (item) => {
        navItems.forEach(navItem => {
            if (navItem === item) {
                fetch(`https://reqres.in/api/users/2`)
                .then((res) => {
                    if (res.ok) 
                        return res.json()
                    else {
                        return res
                    }
                        
                })
                .then((json) => {
                    if (json.data) {
                        console.log(json.data)
                    }
                })
        
            }
        })
    }

    const updateTables = (item) => {
        setCurrentTables(null)
        setTimeout(() => {
            if (item === 'Bar')
                setCurrentTables(Bar)
            if (item === 'Gallery')
                setCurrentTables(Gallery)

        }, 1000);
    }

    const [navItems] = useState(['Bar','Gallery', 'Lounge', 'twoFloor'])
    const [currentNav, setCurrentNav] = useState('Bar')
    const [currentTables, setCurrentTables] = useState(Bar)

    return (
        <div>
            <div style={{ display: 'flex', height: "100vh" }}>
                <Navbar />
                <div style={{ borderLeft: '2px solid #6b7280', width: '100%' }}>
                    <Header  
                        currentNav={currentNav}
                        setCurrentNav={setCurrentNav}
                        fetchCurrentNav={fetchCurrentNav}
                        updateTables={updateTables}
                    />
                    <div style={{ padding: '48px' }}>
                        {!currentTables && <span className="spinner align"></span> }
                        {currentTables && 
                            <FloorPlan  
                                currentNav={currentNav}
                                setCurrentNav={setCurrentNav}
                                currentTables={currentTables}
                            />
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Main

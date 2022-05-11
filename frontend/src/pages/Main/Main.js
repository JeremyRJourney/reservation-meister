import { useEffect, useState } from 'react'

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
        reservations: [
            {
                firstName: 'Alfred',
                lastName: 'Jones',
                guests: 2,
                time: '2022-05-01T16-00-00-000Z'
            },
            {
                firstName: 'Alfred',
                lastName: 'Jones',
                guests: 1,
                time: '2022-05-01T16-00-00-000Z'
            }

        ]
    },
    {
        id: 14,
        tableType: 4,
        tableStatus: 'seated',
        tableLocationX: 0.3,
        tableLocationY: 0,
        reservations: [
            {
            firstName: 'Alfred',
            lastName: 'Jones',
            guests: 4,
            time: '2022-05-01T16-00-00-000Z'
            }
        ]
    },
    {
        id: 102,
        tableType: 8,
        tableStatus: 'seated',
        tableLocationX: 0.7,
        tableLocationY: 0.0,
        reservations: [
            {
            firstName: 'Alfred',
            lastName: 'Jones',
            guests: 7,
            time: '2022-05-01T16-00-00-000Z'
            }
        ]
    },
    {
        id: 4200,
        tableType: 4,
        tableStatus: 'seated',
        tableLocationX: 0,
        tableLocationY: 0.25,
        reservations: [
            {
            firstName: 'Alfred',
            lastName: 'Jones',
            guests: 3,
            time: '2022-05-01T16-00-00-000Z'
            }
        ]
    },
    {
        id: 402,
        tableType: 2,
        tableStatus: 'seated',
        tableLocationX: 0.375,
        tableLocationY: 0.25,
        reservations: [
            {
            firstName: 'Alfred',
            lastName: 'Jones',
            guests: 2,
            time: '2022-05-01T16-00-00-000Z'
            }
        ]
    },
    {
        id: 442,
        tableType: 6,
        tableStatus: 'seated',
        tableLocationX: 0.0,
        tableLocationY: 0.5,
        reservations: [
            {
            firstName: 'Alfred',
            lastName: 'Jones',
            guests: 7,
            time: '2022-05-01T16-00-00-000Z'
            }
        ]
    },
    {
        id: 42030,
        tableType: 4,
        tableStatus: 'seated',
        tableLocationX: 0.45,
        tableLocationY: 0.55,
        reservations: [
            {
            firstName: 'Alfred',
            lastName: 'Jones',
            guests: 4,
            time: '2022-05-01T16-00-00-000Z'
            }
        ]
    },
    

]
const Gallery = [
    {
        id: 142,
        tableType: 8,
        tableStatus: 'seated',
        tableLocationX: 0,
        tableLocationY: 0,
        reservations: {
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

    const fetchTables = () => {
        fetch('https://mocki.io/v1/7d7ef5cf-f9e1-4882-b171-953761cbfdf2')
        .then((res) => {
            if (res.ok) 
                return res.json()
            else {
                return res
            }
                
        })
        .then((json) => {
            if (json.data) {
                setCurrentTables(json.data)
            }
        })
    }

    const updateTables = (item) => {
        setCurrentTables(null)
        if (item === 'Bar')
            fetchTables(Bar)
        if (item === 'Gallery')
            fetchTables(Gallery)

    }

    useEffect( () => {
        fetchTables()
    }, [])

    const [navItems] = useState(['Bar','Gallery', 'Lounge'])
    const [currentNav, setCurrentNav] = useState('Bar')
    const [currentTables, setCurrentTables] = useState(null)

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

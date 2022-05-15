import { useEffect, useState } from 'react'

import Navbar from "../../components/Navbar"
import Header from "../../components/Header"
import FloorPlan from '../../components/FloorPlan'


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
                    }
                })
        
            }
        })
    }

    const fetchList = () => {
        fetch('reservations/list', {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }})
        .then((res) => {
            if (res.ok) 
                return res.json()
            else {
                return res
            }   
        })
        .then((json) => {
            if (json.data) {
                setCurrentList(json.data)
            }
        })
    }
    const fetchTables = (sectionName) => {
        fetch(`reservations/tables?sectionName=${sectionName}`, {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }})
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
        if (item === 'Bar') {
            fetchTables('Bar')
            fetchList()
        }
        if (item === 'Gallery') {
            fetchTables('Gallery')
            fetchList()
        }

    }

    useEffect( () => {
        fetchList()
        fetchTables("Bar")
    }, [])

    const [navItems] = useState(['Bar','Gallery', 'Lounge'])
    const [currentNav, setCurrentNav] = useState('Bar')
    const [currentTables, setCurrentTables] = useState(null)
    const [currentList, setCurrentList] = useState(null)

    return (
        <div>
            <div style={{ display: 'flex', height: "100vh" }}>
                <Navbar data={currentList} />
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
                                currentList={currentList}
                            />
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Main

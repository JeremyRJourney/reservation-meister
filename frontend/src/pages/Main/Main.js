import { useEffect, useState } from 'react'

import Navbar from "../../components/Navbar"
import Header from "../../components/Header"
import FloorPlan from '../../components/FloorPlan'

import GetAPI from "../../utils/api"

const Main = () => {

    const URL = GetAPI()
    const fetchList = () => {
        fetch(`${URL}reservations/list`)
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
        fetch(`${URL}reservations/tables?section=${sectionName}`)
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
        setCurrentList(null)
        if (item === 'Bar') {
            fetchTables('Bar')
            fetchList()
        }
        if (item === 'Gallery') {
            fetchTables('Gallery')
            fetchList()
        } else {
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
                        updateTables={updateTables}
                    />
                    <div style={{ padding: '48px' }}>
                        {!currentTables && <span className="spinner align"></span> }
                        {currentTables && 
                            <FloorPlan  
                                currentNav={currentNav}
                                updateTables={updateTables}
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

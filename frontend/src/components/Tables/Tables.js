import { useEffect, useState } from 'react'
import styled from "styled-components"
import Table from './Table'

const Tables = () => {
    const [vacantTables, setVacantTables] = useState(null)
    const [occupiedTables, setOccipiedTables] = useState(null)

    useEffect(() => {
        fetch('http://localhost:5000/tables/occupancy')
        .then((res) => {
            if (res.ok) 
                return res.json()
            else {
                return res
            }
        })
        .then((json) => {
            if (json) {
                setVacantTables(json.data.vacant)
                setOccipiedTables(json.data.occupied)
            }
        })
    }, [])

    return (
        <div>
            {!vacantTables && 
                <span className="spinner-small align"></span>
            }
            <CountList>
                {vacantTables && <>
                    <section>
                        <Title>Vacant</Title>
                        <TableList>
                            {vacantTables && vacantTables.map(item => {
                                return (
                                    <Table 
                                        key={item[0]}
                                        data={item}
                                    >
                                    </Table>
                                )
                            }
                            )}

                        </TableList>
                    </section>
                    <section style={{ marginTop: '24px' }}>
                        <Title>Occupied</Title>
                        <TableList>
                            {occupiedTables && occupiedTables.map(item => {
                                return (
                                    <Table 
                                        key={item[0]}
                                        data={item}
                                    >
                                    </Table>
                                )
                            }
                            )}

                        </TableList>
                    </section>
                </> }
            </CountList>

        </div>
    )
}

const CountList = styled.div`
    padding: 16px 8px;
`
const TableList = styled.div`
`

const Title = styled.h1`
    margin-bottom: 8px;
    margin-left: 6px;
    font-size: 18px;
    font-weight: 600;
`

export default Tables
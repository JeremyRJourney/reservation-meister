import { useEffect, useState } from 'react'
import styled from "styled-components"
import Table from './Table'

const Tables = () => {
    const [tables, setTables] = useState(null)

    useEffect(() => {
        fetch('tables/occupancy')
        .then((res) => {
            if (res.ok) 
                return res.json()
            else {
                return res
            }
        })
        .then((json) => {
            console.log(json.data)

            if (json) {
                setTables(json)
            }
        })
    }, [])

    return (
        <div>
            {!tables && 
                <span className="spinner-small align"></span>
            }
            <CountList>
                {tables && <>
                    <section>
                        <h1>Vacant</h1>
                        <span style={{ fontSize: '24px' }}>{tables.data.vacant}</span>
                    </section>
                    <section>
                        <h1>Occupied</h1>
                        <span style={{ fontSize: '24px' }}>{tables.data.occupied}</span>
                    </section>
                </> }
            </CountList>

            <TableList>
                {tables && tables.data.list.map(item => {
                    return (
                        <Table 
                            key={item.id}
                            data={item}
                        >
                        </Table>
                    )
                }
                )}

            </TableList>
        </div>
    )
}

const CountList = styled.div`
    display: flex;
    text-align: center;
    justify-content: space-around;
    padding: 16px 8px;
    border-bottom: 1px solid #6b7280;
`
const TableList = styled.div`
`

export default Tables
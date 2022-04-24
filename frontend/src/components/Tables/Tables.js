import react, { useEffect, useState } from 'react'
import styled from "styled-components"
import Table from './Table'

const Tables = () => {
    const [reservations, setReservations] = useState(null)

    useEffect(() => {
        fetch(`https://reqres.in/api/users?page=2`)
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
                setReservations(json.data)
            }
        })
    }, [])

    return (
        <div>
            <CountList>
                {reservations && <>
                    <section>
                        <h1>Vacant</h1>
                        <span style={{ fontSize: '24px' }}>{reservations.length}</span>
                    </section>
                    <section>
                        <h1>Occupied</h1>
                        <span style={{ fontSize: '24px' }}>{reservations.length}</span>
                    </section>
                </> }
            </CountList>

            <TableList>
                {reservations && reservations.map(item => {
                    return (
                        <Table 
                            key={item.id}
                            first_name={item.first_name}
                            last_name={item.last_name}
                            id={item.id}
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
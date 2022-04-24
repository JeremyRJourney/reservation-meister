import react, { useEffect, useState } from 'react'
import styled from "styled-components"
import ReservationItem from './ReservationItem'

const Reservation = () => {
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
                <section>
                    <h1>Scheduled</h1>
                    <span style={{ fontSize: '24px' }}>84</span>
                </section>
                <section>
                    <h1>Seated</h1>
                    <span style={{ fontSize: '24px' }}>84</span>
                </section>
                <section>
                    <h1>Completed</h1>
                    <span style={{ fontSize: '24px' }}>84</span>
                </section>
            </CountList>

            <ReservationItems>
                {reservations && reservations.map(item => {
                    return (
                        <ReservationItem 
                            key={item.id}
                            first_name={item.first_name}
                            last_name={item.last_name}
                        >
                        </ReservationItem>
                    )
                }
                )}

            </ReservationItems>
        </div>
    )
}

const CountList = styled.div`
    display: flex;
    text-align: center;
    justify-content: space-between;
    padding: 16px 8px;
    border-bottom: 1px solid #6b7280;
`
const ReservationItems = styled.div`
`

export default Reservation
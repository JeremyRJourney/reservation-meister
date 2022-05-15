import { useEffect, useState } from 'react'
import styled from "styled-components"
import ReservationItem from './ReservationItem'
const Reservation = (props) => {

    const [data, setData] = useState([])
    const fetchList = () => {
        fetch('reservations/list')
        .then((res) => {
            if (res.ok) 
                return res.json()
            else {
                return res
            }
                
        })
        .then((json) => {
            if (json.data) {
                setData(json.data)
            }
        })
    }

    useEffect( () => {
        fetchList()
    },[])

    return (
        <div>
            {!data && 
                <span className="spinner-small align"></span>
            }
            <CountList>
                {data && <>
                    <section>
                        <h1>Scheduled</h1>
                        <span style={{ fontSize: '24px' }}>{data.length}</span>
                    </section>
                    <section>
                        <h1>Seated</h1>
                        <span style={{ fontSize: '24px' }}>{data.length}</span>
                    </section>
                    <section>
                        <h1>Completed</h1>
                        <span style={{ fontSize: '24px' }}>{data.length}</span>
                    </section>
                </> }
            </CountList>

            <ReservationItems>
                {data && data.map(item => {
                    return (
                        <ReservationItem
                            data={item}
                            key={item.id}
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
    justify-content: space-around;
    padding: 16px 8px;
    border-bottom: 1px solid #6b7280;
`
const ReservationItems = styled.div`
`

export default Reservation
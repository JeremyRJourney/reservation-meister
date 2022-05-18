import { useEffect, useState } from 'react'
import styled from "styled-components"
import ReservationItem from './ReservationItem'

import GetAPI from "../../utils/api"

const Reservation = (props) => {

    const URL = GetAPI()

    const [data, setData] = useState(null)
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
            { data && <>
                <ReservationItems>
                    {data && data.map(item => {
                        return (
                            <ReservationItem
                                data={item}
                                key={item._id}
                            >
                            </ReservationItem>
                        )
                    }
                    )}

                </ReservationItems>
            </>
            }
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
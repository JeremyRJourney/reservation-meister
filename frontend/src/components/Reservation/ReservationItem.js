import styled from "styled-components"
import { useState } from "react"

import ReservationModal from "../ReservationModal"

const ReservationItem = (props) => {
    const { data } = props

    const [showReservationList, setShowReservationList] = useState(false)


    const GetName = () => {
        let truncatedName = (data.firstName + " " + data.lastName).substring(0,20)
        if (truncatedName === data.firstName + " " + data.lastName) {
            return truncatedName
        } else {
            return truncatedName+"..."
        }
    }
    const GetTime = () => {
        const dateObj = new Date(data.time)
        return dateObj.getUTCHours() + ':' + ((dateObj.getUTCMinutes() < 10) ? ("0" + dateObj.getUTCMinutes()) : dateObj.getUTCMinutes())

    }
    const name = GetName()
    const time = GetTime()

    return (
        <>
        <Item
            onClick={ () => { setShowReservationList(data) } }
        >
            <div>
                <Table>{data.tableNumber ? data.tableNumber : undefined}</Table>
            </div>
            <div>
                <Title>{name} - {data.guests} Guests - {time}</Title>
            </div>
        </Item>
        {showReservationList && <ReservationModal setShowReservationList={setShowReservationList} data={data} style={{ position: 'fixed', zIndex: 5 }} /> }
        </>
    )
}

const Item = styled.div`
    padding: 16px 8px;
    border-bottom: 1px solid #6b7280;
    :last-child {
        border: none
    };
    display: flex;
`
const Table = styled.div`
    background-color: #344571;
    min-width: 20px;
    min-height: 21px;
    padding: 16px;
    text-align: center;
    border-radius: 1000px;
    width: auto;
`
const Title = styled.h1`
    padding-left: 8px;
    margin-top: 10px;
    color: #d1d5db;
    font-size: 14px;
`

export default ReservationItem

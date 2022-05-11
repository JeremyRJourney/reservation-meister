import styled from "styled-components";



const TableDetails = (props) => {
    const { data } = props

    const DetermineHeight = (tableType) => {
        switch (tableType) {
            case 2:
                return '100px'
            case 4:
                return '100px'
            case 6:
                return '175px'
            case 8:
                return '225px'
            default:
                return '100px'
        }
    }

    const DisplayReservation = (reservation) => {
        const data = reservation.reservation

        const dateObj = new Date(data.time)
        const ReservationDate = dateObj.getUTCHours() + ':' + ((dateObj.getUTCMinutes() < 10) ? ("0" + dateObj.getUTCMinutes()) : dateObj.getUTCMinutes())
        return (
            <div key={data.id}>{data.firstName} {data.lastName} &#8226; {data.guests} guests &#8226; {ReservationDate}</div>
        )
    }

    return(
        <Wrapper
            style={{
                position: 'absolute',
                top: DetermineHeight(data.tableType),
                width: 'max-content'
            }}
        >
            <Title>Reservations</Title>
            {data.reservations && data.reservations.length === 1 && 
                <DisplayReservation reservation={data.reservations[0]} />
            }
            {data.reservations && data.reservations.length > 1 && data.reservations.map(item => {
                const dateObj = new Date(item.time)
                const ReservationDate = dateObj.getUTCHours() + ':' + ((dateObj.getUTCMinutes() < 10) ? ("0" + dateObj.getUTCMinutes()) : dateObj.getUTCMinutes())
                return (
                    <div key={item.id}>{item.firstName} {item.lastName} &#8226; {item.guests} guests &#8226; {ReservationDate}</div>
                )
            }) }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin: 0;
    padding: 0;
    position: absolute;
    padding: 8px 16px;
    background-color: rgb(55,65,81);
`
const Title = styled.h1`
    font-size: 16px;
    margin-bottom: 16px;

`

export default TableDetails

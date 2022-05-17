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
        const ReservationDate = dateObj.getHours() + ':' + ((dateObj.getUTCMinutes() < 10) ? ("0" + dateObj.getUTCMinutes()) : dateObj.getUTCMinutes())
        return (
            <>
            <div key={data._id}>{data.firstName} {data.lastName} &#8226; {data.guests} guests &#8226; {ReservationDate}</div>
            <div style={{textTransform: 'capitalize'}}>{data.status}</div>
            </>
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
            {data.firstName && 
                <DisplayReservation reservation={data} />
            }
            {!data.firstName && <Title>None</Title>}
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

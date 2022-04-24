import styled from "styled-components"

const ReservationItem = (props) => {
    const {first_name, last_name} = props
    return (
        <Item>
            <div>
                <Table>32</Table>
            </div>
            <div>
                <Title>{first_name} {last_name} - 4 Guests - 16h30</Title>
            </div>
        </Item>
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
    padding: 16px;
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

import styled from "styled-components"

const ReservationItem = (props) => {
    const {id} = props
    return (
        <Item>
            <div>
                <Table>{id}'s</Table>
            </div>
            <div>
                <Title>VACANT - 4</Title>
                <Title>OCCUPIED - 4</Title>
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
    padding: 12px;
    border-radius: 1000px;
    font-size: 20px
`
const Title = styled.h1`
    padding-left: 8px;
    margin-top: 6px;
    color: #d1d5db;
    font-size: 14px;
`

export default ReservationItem

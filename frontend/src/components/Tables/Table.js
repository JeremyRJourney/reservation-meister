import styled from "styled-components"

const ReservationItem = (props) => {
    const {data} = props
    console.log(data)
    return (
        <Item>
            <div>
                <Table>{data[0]}'s</Table>
            </div>
            <div>
                <Title>{data[1]}</Title>
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
    padding: 8px;
    border-radius: 1000px;
    font-size: 16px
`
const Title = styled.h1`
    padding-left: 8px;
    margin-top: 6px;
    color: #d1d5db;
    font-size: 22px;
`

export default ReservationItem

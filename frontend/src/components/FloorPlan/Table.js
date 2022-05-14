import { useState } from "react"
import styled from "styled-components"
import ReservationModal from "../ReservationModal"
import TableDetails from "./TableDetails"


const Table = (props) => {

    const { data } = props

    const [locationX, setLocationX] = useState(null)
    const [locationY, setLocationY] = useState(null)
    const [showTooltip, setShowTooltip] = useState(false)
    const [showReservationList, setShowReservationList] = useState(false)

    setLocationX(data.tableLocationX * document.getElementById("floor-plan").clientWidth)
    setLocationY(data.tableLocationY * document.getElementById("floor-plan").clientHeight)

    const DetermineWidth = (tableType) => {
        switch (tableType) {
            case 2:
                return '100px'
            case 4:
                return '175px'
            case 6:
                return '175px'
            case 8:
                return '225px'
            default:
                return '100px'
        }
    }
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
    const DetermineTableColor = (tableStatus) => {
        switch (tableStatus) {
            case 'vacant':
                return "rgba(107,114,128,0.75)"
            case 'occupied':
                return "rgba(6,182,212,0.75)"
            case 'reset':
                return "rgba(14,159,110,0.75)"
            default:
                return "rgba(107,114,128,0.75)"

        }
    }

    return(
        <>
        <Wrapper
            style={{
                top: locationY, 
                left: locationX,
                width: 'min-content'
            }}
        >
            <TableFigure
                onMouseEnter={() => setShowTooltip(true) }
                onMouseLeave={() => setShowTooltip(false) }
                onClick={ () => { setShowReservationList(data) } }
                style={{ 
                    backgroundColor: DetermineTableColor(data.tableStatus),
                    width: DetermineWidth(data.tableType),
                    height: DetermineHeight(data.tableType),
                    borderRadius: data.tableType === 6  || data.tableType === 8 ? '1000px' : undefined
                }}
            >{data.tableName}</TableFigure>
            {showTooltip && <TableDetails
                key={data.id}
                data={data} 
            />
            }
        </Wrapper>
        {showReservationList && <ReservationModal setShowReservationList={setShowReservationList} data={data} style={{ position: 'fixed', zIndex: 5 }} /> }
        </>
    )
}

const Wrapper = styled.div`
    position: relative
`

const TableFigure = styled.div`
    position: absolute;
    background-color: #6b7280;
    display: flex;
    align-items: center;
    justify-content: center;

    :hover {
        cursor: pointer;
        opacity: 0.75;
        transition-property: opacity ;
        transition-duration: 0.25s;   
    }
`

export default Table
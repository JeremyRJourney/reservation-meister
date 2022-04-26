import { useEffect, useState } from "react"
import styled from "styled-components"


const Table = (props) => {

    const { data } = props

    const [locationX, setLocationX] = useState(null)
    const [locationY, setLocationY] = useState(null)

    useEffect( () => {
        setLocationX(data.tableLocationX * document.getElementById("floor-plan").clientWidth)
        setLocationY(data.tableLocationY * document.getElementById("floor-plan").clientHeight)

        console.log(document.getElementById("floor-plan").clientHeight)
    })

    return(
            <TableFigure
                style={{ 
                    top: locationY, 
                    left: locationX,
                    width: data.tableType === 2 ? '100px' : data.tableType === 4 ? '175px' : data.tableType === 6 ? '175px' : data.tableType === 8 ? '225px' : undefined,
                    height: data.tableType === 2 ? '100px' : data.tableType === 4 ? '100px' : data.tableType === 6 ? '175px' : data.tableType === 8 ? '225px' : undefined,
                    borderRadius: data.tableType === 6  || data.tableType === 8 ? '1000px' : undefined
                }}
            >{data.tableType}</TableFigure>
    )
}

const TableFigure = styled.div`
    position: absolute;
    background-color: #6b7280;
    display: flex;
    align-items: center;
    justify-content: center;
`

export default Table
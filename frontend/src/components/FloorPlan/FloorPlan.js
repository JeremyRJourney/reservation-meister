import styled from "styled-components"
import Table from "./Table"


const FloorPlan = (props) => {
    const { currentTables } = props

    return (
        <div id="floor-plan">
            <Wrapper>
            {currentTables && currentTables.map(item => {
                    return (
                        <Table
                            key={item.id}
                            data={item}
                        />
                    )
            }) }
            </Wrapper>

        </div>
    )
}

const Wrapper = styled.section`
    height: 87vh;
`


export default FloorPlan
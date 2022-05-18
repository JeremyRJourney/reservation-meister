import styled from "styled-components"
import Table from "./Table"


const FloorPlan = (props) => {
    const { currentTables, updateTables, currentNav } = props

    return (
        <div id="floor-plan">
            <Wrapper>
            {currentTables && currentTables.map(item => {
                    return (
                        <Table
                            updateTables={updateTables}
                            currentNav={currentNav}
                            key={item._id}
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
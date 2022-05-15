import styled from "styled-components";
import { useState } from "react";


const Help = () => {

    const [showHelpModal, setShowHelpModal] = useState(false)

    const StatusColors = () => {
        return (
            <ul>
                <ColorItem>
                    <Color style={{ backgroundColor: 'rgba(220,38,38,0.75)' }} />
                    <h1>Late</h1>
                </ColorItem>
                <ColorItem>
                    <Color style={{ backgroundColor: 'rgba(6,182,212,0.75)' }} />
                    <h1>Seated</h1>
                </ColorItem>
                <ColorItem>
                    <Color style={{ backgroundColor: 'rgba(2,132,199,0.75)' }} />
                    <h1>PartiallySeated</h1>
                </ColorItem>
                <ColorItem>
                    <Color style={{ backgroundColor: 'rgba(234,179,8,0.75)' }} />
                    <h1>MainCourse</h1>
                </ColorItem>
                <ColorItem>
                    <Color style={{ backgroundColor: 'rgba(124,58,237,0.75)' }} />
                    <h1>Desert</h1>
                </ColorItem>
                <ColorItem>
                    <Color style={{ backgroundColor: 'rgba(236,72,153,0.75)' }} />
                    <h1>Paid</h1>
                </ColorItem>
                <ColorItem>
                    <Color style={{ backgroundColor: 'rgba(14,159,110,0.75)' }} />
                    <h1>Vacated</h1>
                </ColorItem>
                <ColorItem>
                    <Color style={{ backgroundColor: 'rgba(107,114,128,0.75)' }} />
                    <h1>None</h1>
                </ColorItem>
            </ul>
        )
    }

    const NewReservations = () => {
        return (
            <div style={{ maxWidth: '475px' }}>
                Creating a new reservation, click on the plus icon in the header, and input the necessary fields into the fields provided. Click submit and the reservation will be made.
            </div>
        )
    }

    return (
        <div>
            <h1 onClick={ () => setShowHelpModal(true)}>?</h1>
            {showHelpModal && <div>
                <Container>
                    <Wrapper>
                        <TitleWrapper>
                            <Title>Quick tips</Title>
                            <Close onClick={ () => setShowHelpModal(false) }>✖</Close>
                        </TitleWrapper>

                        <SectionWrapper>
                            <SectionTitle>Color Statuses</SectionTitle>
                            <StatusColors />
                        </SectionWrapper>
                        <SectionWrapper>
                            <SectionTitle>New Reserve</SectionTitle>
                            <NewReservations/>
                        </SectionWrapper>
                    </Wrapper>
                </Container>

                
            </div>}
        </div>
    )
}


const Container = styled.div`
    width: 100%;
    height: 100%;
    z-index: 100;
    position: absolute;
    top: 0;
    left: 0;
`
const Wrapper = styled.div`
    background-color: rgba(30,41,67,1);
    border: 1px solid #F1F1F1;
    box-shadow: 0 10px 15px -3px rgb(255 255 255 / 0.1), 0 4px 6px -4px rgb(255 255 255 / 0.1);
    padding: 24px;
    position: absolute;
    top: 85px;
    left: 395px;
    z-index: 10;
    min-width: 325px;
`
const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #4b5563;
    margin-bottom: 24px;
`

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 8px;
`
const Color = styled.div`
    width: 24px;
    height: 24px;
`
const SectionTitle = styled.h1`
    font-size: 1.25rem;
    font-weight: 400;
    margin-bottom: 8px;
`
const Close = styled.h1`
    margin-right: 16px;
    :hover {
        cursor: pointer
    }
`
const SectionWrapper = styled.section`
    margin: 16px 0;
`
const ColorItem = styled.li`
    list-style-type:none;
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
    font-size: 18px;
`

export default Help

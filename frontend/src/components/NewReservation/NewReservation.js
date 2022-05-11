import styled from "styled-components";


const NewReservation = (props) => {
    const { setShowReservationCreate } = props

    return (
        <Wrapper>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>Create a New Reservation</h1>
                <h1 onClick={ () => setShowReservationCreate(false) }>✖</h1>
            </div>
            <form style={{ marginTop:'16px' }}>
                <div style={{ margin: '16px 0' }}>
                    <p>one</p>
                    <input placeholder='yup'></input>
                </div>
                <div style={{ margin: '16px 0' }}>
                    <p>one</p>
                    <input placeholder='yup'></input>
                </div>
                <div style={{ margin: '16px 0' }}>
                    <p>one</p>
                    <input placeholder='yup'></input>
                </div>
                <div style={{ margin: '16px 0' }}>
                    <p>one</p>
                    <input placeholder='yup'></input>
                </div>

            </form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(30,41,67,1);
    position: absolute;
    z-index: 10;
`


export default NewReservation
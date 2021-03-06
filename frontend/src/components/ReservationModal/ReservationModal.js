import { useState } from "react"
import styled from "styled-components";

import GetAPI from "../../utils/api";

const ReservationModal = (props) => {
    const URL = GetAPI()
    const { setShowReservationList, updateTables, currentNav, data } = props

    const GetTime = () => {
        const dateObj = new Date(data.time)
        return dateObj.getHours() + ':' + ((dateObj.getMinutes() < 10) ? ("0" + dateObj.getMinutes()) : dateObj.getMinutes())
    }


    const [firstName, setFirstName] = useState(data.firstName)
    const [lastName, setLastName] = useState(data.lastName)
    const [tableNumber, setTableNumber] = useState(data.tableName ? data.tableName : "")
    const [time, setTime] = useState(GetTime(data.time))
    const [guests, setGuests] = useState(data.guests)
    const [notes, setNotes] = useState(data.notes ? data.notes : '')
    const [status, setStatus] = useState(data.status)

    const [isFormSubmit, setIsFormSubmit] = useState(false)

    const ValidateForm = () => {
        let isError = false
        if (firstName.length == 0) {
            document.getElementById('fname').style = "border: 2px solid #ef4444; background-color: #ef444433"
            isError = true
        } else {
            document.getElementById('fname').style = "border: none; background-color: none"
        }
        if (lastName.length == 0) {
            document.getElementById('lname').style = "border: 2px solid #ef4444; background-color: #ef444433"
            isError = true
        } else {
            document.getElementById('lname').style = "border: none; background-color: none"
        }
        if (time.length == 0) {
            document.getElementById('time').style = "border: 2px solid #ef4444; background-color: #ef444433"
            isError = true
        } else {
            document.getElementById('time').style = "border: none; background-color: none"
        }
        if (guests.length == 0) {
            document.getElementById('guests').style = "border: 2px solid #ef4444; background-color: #ef444433"
            isError = true
        } else {
            document.getElementById('guests').style = "border: none; background-color: none"
        }
        
        return !isError
    }


    const HandleSubmit = (e) => {
        e.preventDefault()

        if (ValidateForm()) {
            setIsFormSubmit(true)
            fetch(`${URL}reservations/${data._id}`, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",    
                },
                body: JSON.stringify({
                    tableName: tableNumber,
                    firstName: firstName,
                    lastName: lastName,
                    guests: guests,
                    time: time,
                    notes: notes,
                    status: status
                })
            })
            .then(res => {
                if (res.status === 200)
                    return res.json()
            })
            .then((json) => {
                setIsFormSubmit(false)
                setShowReservationList(false)
                updateTables(currentNav)
            })
    
        }
    }


    return (
        <Container>
        <Wrapper>
            <TitleWrapper>
                <Title>Reservation details</Title>
                <Close onClick={ () => setShowReservationList(false) }>???</Close>
            </TitleWrapper>
            <form onSubmit={HandleSubmit}>

                <div style={{ display: 'flex' }}>
                    <div>
                        <InputLabel>* First name</InputLabel>
                        <Input
                            onChange={ (e) => setFirstName(e.target.value)}
                            type="text"
                            value={firstName}
                            name="fname" 
                            id="fname" 
                            placeholder="First name" 
                        />
                    </div>
                    <div style={{ marginLeft: '24px' }}>
                        <InputLabel>* Last name</InputLabel>
                        <Input
                            onChange={ (e) => setLastName(e.target.value)}
                            type="text" 
                            value={lastName}
                            name="lname" 
                            id="lname" 
                            placeholder="Last name" 
                        />
                    </div>
                </div>
                <div style={{ margin: '16px 0' }}>
                    <InputLabel>Table number</InputLabel>
                    <Input
                        onChange={ (e) => setTableNumber(e.target.value)}
                        type="text" 
                        name="tableNumber" 
                        value={tableNumber}
                        id="tableNumber" 
                        placeholder="Table number" 
                    />
                </div>
                <div style={{ margin: '16px 0' }}>
                    <InputLabel>* Guests</InputLabel>
                    <Input
                        onChange={ (e) => setGuests(e.target.value)}
                        type="text" 
                        name="guests" 
                        value={guests}
                        id="guests" 
                        placeholder="Number of guests" 
                    />
                </div>

                <div style={{ margin: '16px 0' }}>
                    <InputLabel>* Time</InputLabel>
                    <Input
                        onChange={ (e) => setTime(e.target.value)}
                        type="text" 
                        name="time"
                        value={time}
                        id="time" 
                        placeholder="Time" 
                    />
                </div>
                <div style={{ margin: '36px 0' }}>
                    <InputLabel>Notes</InputLabel>
                    <InputNotes
                        onChange={ (e) => setNotes(e.target.value)}
                        type="text" 
                        value={notes}
                        name="notes" 
                        id="notes" 
                        placeholder="Any notes about the reservation" 
                    />
                </div>
                <div style={{ borderTop: '2px solid #4b5563', padding: '16px 0', marginBottom: '16px' }}>
                    <InputLabel>Status</InputLabel>
                    <StatusDropdown
                        onChange={ (e) => setStatus(e.target.value)}
                        value={status}
                    >
                        <option value="late">Late</option>
                        <option value="seated">Seated</option>
                        <option value="partiallySeated">Partially seated</option>
                        <option value="mainCourse">Main course</option>
                        <option value="desert">Desert</option>
                        <option value="paid">Paid</option>
                        <option value="vacated">Vacated</option>
                    </StatusDropdown>

                </div>
                { !isFormSubmit && <Button type="submit">Update reservation</Button> }

            </form>
        </Wrapper>
        </Container>
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
const Close = styled.h1`
margin-right: 16px;
:hover {
    cursor: pointer
} 
`

const InputLabel = styled.label`
    display: block;
    font-size: 1rem; 
    line-height: 1.25rem;
    font-weight: 500;
`
const Input = styled.input`
    filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
    display: block;
    padding: 8px;
    border: none;
    border-radius: 4px;
    margin-top: 8px;
    min-width: 225px;
`
const StatusDropdown = styled.select`
    filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
    display: block;
    padding: 8px;
    border: none;
    border-radius: 4px;
    margin-top: 8px;
    min-width: 225px;
`
const InputNotes = styled.textarea`
    filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
    display: block;
    padding: 8px;
    border: none;
    border-radius: 4px;
    margin-top: 8px;
    min-width: 485px;
    min-height: 60px
`
const Button = styled.button`
display: inline-flex;
align-items: center;
padding-left: 0.75rem; /* 12px */
padding-right: 0.75rem; /* 12px */
padding-top: 0.5rem; /* 8px */
padding-bottom: 0.5rem; /* 8px */
border: 1px solid #fff;
font-weight: 500;
border-radius: 0.375rem; /* 6px */
background-color: transparent;
color: #fff;
font-size: 1rem;

:hover {
    background-color: rgba(255,255,255,1);
    color: #000;
    transition-property: background-color, color;
    transition-duration: 0.25s;   
    cursor: pointer;
}
`


export default ReservationModal
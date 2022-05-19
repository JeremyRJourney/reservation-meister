import { useState } from "react"
import styled from "styled-components";

import GetAPI from "../../utils/api";

const NewReservation = (props) => {
    const URL = GetAPI()

    const { setShowReservationCreate, updateTables, currentNav } = props
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [tableNumber, setTableNumber] = useState("")
    const [time, setTime] = useState("")
    const [guests, setGuests] = useState("")
    const [notes, setNotes] = useState("")

    const [isFormError, setIsFormError] = useState(false)

    const [canSubmit, setCanSubmit] = useState(false)
    const [availableTables, setAvailableTables] = useState([])

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
            setIsFormError(false)

            fetch(`${URL}reservation/create`, {
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
                    notes: notes
                })
            })
            .then(res => {
                if (res.status === 201)
                    return res.json()
            })
            .then((json) => {
                setShowReservationCreate(false)
                updateTables(currentNav)
            })
                
        } else {
            setIsFormError(true)
        }

    }

    const FindTables = (e) => {
        if (guests) {
            setIsFormError(false)
            fetch(`${URL}reservations/available`, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",    
                },
                body: JSON.stringify({
                    guests: guests,
                })
            })
            .then(res => {
                if (res.status === 200)
                    return res.json()
            })
            .then((json) => {
                setCanSubmit(true)
                setAvailableTables(json.data)
                setTableNumber(json.data[0].tableName)
            })
    
        } else {
            setIsFormError(true)
        }

    }


    return (
        <Container>
        <Wrapper>
            <TitleWrapper>
                <Title>Create a New Reservation</Title>
                <Close onClick={ () => setShowReservationCreate(false) }>✖</Close>
            </TitleWrapper>
            <form onSubmit={HandleSubmit}>

                <div style={{ display: 'flex' }}>
                    <div>
                        <InputLabel>* First name</InputLabel>
                        <Input
                            onChange={ (e) => setFirstName(e.target.value)}
                            type="text"
                            id="fname"
                            value={firstName}
                            name="fname" 
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
                    <InputLabel>* Guests</InputLabel>
                    <Input
                        onChange={ (e) => setGuests(e.target.value)}
                        type="text" 
                        name="guests"
                        value={guests}
                        id="guests" 
                        placeholder="guests" 
                    />
                    <div></div>
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
                {canSubmit && <div style={{ margin: '16px 0' }}>
                    <InputLabel>* Table number</InputLabel>
                    <StatusDropdown
                        onChange={ (e) => setTableNumber(e.target.value)}
                        value={tableNumber}
                    >
                        {availableTables && availableTables.map(item => {
                            return (
                                <option key={item._id} value={item.tableName}>{item.tableName}</option>
                            )
                        }) }
                    </StatusDropdown>
                </div>
                }
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
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button type="button" onClick={ () => FindTables() }>Check table</Button>
                    {canSubmit && <Button type="submit">Create reservation</Button>}
                </div>
                {isFormError && <FormError>Required fields missing</FormError>}

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
const StatusDropdown = styled.select`
    filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
    display: block;
    padding: 8px;
    border: none;
    border-radius: 4px;
    margin-top: 8px;
    min-width: 225px;
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
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border: 1px solid #fff;
    font-weight: 500;
    border-radius: 0.375rem;
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
    :disabled {
        background-color: rgba(200,200,200,0.4);
        color: rgba(200,200,200,0.4);
        border: 1px solid rgba(200,200,200,0.4);

    }
`
const FormError = styled.div`
    margin-top: 8px;
    color: #ef4444
`


export default NewReservation
import { useState } from 'react'
import './App.css'
import UserService from './services/User'
import md5 from 'md5'

const UserAdd = ({setLisäystila, setIsPositive, setShowMessage, setMessage}) => {

    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newAccesslevelId, setNewAccesslevelId] = useState(2)
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    var virheIlmo = document.getElementById("virhe")

    const handleSubmit = event => {
        event.preventDefault()
        if (newPassword !== confirmPassword) {
            setMessage("Salasana ei täsmää!")
            setIsPositive(false)
            setShowMessage(true)
            setTimeout(() => {
                setShowMessage(false)
            },5000)
            return;
        }
        var newUser = {
            firstName: newFirstName,
            lastName: newLastName,
            email: newEmail,
            accesslevelId: parseInt(newAccesslevelId),
            username: newUsername,
            password: md5(newPassword)
        }

        UserService.create(newUser)
        .then(response => {
            if (response.status === 200) {
                setMessage('Hienosti onnistui lisäys: ' + newUser.firstName + " " + newUser.lastName)
                setIsPositive(true)
                setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                },5000)

                setLisäystila(false)
            }
        })
        .catch(error => {
            setMessage('Jotain meni nyt vikaan! Damn! ' + error)
            setIsPositive(false)
            setShowMessage(true)
            setTimeout(() => {
                setShowMessage(false)
            },7000)
        })
    }
    const handleConfirmPasswordChange = event => {
        const confirmPasswordValue = event.target.value;
        setConfirmPassword(confirmPasswordValue);
        if (newPassword !== confirmPasswordValue) {
            virheIlmo.style.color = 'red'; 
            virheIlmo.textContent = 'Salasana ei täsmää!';
        }
        else {
            virheIlmo.style.color = 'green';
            virheIlmo.textContent = 'Kaikki ok!';
        }
        };


  return (
    <div className='formDiv'>
        <h2>User add</h2>
        <form onSubmit={handleSubmit} className='formi'>
            <div className='formtiedot'>
                <label>Etunimi</label>
                <input type="text" value={newFirstName} 
                onChange={({target}) => setNewFirstName(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Sukunimi</label>
                <input type="text"  value={newLastName} 
                onChange={({target}) => setNewLastName(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Email</label>
                <input type="email" value={newEmail} 
                onChange={({target}) => setNewEmail(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Hallintaoikeudet</label>
                <input type="number" value={newAccesslevelId} 
                onChange={({target}) => setNewAccesslevelId(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Käyttäjätunnus</label>
                <input type="text" value={newUsername} 
                onChange={({target}) => setNewUsername(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Salasana</label>
                <input type="password" minLength="5" value={newPassword} 
                onChange={({target}) => setNewPassword(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Vahvista salasana</label>
                <input type="password" minLength="5" value={confirmPassword} 
                onChange={handleConfirmPasswordChange} />
                <p id="virhe"></p>
            </div>
            <br/>
            <div className='formButtonit'>
                <input id="lähetä" className='btnn vihreäBtn' type="submit" />
                <input type="button" value="Takaisin" className='btnn punainenBtn' onClick={() => setLisäystila(false)}></input>
            </div>
        </form>
    <br></br>
    </div>
  )
}
export default UserAdd
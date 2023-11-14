import { useState } from 'react'
import './App.css'
import CustomerService from './services/User'
import md5 from 'md5'


const UserEdit = ({setMuokkaustila, muokattavaUser, setIsPositive, setShowMessage, setMessage}) => {

    const [newUserId, setUserId] = useState(muokattavaUser.userId); 
    const [newFirstName, setNewFirstName] = useState(muokattavaUser.firstName)
    const [newLastName, setNewLastName] = useState(muokattavaUser.lastName)
    const [newEmail, setNewEmail] = useState(muokattavaUser.email)
    const [newUsername, setNewUsername] = useState(muokattavaUser.username)
    const [newPassword, setNewPassword] = useState(muokattavaUser.password)
    const [newAccesslevelId, setAccesslevelId] = useState(muokattavaUser.accesslevelId)


    const handleSubmit = event => {
        event.preventDefault()
        
        var UserUp = {
            userId: newUserId,
            firstName: newFirstName,
            lastName: newLastName,
            email: newEmail,
            username: newUsername,
            password: md5(newPassword),
            accesslevelId: newAccesslevelId
        }
        
        CustomerService.update(UserUp)
        .then(response => {
            if (response.status === 200) {
                setMessage('Hienosti onnistui muokkaus: ' + UserUp.firstName)
                setIsPositive(true)
                setShowMessage(true)
                setTimeout(() => {
                    setShowMessage(false)
                },5000)
                window.scrollBy(0, -10000)
                setMuokkaustila(false)
            }
        })
        .catch(error => {
            setMessage('Jotain meni nyt vikaan! Damn! ' + error)
            setIsPositive(false)
            setShowMessage(true)
            setTimeout(() => {
                setShowMessage(false)
            },7000)
            window.scrollBy(0, -10000)
        })
    }


  return (
    <div className='formDiv'>
        <h2>User Edit</h2>
        <form onSubmit={handleSubmit} className='formi'>

            <div className='formtiedot'>
                <label>First name</label>
                <input type="text" value={newFirstName} 
                onChange={({target}) => setNewFirstName(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Last name</label>
                <input type="text" value={newLastName} 
                onChange={({target}) => setNewLastName(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Email</label>
                <input type="text" value={newEmail} 
                onChange={({target}) => setNewEmail(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Username</label>
                <input type="text" value={newUsername} 
                onChange={({target}) => setNewUsername(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Password</label>
                <input type="password" minLength="5" value={newPassword} 
                onChange={({target}) => setNewPassword(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Accesslevel Id</label>
                <input type="text" value={newAccesslevelId} 
                onChange={({target}) => setAccesslevelId(target.value)} />
            </div>
            <br/>
            <div className='formButtonit'>
                <input id="lähetä" className='btnn vihreäBtn' type="submit" />
                <input type="button" value="Takaisin" className='btnn punainenBtn' onClick={() => setMuokkaustila(false)}></input>
            </div>
        </form>
    <br></br>
    </div>
  )
}
export default UserEdit

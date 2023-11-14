import { useState } from 'react'
import './App.css'
import UserService from './services/User'

const User = ({user, editUser, setIsPositive, setShowMessage, setMessage, reload, reloadNow}) => {
    

const [showDetails, setShowDetails] = useState(false)

const deleteUser = (user) => {

    if(window.confirm(`Remove User ${user.firstName}?`) === true){
    
    UserService.remove(user.userId)
    .then(res => {
        if(res.status === 200) {
            setMessage(`Successfully removed user ${user.firstName}`)
            setIsPositive(true)
            setShowMessage(true)
            window.scrollBy(0, -10000)
            setTimeout(() => {
                setShowMessage(false)
            },5000)
            
        }reloadNow(!reload)
    })
    .catch(error => {
        setMessage('Jotain meni nyt vikaan! Damn! ' + error)
        setIsPositive(false)
        setShowMessage(true)
        window.scrollBy(0, -10000)
        setTimeout(() => {
            setShowMessage(false)
        },7000)
    })
    }
    else {
        setMessage(`Ei poistettukaan ${user.firstName} tyyppää`)
        setIsPositive(true)
        setShowMessage(true)
        window.scrollBy(0, -10000)
        setTimeout(() => {
            setShowMessage(false)
        },5000)
        
    }
    }



  return (
    <div className='custDiv'>
        <p onClick={() => setShowDetails(!showDetails)}>
            {user.firstName} 
        </p>
        {showDetails && <div className='details'>
       
            <table>
                <thead>
                    <tr>
                        <th>Etunimi</th>
                        <th>Sukunimi</th>
                        <th>Email</th>
                        <th>Käyttäjätunnus</th>
                        <th>KäyttäjälupaId</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.username}</td>
                        <td>{user.accesslevelId}</td>
                    </tr>
                </tbody>
            </table>
                        
            <button className='btnn punainenBtn' onClick={() => deleteUser(user)}>Delete</button>
        <button className='btnn sininenBtn' onClick={() => editUser(user)}>Edit</button>
            </div>
        }
    </div> 
  )
}

export default User

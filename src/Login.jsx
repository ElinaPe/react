import { useState } from 'react'
import React from 'react'
import './App.css'
import LoginService from './services/Auth'
import md5 from 'md5'

const Login = ({setIsPositive, setShowMessage, setMessage, setLoggedUser, setAdminUser}) => {

    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')


    const handleSubmit = event => {
        event.preventDefault()
        var userForAuth = {
            username: newUsername,
            password: md5(newPassword)
        }

        LoginService.authenticate(userForAuth)
        .then(response => {
            if (response.status === 200) {
                localStorage.setItem("username", response.data.username)
                localStorage.setItem("accesslevelId", response.data.accesslevelId)
                localStorage.setItem("token", response.data.token)

                setLoggedUser(response.data.username)
                setAdminUser(response.data.accesslevelId)
                
                // setAdminUser(response.data.accesslevelId)
                setMessage('Tervetuloa ' + userForAuth.username + "!")
                
                setIsPositive(true)
                setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                },5000)
            }
        })
        .catch(error => {
            setMessage('Virheellinen käyttäjätunnus tai salasana.')
            setIsPositive(false)
            setShowMessage(true)
            setTimeout(() => {
                setShowMessage(false)
            },7000)
        })
    }
    const emptyFields = () => {
        setNewUsername("")
        setNewPassword("")
    }


  return (
    <div className='formDiv'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className='formi'>
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

            <input id="lähetä" value='Login' className='btnn vihreäBtn' type="submit" />
            <input type="button" value="Clear" className='btnn punainenBtn' onClick={() => emptyFields()}></input>
        </form>
    <br></br>
    </div>
  )
}
export default Login
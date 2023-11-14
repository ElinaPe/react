import { useState, useEffect } from 'react'
import './App.css'
import UserService from './services/User'
import User from './User'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'

const UserList = ({setIsPositive, setShowMessage, setMessage}) => {

const [users, setUsers] = useState([])
const [lisäysTila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaUser, setMuokattavaUser] = useState(false)
const [search, setSearch] = useState("")


useEffect(() => {
    const token = localStorage.getItem('token')
        UserService.setToken(token)
        
    UserService.getAll()
    .then(data => {
        setUsers(data)
    })
}, [lisäysTila, reload, muokkaustila] // Jos statet muuttuu, niin use effect ladataan uusiks
)

const handleSearchInputChange = (event) => {
    setSearch(event.target.value.toLowerCase())
}

const EditUser = (user) => {
    setMuokattavaUser(user)
    setMuokkaustila(true)
}


  return (
    <div className='UsersDiv'>
        <h2>Users</h2>

        {lisäysTila && <UserAdd 
        setLisäystila={setLisäystila}
        setIsPositive={setIsPositive} 
        setMessage={setMessage}
        setShowMessage={setShowMessage} />}

        {!lisäysTila && !muokkaustila && <button className='btnn showUsersBtn vihreäBtn' onClick={() => setLisäystila(true)}>Add new</button>}
        
        {!lisäysTila && !muokkaustila &&
            <input className="haku" placeholder='Etsi sukunimellä' value={search} onChange={handleSearchInputChange}/>}
        
        {muokkaustila && <UserEdit 
        setMuokkaustila={setMuokkaustila}
        muokattavaUser={muokattavaUser} 
        setIsPositive={setIsPositive} 
        setMessage={setMessage} 
        setShowMessage={setShowMessage} />}

        {
        users && !lisäysTila && !muokkaustila && users.map(u => {
            const lowerCaseName = u.firstName.toLowerCase()
            if(lowerCaseName.indexOf(search) > -1){
                return (
            <User key={u.userId} user={u} reloadNow={reloadNow} reload = {reload}
            setIsPositive ={setIsPositive} setShowMessage= {setShowMessage} setMessage = {setMessage}
            editUser={EditUser} />
            )}
        })
        }
    </div>
        )
}

export default UserList
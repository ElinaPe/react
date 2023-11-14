import { useState, useEffect } from 'react'
import './App.css'
import CustomerService from './services/Customer'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'
import CustomerEdit from './CustomerEdit'

const CustomerList = ({setIsPositive, setShowMessage, setMessage}) => {

const [customers, setCustomers] = useState([])
const [showCustomers, setShowCustomers] = useState(false)
const [lisäysTila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaCustomer, setMuokattavaCustomer] = useState(false)
const [search, setSearch] = useState("")

useEffect(() => {
    const token = localStorage.getItem('token')
        CustomerService.setToken(token)

    CustomerService.getAll()
    .then(data => {
        setCustomers(data)
    })
}, [lisäysTila, reload, muokkaustila]
)

const handleSearchInputChange = (event) => {
    setShowCustomers(true)
    setSearch(event.target.value.toLowerCase())
}

const editCustomer = (customer) => {
    setMuokattavaCustomer(customer)
    setMuokkaustila(true)
}

  return (
    <div className='Customers UsersDiv'>
        <h2><nobr onClick={() => setShowCustomers(!showCustomers)}>Customers</nobr>

        {!lisäysTila && !muokkaustila && <button className='btnn showCustomersBtn vihreäBtn' onClick={() => setLisäystila(true)}>Add new</button>}</h2>
        
        {!lisäysTila && !muokkaustila &&
            <input className='haku' placeholder='Etsi yrityksen nimellä' value={search} onChange={handleSearchInputChange}/>}


        {lisäysTila && <CustomerAdd setLisäystila={setLisäystila}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}
        
        {muokkaustila && <CustomerEdit 
        setMuokkaustila={setMuokkaustila}
        muokattavaCustomer={muokattavaCustomer} 
        setIsPositive={setIsPositive} 
        setMessage={setMessage} 
        setShowMessage={setShowMessage} />}
        
        
        {
            showCustomers && customers && !lisäysTila && !muokkaustila && customers.map(c => {
                const lowerCaseName = c.companyName.toLowerCase()
                if(lowerCaseName.indexOf(search) > -1){
                    return (
                <Customer key={c.customerId} customer={c} reloadNow={reloadNow} reload = {reload}
                setIsPositive ={setIsPositive} setShowMessage= {setShowMessage} setMessage = {setMessage}
                editCustomer={editCustomer} />
                )}
            })
        }

        {showCustomers && customers && !lisäysTila && !muokkaustila && <button className='btnn punainenBtn' onClick={() => setShowCustomers(!showCustomers)}>Piilota Customerit!</button>}
    </div>
  )
}
export default CustomerList

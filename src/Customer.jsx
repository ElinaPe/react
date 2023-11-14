import { useState } from 'react'
import './App.css'
import CustomerService from './services/Customer'

const Customer = ({customer, editCustomer, setIsPositive, setShowMessage, setMessage, reload, reloadNow}) => {

const [showDetails, setShowDetails] = useState(false)


const deleteCustomer = (customer) => {

    if(window.confirm(`Remove Customer ${customer.companyName}?`) === true){
    
    CustomerService.remove(customer.customerId)
    .then(res => {
        if(res.status === 200) {
            setMessage(`Successfully removed customer ${customer.companyName}`)
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
        setMessage(`Ei poistettukaan ${customer.companyName} tyyppää`)
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
            {customer.companyName} 
        </p>
        {/* <p onClick={() => setShowDetails(!showDetails)}>{customer.companyName}</p> */}
        {showDetails && <div className='details'>
       
            <table>
                <thead>
                    <tr>
                        <th>Contact person</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{customer.contactName}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.address}</td>
                        <td>{customer.city}</td>
                        <td>{customer.country}</td>
                    </tr>
                </tbody>
            </table>
            <button className='btnn punainenBtn' onClick={() => deleteCustomer(customer)}>Delete</button>
        <button className='btnn sininenBtn' onClick={() => editCustomer(customer)}>Edit</button>
            </div>
        }
    </div> 
  )
}

export default Customer

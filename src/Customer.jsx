import { useState } from 'react'
import './App.css'

const Customer = ({customer, editCustomer, deleteCustomer, setIsPositive, setShowMessage, setMessage, reload, reloadNow}) => {

const [showDetails, setShowDetails] = useState(false)

   

  return (
    <div className='custDiv' data-testid="customer-details">
     
        <p onClick={() => setShowDetails(!showDetails)}>{customer.companyName}</p>
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

import { useState } from 'react'
import './App.css'
import CustomerService from './services/Customer'


const CustomerEdit = ({setMuokkaustila, muokattavaCustomer, setIsPositive, setShowMessage, setMessage}) => {

    
    const [newCustomerId, setNewCustomerId] = useState(muokattavaCustomer.customerId)
    const [newCompanyName, setNewCompanyName] = useState(muokattavaCustomer.companyName)
    const [newContactName, setNewContactName] = useState(muokattavaCustomer.contactName)
    const [newContactTitle, setNewContactTitle] = useState(muokattavaCustomer.contactTitle)
    const [newAddress, setNewAddress] = useState(muokattavaCustomer.address)
    const [newCity, setNewCity] = useState(muokattavaCustomer.city)
    const [newPostalCode, setNewPostalCode] = useState(muokattavaCustomer.postalCode)
    const [newPhone, setNewPhone] = useState(muokattavaCustomer.phone)
    const [newFax, setNewFax] = useState(muokattavaCustomer.fax)


    const handleSubmit = event => {
        event.preventDefault()
        var upCustomer = {
            customerId: newCustomerId,
            companyName: newCompanyName,
            contactName: newContactName,
            contactTitle: newContactTitle,
            // country: newCountry,
            address: newAddress,
            city: newCity,
            postalCode: newPostalCode,
            phone: newPhone,
            fax: newFax
        }
        CustomerService.update(upCustomer)
        .then(response => {
            if (response.status === 200) {
                setMessage('Hienosti onnistui muokkaus: ' + upCustomer.companyName)
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
        <h2>Customer Edit</h2>
        <form onSubmit={handleSubmit} className='formi'>
            <div className='formtiedot'>
                <label>Customer ID</label>
                <input type="text" value={newCustomerId} disabled />
            </div>
            <div className='formtiedot'>
                <label>Company Name</label>
                <input type="text"  value={newCompanyName} 
                onChange={({target}) => setNewCompanyName(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Contact Name</label>
                <input type="text" value={newContactName} 
                onChange={({target}) => setNewContactName(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Contact Title</label>
                <input type="text" value={newContactTitle} 
                onChange={({target}) => setNewContactTitle(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Address</label>
                <input type="text" value={newAddress} 
                onChange={({target}) => setNewAddress(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>City</label>
                <input type="text" value={newCity} 
                onChange={({target}) => setNewCity(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Postal Code</label>
                <input type="text" value={newPostalCode} 
                onChange={({target}) => setNewPostalCode(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Phone</label>
                <input type="text" value={newPhone} 
                onChange={({target}) => setNewPhone(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Fax</label>
                <input type="text"  value={newFax} 
                onChange={({target}) => setNewFax(target.value)} />
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
export default CustomerEdit

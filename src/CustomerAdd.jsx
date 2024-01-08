import { useState } from 'react'
import './App.css'
import CustomerService from './services/Customer'


const CustomerAdd = ({setLisäystila, setIsPositive, setShowMessage, setMessage}) => {


    const [newCustomerId, setNewCustomerId] = useState('')
    const [newCompanyName, setNewCompanyName] = useState('')
    const [newContactName, setNewContactName] = useState('')
    const [newContactTitle, setNewContactTitle] = useState('')
    const [newAddress, setNewAddress] = useState('')
    const [newCity, setNewCity] = useState('')
    const [newRegion, setNewRegion] = useState('')
    const [newPostalCode, setNewPostalCode] = useState('')
    const [newCountry, setNewCountry] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newFax, setNewFax] = useState('')


    const handleSubmit = event => {
        event.preventDefault()
        var newCustomer = {
            customerId: newCustomerId.toUpperCase(),
            companyName: newCompanyName,
            contactName: newContactName,
            contactTitle: newContactTitle,
            country: newCountry,
            address: newAddress,
            city: newCity,
            postalCode: newPostalCode,
            phone: newPhone,
            fax: newFax
        }

        const token = localStorage.getItem('token')
            CustomerService.setToken(token)

        CustomerService.create(newCustomer)
        .then(response => {
            if (response.status === 200) {
                setMessage('Hienosti onnistui lisäys: ' + newCustomer.companyName)
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


  return (
    <div className='formDiv'>
        <h2>Customer add</h2>
        <form onSubmit={handleSubmit} className='formi'>
            <div className='formtiedot'>
                <label>Customer ID</label>
                <input data-testid="id" type="text" minLength="5" maxLength="5" value={newCustomerId} onChange={({target}) => setNewCustomerId(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Company Name</label>
                <input data-testid="companyname" type="text"  value={newCompanyName} onChange={({target}) => setNewCompanyName(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Contact Name</label>
                <input data-testid="contactname" type="text" value={newContactName} onChange={({target}) => setNewContactName(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Contact Title</label>
                <input data-testid="contactTitle" type="text" value={newContactTitle} onChange={({target}) => setNewContactTitle(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Address</label>
                <input data-testid="address" type="text" value={newAddress} onChange={({target}) => setNewAddress(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>City</label>
                <input data-testid="city" type="text" value={newCity} onChange={({target}) => setNewCity(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Region</label>
                <input data-testid="region" type="text" value={newRegion} onChange={({target}) => setNewRegion(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Postal Code</label>
                <input data-testid="postcode" type="text" value={newPostalCode} onChange={({target}) => setNewPostalCode(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Country</label>
                <input data-testid="country" type="text" value={newCountry} onChange={({target}) => setNewCountry(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Phone</label>
                <input data-testid="phone" type="text" value={newPhone} onChange={({target}) => setNewPhone(target.value)} />
            </div>
            <div className='formtiedot'>
                <label>Fax</label>
                <input data-testid="fax" type="text"  value={newFax} onChange={({target}) => setNewFax(target.value)} />
            </div>
           
            <br/>
            <div className='formButtonit'>
                <input data-testid="lähetä" id="lähetä" className='btnn vihreäBtn' type="submit" />
                <input type="button" value="Takaisin" className='btnn punainenBtn' onClick={() => setLisäystila(false)}></input>
            </div>
        </form>
    <br></br>
    </div>
  )
}
export default CustomerAdd

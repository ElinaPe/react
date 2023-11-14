import { useState, useEffect } from 'react'
import './App.css'
import ProductService from './services/Product'
import ProductAdd from './ProductAdd'
import Product from './Product'
import ProductEdit from './ProductEdit'

const ProductList = ({setIsPositive, setShowMessage, setMessage}) => {

const [products, setProducts] = useState([])
const [lisäysTila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaProduct, setMuokattavaProduct] = useState(false)
const [search, setSearch] = useState("")

useEffect(() => {
    ProductService.getAll()
    .then(data => {
        setProducts(data)
    })
}, [lisäysTila, reload, muokkaustila]
)

const handleSearchInputChange = (event) => {
    setSearch(event.target.value.toLowerCase())
}

const editProduct = (product) => {
    setMuokattavaProduct(product)
    setMuokkaustila(true)
}

  return (
    <div className='UsersDiv'>
        <h2>Products</h2>
        {!lisäysTila && !muokkaustila && products && <button className='btnn showCustomersBtn vihreäBtn' onClick={() => setLisäystila(true)}>Add new</button>}
        {!lisäysTila && !muokkaustila &&
            <input className='haku' placeholder='Etsi tuotteen nimellä' value={search} onChange={handleSearchInputChange}/>}
        
        {lisäysTila && <ProductAdd 
        setLisäystila={setLisäystila}
        setIsPositive={setIsPositive} 
        setMessage={setMessage}
        setShowMessage={setShowMessage} />}
        
        {muokkaustila && <ProductEdit 
        setMuokkaustila={setMuokkaustila}
        muokattavaProduct={muokattavaProduct} 
        setIsPositive={setIsPositive} 
        setMessage={setMessage} 
        setShowMessage={setShowMessage} />}


        {products && !lisäysTila && !muokkaustila && products.map(p => {
            const lowerCaseName = p.productName.toLowerCase()
            if(lowerCaseName.indexOf(search) > -1){
                return (
            <Product key={p.productId} product={p} reloadNow={reloadNow} reload = {reload}
            setIsPositive ={setIsPositive} setShowMessage= {setShowMessage} setMessage = {setMessage}
            editProduct={editProduct} />
            )}
        })
        }
    </div>
        )
}

export default ProductList
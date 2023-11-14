import { useState, useEffect } from 'react'
import './App.css'

const Posts = () => {

const [posts, setPosts] = useState([])
const [showPost, setShowPost] = useState(false)

useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then(res => res.json()) //muutetaan json javascriptiks
  .then(oliot => setPosts(oliot))
}, []
)
  return (
    <>
        <h2 onClick={() => setShowPost(!showPost)} style={{cursor:'pointer'}}>Posts from typicode</h2>

        {
          posts && showPost && posts.map(p =>
            <div className='posts' key={p.id}>
            <h3>{p.id + ": " + p.title}</h3>
            <hr></hr>
            <p>{p.body}</p>
            </div>
            )
        }
         
    </>
  )
}

export default Posts

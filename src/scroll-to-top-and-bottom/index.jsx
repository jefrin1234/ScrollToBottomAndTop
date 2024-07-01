import React, { useEffect, useRef, useState } from 'react'
import './index.css'
function ScrollToTopAndBottom() {
     
  const [data,setData] = useState('')
  const [loading,setLoading] = useState(true)
  const [error,setError] =useState('')
  useEffect( ()=>{

    fetch('https://dummyjson.com/products?limit=100' )
    .then( (response)=>response.json() )
    .then( (data)=> {console.log(data); 
      setData(data) 
      setLoading(false)
    })
    .catch( (error)=>{
      console.log('Error',error);
      setError(error)
    } )
  },[] )

  function handleScrollToTop(){
    window.scrollTo({
      top:0,
      left:0,
      behavior:'smooth'
    })
  }

  const bottomReference = useRef(null)

  function handleTopToBottom(){
    bottomReference.current.scrollIntoView({behavior:'smooth'})
  }

  if(loading){
   return <div style={{fontSize:'30px',fontWeight:'900'}}>Loading data</div>
  }
  if(error){
  return  <div>Error loading data</div>
  }


  return (
    <div>
      <h1>Scroll to top and bottom feature</h1>
      <h3>This is the top section</h3>
      <button onClick={handleTopToBottom}>Scroll to Bottom</button>
      <ul>

        {
           data && data.products && data.products.length ? 
           data.products.map( (item) => 
            <li style={{listStyleType:'none'}}>
               {item.title}
           </li>
           )
           : null
        }

      </ul>
      <button onClick={handleScrollToTop}>Scroll to Top</button>
      <h3>This is the bottom of the page</h3>
      <div ref={bottomReference}></div>
    </div>
  )
}

export default ScrollToTopAndBottom

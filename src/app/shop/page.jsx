import React from 'react'
import Cards from '../component/cards'

const index = () => {
  return (
    
 <div style={{gridTemplateColumns:"repeat(auto-fit, minmax(400px,1fr))",display:"grid",rowGap:"12px",padding:"0px px 0px 12px",minHeight:"250px!important" }}>
      <Cards/>
      <Cards/>
      <Cards/>
      <Cards/>
      <Cards/>
     </div>    
  )
}

export default index
import React from 'react'
// import './brandsEffect.css'
// import "./contact.css"
export default function Contactus() {
  return (
    <div>
        <h6>Contact Us</h6>
        <label>
        <input type="tel" value="w232" aria-placeholder="Your Telephone"  data-reqmsg="This field cannot be blank." aria-required="true" data-invmsg="Last is invalid" pattern="((\+\d{1,3}(-|.| )?\(?\d\)?(-| |.)?\d{1,5})|(\(?\d{2,6}\)?))(-|.| )?(\d{3,4})(-|.| )?(\d{4})(( x| ext)\d{1,5}){0,1}$" aria-invalid="true" aria-describedby=" frm_error_field_2"/>
        </label>
    </div>
  )
}

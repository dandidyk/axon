import React from 'react'

 const form = (props) => {
    return (
         <form onSubmit={props.handleSubmit} >
             <input onKeyUp={props.handleChange} className='input' name='first_name' type='text' placeholder='First name' required />
             <input onKeyUp={props.handleChange} className='input' name='last_name' type='text' placeholder='Last name' required />
             <input onKeyUp={props.handleChange} className='input' name='location' type='text' placeholder='City' required />
             <input onKeyUp={props.handleChange} className='input' name='dob' type='date' placeholder='Date of birth (DD/MM/YYYY)' required />
             <button disabled={props.disable} className="submit" > Submit </button>
         </form>
     )
}

export default form


import React from 'react'

const summary = function (props) {
    console.log(props)
    return (
        <div className='summary' >
            <div className="text">
                Count of users from Kiev or kiev: <span> {props.fromKiev} </span> 
            </div>
            
            <div className="text">
                Sum of ages of three oldest users from table: <span> {props.year} </span>
            </div>
            
            <div className="text">
                Longest sting of first and last name <span> {props.longestName}</span>
            </div>
        </div>
    )
}

export default summary
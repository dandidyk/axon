import React from 'react';

const table = function(props) {

  let table; 

  if (props.data) {
    table = props.data.map( row => {
      return (<tr key={row.id}>
                <td> {row.first_name} </td>
                <td> {row.last_name} </td>
                <td> {row.dob} </td>
                <td> {row.location} </td>
                <td> <button className="delete" onClick={() => props.handleDelete(row.id)}> Delete </button> </td>
              </tr>
      )
    })
  }



  return (
    <table className="table">
      <tbody >
        <tr>
          <th>First name</th>
          <th>Last Name</th>
          <th>Date of birth</th>
          <th>Location</th>
        </tr>
        {table ? table : null}
      </tbody>
    </table>
  );
};

export default table;

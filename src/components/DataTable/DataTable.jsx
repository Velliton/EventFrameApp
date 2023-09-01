import React from 'react'
import './DataTable.css';

function DataTable({TableData}) {

  if(!TableData||Object.keys(TableData).length===0){
    return <p className='message'>Нет данных</p>
  }
  const headers=Object.keys(TableData[0]);

  return (
    <div className='table__container'>
       <table className="table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, cellIndex) => (
                <td key={cellIndex}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> 
    </div>
  )
}

export default DataTable
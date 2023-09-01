import React from 'react'
import './FrameForm.css';

function FrameForm({
  FrameName, 
  selectedFrameValue, 
  HandleOptionChange, 
  buttonSubmitHandler, 
  endDateInputHandler, 
  startDateInputHandler, 
  ProduceDateBegin, 
  ProduceDateEnd}) {

  return (
    <div className='form-container'>
      <form>
        <label>Номер партии:</label>
        <select value={selectedFrameValue} onChange={HandleOptionChange} className="textbox">
          <option value=''>Выберите партию</option>
          {
            FrameName.map((option)=>(
              <option key={option.Id} value={option.Id} >
                {option.ValueText}
              </option>
            )
            )
          }
        </select>      
        <label>Начало изготовления:</label>
        <input type="date" value={ProduceDateBegin} onChange={startDateInputHandler} className="textbox"/>
        <label>Конец изготовления:</label>
        <input type="date" onChange={endDateInputHandler} value={ProduceDateEnd} className="textbox"/>
        <button onClick={buttonSubmitHandler} className="button">Сформировать</button>
      </form>
  </div>
  )
}

export default FrameForm
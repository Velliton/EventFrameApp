import FrameForm from './components/FrameForm/FrameForm';
import './App.css';
import React from 'react';
import DataTable from './components/DataTable/DataTable';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';

function App() {
  
  const [loading, setLoading] = React.useState(true);
  const[okButton,setButton]=React.useState(false);
  const [FrameName, setFrameName]=React.useState([]);
  const [TableData,setTableData]=React.useState([]);
  const[selectedFrameValue, setSelectedFrameValue]=React.useState('');
  const [ProduceDateBegin, setProduceDateBegin]=React.useState(new Date().toISOString().slice(0, 10));
  const [ProduceDateEnd, setProduceDateEnd]=React.useState(new Date().toISOString().slice(0, 10));
  const [lotParam1,setLotParam1] = React.useState(selectedFrameValue);
  const [startDateParam,setStartDateParam] = React.useState(ProduceDateBegin);
  const [endDateParam,setEndDateParam] = React.useState(ProduceDateEnd);

  function buttonSubmitHandler(event){
    event.preventDefault();
    setLotParam1(selectedFrameValue);
    setStartDateParam(ProduceDateBegin);
    setEndDateParam(ProduceDateEnd);
    setButton(!okButton);
  }

/* обработчик для изменения выбранного выпадающего списка */
  const HandleOptionChange=(event)=>{
    setSelectedFrameValue(event.target.value);
  }
  

/* обработчик для инпута */
  function startDateInputHandler(event) {
    setProduceDateBegin(event.target.value);
  }
  /* обработчик для инпута */
  function endDateInputHandler(event) {
    setProduceDateEnd(event.target.value);
  }



/* запрос для получения партий для селекта */
  React.useEffect(()=>{
    const apiFrameUrl = '/frames';
    axios.get(apiFrameUrl).then((resp) => {
      const FramesData = resp.data;
      setFrameName(FramesData);
    });
    
  }, [setFrameName]);

/* запрос для того чтобы отдать id на сервер отслеживается изменение состояния кнопки */


React.useEffect(()=>{
  const ParamsApi= '/paramsApi';
  axios.post(ParamsApi,{lotParam1,startDateParam,endDateParam})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  }); 
  
}, [okButton]);

/* запрос для того чтобы получить результирующие данные с сервера */

  React.useEffect(()=>{
    setLoading(true);
    const apiTableUrl = '/api';
    axios.get(apiTableUrl).then((resp) => {
      const TablesData = resp.data;
      setTableData(TablesData);
      setLoading(false);
    });
    
  }, [okButton]);


  return (
    <div className="App">
      <FrameForm 
        FrameName={FrameName}
        selectedFrameValue={selectedFrameValue}
        setSelectedFrameValue={setSelectedFrameValue}
        HandleOptionChange={HandleOptionChange}
        buttonSubmitHandler={buttonSubmitHandler}
        startDateInputHandler={startDateInputHandler}
        endDateInputHandler={endDateInputHandler}
        ProduceDateBegin={ProduceDateBegin}
        ProduceDateEnd={ProduceDateEnd}
      />
    {
      
      DataTable?<DataTable 
      TableData={TableData} 
      setTableData={setTableData}
      />:null
    }
    {loading?
    (
      <div className="loader-item">
          <Oval
            height={50}
            width={50}
            color="#90c843"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#90c843"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
    ):null
    }
    </div>
  );
}

export default App;

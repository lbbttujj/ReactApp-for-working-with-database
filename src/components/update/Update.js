import React, { Component,useState } from 'react';
import './style.css';
import { CustomDialog, useDialog } from 'react-st-modal';



 const CustomDialogContent =  (props)=> {

  debugger

   const dialog = useDialog();
   const [author1, setValue] = useState({FIO:'', Born:'', Phone:'',Gender:'',Email:'',type:'author'});
   const [book, setBook] = useState({Name:'', Count:'', State:'',Price:'',ContractNumber:'', type:'book'});
   const [client, setClient] = useState({Id_client:`${props.Id_client}`, FIO:'', Gender:'',
                                           Born:'',Phone:'', type:'client'});
   const [sotr, setSotr] = useState({Id_sotr:`${props.Id_sotr}`, FIO:'', Gender:'',
                                           post:'', salary:'', Phone:'', type:'sotr'});

   const [contract, setContract] = useState({contractNumber:'',
                                              Name:'', circulation:'',term:'',
                                              СonclusionDate:'', fee:'',Id_Sotr:'',
                                              StatusAppl:'', CountBooks:'',genre:'',
                                              type:'contract'});
                                            

  if(props.type == 'book'){

  const  setInput1 = (e)=>{
      
    const {name, value1} = e.target;
    let tValue=e.target.value;
    setBook(prevState =>({
    ...prevState,
    [name]:tValue
  }));
  console.log(book);
  }
    
  
  
    return (
      <div className='dialog'>
         <input name="Name" placeholder={props.selectName} onChange={setInput1}></input>
        <input name="Count"   placeholder={props.selectCount}  onChange={setInput1}></input>
        <input name="State"   placeholder={props.selectState}  onChange={setInput1}></input>
        <input name="Price"   placeholder={props.selectPrice}  onChange={setInput1}></input>
        <input name="ContractNumber"  placeholder={props.selectContractNumber}  onChange={setInput1}></input>
        <div className='DialogButtons'>
        <button
          onClick={ async()=>{
            const newData = await fetch('/update',{
              method: "POST",
              headers:{
                'content-type': 'application/json',
                'Accept' : 'application/json'
              },
              body: JSON.stringify({
                ...book
              })
            })
            .then(res=> res);
            props.rebindTable();
            dialog.close(book)
         
            // rebindTable();
        }
          }
        >
           Обновить
          
        </button>       
        </div>
      </div>
    );
  }
  else if(props.type == 'contract'){
    const  setInput2 = (e)=>{

      const {name, value1} = e.target;
      let tValue=e.target.value;
      setContract(prevState =>({
      ...prevState,
      [name]:tValue
    }));
    console.log(contract);
    }
      
    
    
      return (
        <div className='dialog'>
           <input name="contractNumber" placeholder={props.contractNumber} onChange={setInput2}></input>
          <input name="Name"   placeholder={props.Name}  onChange={setInput2}></input>
          <input name="circulation"   placeholder={props.circulation}  onChange={setInput2}></input>
          <input name="term"   placeholder={props.term}  onChange={setInput2}></input>
          <input name="СonclusionDate"  placeholder={props.СonclusionDate}  onChange={setInput2}></input>
          <input name="fee"  placeholder={props.fee}  onChange={setInput2}></input>
          <input name="Id_Sotr"  placeholder={props.Id_Sotr}  onChange={setInput2}></input>
          <input name="StatusAppl"  placeholder={props.StatusAppl}  onChange={setInput2}></input>
          <input name="CountBooks"  placeholder={props.CountBooks}  onChange={setInput2}></input>
          <input name="genre"  placeholder={props.genre}  onChange={setInput2}></input>
          <div className='DialogButtons'>
          <button
            onClick={ async()=>{
              const newData = await fetch('/update',{
                method: "POST",
                headers:{
                  'content-type': 'application/json',
                  'Accept' : 'application/json'
                },
                body: JSON.stringify({
                  ...contract
                })
              })
              .then(res=> res);
              props.rebindTable();
              dialog.close(contract)
           
              // rebindTable();
          }
            }
          >
             Обновить
            
          </button>       
          </div>
        </div>
      );
  }
  else if(props.type == 'client'){
    const  setInput2 = (e)=>{
      
      const {name} = e.target;
      let tValue=e.target.value;
      setClient(prevState =>({
      ...prevState,
      [name]:tValue
    }));
    console.log(client);
    }
      
    
    
      return (
        <div className='dialog'>
           {/* <input name="Id_client" value={props.Id_client} onChange={setInput2}></input> */}
           {/* <p>ФИО</p> */}
          <input name="FIO"   placeholder={props.FIO}  onChange={setInput2}></input>
           {/* <p>Пол</p> */}
          <input name="Gender"   placeholder={props.Gender}  onChange={setInput2}></input>
           {/* <p>Дата Рождения</p> */}
          <input name="Born"   placeholder={props.Born}  onChange={setInput2}></input>
           {/* <p>Номер Телефона</p> */}
          <input name="Phone"  placeholder={props.Phone}  onChange={setInput2}></input>
          <div className='DialogButtons'>
          <button
            onClick={ async()=>{
              const newData = await fetch('/update',{
                method: "POST",
                headers:{
                  'content-type': 'application/json',
                  'Accept' : 'application/json'
                },
                body: JSON.stringify({
                  ...client
                })
              })
              .then(res=> res);
              props.rebindTable();
              dialog.close(client)
           
              // rebindTable();
          }
            }
          >
             Обновить
            
          </button>       
          </div>
        </div>
      );
  }
  else if(props.type == 'sotr'){
    debugger
    const  setInput4 = (e)=>{
      
      const {name} = e.target;
      let tValue=e.target.value;
      setSotr(prevState =>({
      ...prevState,
      [name]:tValue
    }));
    console.log(sotr);
    }
      
    
    
      return (
        <div className='dialog'>
           {/* <input name="Id_sotr" value={props.Id_sotr} onChange={setInput4}></input> */}
          <input name="FIO"   placeholder={props.FIO}  onChange={setInput4}></input>
          <input name="Gender"   placeholder={props.Gender}  onChange={setInput4}></input>
          <input name="post"   placeholder={props.post}  onChange={setInput4}></input>
          <input name="salary"   placeholder={props.salary}  onChange={setInput4}></input>
          <input name="Phone"  placeholder={props.Phone}  onChange={setInput4}></input>
          <div className='DialogButtons'>
          <button
            onClick={ async()=>{
              console.log(sotr);

              const newData = await fetch('/update',{
                method: "POST",
                headers:{
                  'content-type': 'application/json',
                  'Accept' : 'application/json'
                },
                body: JSON.stringify({
                  ...sotr
                })
              })
              .then(res=> res);
              props.rebindTable();
              dialog.close(sotr)
           
              // rebindTable();
          }
            }
          >
             Обновить
            
          </button>       
          </div>
        </div>
      );
  }
  else{

  
    // use this hook to control the dialog

  const  setInput1 = (e)=>{
      
    const {name, value1} = e.target;
    let tValue=e.target.value;
    setValue(prevState =>({
    ...prevState,
    [name]:tValue
  }));
  console.log(author1);
  console.log(props.selectedRow);
  }
    
  
  
    return (
      <div className='dialog'>
         <input name="FIO" value={props.selectedRow} onChange={setInput1}></input>
        <input name="Born"   placeholder={props.selectBorn}  onChange={setInput1}></input>
        <input name="Phone"   value={props.selectPhone}  onChange={setInput1}></input>
        <input name="Gender"   placeholder={props.selectGender}  onChange={setInput1}></input>
        <input name="Email"  value={props.selectEmail}  onChange={setInput1}></input>
        <div className='DialogButtons'>
        <button
          onClick={ async()=>{
            const newData = await fetch('/update',{
              method: "POST",
              headers:{
                'content-type': 'application/json',
                'Accept' : 'application/json'
              },
              body: JSON.stringify({
                ...author1
              })
            })
            .then(res=> res);
            props.rebindTable();
            dialog.close(author1)
         
            // rebindTable();
        }
          }
        >
           Обновить
          
        </button>       
        </div>
      </div>
    );
        }
  }
 
class Update extends Component {

  constructor(props){
    super(props)
  }

  render() {
    if(this.props.type == "book"){
      const {rebindTable,type, selectName,selectCount,selectState,selectPrice,selectContractNumber}=this.props;
      return(
      <>
      <button    onClick={async () => {
          const result = await CustomDialog(
            <CustomDialogContent
            type = {type}
            rebindTable={rebindTable}
            selectName={selectName}
            selectCount={selectCount}
            selectState={selectState}
            selectPrice={selectPrice}
            selectContractNumber={selectContractNumber}
            />,
            {
              title: 'Редактирование',
              className: 'mainDialog',
              showCloseIcon: true,
            }
          );
        }}
      >
        Редактировать</button>
      </>
      )
    } else if(this.props.type=='contract'){
      const {rebindTable,contractNumber,Name,circulation,
        term,СonclusionDate,fee,Id_Sotr,StatusAppl,CountBooks,genre,type}=this.props;
      return (
        <>
       <button    onClick={async () => {
            const result = await CustomDialog(
              <CustomDialogContent
              type = {type}
              rebindTable={rebindTable}
              contractNumber={contractNumber}
              Name={Name}
              circulation={circulation}
              term={term}
              СonclusionDate={СonclusionDate}
              fee={fee}
              Id_Sotr={Id_Sotr}
              StatusAppl={StatusAppl}
              CountBooks={CountBooks}
              genre={genre}
              />,
              {
                title: 'Редактирование',
                className: 'mainDialog',
                showCloseIcon: true,
              }
            );
          }}
        >
          Редактировать</button>
        </>
  
      );
    } else if(this.props.type == "client"){

      const {rebindTable,Id_client,FIO,Gender,
        Born,Phone,type}=this.props;
      return (
        <>
       <button    onClick={async () => {
            const result = await CustomDialog(
              <CustomDialogContent
              type = {type}
              rebindTable={rebindTable}
              Id_client={Id_client}
              FIO={FIO}
              Gender={Gender}
              Born={Born}
              Phone={Phone}
              />,
              {
                title: 'Редактирование',
                className: 'mainDialog',
                showCloseIcon: true,
              }
            );
          }}
        >
          Редактировать</button>
        </>
  
      );

    } else if(this.props.type == "sotr"){

      const {rebindTable,Id_sotr,FIO,Gender,
        post,salary, Phone,type}=this.props;
      return (
        <>
       <button    onClick={async () => {
            const result = await CustomDialog(
              <CustomDialogContent
              type = {type}
              rebindTable={rebindTable}
              Id_sotr={Id_sotr}
              FIO={FIO}
              Gender={Gender}
              post={post}
              salary={salary}
              Phone={Phone}
              />,
              {
                title: 'Редактирование',
                className: 'mainDialog',
                showCloseIcon: true,
              }
            );
          }}
        >
          Редактировать</button>
        </>
  
      );


    }

    else{
    const {rebindTable,selectedRow,selectBorn,selectPhone,selectGender,selectEmail}=this.props;
    return (
      <>
     <button    onClick={async () => {
          const result = await CustomDialog(
            <CustomDialogContent
            rebindTable={rebindTable}
            selectedRow={selectedRow}
            selectBorn={selectBorn}
            selectPhone={selectPhone}
            selectGender={selectGender}
            selectEmail={selectEmail}
            />,
            {
              title: 'Редактирование',
              className: 'mainDialog',
              showCloseIcon: true,
            }
          );
        }}
      >
        Редактировать</button>
      </>

    );
   }
   
  }
}
 
export default Update;
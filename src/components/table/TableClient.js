import React, { Component } from 'react';
import Buttons from '../buttons/Buttons'
import Dialog from '../dialog/Dialog'
import Update from '../update/Update'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './style.css';
import '../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';





class TableClient extends Component {

  constructor(props){
    super(props)
    this.state = { 
       Id_client:'',
       FIO : '',
       Gender : '',
       Born: '',
       Phone:'',
       active:false,
       buy :[],
       books:{}

    }
   
  }

  componentDidMount(){
  this.onSelectRow=this.onSelectRow.bind(this);
  this.deleteData=this.deleteData.bind(this);
  this.getoBuy=this.getoBuy.bind(this);
  this.getBook=this.getBook.bind(this);
}

DateFormatter(cell) {
  if(cell){
  cell = cell.split('');
  cell.splice(-14, 14)
  cell = cell.join('')
  return ` ${cell}`;
  }
};

testD(cell){
 
  return cell
}



getBook = async()=>{

  const newData = await fetch(`/allBooks`,{
    method: "POST",
    headers:{
      'content-type': 'application/json',
      'Accept' : 'application/json'
    },
    body: JSON.stringify({
      bd: 'Книги',
      where: '',
      from: ``
    })
  })
  .then((response)=>{
    response.json().then((text)=>{
       
          this.setState({books:text})

    })
  });


}

 







getoBuy = async(id)=>{

  const newData = await fetch(`/allBooks`,{
    method: "POST",
    headers:{
      'content-type': 'application/json',
      'Accept' : 'application/json'
    },
    body: JSON.stringify({
      bd: 'Покупка',
      where: 'WHERE [Код Клиента]',
      from: `= ${id}`
    })
  })
  .then((response)=>{
    response.json().then((text)=>{
       
      let s = []
      for (let i =0; i<text.length; i++){
        let o = {};
        o['ID_Книги'] = text[i]['ID_Книги']
        o['Количество'] = text[i]['Количество']

        s.push(o)
          }
          this.setState({buy:s})

    })
  });


}


onSelectRow(row, isSelected, e) {
  if (isSelected) {
    
    let  Id_client = row['ID_Клиента']
    let  FIO = row['ФИО']
    let  Gender = row['Пол']
    let  Born = row['Дата Рождения']
    let  Phone = row['Номер Телефонв']
   


    this.setState({ Id_client: Id_client})
    this.setState({ FIO: FIO})
    this.setState({ Gender: Gender})
    this.setState({ Born: this.DateFormatter(Born)})
    this.setState({ Phone: Phone})
    this.setState({active:true})

    this.getoBuy(Id_client);
    this.getBook();
  }
};


async deleteData(){
  
  let book = this.state.Id_client; 
  const newData = await fetch('/delete',{
    method: "POST",
    headers:{
      'content-type': 'application/json',
      'Accept' : 'application/json'
    },
    body: JSON.stringify({
      name: book,
      bd : 'Клиент',
      field : '[ID_Клиента]'
    })
  })
  .then(res=> res);
  console.log(newData);
  this.props.rebindTable();
}


 


  

  
  render() {


    let current  = this.state.buy;
    let allbooks = this.state.books;

    if(current.length>0){

      for(let i =0; i<current.length; i++){

          for (let j =0; j<allbooks.length; j++){

            if (current[i]['ID_Книги'] == allbooks[j]['ID_Книги']){
                current[i]['ID_Книги'] = allbooks[j]['Название Книги']
            }
          }

    }

  }

    debugger

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 450,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
    
  const  selectRowProp = {
      mode: 'radio',
      clickToSelect: true,
      onSelect: this.onSelectRow,
      bgColor: 'gold'
    }
    const {rebindTable,data}=this.props
    if(current.length>0){
    return (
      <div div  style={{position:'relative', left:'375px', top:'-60px'}}>
       

        <BootstrapTable 
        data={data} 
        selectRow={selectRowProp}
        >
         
        
          {/* <TableHeaderColumn className='test'  dataFormat={this.testD} dataField='ID_Клиента'
          dataAlign='center'
          headerAlign="center"
          width="130"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
          ID_Клиента
          </TableHeaderColumn> */}
          <TableHeaderColumn className='test' isKey dataFormat={this.testD} dataField='ФИО'
          dataAlign='center'
          headerAlign="center"
          width="200"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
          ФИО
          </TableHeaderColumn>
          <TableHeaderColumn className='test' dataField='Пол'
          dataAlign='center'
          headerAlign="center"
          width="100"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
          Пол
          </TableHeaderColumn>
          <TableHeaderColumn  className='test' dataFormat={this.DateFormatter}  dataField='Дата Рождения'
          
          dataAlign='center'
          headerAlign="center"
          width="160"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
        Дата Рождения
          </TableHeaderColumn>
       
          <TableHeaderColumn  className='test' dataField='Номер Телефонв'
          
          dataAlign='center'
          headerAlign="center"
          width="190"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
       Номер Телефона
          </TableHeaderColumn>
       
        </BootstrapTable>



        <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={this.state.active}
        onClose={()=>{this.setState({active:false})}}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={this.state.active}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Клиент {this.state.FIO} купил книги:
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              
     <BootstrapTable 
        data={current} 
        >
          <TableHeaderColumn className='test' isKey dataFormat={this.testD} dataField='ID_Книги'
          dataAlign='center'
          headerAlign="center"
          width="200"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
          Название
          </TableHeaderColumn>
          <TableHeaderColumn className='test'  dataFormat={this.testD} dataField='Количество'
          dataAlign='center'
          headerAlign="center"
          width="200"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
          Количество
          </TableHeaderColumn>
    </BootstrapTable>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>

        
      </div>
    );
      }
      else{
        return(
          <div div  style={{position:'relative', left:'375px', top:'-60px'}}>
       

          <BootstrapTable 
          data={data} 
          selectRow={selectRowProp}
          >
           
          
            {/* <TableHeaderColumn className='test'  dataFormat={this.testD} dataField='ID_Клиента'
            dataAlign='center'
            headerAlign="center"
            width="130"
            tdStyle={
              {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
            ID_Клиента
            </TableHeaderColumn> */}
            <TableHeaderColumn className='test' isKey dataFormat={this.testD} dataField='ФИО'
            dataAlign='center'
            headerAlign="center"
            width="200"
            tdStyle={
              {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
            ФИО
            </TableHeaderColumn>
            <TableHeaderColumn className='test' dataField='Пол'
            dataAlign='center'
            headerAlign="center"
            width="100"
            tdStyle={
              {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
            Пол
            </TableHeaderColumn>
            <TableHeaderColumn  className='test' dataFormat={this.DateFormatter}  dataField='Дата Рождения'
            
            dataAlign='center'
            headerAlign="center"
            width="160"
            tdStyle={
              {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
          Дата Рождения
            </TableHeaderColumn>
         
            <TableHeaderColumn  className='test' dataField='Номер Телефонв'
            
            dataAlign='center'
            headerAlign="center"
            width="190"
            tdStyle={
              {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
         Номер Телефона
            </TableHeaderColumn>
         
          </BootstrapTable>
  
  
          
        </div>
        )
      }
  }
}
 
export default TableClient;
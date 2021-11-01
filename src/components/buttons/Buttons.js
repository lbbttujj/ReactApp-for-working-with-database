import React, { Component } from 'react';
import Button from '@mui/material/Button';
import './style.css';



 
class Buttons extends Component {

  constructor(props){
    super(props)

   
  }

  

  
  render() {
    const  {deleteData}=this.props;
    return (
      <>
      <Button onClick={()=>deleteData()} variant="contained">Удалить</Button>
      </>
    );
  }
}
 
export default Buttons;
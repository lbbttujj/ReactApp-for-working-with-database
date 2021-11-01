import './App.css';
import React, {useContext, useState} from 'react';

import Logo from '../src/img/Logo.png.png'


import './App.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { AuthContext } from './context';

function App() {

   
  const {activeAuth, setActiveAuth} = useContext(AuthContext)
  const {active, setActive} = useState(true);
  const [userInfo, setUserInfo] = useState({login:'', password:''});

  console.log(activeAuth);

  const  setInputInfo = (e)=>{
    const {name, value} = e.target;
    console.log(value);
    setUserInfo(prevState =>({
    ...prevState,
    [name]:value
  }));
  console.log(userInfo);

  }

  return (

<>

    <div className='modal_authoriz active'  >
                <div className=
                 'modal__content_authoriz ' >
  
                    <img src={Logo} width='80px' className="modal__title_authoriz_img"/>
                    <h3 className="modal__title_authoriz">Книжный клуб</h3>

                    <TextField id="standard-basic" 
                        
                        label="Пользователь"  
                        margin="normal"
                        name = 'login'
                        variant="standard" 
                        helperText="Введите логин"
                        // value={this.state.StatusAppl}
                        onChange={setInputInfo}
                        size="small"
                       
                        />
                        
                    <TextField id="circulation" 
                        
                        label="Пароль"  
                        margin="normal"
                        type="password"
                        name = 'password'
                        variant="standard" 
                        helperText="Введите пароль"
                        // placeholder={this.state.circulation}
                        onChange={setInputInfo}
                        size="small"
                       
                        />
                   

                    
                     
                    <div className='modal__btns_authoriz '>
                    
                      <ui5-toast id="wcToastBasic">Данные некорректны</ui5-toast>
                    <Button  variant="outlined"  onClick={ ()=>{
                      // setActiveAuth(true);
                      // console.log(activeAuth);
                      debugger
                      if(userInfo.login=='lbbttujj' && userInfo.password=='lbbttujj20!' || 
                        userInfo.login=='isdat1' && userInfo.password=='1234' ||
                        userInfo.login=='isdat4' && userInfo.password=='1234' ||
                        userInfo.login=='redact' && userInfo.password=='1234' ||
                        userInfo.login=='design' && userInfo.password=='1234' ||
                        userInfo.login=='prmanager' && userInfo.password=='1234'
                      )
                      {
                       localStorage.setItem('auth', true)
                       localStorage.setItem('role',userInfo.login)
                       if(userInfo.login=='isdat1'){
                         localStorage.setItem('isdat',1)
                       }
                       if(userInfo.login=='isdat2'){
                         localStorage.setItem('isdat',4)
                       }
                       if(userInfo.login=='lbbttujj'){
                         localStorage.setItem('isdat',4)
                       }
                        window.location.assign('http://localhost:3000/home');
                      }
                      else{
                        var wcToastBasic = document.getElementById('wcToastBasic');
                        wcToastBasic.show();
                      }
                    }}
                    
                    >Вход в систему</Button>
                    
                  
                  

                </div>
            </div>
        </div>
     
    </>
  );
}

export default App;

import './App.css';
import React, {useContext, useState} from 'react';
import MainPage from './pages/MainPage/MainPage'
import { Route } from 'react-router-dom';
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-fiori/dist/Bar.js";
import Home from '../src/img/home.png'
import Student from '../src/img/student.png'
import Logo from '../src/img/Logo.png.png'
import MuiTable from '../src/components/muiTable/Muitable'
import BooksInWork from './components/booksInWork/BooksInWork';
import TableBook from './components/tableBook/TabelBook';
import AppBook from './AppBook' 
import AppAllBook from './AppAllBook'
import AppContract from './AppContract'
import AppAuthors from './AppAuthors'
import AppSotr from './AppSotr'
import AppCreateSotr from './AppCreateSotr'
import AppClient from './AppClient'
import AppAuthorize from './AppAuthorize'
import AppCreateAppl from './AppCreateAppl'
import ddd from './img/back.jpg'

import './App.css';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { AuthContext } from './context';
import { BrowserRouter } from 'react-router-dom';
import { ExtensionOff } from '@mui/icons-material';


function App() {

   
  // const {activeAuth, setActiveAuth} = useContext(AuthContext)
  const [activeAuth, setActiveAuth] = useState();
  console.log(activeAuth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    
    // window.location.assign('http://localhost:3000/viewAthorize');
    // localStorage.setItem('auth', false)
  };
  const exit =()=>{
    setAnchorEl(null);
    window.location.assign('http://localhost:3000/viewAthorize');
    localStorage.setItem('auth', false)
  }
  let oUsersName = {
    'lbbttujj':"Директор",
    'isdat1':'Издатель',
    'isdat2':'Издатель',
    'redact':'Редактор',
    'design':'Дизайнер',
    'prmanager':'PR-Менеджер'
  }

  return (

<>
<AuthContext.Provider value = {{
    activeAuth,
    setActiveAuth
  }}>
    <BrowserRouter>
<React.Fragment>
     
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> {oUsersName[`${localStorage.role}`]}
        </MenuItem>
        <Divider />
        <MenuItem>
          <Button onClick={exit}> Выйти </Button>
        </MenuItem>
        
      
       
      </Menu>
    </React.Fragment>






      <div className="App">
         <ui5-bar design="Header" style={{
    backgroundColor: "sandybrown", heigth:'20px'}}>
         <ui5-button icon="home" title="Go home" design="Transparent" slot="startContent"> <a href='/home'>
        <img src={Home} width = '38px'alt="Home" /> Home </a>
        </ui5-button>

            <img src={Logo} width = '55px'alt="Logo" /> 
	        <ui5-label>База данных книжного издательства "Книжный клуб"
            </ui5-label>

	        <ui5-button icon="action-settings" title="Go to settings" onClick={handleClick} slot="endContent">
            <img src={Student} width = '35px'alt="Student" /> 
            </ui5-button>

        </ui5-bar>

      <Route path='/home' component={MainPage}/>
      <Route path='/viewApplication' component={MuiTable}/>
      <Route path='/viewBooksInWork2' component={AppBook}/>
      <Route path='/viewAllBook' component={AppAllBook}/>
      <Route path='/viewContracts' component={AppContract}/>
      <Route path='/viewAuthors' component={AppAuthors}/>
      <Route path='/viewSotr' component={AppSotr}/>
      <Route path='/createSotr' component={AppCreateSotr}/>
      <Route path='/viewClient' component={AppClient}/>
      <Route path='/viewAthorize' component={AppAuthorize}/>
      <Route path='/createAppl' component={AppCreateAppl}/>
    </div>
</BrowserRouter>
        </AuthContext.Provider>
    </>
  );
}

export default App;

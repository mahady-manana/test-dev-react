import React, { useContext, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, ButtonGroup } from '@material-ui/core';
import { AppContext } from '../AppContext';
import { signout } from '../api/user.auth';
import {Link, Redirect} from 'react-router-dom';
import Auth from '../api/authentication';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AddUser } from './utils/add-user';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { LoggerContext } from '../AppRouter';

export const Menu = () => {
  const {LoginLogger, setLoginLogger} = useContext(LoggerContext)
  const {hasLogger, setLogger} = useContext(AppContext)
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const openCloseModal = event => {
    event.preventDefault();
    setOpen(!open)
  }
  const CloseModal = () => {
    setLogger(!hasLogger)
    setOpen(!open)
  }
  const handleLogout = event => {
    event.preventDefault();
    signout().then(data => {
      if (data.error) console.log(error);
      Auth.clearJWT(() => {
        setLoginLogger(!LoginLogger)
        setRedirect(true)
      })
    })
  }
  if (redirect) {
      (<Redirect to={{
        pathname : '/'
      }}/>)
  }
  const withLogger = () => {
    if (LoginLogger) {
      return (
        <div className='call-to-action'>
          <ButtonGroup variant="text" color="default" aria-label="button group" classes={{root : 'cta-3btn'}}>
              <Button className='btn-white'><Link to='/dashbord/'><DashboardIcon/><span>Dashbord</span></Link></Button>
              <Button className='btn-white' onClick={openCloseModal}><PersonAddIcon/><span>Ajouter utilisateur</span></Button>
              <Button className='btn-white' onClick={handleLogout}><ExitToAppIcon/><span>Se deconnecter</span></Button>
          </ButtonGroup>
        </div>
      )
    }
  }
  return (
  <>
    <div className='main-header'>
      <AppBar position="static">
        <div className='admin-bar'>
          {
            withLogger()
          }
        </div>
        <Toolbar>
          <h2 className='logo'>
            <Link to='/'>Gestion du personnele</Link>
          </h2>
        </Toolbar>
      </AppBar>
    </div>
    <div>
    <Dialog onClose={openCloseModal} aria-labelledby="add-new-user" open={open} className='add-user-pp'>
      <DialogTitle id="add-user-popup-title">Ajouter nouveau utilisateur</DialogTitle>
        <div>
          <AddUser finish={CloseModal}/>
        </div>
    </Dialog>
    </div>
  </>
  );
}

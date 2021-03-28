import React, {useState, useContext} from 'react';
import { Button } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { EditUser } from './edit-user';
import { AppContext } from '../../AppContext';


export function TableUser (props) {
  const {hasLogger, setLogger} = useContext(AppContext)
  const [open, setOpen] = useState(false);
  const openCloseModal = event => {
    event.preventDefault();
    setOpen(!open)
  }
  const CloseModal = () => {
    setLogger(!hasLogger)
    setOpen(!open)
  }
  const deleteUser = event => {
      event.preventDefault();
      props.remove(props.user._id)
  }
  return (
    <li className='user-list'>
        <div className='inner-list'>
            <div className='fake-avatar'>
                <div className='avatar-image'>
                    <img src='/avatar.png' alt='avatar' width='auto' height='100%' className='avatar'/>
                </div>
            </div>
            <div className='user-infos'>
                <span className='nom'>{props.user.firstname}</span>
                <span className='prenom'>{props.user.lastname}</span>
                <span className='email'>{props.user.email}</span>
            </div>
            <div className='btn-cta'>
                <Button onClick={openCloseModal} classes={{root : 'btn-edit'}}>Modifier</Button>
                <Button onClick={deleteUser} classes={{root : 'btn-delete'}}>Supprimer</Button>
            </div>
        </div>
        <Dialog onClose={openCloseModal} aria-labelledby="add-new-user" open={open} className='add-user-pp'>
        <DialogTitle id="add-user-popup-title">Editer un utilisateur</DialogTitle>
            <div>
            <EditUser user_id={props.user._id} finish={CloseModal}/>
            </div>
        </Dialog>
    </li>
    
  );
}

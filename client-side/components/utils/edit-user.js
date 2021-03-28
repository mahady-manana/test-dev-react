import React, { useContext, useState, useEffect } from "react";
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Button } from "@material-ui/core";
import { oneUser, update } from '../../api/user.api';

export const EditUser = props => {

const [user, setUser] = useState({
    firstname : '',
    lastname : '', 
    email : '',
    password : '',
    error : '',
})    
useEffect(() => {
    const abortController = new AbortController()
    oneUser(props.user_id, abortController.signal).then(data => {
        setUser({
            ...user,
            firstname : data.firstname,
            lastname : data.lastname,
            email : data.email,
            password : data.password 
        })
    })
    return () => abortController.abort();
}, [])
const handleChange = name => event => {
    event.preventDefault();
    const val = event.target.value;
    setUser({...user, [name] : val, error : ''})
}
const handleSubmit = event => {
    event.preventDefault();
    update( props.user_id, user).then(data => {
        if (data && data.error) {
            setUser({...user, error : data.error})
        }
        props.finish()
    })
}
return (
<>
<div className='inscription-form-mui'>
    <form className='form-inscription edit-user' autoComplete="on" onSubmit={handleSubmit}>
        <div className='row'>
            <FormControl>
                <InputLabel htmlFor="firstname">Nom</InputLabel>
                <Input
                id="firstname"
                value={user.firstname}
                required = {true}
                onChange={handleChange('firstname')}
                aria-describedby="firstname"
                />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="lastname">Prenom</InputLabel>
                <Input
                id="lastname"
                value={user.lastname}
                required = {true}
                onChange={handleChange('lastname')}
                aria-describedby="lastname"
                />
            </FormControl>
        </div>
        <div className='row'>
            <FormControl>
                <InputLabel htmlFor="email">E-mail</InputLabel>
                <Input
                value={user.email}
                required = {true}
                type='email'
                onChange={handleChange('email')}
                aria-describedby="email"
                />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="password">Mot de passe</InputLabel>
                <Input
                value={user.password}
                type='password'
                required = {true}
                onChange={handleChange('password')}
                aria-describedby="password"
                />
            </FormControl>
            {
                user.error === '' ? '' : (
                    <div className='error-text'>  
                        {user.error}
                    </div>
                )
            }
            <div>
                <Button classes={{root : 'btn-edit-enregister'}} type='submit'>
                    Enregistrer
                </Button>
            </div>
        </div>
    </form>
</div>
</>
)
}
import React, { useContext, useState } from "react";
import FormControl from '@material-ui/core/FormControl';
import {Redirect} from 'react-router-dom';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Button, FormHelperText } from "@material-ui/core";
import { add } from "../../api/user.api";
import { signin } from "../../api/user.auth";
import Auth from "../../api/authentication"
import { AppContext } from "../../AppContext";
import { LoggerContext } from "../../AppRouter";

export const Inscription = props => {

const [user, setUser] = useState({
    firstname : '',
    lastname : '', 
    email : '',
    password : '',
    error : '',
})    
const {hasLogger, setLogger} = useContext(AppContext)
const {LoginLogger, setLoginLogger} = useContext(LoggerContext)
const [redirect, setRedirect] = useState(false)
const handleChange = name => event => {
    event.preventDefault();
    const val = event.target.value;
    setUser({...user, [name] : val, error : ''})
}
const handleSubmit = event => {
    event.preventDefault();
    add({
        firstname : user.firstname,
        lastname : user.lastname, 
        email : user.email,
        password : user.password,
    }).then(data => {
        if (data && data.error) {
            setUser({...user, error : data.error})
        } else {
            signin({
                email : user.email,
                password : user.password
            }).then(user_data => {
                if (user_data.error) setUser({...user, error : user_data.error})
                else {
                    Auth.authenticate(data, () => {
                        setLoginLogger(!LoginLogger)
                        setRedirect(true)
                    })
                }
            })
        }
    })
}
if (redirect) {
    return (
        <Redirect to={{
            pathname : '/dashbord'
        }}/>
    )
}
return (
<>
<div className='inscription-form-mui'>
    <form className='form-inscription' autoComplete="on" onSubmit={handleSubmit}>
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
                <FormHelperText>Enter votre nom.</FormHelperText>
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
                <FormHelperText>Votre prenom.</FormHelperText>
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
                <FormHelperText>Entrer email valide</FormHelperText>
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
                <FormHelperText>Mot de passe</FormHelperText>
            </FormControl>
            {
                user.error === '' ? '' : (
                    <div className='error-text'>  
                        {user.error}
                    </div>
                )
            }
            <div>
                <Button classes={{root : 'btn-sinscrire'}} type='submit'>
                    S'inscrire
                </Button>
            </div>
        </div>
    </form>
</div>
</>
)
}
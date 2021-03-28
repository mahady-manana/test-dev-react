import React, { useContext, useState } from "react";
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Button } from "@material-ui/core";
import { add } from "../../api/user.api";
import { AppContext } from "../../AppContext";

export const AddUser = props => {

const [user, setUser] = useState({
    firstname : '',
    lastname : '', 
    email : '',
    password : '',
    error : '',
})    
const {hasLogger, setLogger} = useContext(AppContext)

const handleChange = name => event => {
    event.preventDefault();
    const val = event.target.value;
    setUser({...user, [name] : val, error : ''})
}
const handleSubmit = event => {
    event.preventDefault();
    add(user).then(data => {
        if (data && data.error) {
            setUser({...user, error : data.error})
        }
        props.finish()
    })
}
return (
<>
<div className='inscription-form-mui'>
    <form className='form-inscription add-user' autoComplete="on" onSubmit={handleSubmit}>
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
                <Button classes={{root : 'btn-ajouteer'}} type='submit'>
                    Ajouter
                </Button>
            </div>
        </div>
    </form>
</div>
</>
)
}
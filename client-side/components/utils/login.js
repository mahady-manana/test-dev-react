import { Button, 
        FormControl, 
        FormHelperText, 
        Input, 
        InputLabel } from "@material-ui/core";
import React, 
        { useContext, useState } from "react";
import { signin } from "../../api/user.auth";
import { Redirect } from "react-router-dom";
import Auth from "../../api/authentication";
import { LoggerContext } from "../../AppRouter";

export const Login = props => {

const [user, setUser] = useState({
    email : '',
    password : '',
    redirect : false,
    error : ''
})
const {LoginLogger, setLoginLogger} = useContext(LoggerContext)
const handleChange = name => event => {
    event.preventDefault();
    setUser({...user, [name] : event.target.value, error : ''})
}
const handleLogin = event => {
    event.preventDefault();
    signin({
        email : user.email,
        password : user.password
    }).then(data => {
        if (data.error) setUser({...user, error : data.error})
        else {
            Auth.authenticate(data, () => {
                setLoginLogger(!LoginLogger)
                setUser({...user, redirect : true})
            })
        }
    })
}
const {redirect} = user;
if (redirect) {
    return (
        <Redirect to={{
            pathname : '/dashbord'
        }}/>
    )
}   
return (
<form className='form-login' onSubmit={handleLogin}>
    <FormControl >
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
        value={user.email}
        type = 'email'
        onChange={handleChange('email')}
        aria-describedby="component-helper-text"
        />
        <FormHelperText>Enter votre email</FormHelperText>
    </FormControl>
    <FormControl>
        <InputLabel htmlFor="password">Mot de passe</InputLabel>
        <Input
        type='password'
        value={user.password}
        onChange={handleChange('password')}
        aria-describedby="component-helper-text"
        />
        <FormHelperText>Enter votre mot de passe</FormHelperText>
    </FormControl>
    {
        user.error === '' ? '' : (
            <div className='error-text'>  
                {user.error}
            </div>
        )
    }
    <Button classes={{root : 'button-se-connecter'}} type='submit'>
        se connecter
    </Button>
</form>
)
}
import { Button, FormControl, FormHelperText, Grid, Input, InputLabel } from "@material-ui/core";
import React, { useState } from "react";
import { Inscription } from "./utils/inscription";
import { Login } from "./utils/login";

export const Homepage = () => {


return (
<>
<div className='homepage'>
    <section className='section top-section'>
        <div className='inner-section' style={{background : 'url(/bg-home.png)'}}>
            <div className='app-container'>
                <Grid container spacing={3} direction='row'>
                    <Grid item md={5} classes={{root : 'items-center-960'}}>
                        <div className='left-side-home'>
                        <h1>Gestion <span>du personnel</span></h1>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                        Ad, consequuntur ut porro qui nihil ipsum assumenda! Voluptates suscipit obcaecati adipisci 
                        amet deleniti nihil eius atque perspiciatis quaerat, inventore, voluptatem nulla?
                        </div>
                    </Grid>
                    <Grid item md={7}>
                        <div className='right-form-col'>
                            <div className='login'>
                                <h3 className='title-cta'>
                                    Se connecter
                                </h3>
                                <Login/>
                            </div>
                            <div className='divider-ou'>ou</div>
                            <div className='signup'>
                                <h3 className='title-cta'>
                                    S'inscrire
                                </h3>
                                <Inscription/>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    </section>
    <section></section>
    <section></section>
</div>
</>
)
}
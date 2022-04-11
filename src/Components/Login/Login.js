import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Paper, Grid, Typography, TextField, Button, Link, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FormHelperText from '@mui/material/FormHelperText'

import backImage from '../../Assets/img/fondo-login.png';
import logo from '../../Assets/img/react.png';
import AuthService from "../../Services/auth.service";

export default function Login() {

    const history       = useHistory();
    const theme         = useTheme();
    const matches       = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesHeight = useMediaQuery('(height:600px)');

    const styles = {
        paperContainer: {
            backgroundImage: `url(${backImage})`,
            width: "100%",
            minHeight: "100vh",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        paperLogin: {
            backgroundColor: 'white',
            width: "67%",
            minHeight: "54vh",
            marginTop: '10%',
            marginLeft: '20%'
        },
        blueSquare: {
            backgroundColor: '#00385C',
            width: "22%",
            minHeight: matchesHeight ? "80vh" : "95vh",
            marginTop: matchesHeight ? '4%' : '1%',
            marginLeft: '16%',
            position: 'absolute',
            boxShadow: 0,
            borderRadius: '15px',
        },
        blueCircle: {
            backgroundColor: '#00385C',
            width: "33%",
            minHeight: matchesHeight ? "80vh" : "95vh",
            marginTop: matchesHeight ? '4%' : '1%',
            marginLeft: '20%',
            position: 'absolute',
            borderRadius: '53%',
            boxShadow: 0
        },
        logoImg: {
            position: 'absolute',
            zIndex: 1,
            marginTop: '15%',
        },
        loginButton: {
            borderRadius: '15px',
            backgroundColor: '#00385C',
            marginTop: '3vh',
            marginRight: '15vh',
        },
        loginButtonSm: {
            borderRadius: '15px',
            backgroundColor: '#00385C',
            marginTop: '3vh',
        },
        marginForm: {
            marginTop: '3vh',
            marginRight: matches ? '0vh' : '15vh',
        },
        linkColor: {
            color: '#00385C',
        },
    }

    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState([]);
    const [body, setBody]       = useState({ pernr: '', password: '' });

    // handle button click of login form
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(body);

        setError([]);
        setLoading(true);
        
        AuthService.login(body.pernr, body.password)
        .then(
            () => {
                history.push("/dashboard/index");
            },
            (errorAuth) => {
                const errorMessage =
                (errorAuth.response &&
                    errorAuth.response.data &&
                    errorAuth.response.data.message) ||
                errorAuth.message ||
                errorAuth.toString();

                setLoading(false);
                setError(errorMessage);
            }
        );
    }

    const handleChange = (event) => {
        // console.log(event.target.value)
        const { name, value } = event.target;

        setBody({
            ...body,
            [name]: value
        })
    }

    return (
        <Grid container component="main" sx={{ height: '100vh' }} >
            <Paper style={styles.paperContainer}>
                <Grid 
                    item 
                    lg={6} 
                    xs='none'
                    display={{ xs: "none", lg: "block", md: "block", sm: "none" }}
                >
                    <div style={styles.blueCircle}> 
                        <img src={logo} style={styles.logoImg} alt="logo" />
                    </div>
                    <div style={styles.blueSquare}> </div>
                </Grid>
                
                <Paper style={styles.paperLogin}>
                    <Grid container>
                        <Grid md={7} xs={false}></Grid>
                        <Grid md={5} xs={12} alignItems="center" align="center">
                            <form  onSubmit={handleSubmit}>
                                <Grid xs={12} >
                                    <Typography component="h1" variant="h5" style={styles.marginForm}>
                                        Nombre de la APP
                                    </Typography>        
                                </Grid>
                                <Grid xs={12}>
                                    <TextField 
                                        size="small"
                                        label='No. Colaborador'
                                        style={styles.marginForm}
                                        id="pernr"
                                        name="pernr"
                                        autoComplete="pernr"
                                        autoFocus
                                        value={body.pernr}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid xs={12}>
                                    <TextField 
                                        size="small"
                                        label='Contraseña'
                                        type='password'
                                        style={styles.marginForm}
                                        disabled={loading}
                                        name="password"
                                        id="password"
                                        autoComplete="current-password"
                                        value={body.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                {error && (
                                    <div>
                                        <FormHelperText style={{ color: 'red' }}>{error}</FormHelperText>
                                    </div>    
                                )}
                                <Grid xs={12}>
                                    <Button 
                                        type="submit"
                                        variant="contained" 
                                        style={styles.loginButton} 
                                        disabled={loading}
                                        onClick={handleSubmit} 
                                    >
                                        {loading ? 'Ingresando...' : 'Ingresar'}
                                    </Button>
                                </Grid>                    

                                <Grid item xs style={styles.marginForm}>
                                    <Link href="http://localhost/algun-sitio" target="_blank" variant="body2" style={styles.linkColor} disabled={loading}>
                                        Olvide Mi Contraseña
                                    </Link>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Paper>
            </Paper>
        </Grid>
    );
}
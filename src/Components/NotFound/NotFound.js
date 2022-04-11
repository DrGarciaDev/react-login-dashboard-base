import React from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import UrreaValvulas from '../../Assets/img/not_found.png'

export default function PageNotFound() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item direction="row">
                        <Grid item direction="column">
                            <Typography>
                                <h1>Lo sentimos - La página que intentas consultar no existe</h1>
                            </Typography>
                            <Link to="/">
                                Volver a la página de inicio
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid item direction="row">
                        <Grid item direction="column">
                            <img src={UrreaValvulas} width="100%" height="100%" alt="Urrea"/>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}

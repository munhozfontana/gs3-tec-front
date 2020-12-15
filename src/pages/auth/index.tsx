import { useLoading } from '@agney/react-loading';
import { Avatar, Button, Container, Grid, Paper, TextField } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import { CustomSnackbar, CustomSnackbarRef } from '../../components/sanckbar';
import { LoginService } from '../../services/loginService';
import { LoadingStore } from '../../store/loadingStore';
// import LoadingStore from '../../store/loadingStore';
import { FormValidators } from '../../validations/form-validators';
import { AuthUser } from './models/AuthProps';
import './style.css';

export default function Auth() {

    const refSnackBar = useRef<CustomSnackbarRef>();
    const [form, setForm] = useState<AuthUser>({
        formSubmited: false,
        login: { value: "", msgError: "" },
        senha: { value: "", msgError: "" }
    });


    const formValidade = async () => {
        LoadingStore.change(true);

        setForm(({
            login,
            senha
        }: AuthUser) => ({
            formSubmited: true,
            login: { ...login, msgError: FormValidators.invalidField(form.login.value) },
            senha: { ...senha, msgError: FormValidators.invalidField(form.senha.value) },
        }))

        try {
            await LoginService.getLogin(form.login.value, form.senha.value);
        } catch (error) {
            console.error(error)
            refSnackBar.current?.onClick({ message: "Erro ao tentar acessar o serviço", error: true })
            LoadingStore.change(false);
        }
        LoadingStore.change(false);
    }


    return (

        <form noValidate autoComplete="off">
            <Container maxWidth="xs" >
                <Paper elevation={3} >
                    <Grid
                        className="auth-container"
                        container
                        xs={12}
                        justify="space-around"
                    >

                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignContent="center"
                            xs={12}>
                            <Avatar>
                            </Avatar>
                        </Grid>

                        <Grid
                            container
                            xs={12}>
                        </Grid>

                        <Grid
                            container
                            direction="column"
                            justify="space-evenly"
                            xs={11}>

                            <Grid item={true}  >
                                <TextField
                                    required
                                    fullWidth
                                    id="filled-basic"
                                    label="Usuário"
                                    variant="outlined"
                                    autoFocus
                                    helperText={form.login.msgError}
                                    error={!!form.login.msgError && form.formSubmited}
                                    onChange={(value => {
                                        setForm(({ login }: AuthUser) => ({ ...form, login: { ...login, value: value.target.value } }))
                                    })}
                                />
                            </Grid>

                            <Grid item={true} >
                                <TextField
                                    required
                                    fullWidth
                                    id="filled-basic"
                                    label="Senha"
                                    variant="outlined"
                                    helperText={form.senha.msgError}
                                    error={!!form.senha.msgError && form.formSubmited}
                                    onChange={(value => {
                                        setForm(({ senha }: AuthUser) => ({ ...form, senha: { ...senha, value: value.target.value } }))
                                    })}
                                />
                            </Grid>

                        </Grid>

                        <Grid
                            container
                            xs={12}>
                        </Grid>

                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            xs={11}>

                            <Grid item={true} xs={5} >
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={formValidade}
                                >Login</Button>
                            </Grid>

                            <Grid item={true} xs={5} >
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="secondary">Cadastro</Button>
                            </Grid>
                        </Grid>

                        <CustomSnackbar ref={refSnackBar} />

                    </Grid>
                </Paper>
            </Container >
        </form>
    )
}

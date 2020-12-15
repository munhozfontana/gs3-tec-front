import { Button, Container, Grid, Paper, TextField } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import ChipsArray from '../../components/chips';
import { CustomSnackbar, CustomSnackbarRef } from '../../components/sanckbar';
import { CadastroUsuarioModel } from '../../core/models/cadastro-usuario/cadastroUsuarioModel';
import { FieldForm } from '../../core/models/forms';
import { CadastroService } from '../../services/cadastroService';
import { ViaCepService } from '../../services/viaCepService';
import { LoadingStore } from '../../store/loadingStore';


export default function CadastroUsuario() {
    const refSnackBar = useRef<CustomSnackbarRef>();
    const [form, setForm] = useState<CadastroUsuarioModel>({
        formSubmited: false,
        nome: {} as FieldForm,
        cpf: {} as FieldForm,
        endereco: {
            bairro: {} as FieldForm,
            uf: {} as FieldForm,
            cidade: {} as FieldForm,
            cep: {} as FieldForm,
            logradouro: {} as FieldForm,
        },
        telefone: [],
        email: [],
    });

    const formValidade = async () => {
        LoadingStore.change(true);
        try {
            await CadastroService.post(form)
        } catch (error) {
            console.error(error)
            refSnackBar.current?.onClick({ message: "Erro ao tentar acessar o serviço", error: true })
            LoadingStore.change(false);
        }
        LoadingStore.change(false);
    }


    return (

        <Container maxWidth="md" >
            <Paper elevation={3} >
                <Grid
                    className="auth-container"
                    container
                    xs={12}
                    justify="space-around"
                >


                    <Grid
                        container
                        xs={12}>
                    </Grid>

                    <Grid
                        container
                        direction="row"
                        justify="space-evenly"
                        spacing={2}
                        xs={10}>

                        <Grid xs={6} item={true}  >
                            <TextField
                                required
                                fullWidth
                                id="filled-basic"
                                label="Nome"
                                variant="outlined"
                                helperText={form.nome.msgError}
                                error={!!form.nome.msgError && form.formSubmited}
                                onChange={(value => {
                                    setForm(({ nome }: CadastroUsuarioModel) => ({ ...form, nome: { ...nome, value: value.target.value } }))
                                })}
                            />
                        </Grid>

                        <Grid xs={6} item={true}  >
                            <TextField
                                required
                                fullWidth
                                id="filled-basic"
                                label="CPF"
                                variant="outlined"
                                helperText={form.cpf.msgError}
                                error={!!form.cpf.msgError && form.formSubmited}
                                onChange={(value => {
                                    setForm(({ cpf }: CadastroUsuarioModel) => ({ ...form, cpf: { ...cpf, value: value.target.value } }))
                                })}
                            />
                        </Grid>

                        <Grid container xs={12} spacing={1} item={true}  >

                            <Grid xs={3} item={true}  >
                                <TextField
                                    required
                                    fullWidth
                                    id="filled-basic"
                                    label="Endereço"
                                    variant="outlined"
                                    helperText={form.endereco.cep.msgError}
                                    error={!!form.endereco.cep.msgError && form.formSubmited}
                                    // value={form.endereco.cep.value || ""}
                                    onChange={(value => {
                                        if (value.target.value.length === 8) {
                                            ViaCepService.get(value.target.value)
                                                .then(value =>
                                                    setForm({
                                                        ...form,
                                                        endereco: {
                                                            bairro: { value: value.bairro, msgError: "" },
                                                            cep: { value: value.cep, msgError: "" },
                                                            cidade: { value: value.localidade, msgError: "" },
                                                            logradouro: { value: value.logradouro, msgError: "" },
                                                            uf: { value: value.uf, msgError: "" }
                                                        }
                                                    }))
                                        }
                                        // setForm(({ endereco }: CadastroUsuarioModel) => ({ ...form, endereco: { ...endereco, { value: value:, msgError: "" } value.target.value } }))
                                    })}
                                />
                            </Grid>
                            <Grid xs={3} item={true}  >
                                <TextField
                                    required
                                    fullWidth
                                    id="filled-basic"
                                    label="Endereço"
                                    variant="outlined"
                                    helperText={form.endereco.logradouro.msgError}
                                    error={!!form.endereco.logradouro.msgError && form.formSubmited}
                                    value={form.endereco.logradouro.value || ""}
                                // onChange={(value => {
                                //     setForm(({ endereco }: CadastroUsuarioModel) => ({ ...form, endereco: { ...endereco, value: value.target.value } }))
                                // })}
                                />
                            </Grid>
                            <Grid xs={3} item={true}  >
                                <TextField
                                    required
                                    fullWidth
                                    id="filled-basic"
                                    label="Endereço"
                                    variant="outlined"
                                    helperText={form.endereco.bairro.msgError}
                                    error={!!form.endereco.bairro.msgError && form.formSubmited}
                                    value={form.endereco.bairro.value || ""}
                                // onChange={(value => {
                                //     setForm(({ endereco }: CadastroUsuarioModel) => ({ ...form, endereco: { ...endereco, value: value.target.value } }))
                                // })}
                                />
                            </Grid>
                            <Grid xs={2} item={true}  >
                                <TextField
                                    required
                                    fullWidth
                                    id="filled-basic"
                                    label="Endereço"
                                    variant="outlined"
                                    helperText={form.endereco.cidade.msgError}
                                    error={!!form.endereco.cidade.msgError && form.formSubmited}
                                    value={form.endereco.cidade.value || ""}
                                // onChange={(value => {
                                //     setForm(({ endereco }: CadastroUsuarioModel) => ({ ...form, endereco: { ...endereco, value: value.target.value } }))
                                // })}
                                />
                            </Grid>
                            <Grid xs={1} item={true}  >
                                <TextField
                                    required
                                    fullWidth
                                    id="filled-basic"
                                    label="Endereço"
                                    variant="outlined"
                                    helperText={form.endereco.uf.msgError}
                                    error={!!form.endereco.uf.msgError && form.formSubmited}
                                    value={form.endereco.uf.value || ""}
                                // onChange={(value => {
                                //     setForm(({ endereco }: CadastroUsuarioModel) => ({ ...form, endereco: { ...endereco, value: value.target.value } }))
                                // })}
                                />
                            </Grid>
                        </Grid>


                        <Grid
                            container
                            xs={6}
                            justify="space-around"
                            direction="row"  >

                            <ChipsArray
                                label="Números"
                            ></ChipsArray>

                        </Grid>

                        <Grid
                            container
                            xs={6}
                            justify="space-around"
                            direction="row"  >

                            <ChipsArray
                                label="Números"
                            ></ChipsArray>

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
                            >Cadastrar</Button>
                        </Grid>

                        <Grid item={true} xs={5} >
                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                            >Voltar</Button>
                        </Grid>
                    </Grid>

                    <CustomSnackbar ref={refSnackBar} />

                </Grid>
            </Paper>
        </Container >
    )
}

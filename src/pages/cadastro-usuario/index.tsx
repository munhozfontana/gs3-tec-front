import { Button, Container, Grid, Paper, TextField } from "@material-ui/core";
import React, { useRef, useState } from "react";
import ChipsArray from "../../components/chips";
import { CustomSnackbar, CustomSnackbarRef } from "../../components/sanckbar";
import { CadastroUsuarioModel } from "../../core/models/cadastro-usuario/cadastroUsuarioModel";
import { FieldForm, FieldFormArray } from "../../core/models/forms";
import { CadastroService } from "../../services/cadastroService";
import { ViaCepService } from "../../services/viaCepService";
import { LoadingStore } from "../../store/loadingStore";
import { FormValidators } from "../../validations/form-validators";
import { Masks } from "../../validations/masks";

export default function CadastroUsuario() {
  const refSnackBar = useRef<CustomSnackbarRef>();
  const [form, setForm] = useState<CadastroUsuarioModel>({
    formSubmited: false,
    nome: { msgError: FormValidators.msgNotEmpty } as FieldForm,
    cpf: { msgError: FormValidators.msgNotEmpty } as FieldForm,
    endereco: {
      complemento: { msgError: FormValidators.msgNotEmpty } as FieldForm,
      bairro: { msgError: FormValidators.msgNotEmpty } as FieldForm,
      uf: { msgError: FormValidators.msgNotEmpty } as FieldForm,
      cidade: { msgError: FormValidators.msgNotEmpty } as FieldForm,
      cep: { msgError: FormValidators.msgNotEmpty } as FieldForm,
      logradouro: { msgError: FormValidators.msgNotEmpty } as FieldForm,
    },
    telefone: { msgError: "" } as FieldFormArray,
    email: { msgError: "" } as FieldFormArray,
  });

  const formValidade = async (submit: any) => {
    submit.preventDefault();
    console.log(form.email, form.telefone);

    setForm((prev) => {
      return {
        ...prev,
        formSubmited: true,
      };
    });

    const { cpf, telefone, email, endereco, nome } = form;

    if (
      FormValidators.isInvalid(
        [
          cpf,
          nome,
          endereco.bairro,
          endereco.cidade,
          endereco.cep,
          endereco.uf,
        ],
        [email, telefone]
      )
    ) {
      return;
    }

   

    try {
      LoadingStore.change(true);
      const formToSent = prepararJson();
      await CadastroService.post(formToSent);
    } catch (error) {
      LoadingStore.change(false);
      refSnackBar.current?.onClick({
        message: "Erro ao tentar acessar o serviço",
        error: true,
      });
    }
    LoadingStore.change(false);
  };

  const setEnedereco = (
    value: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const cepSemMask = value.target.value.replace(/[-.]/g, "");
    if (cepSemMask.length === 8) {
      ViaCepService.get(cepSemMask).then((value) =>
        setForm({
          ...form,
          endereco: {
            bairro: { value: value.bairro, msgError: "" },
            cidade: { value: value.localidade, msgError: "" },
            logradouro: { value: value.logradouro, msgError: "" },
            uf: { value: value.uf, msgError: "" },
            complemento: { value: value.complemento, msgError: "" },
            cep: { value: Masks.cep(value.cep), msgError: "" },
          },
        })
      );
    } else {
      setForm({
        ...form,
        endereco: {
          ...form.endereco,
          cep: { value: Masks.cep(value.target.value), msgError: "" },
        },
      });
    }
  };

  return (
    <form onSubmitCapture={formValidade} noValidate autoComplete="off">
      <Container maxWidth="md">
        <Paper elevation={3}>
          <Grid
            className="auth-container"
            container
            xs={12}
            justify="space-around"
          >
            <Grid container xs={12}></Grid>

            <Grid
              container
              direction="row"
              justify="space-evenly"
              spacing={2}
              xs={10}
            >
              <Grid xs={6} item={true}>
                <TextField
                  required
                  fullWidth
                  id="filled-basic"
                  label="Nome"
                  variant="outlined"
                  helperText={form.formSubmited && form.nome.msgError}
                  error={form.formSubmited && !!form.nome.msgError}
                  onChange={(value) => {
                    setForm((_) => ({
                      ...form,
                      nome: {
                        value: value.target.value,
                        msgError: nomeValidation(value),
                      },
                    }));
                  }}
                />
              </Grid>

              <Grid xs={6} item={true}>
                <TextField
                  required
                  fullWidth
                  id="filled-basic"
                  label="CPF"
                  variant="outlined"
                  helperText={form.formSubmited && form.cpf.msgError}
                  error={form.formSubmited && !!form.cpf.msgError}
                  onChange={(value) => {
                    setForm((_) => ({
                      ...form,
                      cpf: {
                        value: Masks.cpf(value.target.value),
                        msgError: cpfValidation(value),
                      },
                    }));
                  }}
                  value={form.cpf.value || ""}
                />
              </Grid>

              <Grid container xs={12} spacing={1} item={true}>
                <Grid xs={3} item={true}>
                  <TextField
                    required
                    fullWidth
                    id="filled-basic"
                    label="Endereço"
                    variant="outlined"
                    helperText={form.formSubmited && form.endereco.cep.msgError}
                    error={!!form.endereco.cep.msgError && form.formSubmited}
                    onChange={(value) => {
                      setEnedereco(value);
                    }}
                    value={form.endereco.cep.value || ""}
                  />
                </Grid>
                <Grid xs={3} item={true}>
                  <TextField
                    required
                    fullWidth
                    id="filled-basic"
                    label="Logradouro"
                    variant="outlined"
                    helperText={
                      form.formSubmited && form.endereco.logradouro.msgError
                    }
                    error={
                      !!form.endereco.logradouro.msgError && form.formSubmited
                    }
                    onChange={(value) => {
                      setForm(({ endereco }) => ({
                        ...form,
                        endereco: {
                          ...endereco,
                          logradouro: {
                            value: value.target.value,
                            msgError: FormValidators.invalidField(
                              value.target.value
                            ),
                          },
                        },
                      }));
                    }}
                    value={form.endereco.logradouro.value || ""}
                  />
                </Grid>

                <Grid xs={3} item={true}>
                  <TextField
                    required
                    fullWidth
                    id="filled-basic"
                    label="Bairro"
                    variant="outlined"
                    helperText={
                      form.formSubmited && form.endereco.bairro.msgError
                    }
                    error={!!form.endereco.bairro.msgError && form.formSubmited}
                    value={form.endereco.bairro.value || ""}
                    onChange={(value) => {
                      setForm(({ endereco }) => ({
                        ...form,
                        endereco: {
                          ...endereco,
                          bairro: {
                            value: value.target.value,
                            msgError: FormValidators.invalidField(
                              value.target.value
                            ),
                          },
                        },
                      }));
                    }}
                  />
                </Grid>

                <Grid xs={2} item={true}>
                  <TextField
                    required
                    fullWidth
                    id="filled-basic"
                    label="Cidade"
                    variant="outlined"
                    helperText={
                      form.formSubmited && form.endereco.cidade.msgError
                    }
                    error={!!form.endereco.cidade.msgError && form.formSubmited}
                    value={form.endereco.cidade.value || ""}
                    onChange={(value) => {
                      setForm(({ endereco }) => ({
                        ...form,
                        endereco: {
                          ...endereco,
                          cidade: {
                            value: value.target.value,
                            msgError: FormValidators.invalidField(
                              value.target.value
                            ),
                          },
                        },
                      }));
                    }}
                  />
                </Grid>

                <Grid xs={1} item={true}>
                  <TextField
                    required
                    fullWidth
                    id="filled-basic"
                    label="UF"
                    variant="outlined"
                    helperText={form.formSubmited && form.endereco.uf.msgError}
                    error={!!form.endereco.uf.msgError && form.formSubmited}
                    value={form.endereco.uf.value || ""}
                    onChange={(value) => {
                      setForm(({ endereco }) => ({
                        ...form,
                        endereco: {
                          ...endereco,
                          uf: {
                            value: value.target.value,
                            msgError: FormValidators.invalidField(
                              value.target.value
                            ),
                          },
                        },
                      }));
                    }}
                  />
                </Grid>
              </Grid>

              <Grid xs={12} item={true}>
                <TextField
                  required
                  fullWidth
                  id="filled-basic"
                  label="Complemento"
                  variant="outlined"
                  onChange={(value) => {
                    setForm(({ endereco }) => ({
                      ...form,
                      endereco: {
                        ...endereco,
                        complemento: {
                          value: value.target.value,
                          msgError: "",
                        },
                      },
                    }));
                  }}
                />
              </Grid>

              <Grid container xs={6} justify="space-around" direction="row">
                <ChipsArray
                  label="Números"
                  add={(list) => {
                    console.log(list);
                    listValidation(list, "Telefone", "telefone");
                  }}
                  listSelect={[
                    { text: "📱", mask: Masks.celular },
                    { text: "🏦", mask: Masks.telFixo },
                    { text: "🏠", mask: Masks.telFixo },
                  ]}
                ></ChipsArray>
              </Grid>

              <Grid container xs={6} justify="space-around" direction="row">
                <ChipsArray
                  label="Email"
                  add={(list) => {
                    console.log(list);
                    listValidation(list, "E-mail", "email");
                  }}
                ></ChipsArray>
              </Grid>
            </Grid>

            <Grid container xs={12}></Grid>

            <Grid container direction="row" justify="space-between" xs={11}>
              <Grid item={true} xs={5}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Cadastrar
                </Button>
              </Grid>

              <Grid item={true} xs={5}>
                <Button fullWidth variant="contained" color="secondary">
                  Voltar
                </Button>
              </Grid>
            </Grid>
            <CustomSnackbar ref={refSnackBar} />
          </Grid>
        </Paper>
      </Container>
    </form>
  );

  function prepararJson() {
    const formToSent = FormValidators.cadastroUsuarioToHTPP(form);
    formToSent.cpf = FormValidators.justNumbers(formToSent.cpf);
    formToSent.endereco.cep = FormValidators.justNumbers(formToSent.endereco.cep);
    formToSent.telefone = formToSent.telefone.map(FormValidators.justNumbers);
    return formToSent;
  }

  function listValidation(
    list: any[],
    nomeDoElemento: string,
    fieldName: string
  ) {
    if (list && list.length === 0) {
      setForm((_) => ({
        ...form,
        [fieldName]: {
          value: list.map((item) => item.text),
          msgError: FormValidators.setMsgSelect(nomeDoElemento),
        },
      }));
    } else {
      setForm((_) => ({
        ...form,
        [fieldName]: {
          value: list.map((item) => item.text),
          msgError: "",
        },
      }));
    }
  }

  function nomeValidation(
    value: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): string | null | undefined {
    return [
      FormValidators.invalidField(value.target.value),
      FormValidators.invalidLengthdMin(value.target.value, 3),
      FormValidators.invalidLengthMax(value.target.value, 100),
    ].find((res) => !!res);
  }

  function cpfValidation(
    value: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): string | null | undefined {
    return [FormValidators.invalidField(value.target.value)].find(
      (res) => !!res
    );
  }
}

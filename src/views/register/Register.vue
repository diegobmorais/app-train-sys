<template>
    <Form @submit="cadastrarNovoUsuario" :validation-schema="validateSchema">
        <div class="container">
            <div class="row">
                <img src="../../components/img/logo-trainsys.png" class="img-fluid pb-4" alt="img logo">
                <div class="col">
                    <div class="form-outline">
                        <label class="form-label" for="formName">Nome completo</label>
                        <Field name="name" v-model="name" type="text" id="formName" class="form-control" />
                        <div class="msg-error campo-error">
                            <ErrorMessage name="name" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-outline mb-4 mt-1">
                <label class="form-label" for="formEmail">Email</label>
                <Field name="email" v-model="email" type="text" id="formEmail" class="form-control" />
                <div class="msg-error campo-error">
                    <ErrorMessage name="email" />
                </div>
            </div>
            <div class="form-outline mb-2">
                <label class="form-label" for="formPassword">Senha</label>
                <Field name="password" v-model="password" type="password" id="formPassword" class="form-control" />
                <div class="msg-error campo-error">
                    <ErrorMessage name="password" />
                </div>
            </div>
            <div class="form-outline mb-4">
                <label class="form-label" for="formConfirmPassword"> Confirmar senha</label>
                <Field name="confirmPassword" v-model="confirmPassword" type="password" id="formConfirmPassword"
                    class="form-control" />
                <div class="msg-error campo-error">
                    <ErrorMessage name="confirmPassword" />
                </div>
            </div>
            <div class="form-outline mb-4">
                <label class="form-label" for="formPlano">Plano</label>
                <Field name="type_plan" v-model="type_plan" as="select" class="form-select form-select-sm"
                    aria-label=".form-select-sm example">
                    <option value="Selecione" disabled>Selecione...</option>
                    <option value="bronze" selected>Broze</option>
                    <option value="silver">Prata</option>
                    <option value="gold">Ouro</option>
                </Field>
                <div class="msg-error campo-error">
                    <ErrorMessage name="type_plan" />
                </div>
            </div>
            <button type="submit" class="btn btn-success btn-block mb-4">Cadastre-se</button>
        </div>
    </Form>
</template>

<script>
import axios from 'axios';
import { Form, Field, ErrorMessage, } from 'vee-validate'
import * as yup from 'yup';

export default {
    name: "Register",
    components: {
        Form,
        Field,
        ErrorMessage,
    },

    data() {
        return {
            dados: [],
            name: "",
            email: "",
            password: "",
            type_plan: "",
            confirmPassword: "",

            validateSchema: yup.object().shape({
                name: yup.string().required("Preenchimento Obrigaótio *"),

                email: yup.string().email('O email informado não é valido').required("Preenchimento Obrigaótio *"),

                password: yup.string().required("Preenchimento Obrigaótio *").min(8, 'Senha deve conter mais de 8 caracteres').max(20),

                confirmPassword: yup.string()
                    .oneOf([yup.ref('password'), null], 'As senhas devem coincidir')
                    .required('Confirme sua senha'),

                type_plan: yup.string().required('Selecione um plano').oneOf(['bronze', 'silver', 'gold'], 'Plano inválido'),
            })
        }
    },

    methods: {

        cadastrarNovoUsuario() {

            axios({
                url: 'http://localhost:3000/users',
                method: 'POST',
                data: {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    type_plan: this.type_plan
                }
            })

                .then(() => {
                    alert('Usuário cadastrado com sucesso')
                    this.$router.push('/')

                        .catch(() => {
                            alert('Não foi possível criar a conta nesse momento')
                        })
                })

        },
    },

}


</script>

<style scoped>
.container {
    max-width: 30%;
}

.msg-error {
    color: #dc3545;
    font-size: 14px;
    margin-top: 4px;
}

/* Exemplo de estilo para borda vermelha no campo de erro */
.campo-error.is-invalid {
    border-color: #dc3545;
}
</style>
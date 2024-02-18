<template>
    <section class="vh-100">
        <div class="container-fluid h-custom">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-md-9 col-lg-6 col-xl-5">
                    <img src="../../components/img/logo-trainsys.png" class="img-fluid" alt="img logo">
                </div>
                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <form @submit.prevent="fazerLogin">
                        <!-- Email input -->
                        <div class="form-outline mb-4">
                            <span class="error">{{ erros.email }}</span>
                            <input name="emails" type="email" id="formEmail" class="form-control form-control-lg"
                                placeholder="Entre com email valido" v-model="usuario.email" />
                            <label class="form-label" for="formEmail">Endereço de email</label>


                        </div>

                        <!-- senha input -->
                        <div class="form-outline mb-3">
                            <span class="error">{{ erros.password }}</span>
                            <input name="password" type="password" id="formPassword" class="form-control form-control-lg"
                                placeholder="Senha" v-model="usuario.password" />
                            <label class="form-label" for="formPassword">Senha</label>


                        </div>

                        <div class="d-flex justify-content-between align-items-center">
                            <!-- Checkbox -->
                            <div class="form-check mb-0">
                                <input class="form-check-input me-2" type="checkbox" value="" id="formCheckBox" />
                                <label class="form-check-label" for="formCheckBox">
                                    Lembrar-me
                                </label>
                            </div>
                            <a class="text-body">Esqueceu sua senha?</a>
                        </div>

                        <div class="text-center text-lg-start mt-4 pt-2">
                            <button type="submit" class="btn btn-success btn-lg"
                                style="padding-left: 2.5rem; padding-right: 2.5rem;">Entrar</button>
                            <p class="small fw-bold mt-2 pt-1 mb-0">Ainda não possui uma conta?> <router-link
                                    to="/cadastro"><a class="link-danger">Registrar</a></router-link></p>
                        </div>
                        <span class="error">{{ erros.erroLogin }}</span>
                    </form>
                </div>
            </div>
        </div>
        <div
            class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-success">
            <!-- Copyright -->
            <div class="text-white mb-3 mb-md-0">
               Copyright © 2023. TrainSYS by Diego Batista.
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    name: "Login",

    data() {
        return {
            usuario: {
                email: "",
                password: "",

            },
            erros: {
                email: '',
                password: '',
                erroLogin: "",
            },
        }
    },

    components: {

    },
    methods: {
        async fazerLogin() {
            // Limpar mensagens de erro
            this.erros.email = '';
            this.erros.password = '';
            this.erroLogin = '';

            // Validação dos campos
            if (!this.usuario.email) {
                this.erros.email = 'Por favor, entre com seu endereço email *';
            }
            if (!this.usuario.password) {
                this.erros.password = 'Por favor, insira sua Senha*';
            }

            if (this.usuario.email && this.usuario.password) {
                try {
                    // Enviar a requisição de login
                    const response = await axios.post('http://localhost:3000/sessions', this.usuario)

                    if (response.status == 200) {
                        localStorage.setItem('user-info', JSON.stringify(response.data));
                        this.$router.push('/dashboard');
                    }

                } catch (error) {
                    if (error.response && error.response.status === 401 || error.response && error.response.status === 500) {
                        this.erros.erroLogin = 'Você não possui usuário cadastrado';
                        console.log('Credenciais inválidas')

                    }
                }
            }
        },
    },
}

</script>

<style scoped>
.divider:after,
.divider:before {
    content: "";
    flex: 1;
    height: 1px;
    background: #eee;
}

.h-custom {
    height: calc(100% - 73px);
}

@media (max-width: 450px) {
    .h-custom {
        height: 100%;
    }
}

.error {
    color: rgb(253, 2, 2);

}
</style>
<template>
    <Navbar />
    <form>
        <div class="container">
            <div class="row pt-5">
                <h1>Cadastro de novos alunos</h1>
                <div class="col pt-5">
                    <div class="form-outline">
                        <label class="form-label" for="formName">Nome Completo</label>
                        <input type="text" id="formName" class="form-control" v-model="name" />
                    </div>
                </div>
                <div class="col pt-5">
                    <div class="form-outline">
                        <label class="form-label" for="formEmail">Email</label>
                        <input type="text" id="formEmail" class="form-control" v-model="email" />
                    </div>
                </div>
            </div>
            <div class="row pt-4">
                <div class="col">
                    <div class="form-outline">
                        <label class="form-label" for="formContato">Contato</label>
                        <input type="text" id="formContato" class="form-control" v-model="contact" />
                    </div>
                </div>
                <div class="col">
                    <div class="form-outline">
                        <label class="form-label" for="formData">Data de nascimento</label>
                        <input type="date" id="formData" class="form-control" v-model="date_birth" />
                    </div>
                </div>
            </div>
            <div class="row pt-4 w-100">
                <div class="col">
                    <div class="form-outline">
                        <label class="form-label" for="formCEP">CEP</label>
                        <input type="text" id="formCEP" class="form-control" v-model="cep"/>
                    </div>
                </div>
                <div class="col">
                    <div class="form-outline">
                        <label class="form-label" for="FormLogradouro">Logradouro</label>
                        <input type="text" id="FormLogradouro" class="form-control" v-model="street" />
                    </div>
                </div>
                <div class="col">
                    <div class="form-outline w-50">
                        <label class="form-label" for="formNumber">Nº</label>
                        <input type="text" id="formNumber" class="form-control" v-model="number" />
                    </div>
                </div>
            </div>
            <div class="row pt-4">
                <div class="col">
                    <div class="form-outline">
                        <label class="form-label" for="formCEP">Estado</label>
                        <input type="text" id="formCEP" class="form-control" v-model="province"/>
                    </div>
                </div>
                <div class="col">
                    <div class="form-outline">
                        <label class="form-label" for="FormLogradouro">Cidade</label>
                        <input type="text" id="FormLogradouro" class="form-control" v-model="city" />
                    </div>
                </div>
                <div class="col">
                    <div class="form-outline">
                        <label class="form-label" for="formCEP">Bairro</label>
                        <input type="text" id="formCEP" class="form-control" v-model="neighborhood"/>
                    </div>
                </div>
                <div class="col">
                    <div class="form-outline">
                        <label class="form-label" for="FormLogradouro">Complemento</label>
                        <input type="text" id="FormLogradouro" class="form-control" v-model="complement"/>
                    </div>
                </div>
            </div>
            <div class="pt-5">
                <button type="submit" class="btn btn-success btn-block mb-4"
                    @click="registerNewStudent">Cadastre-se</button>
                <button type="button" @click="voltar" class="btn btn-warning btn-block mb-4 mx-2">Voltar</button>
            </div>
        </div>
    </form>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import axios from 'axios';

export default {
    name: "RegisterNewStudent",

    data() {
        return {
            name: "",
            email: "",
            contact: "",
            date_birth: "",
            cep: "",
            street: "",
            number: "",
            neighborhood: "",
            city: "",
            province: "",
            complement: "",
        }
    },

    component: {
        Navbar,
    },

    methods: {
        registerNewStudent() {
            axios({
                url: 'http://localhost:3000/students',
                method: 'POST',
                data: {
                    name: this.name,
                    email: this.email,
                    contact: this.contact,
                    date_birth: this.date_birth,
                    cep: this.cep,
                    street: this.street,
                    number: this.number,
                    neighborhood: this.neighborhood,
                    city: this.city,
                    province: this.province,
                    complement: this.complement,
                }
            })

                .then(() => {
                    alert('Cadastrado com sucesso!')
                    this.$router.push('/aluno')
                })
                .catch(() => {
                    alert('Não foi possível cadastrar o usuário')
                })
        },
        voltar(){
            this.$router.push('aluno')
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 50%;
}
</style>
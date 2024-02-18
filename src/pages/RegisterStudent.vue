<template>
    <navbar></navbar>
    <div class="container py-4">
        <div class="row">
            <div class="col">
                <div class="h-100 p-5 bg-light border rounded-3">
                    <div class="row w-100">
                        <div class="col">
                            <h2 class="bi bi-award-fill text-success"> Alunos</h2>
                        </div>
                        <div class="col d-flex justify-content-end">
                            <button @click="newStudent" class="btn btn-success w-25 h-100  p-1" type="button">Novo</button>
                        </div>
                    </div>
                    <hr>
                    <Form class="row w-100 d-flex" @submit="findStudent" :validation-schema="validateSchema">
                        <div class="form-group col w-75%">
                            <Field name="studentName" type="text" class="form-control" placeholder="Nome do aluno"
                                v-model="studentName" />
                                <div class="msg-error campo-error">
                                    <ErrorMessage name="studentName" />
                                </div>
                        </div>
                        <div class="col w-25%">
                            <button class="btn btn-outline-dark me-3"  type="submit">Pesquisar</button>
                            <button class="btn btn-outline-dark" @click="cleanSearch" type="button">Limpar</button>
                        </div>
                    </Form>
                </div>
            </div>
            <div class="container mt-5">
                <table class="table table-striped table-success">
                    <thead>
                        <tr>
                            <th class="font-weight-bold">Nome</th>
                            <th class="font-weight-bold">Email</th>
                            <th class="font-weight-bold">Telefone</th>
                            <th class="font-weight-bold">Data de Aniversário</th>
                            <th class="font-weight-bold">CEP</th>
                            <th class="font-weight-bold">Rua</th>
                            <th class="font-weight-bold">Bairro</th>
                            <th class="font-weight-bold">Cidade</th>
                            <th class="font-weight-bold">Estado</th>
                            <th class="font-weight-bold">Complemento</th>
                            <th class="font-weight-bold">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="d in dadosFiltrados" :key="d.id">
                            <td>{{ d.name }}</td>
                            <td>{{ d.email }}</td>
                            <td>{{ d.contact }}</td>
                            <td>{{ d.date_birth }}</td>
                            <td>{{ d.cep }}</td>
                            <td>{{ d.street }}</td>
                            <td>{{ d.neighborhood }}</td>
                            <td>{{ d.city }}</td>
                            <td>{{ d.province }}</td>
                            <td>{{ d.complement }}</td>

                            <td>
                                <button @click="setupTraining(d.id)" class="btn btn-outline-dark mt-2 w-100 text-success"
                                    type="button">Montar
                                    treino</button>
                                <button @click="showTraining(d.id, d.name)"
                                    class="btn btn-outline-dark mt-2 w-100 text-success" type="button">Ver</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
  
<script>
import Navbar from '../components/Navbar.vue';
import {Form, Field, ErrorMessage, } from 'vee-validate'
import * as yup from 'yup';

export default {
    name: 'RegisterStudent',

    data() {
        return {
            dados: [],
            studentName: "",
            dadosFiltrados: [],

            validateSchema: yup.object().shape({
                studentName: yup.string().required("Digite o nome do aluno *"),

            })
        }
    },

    components: {
        Navbar,
        Field,
        Form,
        ErrorMessage
    },

    mounted() {
        this.dadosFiltrados = [...this.dados]
        this.listStudent()
        this.findStudent()
    },



    methods: {
        cleanSearch() {
            window.location.reload()
        },

        newStudent() {
            this.$router.push('/cadastro-de-novos-alunos')
        },
        setupTraining(id) {
            this.$router.push(`/criar-treino/${id}`)

        },
        showTraining(id, name) {
            this.$router.push({ path: `/ver-treino/${id}`, query: { name } })
        },

        listStudent() {
            fetch('http://localhost:3000/students')
                .then(response => response.json())
                .then(response => {
                    this.dados = this.dadosFiltrados = response.students

                });
        },
        findStudent() {
            const name = this.studentName.toLowerCase();
            this.dadosFiltrados = this.dados.filter(aluno => aluno.name.toLowerCase().includes(name));

        },
    },
}
</script>
  
<style scoped>
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
  
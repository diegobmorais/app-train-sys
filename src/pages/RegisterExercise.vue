<template>
    <navbar></navbar>
    <div class="container py-4">
        <div class="row">
            <div class="col">
                <div class="h-100 p-5 bg-light border rounded-3">
                    <h2 class="bi bi-award-fill text-success"> Exercício</h2>
                    <div class="row">
                        <div class="col">
                            <div class="form-group" >
                                <input type="text" class="form-control" placeholder="Nome do exercício"
                                    v-model="description">
                                    <div class="msg-erro">
                                        {{ menssageErro }}
                                    </div>
                                <small class="form-text text-muted">Informe o nome do exercício para registro na base da dados.</small>
                            </div>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col">
                            <button class="btn btn-outline-dark mt-2" @click="registerExercise" type="button">Cadastrar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container mt-5">
                <table class="table table-striped table-success">
                    <thead>
                        <tr>
                            <th class="font-weight-bold">Nome</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="d in dados" :key="d.id">
                            <td>{{ d.description }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
  
<script>
import Navbar from '../components/Navbar.vue';
import axios from 'axios';
import { Form, Field, ErrorMessage, } from 'vee-validate'
import * as yup from 'yup';

export default {
    name: 'RegisterExercise',

    data() {
        return {
            dados: [],
            description: [],
            menssageErro: ""
        }
    },

    components: {
        Navbar,
        Form,
        Field,
        ErrorMessage,
    },
    methods: {

        listExercise() {
            fetch('http://localhost:3000/exercises')
                .then(response => response.json())
                .then(response => {
                    this.dados = response;                    
                });
        },

        registerExercise(){
            if(this.description == ''){
                this.menssageErro = "Informe o nome do exercicio *"
            }else{

                axios({
                        url: 'http://localhost:3000/exercises',
                        method: 'POST',
                        data: {
                            description: this.description,                        
                        }
                    })
    
                    .then(() =>{
                        alert('Exercicio cadastrado com sucesso')   
                        window.location.reload()                 
                    })
                    .catch( ()=>{                                       
                            alert('Ocorreu algum problema, tente novamente mais tarde')                    
                    })
            }
        }
    },

    mounted() {
        this.listExercise()
    }
}
</script>
  
<style scoped>
.msg-erro{
    color: rgb(255, 3, 3);
}
</style>
  
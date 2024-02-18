<template>
    <navbar></navbar>
    <div class="container py-4">
        <div class="h-100% p-5 bg-light border rounded-3">
            <div class="pb-5">
                <h2>Bem-vindo, {{ nameUser.name}}</h2>
            </div>

            <div class="row mt-5 d-flex">
                <div class="col-4 p-2 w-50%">
                    <div class="h-75 w-75 p-5 rounded-3 border bg-dark text-white">
                        <p>Alunos</p>
                        <h2>{{dados.amount_students}}</h2>
                    </div>
                </div>

                <div class="col-4 p-2">
                    <div class="h-75 w-75 p-5 rounded-3 border bg-light text-dark">
                        <p>Exercícios</p>
                        <h2>{{dados.amount_exercises}}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>

import Navbar from '../../components/Navbar.vue';

export default {
    name: 'Dashboard',

    data() {
        return {
            dados: "",
            nameUser: '',
        }
    },

    components: {
        Navbar,
    },
    methods: {
        listUser() {
            fetch('http://localhost:3000/dashboard')
                .then(response => response.json())
                .then(response => {
                    this.dados = response;
                    console.log(this.dados)
                });
        }
    },
    mounted() {
        this.listUser()

        const user = localStorage.getItem("user-info") //retorna a chave com os objetos do localstore
        this.nameUser = JSON.parse(user) 
          
    }

}
</script>
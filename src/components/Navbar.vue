<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <div class="container">
            <h1 class="text-light">TrainSys</h1>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item px-4">
                        <router-link to="/dashboard" class="nav-link active" aria-current="page">Home</router-link>
                    </li>
                    <li class="nav-item px-4">
                        <router-link to="/aluno"  class="nav-link">Alunos</router-link>
                    </li>
                    <li class="nav-item px-4">
                        <router-link to="/exercicios" class="nav-link active" aria-current="page">Exercìcios</router-link>
                    </li>
                    <li class="nav-item">
                    <router-link to="/" class="nav-link text-decoration-none">Sair</router-link>
                    </li>
                </ul>                
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Navbar",
    
}
</script>

<style scoped>

</style>
<template>
    <navbar></navbar>
    <div class="row">
        <div class="col">
            <div class="h-100 p-5 bg-light border rounded-3">
                <div class="row w-100">
                    <div class="col">
                        <h2 class="bi bi-award-fill text-success"> Bem vindo, {{ this.$route.query.name }}</h2>
                    </div>
                </div>
                <hr>
                <div class="container">
                    <div class="m-2">
                        <h3>Hoje</h3>                       
                    </div>
                    <div class="input-group mt-3">
                        <div class="input-group-prepend">
                        </div>
                        <div class="col-md-4">
                            <ul v-for="item in training[today]" :key="item" class="list-group">
                                <li><input type="checkbox"> {{ item.exercise_description
                                }} |
                                    {{ item.weight }} kg | {{ item.repetitions }} Repetições |
                                    {{
                                        item.break_time }}min de pausa</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="container mt-5">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="segunda-tab" data-bs-toggle="tab"
                                data-bs-target="#segunda" type="button" role="tab" aria-controls="segunda" @click="activeTab = 0" :class="{ 'active': activeTab === 0 }"
                                aria-selected="true">Segunda</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="terca-tab" data-bs-toggle="tab" data-bs-target="#terca" @click="activeTab = 1" :class="{ 'active': activeTab === 1 }"
                                type="button" role="tab" aria-controls="terca" aria-selected="false">Terça</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="quarta-tab" data-bs-toggle="tab"
                                data-bs-target="#quarta" type="button" role="tab" aria-controls="quarta" @click="activeTab = 2" :class="{ 'active': activeTab === 2 }"
                                aria-selected="false">Quarta</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="quinta-tab" data-bs-toggle="tab"
                                data-bs-target="#quinta" type="button" role="tab" aria-controls="quinta" @click="activeTab = 3" :class="{ 'active': activeTab === 3 }"
                                aria-selected="false">Quinta</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="sexta-tab" data-bs-toggle="tab" data-bs-target="#sexta" @click="activeTab = 4" :class="{ 'active': activeTab === 4 }"
                                type="button" role="tab" aria-controls="sexta" aria-selected="false">Sexta</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="sabado-tab" data-bs-toggle="tab" @click="activeTab = 5" :class="{ 'active': activeTab === 5 }"
                                data-bs-target="#sabado" type="button" role="tab" aria-controls="sabado"
                                aria-selected="false">Sábado</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="domingo-tab" data-bs-toggle="tab" @click="activeTab = 6" :class="{ 'active': activeTab === 6 }"
                                data-bs-target="#domingo" type="button" role="tab" aria-controls="domingo"
                                aria-selected="false">Domingo</button>
                        </li>
                    </ul>
                    <div class="tab-content mt-3">
                        <div v-for="(day, index)  in training" :key="index" class="tab-pane"
                            :class="{ 'active': index === activeTab }">
                            <!-- Conteúdo do dia da semana -->
                            <ul>
                                <li v-for="item in day" :key="item">
                                    <td>Exercício - {{ item.exercise_description }} | </td>
                                    <td>Peso {{ item.weight }} KG | </td>
                                    <td> Repetições - {{ item.repetitions }}</td>
                                    <td>Pausa de {{ item.break_time }}</td>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
    name: 'showTraining',

    data() {
        return {
            days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
            training: [[], [], [], [], [], [], []],
            today: new Date().getDay(),
            activeTab: new Date().getDay(),

        }
    },
    components: {
        Navbar,
    },
    methods: {

        async getDadosAPI() {
            fetch(`http://localhost:3000/workouts?student_id=${this.$route.params.id}`)
                .then(response => response.json())
                .then(response => {
                    console.log(response.workouts)
                    this.organizeWorkoutsByDay(response.workouts);

                });
        },

        organizeWorkoutsByDay(training) {
            training.forEach((trainings) => {
                const dayNumber = parseInt(trainings.day); // Converte a string em número
                // Subtrai 1 para coincidir com os índices de 'this.days'
                const weekDay = dayNumber -1 ;

                if (!isNaN(weekDay) && weekDay >= 0 && weekDay < this.days.length) {
                    this.training[weekDay].push(trainings);
                } else {
                    console.warn(`Dia da semana fora do intervalo: ${dayNumber}`);
                }
            });
        }

    },

    mounted() {

        this.activeTab = this.today
        this.getDadosAPI()

    }

}
</script>

<style scoped>
ul {
    list-style: none;
}
</style>
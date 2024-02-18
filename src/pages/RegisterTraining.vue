<template>
    <Navbar />
    <div class="container pt-2">
        <div class="h-100 p-5 bg-light border rounded-3">
            <div>
                <div>
                    <h2 class="bi bi-award-fill text-success">Treino</h2>
                </div>

                <form @submit.prevent="registerNewTraining">
                    <div>
                        <div class="pt-5">
                            <div class="pt-5">
                                <div class="form-outline">
                                    <label class="form-label" for="formExercicio">Selecione um exercício</label>
                                    <select name="formExercicio" class="form-select" v-model="exercise_id">
                                        <option value="0" disabled selected> Selecione um exercício</option>
                                        <option :value="item.id" v-for="item in exercise" :key="item.id">{{ item.description}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row pt-4">
                            <div class="col">
                                <div class="form-outline">
                                    <label class="form-label" for="formContato">Repetições</label>
                                    <input type="text" id="formContato" class="form-control" v-model="repetitions" />
                                </div>
                            </div>
                            <div class="col">
                                <div class="col">
                                    <div class="form-outline">
                                        <label class="form-label" for="formCEP">Peso(kg)</label>
                                        <input type="number" id="formCEP" class="form-control" v-model="weight" />
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-outline">
                                    <label class="form-label" for="formData">Pausas</label>
                                    <input type="time" id="formData" class="form-control" v-model="break_time" />
                                </div>
                            </div>
                        </div>
                        <div class="row pt-4">
                            <div class="col">
                                <div class="form-outline">
                                    <label class="form-label" for="selectDate">Dia da semana</label>
                                    <select name="selectDate" v-model="day" class="form-select">
                                        <option value="0" selected disabled>Dia da semana</option>
                                        <option value="1">Segunda-Feira</option>
                                        <option value="2">Terça-Feira</option>
                                        <option value="3">Quarta-Feira</option>
                                        <option value="4">Quinta-Feira</option>
                                        <option value="5">Sexta-Feira</option>
                                        <option value="6">Sábado-Feira</option>
                                        <option value="7">Domingo-Feira</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-outline mb-4 pt-4">
                            <textarea class="form-control" id="formMensagem" rows="4" v-model="observations"
                                placeholder="Observações para o treino"></textarea>
                        </div>
                        <div class="pt-5">
                            <button type="submit" class="btn btn-success btn-block mb-4">Registrar</button>
                            <button type="button" class="btn btn-warning btn-block mb-4 mx-3"
                                @click="voltar">Voltar</button>
                        </div>

                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import axios from 'axios';

export default {
    name: "RegisterTraining",

    data() {
        return {
            exercise: {},

                student_id: this.$route.params.id,
                exercise_id: 0,
                repetitions: "",
                weight: "",
                break_time: "",
                observations: "",
                day: "",
            
        }
    },
    components: {
        Navbar,
    },

    methods: {
        registerNewTraining() {
            
           axios({
                url: `http://localhost:3000/workouts?student_id=${this.$route.params.id}`,
                method: 'POST',
                data: {                    
                    
                    student_id: this.student_id,
                    exercise_id: this.exercise_id,
                    repetitions: this.repetitions,
                    weight: this.weight,
                    break_time: this.break_time,
                    day: this.day,
                    observations: this.observations,

                }
            })
                .then(() => {
                    alert('cadastrado com sucesso')
                })
                .catch(error => {
                    alert('Ocorreu algum problema' + error)
                })
        },

        voltar() {
            this.$router.push('/aluno')
        },

        listExercise() {
            fetch('http://localhost:3000/exercises')
                .then(response => response.json())
                .then(response => {
                    this.exercise = response

                    //console.log(this.dados)
                });
        },
    },
    mounted() {
        this.listExercise()
    }
}
</script>

<style scoped>
.container {
    max-width: 40%;
}
</style>
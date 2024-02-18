import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from "../views/dashboard/Dashboard.vue"
import Login from "../views/login/Login.vue"
import Register from "../views/register/Register.vue"
import RegisterStudent from "../pages/RegisterStudent.vue"
import RegisterExercise from '../pages/RegisterExercise.vue'
import RegisterNewStudent from '../pages/RegisterNewStudent.vue'
import RegisterTraining from '../pages/RegisterTraining.vue'
import showTraining from '../pages/showTraining.vue'

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/cadastro',
    component: Register
  },
  {
    path: '/dashboard',
    component: Dashboard
  },
  {
    path: '/aluno',
    component: RegisterStudent
  },
  {
    path: '/exercicios',
    component: RegisterExercise
  },
  {
    path: '/cadastro-de-novos-alunos',
    component: RegisterNewStudent
  },
  {
    path: '/criar-treino/:id',
    component: RegisterTraining
  },
  {
    path: '/ver-treino/:id',
    component: showTraining,   
    
  },
 
]

const router = createRouter({
  history: createWebHistory(),
  routes //routes: routes
})

export default router
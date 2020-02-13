import Vue from "vue";
import Vuex from "vuex";
import EventService from '@/services/EventService'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            "id": "abc123",
            "name": "Luiz"
        },
        categories: [
            'natureza',
            'animal',
            'brisa',
            'coletivo'
        ],
        events: []
    },
    mutations: {
        ADD_EVENT(state, event) {
            state.events.push(event)
        },
        SET_EVENTS(state, events) {
            state.events = events
        }
    },
    actions: {
        createEvent({ commit }, event) {
            return EventService.postEvent(event).then(() => {
                commit('ADD_EVENT', event)
            })
        },
        fetchEvents({ commit }) {
            EventService.getEvents()
            .then(response => {
                commit('SET_EVENTS', response.data) // <--- set the events data
            })
            .catch(error => {
                console.log('Deu ruim:', error.response)
            })
        }
    },
    getters: {
        eventoPorId: state => id => {
            return state.eventus.find(evento => evento.id===id)
        }
    },
    modules: {}
});

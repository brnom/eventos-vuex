import EventService from '@/services/EventService'

export const state = {
    events: [],
    eventsNum: 0,
    event: {}
}

export const mutations = {
    ADD_EVENT(state, event) {
        state.events.push(event)
    },
    SET_EVENTS(state, events) {
        state.events = events
    },
    SET_NUM(state, num) {
        state.eventsNum = num
    },
    SET_EVENT(state, event){
        state.event = event
    }
}

export const actions = {
    createEvent({ commit }, event) {
        return EventService.postEvent(event).then(() => {
            commit('ADD_EVENT', event)
        })
    },
    fetchEvents({ commit }, {porPag, pag}) {
        EventService.getEvents(porPag, pag)
        .then(response => {
            // console.log('totEventos: ' + response.headers['x-total-count']) //malandramente!
            commit('SET_EVENTS', response.data)
            commit('SET_NUM', response.headers['x-total-count'])
        })
        .catch(error => {
            console.log('Deu ruim:', error.response)
        })
    },
    fetchEvent({ commit, getters }, id) {
        var event = getters.eventoPorId(id)
        if(event){ //evita que faça outra chamada de API, caso evento ja esteja carregado
            commit('SET_EVENT', event)
        }
        else{
            EventService.getEvent(id)
            .then(response => {
                commit('SET_EVENT', response.data)
                //this.event = response.data
            })
            .catch(error => {
                console.log('Deu ruim:', error.response)
            })
        }
    }
}

export const getters = {
    eventoPorId: state => id => {
        return state.events.find(evento => evento.id===id)
    },
    nEventos: state => {
        return state.eventsNum
    }
}
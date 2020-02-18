import EventService from '@/services/EventService'

export const namespaced = true

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
    createEvent({ commit, dispatch }, event) {
        return EventService.postEvent(event).then(() => {
            commit('ADD_EVENT', event)
            const notification = {
                type: 'success',
                message: 'evento criado :)' 
            }
            dispatch('notification/add', notification, { root: true })
        }).catch(error => {
            const notification = {
                type: 'error',
                message: 'erro criando seu evento: ' + error.message
            }
            dispatch('notification/add', notification, { root: true })
            throw error
        })
    },
    fetchEvents({ commit, dispatch }, {porPag, pag}) {
        EventService.getEvents(porPag, pag)
        .then(response => {
            // console.log('totEventos: ' + response.headers['x-total-count']) //malandramente!
            commit('SET_EVENTS', response.data)
            commit('SET_NUM', response.headers['x-total-count'])
        })
        .catch(error => {
            // console.log('Deu ruim:', error.response)
            const notification = {
                type: 'error',
                message: 'erro buscando os eventos: ' + error.message
            }
            dispatch('notification/add', notification, { root: true })
        })
    },
    fetchEvent({ commit, getters, dispatch }, id) {
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
                // console.log('Deu ruim:', error.response)
                const notification = {
                    type: 'error', 
                    message: 'erro buscando o evento: ' + error.message
                }
                dispatch('notification/add', notification, { root: true })
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
export const namespaced = true

export const state = {
    notifications: []
}

let proxId = 1
export const mutations = {
    PUSH(state, notification) {
        state.notifications.push({
            ...notification,
            id: proxId++
        })
    },
    DELETE(state, toRemove) {
        state.notifications = state.notifications.filter(notif => notif.id !== toRemove.id)
    }
}

export const actions = {
    //como estamos um modulo namespaced, nome das ações pode ser generico
    add({ commit }, notification) { 
        commit('PUSH', notification)
    },
    remove({ commit }, toRemove) {
        commit('DELETE', toRemove)
    }
}
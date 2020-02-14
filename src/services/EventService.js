import axios from 'axios'
    
const apiClient = axios.create({  
    baseURL: 'http://localhost:3000',
    withCredentials: false, // This is the default
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
    }
})

export default {
    getEvents(porPag, pag) {
        return apiClient.get('/events?_limit=' + porPag + '&_page=' + pag)
    },
    getEvent(id) {
        return apiClient.get('/events/' + id)
    },
    postEvent(event) {
        return apiClient.post('/events', event)
    }
}

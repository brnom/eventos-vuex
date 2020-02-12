<template>
    <div>
        <h1>Lista de Eventos :]</h1>
        <EventCard v-for="event in events" :key="event.id" :event="event"/>
    </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'

export default {
    components: {
        EventCard
    },
    data() {
        return {
            events: []
        }
    },
    created() {
        EventService.getEvents()
            .then(response => {
                this.events = response.data // <--- set the events data
            })
            .catch(error => {
                console.log('Deu ruim:', error.response)
            })
    }
}
</script>

<style scoped></style>

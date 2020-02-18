<template>
    <div>
        <h1>Eventos pro {{ user.user.name }} :]</h1>
        <EventCard v-for="event in event.events" :key="event.id" :event="event"/>
        <template v-if="page != 1">
            <router-link :to="{ name: 'event-list', query: { page: page-1 } }" rel="prev">
                prev page</router-link>
        </template>
        <template v-if="page != 1 && notFinalPage"> | </template>
        <template v-if="notFinalPage">
            <router-link :to="{ name: 'event-list', query: { page: page+1 } }" rel="next">
                next page</router-link>
        </template>
    </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'
export default {
    components: {
        EventCard
    },
    created() {
        this.$store.dispatch('event/fetchEvents', {
            porPag: 3,
            pag: this.page
        })
    },
    computed: {
        page() {
            return parseInt(this.$route.query.page) || 1 //se n tiver parametros na url, assume que é a 1ª hehe
        },
        notFinalPage() {
            return this.event.eventsNum > this.page*3 //fiz mor gambiarra e era tao simples kkk
        },
        ...mapState(['event', 'user'])
    }
}
</script>

<style scoped></style>

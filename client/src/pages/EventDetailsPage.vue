<script setup>
import { computed, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { eventsService } from '../services/EventsService.js';
import { AppState } from '../AppState.js';


const route = useRoute()
const event = computed(() => AppState.activeEvent)
const account = computed(() => AppState.account)
const ticketHolders = computed(() => AppState.activeEventTickets)
const userHasTicket = computed(() => ticketHolders.value.find(holder => holder.accountId == AppState.account?.id))

async function getEventById() {
    try {
        await eventsService.getEventById(route.params.eventId)
    } catch (error) {
        console.error(error)
    }
}

async function cancelEvent() {
    try {
        await eventsService.cancelEvent(route.params.eventId)
    } catch (error) {
        console.error(error)
    }
}

async function attendEvent() {
    try {
        const eventData = { eventId: route.params.eventId }
        await eventsService.attendEvent(eventData)
    } catch (error) {
        console.error(error)
    }
}

async function getEventTicketHolders() {
    try {
        await eventsService.getEventTicketHolders(route.params.eventId)
    } catch (error) {
        console.error(error)
    }
}

onBeforeMount(() => {
    getEventById()
    getEventTicketHolders()
})

</script>


<template>
    <section class="container">

        <div v-if="event">
            <div class="row justify-content-center">
                <img :src="event.coverImg" alt="" class="cover-img rounded img-fluid">
                <div v-if="account">
                    <div v-if="userHasTicket">You Are Attending</div>
                    <div v-else>You should snaggle a ticket</div>
                </div>
            </div>
            <div class="row">
                <div class="col-8">
                    <h3>{{ event.name }} <span>{{ event.type }}</span></h3>
                    <p>{{ event.description }}</p>
                    <div>
                        <h5>Date and Time</h5>
                        <div>{{ event.startDate.toLocaleDateString() }}</div>
                    </div>
                    <div>
                        <h5>Location</h5>
                        <div><i class="mdi mdi-map-marker"></i>{{ event.location }}</div>
                    </div>
                </div>

                <div class="col-4">
                    <div v-if="event?.isCanceled">
                        <h5>Event Cancelled</h5>
                        <button v-if="event?.creatorId == account?.id" @click="cancelEvent()"
                            class="btn btn-success">Re-open
                            Event</button>
                    </div>
                    <div v-else>
                        <h5>Event Happening!</h5>
                        <button v-if="event?.creatorId == account?.id" @click="cancelEvent()"
                            class="btn btn-danger">Cancel
                            Event</button>
                    </div>
                    <div>
                        <div>Remaining Tickets: {{ event.capacity - event.ticketCount }}</div>
                        <div>Attending: {{ event.ticketCount }} <i class="mdi mdi-account-group"></i></div>
                        <div v-if="account">

                            <button :disabled="event.ticketCount >= event.capacity || event.isCanceled || userHasTicket"
                                @click="attendEvent()" class="btn btn-primary">Attend<i
                                    class="mdi mdi-plus"></i></button>
                        </div>
                    </div>


                    <div v-for="holder in ticketHolders" :key="holder.id">{{ holder.profile.name }}</div>
                </div>
            </div>
        </div>

    </section>
</template>


<style lang="scss" scoped>
.cover-img {
    background-position: center;
    background-size: cover;
    height: 50dvh;
    width: auto;
}
</style>
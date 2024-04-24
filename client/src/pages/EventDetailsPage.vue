<script setup>
import { computed, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { eventsService } from '../services/EventsService.js';
import { AppState } from '../AppState.js';


const route = useRoute()
const event = computed(() => AppState.activeEvent)
const account = computed(() => AppState.account)

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

onBeforeMount(() => getEventById())

</script>


<template>
    <section class="container">

        <div v-if="event">
            <div class="row justify-content-center">
                <img :src="event.coverImg" alt="" class="cover-img rounded img-fluid">
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
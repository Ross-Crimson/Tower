<script setup>
import { computed, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { eventsService } from '../services/EventsService.js';
import { AppState } from '../AppState.js';


const route = useRoute()
const event = computed(() => AppState.activeEvent)

async function getEventById() {
    try {
        await eventsService.getEventById(route.params.eventId)
    } catch (error) {
        error.console(error)
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
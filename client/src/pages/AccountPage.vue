<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import { Event } from "../models/Event.js"
import EventCard from '../components/EventCard.vue';

const account = computed(() => AppState.account)
const tickets = computed(() => AppState.accountTickets)

async function getUserEvents() {
  try {
    await eventsService.getUserEvents()
  } catch (error) {
    console.error(error)
  }
}

async function unattendEvent(eventId) {
  try {
    await eventsService.unattendEvent(eventId)
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(() => getUserEvents())

</script>

<template>
  <div class="about text-center">
    <div v-if="account">
      <h1 class="mb-3">Welcome {{ account.name }}</h1>
      <div class="mb-3">
        <img class="rounded" :src="account.picture" alt="" />
      </div>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>

  <section class="container">
    <!-- <div class="row">
      <h3>Your Events</h3>
    </div> -->

    <div v-if="tickets" class="row">
      <h3>Upcoming Events</h3>
      <div v-for="ticket in tickets" :key="ticket.id" class="col-6 col-md-4 pb-3">
        <div class="text-center">
          <EventCard :event="ticket.event" />
          <button @click="unattendEvent(ticket.id)" class="btn btn-primary">Unattend</button>
        </div>
      </div>
    </div>
  </section>

</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>

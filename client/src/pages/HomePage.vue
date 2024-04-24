<script setup>
import { AppState } from '../AppState.js';
import { computed, onMounted } from 'vue';
import { eventsService } from '../services/EventsService.js';
import EventCard from '../components/EventCard.vue';
import ModalWrapper from '../components/ModalWrapper.vue';
import EventForm from '../components/EventForm.vue';


const account = computed(() => AppState.account)
const events = computed(() => AppState.events)

async function getEvents() {
  try {
    await eventsService.getEvents()
  } catch (error) {
    error.log(error)
  }
}

onMounted(() => getEvents())

</script>

<template>
  <section class="container">
    <div class="row">
      <div>
        <button v-if="account" type="button" class="btn btn-primary" data-bs-toggle="modal"
          data-bs-target="#eventFormModal">
          Create Event
        </button>
      </div>

      <EventForm />

    </div>
    <!-- Event Cards -->
    <div class="row">
      <div></div>
      <div v-for="event in events" :key="event.id" class="col-4">
        <EventCard :event="event" />
      </div>
    </div>

  </section>
</template>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>

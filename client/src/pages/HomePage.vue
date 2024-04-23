<script setup>
import { AppState } from '../AppState.js';
import { computed, onMounted } from 'vue';
import { eventsService } from '../services/EventsService.js';
import EventCard from '../components/EventCard.vue';



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
      <button><i class="mdi mdi-plus-circle"></i>Post Event</button>
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

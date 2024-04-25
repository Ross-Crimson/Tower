<script setup>
import { AppState } from '../AppState.js';
import { computed, onMounted, ref } from 'vue';
import { eventsService } from '../services/EventsService.js';
import EventCard from '../components/EventCard.vue';
import ModalWrapper from '../components/ModalWrapper.vue';
import EventForm from '../components/EventForm.vue';


const account = computed(() => AppState.account)
const events = computed(() => {
  if (filterBy.value == 'all') return AppState.events
  return AppState.events.filter(event => event.type == filterBy.value)
})

const filterBy = ref('all')

const filters = [
  {
    name: 'all',
    icon: `mdi mdi-infinity`
  },
  {
    name: 'concert',
    icon: 'mdi mdi-guitar-electric'
  },
  {
    name: 'convention',
    icon: 'mdi mdi-account-group'
  },
  {
    name: 'sport',
    icon: 'mdi mdi-volleyball'
  },
  {
    name: 'digital',
    icon: 'mdi mdi-desktop-classic'
  }

]

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

    <div v-if="account" class="row justify-content-center">

      <div class="col-12 col-md-5 text-center">

        <div class="d-flex justify-content-center bg-secondary rounded m-4 p-3 prevent-select pointer"
          data-bs-toggle="modal" data-bs-target="#eventFormModal">
          <div class="">
            <i class="mdi mdi-plus text-success fs-3"></i>
          </div>
          <div>
            <h5>Make an Event!</h5>
            <p>Create an Event for people to meet and share hobbies, interests, and activities</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <h5 class="p-3">Explore Categories</h5>
      <div class="col-6 col-md-2 text-center prevent-select" v-for="filterObj in filters" :key="filterObj.name">
        <div @click="filterBy = filterObj.name" role="button" class="border border-success rounded p-2 m-3">
          <div class="text-break">
            {{ filterObj.name }}
          </div>
          <div>
            <i :class="filterObj.icon"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <h5 class="p-3">Upcoming Events</h5>
      <EventForm />

    </div>
    <!-- Event Cards -->
    <div class="row">
      <div></div>
      <div v-for="event in events" :key="event.id" class="col-6 col-md-4">
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

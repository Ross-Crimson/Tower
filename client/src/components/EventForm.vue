<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { eventsService } from '../services/EventsService.js';
import { Modal } from 'bootstrap';

const router = useRouter()

const eventData = ref({
    name: '',
    description: '',
    coverImg: '',
    location: '',
    capacity: '',
    startDate: '',
    type: ''

})

function resetForm() {
    eventData.value = { name: '', description: '', coverImg: '', location: '', capacity: '', startDate: '', type: '' }
}

async function createEvent() {
    try {
        const newEvent = await eventsService.createEvent(eventData.value)
        resetForm()
        Modal.getOrCreateInstance('#eventFormModal').hide()
        router.push({ name: 'EventDetails', params: { eventId: newEvent.id } })

    } catch (error) {
        console.error(error)
    }
}

</script>


<template>
    <div class="container">
        <div class="modal fade" id="eventFormModal" tabindex="-1" aria-labelledby="eventFormModal" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        New Event
                    </div>
                    <div class="modal-body">



                        <form @submit.prevent="createEvent()" class="row justify-content-between">
                            <div class="col-5 pb-3">
                                <label for="event-name">Event Name</label>
                                <input v-model="eventData.name" type="text" class="form-control" id="event-name"
                                    required minlength="3" maxlength="50">
                            </div>


                            <div class="col-5 pb-3">
                                <label>Cover Image</label>
                                <input v-model="eventData.coverImg" type="url" class="form-control">
                            </div>

                            <div class="col-12 pb-3">
                                <label for="event-description">Description</label>
                                <textarea v-model="eventData.description" class="form-control" name="event-description"
                                    id="event-description" cols="30" rows="5" minlength="15"
                                    maxlength="1000"></textarea>
                            </div>


                            <div class="col-12 col-md-6 pb-3">
                                <label for="event-location">Location</label>
                                <input v-model="eventData.location" type="text" class="form-control" id="event-location"
                                    required minlength="1" maxlength="500">
                            </div>

                            <div class="col-6 pb-3">
                                <label for="event-capacity">Capactiy</label>
                                <input v-model="eventData.capacity" type="number" class="form-control"
                                    id="event-capacity" required min="1" max="5000">
                            </div>

                            <div class="col-6 pb-3">
                                <label for="event-date">Date</label>
                                <input v-model="eventData.startDate" type="datetime-local" class="form-control"
                                    id="event-date" required>
                            </div>


                            <div class="col-12 col-md-6 pb-3">
                                <label for="event-type">Type</label>
                                <select v-model="eventData.type" class="form-control" name="" id="event-type" required>
                                    <option value="" disabled selected>Please select event type</option>
                                    <option value="concert">concert</option>
                                    <option value="convention">convention</option>
                                    <option value="sport">sport</option>
                                    <option value="digital">digital</option>
                                </select>
                            </div>

                            <div class="col-12 text-center text-md-end py-3">
                                <button class="btn btn-warning px-4 mx-2" @click="resetForm()">Clear</button>
                                <button class="btn btn-primary" type="submit">Submit</button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<style lang="scss" scoped></style>
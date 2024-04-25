<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { eventsService } from '../services/EventsService.js';
import { AppState } from '../AppState.js';
import { commentsService } from '../services/CommentsService.js';
import CommentCard from '../components/CommentCard.vue';


const route = useRoute()
const event = computed(() => AppState.activeEvent)
const account = computed(() => AppState.account)
const ticketHolders = computed(() => AppState.activeEventTickets)
const userHasTicket = computed(() => ticketHolders.value.find(holder => holder.accountId == AppState.account?.id))

const comments = computed(() => AppState.activeEventComments)

const commentData = ref({
    body: '',
    eventId: route.params.eventId
})

function resetCommentForm() {
    commentData.value = { body: '', eventId: route.params.eventId }
}

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

async function getEventComments() {
    try {
        await commentsService.getEventComments(route.params.eventId)

    }
    catch (error) {
        console.error(error)
    }
}

async function createComment() {
    try {
        await commentsService.createComment(commentData.value)
        resetCommentForm()
    } catch (error) {
        console.error(error)
    }
}

onBeforeMount(() => {
    getEventById()
    getEventTicketHolders()
    getEventComments()
})

</script>


<template>
    <section class="container">

        <div v-if="event">
            <div class="row justify-content-center">
                <img :src="event.coverImg" alt="" class="cover-img img-fluid">
                <div v-if="account" class="text-center fw-bold">
                    <div v-if="userHasTicket">You Are Attending</div>
                    <div v-else>You should snaggle a ticket</div>
                </div>
            </div>

            <div class="row">
                <hr class="my-4">
                <div class="col-12 col-md-8 order-2 order-md-1">
                    <h3 class="m-2 mb-4">{{ event.name }} <span>{{ event.type }}</span></h3>
                    <p class="m-2 mb-4">{{ event.description }}</p>
                    <div class="m-2 mb-4">
                        <h5>Date and Time</h5>
                        <div><i class="mdi mdi-calendar-range"></i>{{ event.startDate.toLocaleDateString() }} at {{
                            event.startDate.toLocaleTimeString() }}</div>
                    </div>
                    <div class="m-2 mb-4">
                        <h5>Location</h5>
                        <div><i class="mdi mdi-map-marker"></i>{{ event.location }}</div>
                    </div>

                    <div class="my-3">
                        <h5>See what people are saying...</h5>
                    </div>

                    <div class="bg-secondary rounded p-3 mb-2">

                        <!-- Post Comment -->
                        <div v-if="account" class="mb-3">
                            <form @submit.prevent="createComment()" class="d-flex flex-column">
                                <textarea v-model="commentData.body" name="comment-body" id="comment-body" cols="30"
                                    rows="5" required minlength="3" placeholder="Talk about the event!"></textarea>
                                <div class="text-end">

                                    <button class="btn btn-primary mt-2" type="submit">Post <i
                                            class="mdi mdi-send"></i></button>
                                </div>
                            </form>
                        </div>

                        <!-- Display Comments -->
                        <div v-if="comments" class="">
                            <div v-for="comment in comments" :key="comment.id">
                                <CommentCard :comment="comment" />
                            </div>
                        </div>

                    </div>
                </div>

                <div class="col-12 col-md-4 order-1 order-md-2">
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
                        <div class="mb-2">Remaining Tickets: {{ event.capacity - event.ticketCount }}</div>
                        <div class="mb-2">Attending: {{ event.ticketCount }} <i class="mdi mdi-account-group"></i></div>
                        <div v-if="account">

                            <button :disabled="event.ticketCount >= event.capacity || event.isCanceled || userHasTicket"
                                @click="attendEvent()" class="btn btn-primary my-2">Attend<i
                                    class="mdi mdi-plus"></i></button>
                        </div>
                    </div>

                    <div v-for="holder in ticketHolders" :key="holder.id">
                        <div class="row">
                            <div class="d-flex bg-secondary">
                                <div class="px-2 py-3">
                                    <img class="img-fluid profile-img-circle" :src="holder.profile.picture" alt="">
                                </div>
                                <div class="px-2 py-3">
                                    {{ holder.profile.name }}
                                </div>
                            </div>
                        </div>
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
    max-height: 50dvh;
    width: auto;
}
</style>
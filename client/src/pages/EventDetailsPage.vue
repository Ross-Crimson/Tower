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

                    <!-- Post Comment -->
                    <div v-if="account">
                        <form @submit.prevent="createComment()" class="d-flex flex-column">
                            <textarea v-model="commentData.body" name="comment-body" id="comment-body" cols="30"
                                rows="5" required minlength="3" placeholder="Talk about the event!"></textarea>
                            <div class="text-end">

                                <button class="btn btn-primary" type="submit">Post <i class="mdi mdi-send"></i></button>
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

                    <div v-for="holder in ticketHolders" :key="holder.id">
                        <div class="row">
                            <div class="col-4">

                                <div>
                                    <img class="img-fluid" :src="holder.profile.picture" alt="">
                                </div>
                            </div>
                            <div class="col-8">
                                {{ holder.profile.name }}
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
    height: 50dvh;
    width: auto;
}
</style>
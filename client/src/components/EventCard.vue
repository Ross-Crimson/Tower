<script setup>

import { Event } from "../models/Event.js"
const props = defineProps({ event: { type: Event, required: true } })

</script>


<template>
    <RouterLink :to="{ name: 'EventDetails', params: { eventId: event.id } }">
        <section>
            <div class="card border m-3">
                <img :src="event.coverImg" alt="" class="card-img-top img-fluid">
                <div class="card-body">
                    <div>
                        {{ event.name }}
                    </div>
                    <div>Hosted By {{ event.creator.name }}</div>
                </div>
            </div>
        </section>
    </RouterLink>
</template>


<style lang="scss" scoped></style>
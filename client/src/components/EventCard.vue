<script setup>

import { Event } from "../models/Event.js"
const props = defineProps({ event: { type: Event, required: true } })

</script>


<template>
    <section>
        <div class="card border m-3 prevent-select">
            <RouterLink :to="{ name: 'EventDetails', params: { eventId: event.id } }">
                <img :src="event.coverImg" alt="" class="card-img-top img-fluid">
                <div class="card-body">
                    <div>
                        {{ event.name }}
                    </div>
                    <div v-if="event.creator">Hosted By {{ event.creator.name }}</div>
                </div>
            </RouterLink>
        </div>
    </section>
</template>


<style lang="scss" scoped>
a {
    color: inherit;
}
</style>
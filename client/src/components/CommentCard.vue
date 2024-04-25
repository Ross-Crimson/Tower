<script setup>
import { computed } from 'vue';
import { Comment } from '../models/Comment.js';
import { AppState } from '../AppState.js';
import { commentsService } from '../services/CommentsService.js';


const props = defineProps({ comment: { type: Comment, required: true } })

const account = computed(() => AppState.account)

async function deleteComment(commentId) {
    try {
        await commentsService.deleteComment(commentId)
    } catch (error) {
        console.error(error)
    }

}

</script>


<template>
    <section class="row">

        <div class="col-2">
            <img class="img-fluid" :src="comment.creator?.picture" :alt="comment.creator.picture">
        </div>
        <div class="col-10">
            <div>
                <h5>
                    {{ comment.creator.name }}
                </h5>
                <p>{{ comment.body }}</p>
                <div v-if="account?.id == comment?.creatorId" class="text-end">
                    <button @click="deleteComment(comment.id)" class="btn btn-danger"><i
                            class="mdi mdi-delete"></i></button>
                </div>
            </div>
        </div>

    </section>
</template>


<style lang="scss" scoped></style>
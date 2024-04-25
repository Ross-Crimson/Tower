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
    <section class="row bg-light rounded m-1">

        <div class="col-12 col-sm-2">
            <div class="m-3">
                <img class="img-fluid" :src="comment.creator?.picture" :alt="comment.creator.picture">
            </div>
        </div>
        <div class="col-12 col-sm-10">
            <div class="mt-2">
                <h5>
                    {{ comment.creator.name }}
                </h5>
                <p>{{ comment.body }}</p>
                <div v-if="account?.id == comment?.creatorId" class="text-end">
                    <button @click="deleteComment(comment.id)" class="btn btn-danger mb-2"><i
                            class="mdi mdi-delete"></i></button>
                </div>
            </div>
        </div>

    </section>
</template>


<style lang="scss" scoped></style>
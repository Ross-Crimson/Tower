import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { api } from "./AxiosService.js"


class CommentsService{
    async deleteComment(commentId) {
        const response = await api.delete(`api/comments/${commentId}`)
        //console.log(response.data, 'deleted')
        const comments = AppState.activeEventComments
        const commentIndex = comments.findIndex(comment => comment.id == commentId)
        if(commentIndex == -1) throw new Error("Comment couldn't be found to be deleted")
        AppState.activeEventComments.splice(commentIndex, 1)
    }
    async createComment(commentData) {
        const response = await api.post(`api/comments`, commentData)
        const newComment = new Comment(response.data)
        AppState.activeEventComments.unshift(newComment)
    }
    async getEventComments(eventId) {
        const response = await api.get(`api/events/${eventId}/comments`)
        //console.log(response.data)
        const comments = response.data.map(comment => new Comment(comment))
        AppState.activeEventComments = comments.reverse()
    }

}

export const commentsService = new CommentsService
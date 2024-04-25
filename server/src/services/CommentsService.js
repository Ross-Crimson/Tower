import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"


class CommentsService {
    async deleteComment(commentId, userId) {
        const commentToDelete = await dbContext.Comments.findById(commentId)
        if (!commentToDelete) throw new Error(`Couldn't find comment ${commentId}`)
        if (commentToDelete.creatorId != userId) throw new Forbidden("Cannot delete comments you didn't create")

        await commentToDelete.populate('creator')
        await commentToDelete.deleteOne()

        return `Comment ${commentId} deleted`
    }
    async getEventComments(eventId) {
        const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator')
        return comments
    }

    async createComment(comment) {
        const newComment = await dbContext.Comments.create(comment)
        await newComment.populate('creator')
        return newComment
    }

}

export const commentsService = new CommentsService
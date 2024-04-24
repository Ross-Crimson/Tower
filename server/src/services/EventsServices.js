import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"



class EventsService {
    async editEvent(eventId, eventData) {
        const eventToUpdate = await this.getEventById(eventId)
        if (eventToUpdate.creatorId != eventData.creatorId) throw new Forbidden(`You do not have access to update event: ${eventId}`)

        eventToUpdate.name = eventData.name ?? eventToUpdate.name
        eventToUpdate.description = eventData.description ?? eventToUpdate.description
        //eventToUpdate.isCanceled = eventData.isCanceled
        await eventToUpdate.save()
        return eventToUpdate
    }
    async createEvent(eventData) {
        const event = await dbContext.Events.create(eventData)
        await event.populate('creator')
        return event
    }
    async getEvents() {
        const events = await dbContext.Events.find().populate('creator')
        return events
    }

    async getEventById(eventId) {
        const event = await dbContext.Events.findById(eventId).populate('creator')
        if (!event) throw new Error(`No event found with id ${eventId}`)
        return event
    }

    async destroyEvent(eventId, userId) {
        const eventToDelete = await this.getEventById(eventId)

        if (eventToDelete.creatorId != userId) throw new Forbidden(`canot delete event with id ${eventId}`)

        eventToDelete.isCanceled = !eventToDelete.isCanceled
        await eventToDelete.save()

        return eventToDelete
    }
}

export const eventsService = new EventsService
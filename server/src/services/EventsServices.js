import { dbContext } from "../db/DbContext.js"



class EventsService {
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
}

export const eventsService = new EventsService
import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { Event } from "../models/Event.js"


class EventsService{
    async getEvents() {
        const response = await api.get('api/events')
        console.log(response.data)
        const events = response.data.map(eventData => new Event(eventData))
        console.log(events)
        AppState.events = events
    }
    
    async getEventById(eventId) {
        const response = await api.get(`api/events/${eventId}`)
        const event = new Event(response.data)
        AppState.activeEvent = event
    }
}

export const eventsService = new EventsService
import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { Event } from "../models/Event.js"
import { Ticket } from "../models/Ticket.js"


class EventsService{
    async getEventTicketHolders(eventId) {
        const response = await api.get(`api/events/${eventId}/tickets`)
        const ticketHolders = response.data.map(holder => new Ticket(holder))
        AppState.activeEventTickets = ticketHolders
    }
    async attendEvent(eventData) {
        const response = await api.post('api/tickets', eventData)
        console.log(response.data)
        const ticket = new Ticket(response.data)
        console.log(ticket)
        AppState.activeEvent.ticketCount++
        AppState.activeEventTickets.push(ticket)
    }
    async cancelEvent(eventId) {
        const response = await api.delete(`api/events/${eventId}`)
        //console.log(response.data)
        const updatedEvent = new Event(response.data)

        AppState.activeEvent = updatedEvent
    }

    async createEvent(eventData) {
        const response = await api.post('api/events', eventData)
        //console.log(response.data)
        const event = new Event(response.data)
        AppState.events.push(event)
        return event
    }
    async getEvents() {
        const response = await api.get('api/events')
        //console.log(response.data)
        const events = response.data.map(eventData => new Event(eventData))
        //console.log(events)
        AppState.events = events
    }
    
    async getEventById(eventId) {
        AppState.activeEvent = null
        const response = await api.get(`api/events/${eventId}`)
        const event = new Event(response.data)
        AppState.activeEvent = event
    }
}

export const eventsService = new EventsService
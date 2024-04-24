import { dbContext } from "../db/DbContext.js"



class TicketsService {
    async getUsersTickets(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile event')
        return tickets
    }
    async getUserTickets(userId) {
        const tickets = await dbContext.Tickets.find({ accountId: userId }).populate('profile event')
        return tickets
    }
    async createTicket(ticketData) {
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile event')
        return ticket
    }

}

export const ticketsService = new TicketsService
import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"



class TicketsService {
    async removeTicket(ticketId, userId) {
        const ticketToRemove = await dbContext.Tickets.findById(ticketId)
        if (!ticketToRemove) throw new Error(`not ticket with id: ${ticketId}`)
        if (ticketToRemove.accountId != userId) throw new Forbidden(`Cannot remove ticket that doesn't belong to you`)

        await ticketToRemove.populate('profile event')
        await ticketToRemove.deleteOne()
        return 'Ticket removed'
    }
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
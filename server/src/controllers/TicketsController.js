import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";


export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
            .delete('/:ticketId', this.removeTicket)
    }

    async createTicket(request, response, next) {
        try {
            const user = request.userInfo
            const ticketData = request.body
            ticketData.accountId = user.id
            const ticket = await ticketsService.createTicket(ticketData)
            response.send(ticket)
        } catch (error) {
            next(error)
        }
    }

    async removeTicket(request, response, next) {
        try {
            const userId = request.userInfo.id
            const ticketId = request.params.ticketId
            const ticketToRemove = await ticketsService.removeTicket(ticketId, userId)
            response.send(ticketToRemove)

        } catch (error) {
            next(error)
        }
    }

}
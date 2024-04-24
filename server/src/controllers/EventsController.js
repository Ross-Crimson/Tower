import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsServices.js";
import BaseController from "../utils/BaseController.js";



export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getEvents)
            .get('/:eventId', this.getEventById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.destroyEvent)
    }

    async createEvent(request, response, next) {
        try {
            const user = request.userInfo
            const eventData = request.body
            eventData.creatorId = user.id
            const event = await eventsService.createEvent(eventData)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getEvents(request, response, next) {
        try {
            const events = await eventsService.getEvents()
            response.send(events)
        } catch (error) {
            next(error)
        }
    }

    async getEventById(request, response, next) {
        try {
            const eventId = request.params.eventId
            const event = await eventsService.getEventById(eventId)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }

    async editEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const eventData = request.body

            const userId = request.userInfo
            eventData.creatorId = userId.id

            const event = await eventsService.editEvent(eventId, eventData)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }

    async destroyEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const userId = request.userInfo.id
            const eventToDestroy = await eventsService.destroyEvent(eventId, userId)
            response.send(eventToDestroy)
        } catch (error) {
            next(error)
        }
    }
}
import { Account } from "./Account.js"


export class Comment{
    constructor(data){
        this.id = data.id
        this.creatorId = data.creatorId
        this.eventId = data.eventId
        this.body = data.body
        this.creator = data.creator ? new Account(data.creator) : null
    }
}
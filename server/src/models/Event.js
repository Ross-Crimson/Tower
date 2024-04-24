import { Schema } from "mongoose";



export const EventSchema = new Schema({
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    name: { type: String, required: true, minLength: 3, maxLength: 25 },
    description: { type: String, required: true, minLength: 15, maxLength: 1000 },
    coverImg: { type: String, required: false },
    location: { type: String, required: true, minLength: 1, maxLenght: 500 },
    startDate: { type: Date, required: true },
    capacity: { type: Number, required: true, min: 1, max: 5000 },
    isCanceled: { type: Boolean, required: true, default: false },
    type: { type: String, required: true, enum: ['concert', 'convention', 'sport', 'digital'], default: '' }
}, { timestamps: true, toJSON: { virtuals: true } })

EventSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

EventSchema.virtual('ticketCount', {
    localField: '_id',
    ref: 'Ticket',
    foreignField: 'eventId',
    justOne: false,
    count: true
})
import { reactive } from 'vue'
import { Event } from './models/Event.js'
import { Ticket } from './models/Ticket.js'
// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /** @type {{name, picture, id}} user info from Auth0*/ 
  user: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  /** @type {Event[]} */
  events: [],

  /** @type {Event} */
  activeEvent: null,

  /** @type {Ticket[]} */
  activeEventTickets: []
})

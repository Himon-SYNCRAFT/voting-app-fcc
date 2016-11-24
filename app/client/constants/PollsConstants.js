const keymirror = require('keymirror')

const POLLS_CONSTANTS = keymirror({
    GET_POLL: null,
    GET_ALL_POLLS: null,
    GET_POLLS_BY_USER: null,
    CREATE_POLL: null,
    DELETE_POLL: null,
    UPDATE_POLL: null,
    ADD_POLL_OPTION: null,
    VOTE: null,
})

module.exports = POLLS_CONSTANTS

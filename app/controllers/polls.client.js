'use strict';

(function() {
    let pollsList = document.querySelector('#polls')
    let apiUrl = 'http://localhost:3000/api/polls'

    function ready(fn) {
        if (typeof fn !== 'function') {
            return
        }

        if (document.readyState === 'complete') {
            return fn()
        }

        document.addEventListener('DOMContentLoaded', fn, false)
    }

    function ajaxRequest(method, url, callback) {
        let xmlHttp = new XMLHttpRequest()

        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                callback(xmlHttp.response)
            }
        }

        xmlHttp.open(method, url, true)
        xmlHttp.send()
    }

    function updatePollsList(data) {
        let polls = JSON.parse(data)

        polls.forEach(poll => {
            let li = document.createElement('li')
            let a = document.createElement('a')
            a.appendChild(document.createTextNode(poll.name))
            li.appendChild(a)
            pollsList.appendChild(li)
        })
    }

    ready(ajaxRequest('GET', apiUrl, updatePollsList))
})()

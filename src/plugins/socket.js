import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import store from '@/stores'
import { getToken } from '@/helpers/auth'
import { getSocketUrl } from '@/helpers/common'

const socketOptions = {
    host: getSocketUrl()
}
const options = {
    // transports: ['polling'],
    transports: ['websocket'],
    path: false,
    // pingInterval: 3000,
    // reconnection: true,
    // path: '/socket.io/'
    auth: {
        'token': getToken()
    }
} //Options object to pass into SocketIO


if (socketOptions.host) {
    Vue.use(new VueSocketIO({
            debug: false,
            connection: SocketIO(socketOptions.host, options),
            vuex: {
                store
                // mutationPrefix: 'CRM_',
                // actionPrefix: 'CRM_'
            }
        })
    )

} else {
    Vue.prototype.$socket = {
        emit() {
        },
        on() {
        }
    }
}

import Vue from 'vue'
import CxltToastr from 'cxlt-vue2-toastr'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'

const options = {
    title: 'Thông báo',
    position: 'bottom-right',
    timeOut: 10000000000,
    icon: '',
    showMethod: 'wobble',
    hideMethod: 'zoomOutRight',
}

Vue.use(CxltToastr, options)
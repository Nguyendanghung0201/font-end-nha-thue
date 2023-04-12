import Vue from 'vue'
import { sprintf } from 'printj'

const jsuri = require('jsuri')
import VueSweetalert2 from 'vue-sweetalert2'
import Swal from 'sweetalert2/src/sweetalert2'
import _ from 'lodash'
import i18n from '@/utils/lang'
import ApiService from '@/utils/api'
import jquery from 'jquery'



window.$ = jquery
window.jQuery = jquery
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timeout: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
        // document.querySelector('body').setAttribute('class', 'swal2-toast-shown swal2-shown')
    },
    didClose: () => {
        // document.querySelector('body').removeAttribute('class')
    },
})
Vue.use(VueSweetalert2);
/**/

    /**/
(function (global, factory) {
    'use strict'
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function ($) {
            return factory($, global, global.document)
        })
    } else if (typeof exports === 'object' && exports) {
        module.exports = factory(require('jquery'), global, global.document)
    } else {
        factory(jQuery, global, global.document)
    }
})(typeof window !== 'undefined' ? window : this, function ($) {
    'use strict'

    let prevKey = -1, prevControl = ''

    function onlyNumbers(event) {
        if (!(event.keyCode == 8                                // backspace
            || event.keyCode == 9                               // tab
            || event.keyCode == 17                              // ctrl
            || event.keyCode == 46                              // delete
            || (event.keyCode >= 35 && event.keyCode <= 40)     // arrow keys/home/end
            || (event.keyCode >= 48 && event.keyCode <= 57)     // numbers on keyboard
            // || (event.keyCode >= 96 && event.keyCode <= 105)    // number on keypad
            || (event.keyCode == 65 && prevKey == 17 && prevControl == event.currentTarget.id))          // ctrl + a, on same control
        ) {
            event.preventDefault()     // Prevent character input
        } else {
            prevKey = event.keyCode
            prevControl = event.currentTarget.id
        }
    }

    $('body')
        .on('click', '[data-action="get-code"][data-type]', function () {
            const elm = $(this),
                type = elm.data('type'),
                token = elm.data('token')
            if (elm.hasClass('disabled')) return
            elm.addClass('disabled')
            ApiService.get('send-code', { token }).then(() => {
                elm.updateTimeout(60, () => {
                    elm.text(i18n.t('theme/alert.get_code'))
                    elm.removeClass('disabled')
                })
            }).catch(() => {

            })
        })
        .on('keypress keydown', 'input.only-key-number', onlyNumbers)
    $.extend($, {
        currentToken: null,
        confirmCodeFromToken(token, title = i18n.t('theme/alert.verification'), enable2Fa = true, enableEmail = true, enableOTP = false) {
            $.currentToken = token
            return $.confirmCode(title, enable2Fa, enableEmail, enableOTP)
        },
        confirmCode(title = i18n.t('theme/alert.verification'), enable2Fa = true, enableEmail = true, enableOTP = false) {
            if (!title) title = i18n.t('theme/alert.verification')
            let html = ''
            if (enableOTP) {
                html += `
                <div class="form-group text-left">
                    <label class="mb-0 font-weight-500 fs-14px">${i18n.t('theme/alert.phone_verification_code')}</label>
                    <div class="form-control-wrap">
                        <div class="form-text-hint">
                            <span data-action="get-code" data-type="otp" class="overline-title btn px-0 text-primary">${i18n.t('theme/alert.get_code')}</span>
                        </div>
                        <input class="form-control swal2-input my-1 only-key-number" type="text" name="codeOTP" maxlength="6" placeholder="******"/>
                    </div>
                    <span class="text-muted fs-13px">
                        ${i18n.t('theme/alert.help_otp')}
                    </span>
                </div>
                `
            }
            if (enableEmail) {
                html += `
                <div class="form-group text-left">
                    <label class="mb-0 font-weight-500 fs-14px">${i18n.t('theme/alert.email_verification_code')}</label>
                    <div class="form-control-wrap">
                        <div class="form-text-hint">
                            <span data-action="get-code" data-token="${$.currentToken}" data-type="email" class="overline-title btn px-0 text-primary">${i18n.t('theme/alert.get_code')}</span>
                        </div>
                        <input class="form-control swal2-input my-1 only-key-number" type="text" name="codeEmail" maxlength="6" placeholder="******"/>
                    </div>
                    <span class="text-muted fs-13px">
                        ${i18n.t('theme/alert.help_email')}
                    </span>
                </div>
                `
                $.currentToken = null
            }
            if (enable2Fa) {
                html += `
                <div class="form-group text-left">
                    <label class="mb-0 font-weight-500 fs-14px">${i18n.t('theme/alert.2fa_verification_code')}</label>
                    <input class="form-control swal2-input my-1 only-key-number" type="text" name="code2Fa" maxlength="6" placeholder="******"/>
                    <span class="text-muted fs-13px">
                        ${i18n.t('theme/alert.help_2fa')}
                    </span>
                </div>
                `
            }
            return Vue.swal.fire({
                title,
                focusConfirm: false,
                html,
                confirmButtonText: i18n.t('theme/alert.confirm_submit'),
                cancelButtonText: i18n.t('theme/alert.confirm_cancel'),
                allowOutsideClick: false,
                allowEscapeKey: false,
                showCancelButton: true,
                reverseButtons: true,
                customClass: {
                    title: 'swal2-title fs-20px font-weight-500 mb-4 mt-2'
                },
                preConfirm() {
                    let code_2fa = $('[name="code2Fa"]').val()
                    let code_email = $('[name="codeEmail"]').val()
                    let code_otp = $('[name="codeOTP"]').val()
                    if (enable2Fa && (!code_2fa || code_2fa.length !== 6)) {
                        return false
                    }
                    if (enableEmail && (!code_email || code_email.length !== 6)) {
                        return false
                    }
                    if (enableOTP && (!code_otp || code_email.length !== 6)) {
                        return false
                    }
                    return { code_2fa, code_email, code_otp }
                }
            })
        },
        /**
         *
         * @param message
         * @param title
         * @param status
         * @param options
         * @return {Promise}
         */
        alert(message, title, status, options) {
            title = title || i18n.t('theme/alert.info_title')
            status = status || 'info'
            if (typeof options != 'object') options = {}
            return Vue.swal.fire(_.extend({}, {
                icon: status,
                title,
                html: message,
                confirmButtonText: i18n.t('theme/alert.close'),
                customClass: {
                    confirmButton: 'btn btn-primary px-10'
                }
            }, options))
        },
        /**
         *
         * @param message
         * @param title
         * @param options
         * @return {Promise}
         */
        confirm(message, title, options) {
            title = title || i18n.t('theme/alert.confirm_title')
            if (typeof options != 'object') options = {}
            return Vue.swal.fire(_.extend({}, {
                icon: 'info',
                title,
                html: message,
                confirmButtonText: i18n.t('theme/alert.confirm_ok'),
                cancelButtonText: i18n.t('theme/alert.confirm_cancel'),
                showCancelButton: true,
                showConfirmButton: true,
                reverseButtons: true,
                customClass: {
                    confirmButton: 'mx-2 btn btn-primary px-3 py-2',
                    cancelButton: 'mx-2 btn btn-light px-3 py-2'
                },
            }, options))
        },
        /**
         *
         * @param {String} message
         * @param {String} title
         * @param {Object} options
         * @returns {Promise|jQuery}
         */
        error(message = 'Có vẻ như đã phát hiện thấy một số lỗi, vui lòng thử lại.', title = i18n.t('theme/alert.error_title'), options = {}) {
            const status = 'error'
            if (typeof options != 'object') options = {}
            return $.alert(message, title, status, options)
        },
        success(message = '', title = i18n.t('theme/alert.success_title'), options = {}) {
            const status = 'success'
            if (typeof options != 'object') options = {}
            return $.alert(message, title, status, options)
        },
        mToast(title, timeout = 4000, icon = 'success') {
            Toast.fire({
                icon,
                title,
                timeout
            })
        },
        aSuccess(title,icon='success'){
            awn.success(title)
        },
        mSuccess(message, timeout = 4000) {
            $.mToast(message, timeout, 'success')
        },
        mError(message, timeout = 4000) {
            $.mToast(message, timeout, 'error')
        },
        mWarning(message, timeout = 4000) {
            $.mToast(message, timeout, 'warning')
        },
        xhrError(res) {
            let { response } = res, errors = []
            if (response) {
                if (response.errors && _.isArray(response.errors) && response.errors.length) {
                    _.forEach(response.errors, function (v) {
                        if (_.isArray(v)) errors = errors.concat([], v)
                        else errors.push(v)
                    })
                } else if (response.message) {
                    errors.push(response.message)
                } else if (response.msg) {
                    errors.push(response.msg)
                } else if (response.error) {
                    errors.push(response.error)
                }
            }
            if (errors.length) {
                $.error(errors[0])
            } else {
                $.error()
            }
        },
        /**
         * Returns TRUE if the first specified array contains all elements
         * from the second one. FALSE otherwise.
         *
         * @param {array} haystack
         * @param {array} need
         *
         * @returns {boolean}
         */
        includes(haystack, need) {
            return need.every(function (value) {
                return (haystack.indexOf(value) >= 0)
            })
        },
        addUrlParams(url, key, value) {
            const uri = new jsuri(url)
            if (typeof key == 'object') {
                _.forEach(key, (v, k) => {
                    uri.replaceQueryParam(k, v)
                })
                return uri.toString()
            }
            return uri.replaceQueryParam(key, value).toString()
        }
    })

    $.sprintf = sprintf

    $.fn.updateTimeout = function (second, callback) {
        const elm = $(this)
        if (this.isTimeout) clearTimeout(this.isTimeout)
        elm.text(i18n.t('theme/alert.wait', { second }))
        if (second < 1) {
            return callback()
        }
        this.isTimeout = setTimeout(() => {
            elm.updateTimeout(second - 1, callback)
        }, 1000)
    }
    $.fn.fixButton = function (action) {
        if (action === 'loading') {
            if (this.data('loading-text')) {
                this.data('original-text', this.html()).html(this.data('loading-text'))
            } else if (!this.children().length) {
                this.data('original-text', this.text())
                const text = '<span class="mr-2 spinner-border spinner-border-sm"></span> ' + this.text()
                this.html(text)
            }
            this.prop('disabled', true)
        }
        if (action === 'reset') {
            if (this.data('original-text')) this.html(this.data('original-text'))
            this.prop('disabled', false)
        }
        return $(this)
    }


})

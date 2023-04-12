// noinspection JSUnresolvedVariable

const VueSlugify = {
    install: function (Vue) {
        Vue.directive('slugify', {
            twoWay: true,
            bind: function (el, binding) {
                el.addEventListener('keyup', function () {
                    const isUpper = binding.modifiers.upper
                    const omission = binding.modifiers.omission || '-'
                    let temp = slugify(this.value, omission)
                    if (isUpper) {
                        this.value = temp.toUpperCase()
                    } else {
                        this.value = temp
                    }
                })
            }
        })
    }
}

function slugify(text, omission = '-') {
    let value = text.toString()
        .replace(/\s+/g, omission) // Replace spaces with -
        .replace(/&/g, omission + 'and' + omission) // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/--+/g, omission) // Replace multiple - with single -
    return value.toLowerCase()
}

if (typeof exports == 'object') {
    module.exports = VueSlugify
} else if (typeof define == 'function' && define.amd) {
    define([], function () {
        return VueSlugify
    })
}
import Vue from 'vue'

Vue.use(VueSlugify)
function ownKeys(object, enumerableOnly) {
    const keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        let symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function (sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
    }
    return keys;
}

function _objectSpread(target) {
    for (let i = 1; i < arguments.length; i++) {
        const source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
            ownKeys(Object(source), true).forEach(function (key) {
                _defineProperty(target, key, source[key]);
            });
        } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
            ownKeys(Object(source)).forEach(function (key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
        }
    }
    return target;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {value: value, enumerable: true, configurable: true, writable: true});
    } else {
        obj[key] = value;
    }
    return obj;
}

import {Vue} from 'bootstrap-vue/src/vue';
import {NAME_FORM_INPUT} from 'bootstrap-vue/src/constants/components';
import {PROP_TYPE_BOOLEAN, PROP_TYPE_NUMBER_STRING, PROP_TYPE_STRING} from 'bootstrap-vue/src/constants/props';
import {arrayIncludes} from 'bootstrap-vue/src/utils/array';
import {attemptBlur} from 'bootstrap-vue/src/utils/dom';
import {eventOn, eventOff, eventOnOff, stopEvent} from 'bootstrap-vue/src/utils/events';
import {sortKeys} from 'bootstrap-vue/src/utils/object';
import {makeProp, makePropsConfigurable} from 'bootstrap-vue/src/utils/props';
import {formControlMixin, props as formControlProps} from 'bootstrap-vue/src/mixins/form-control';
import {formSelectionMixin} from 'bootstrap-vue/src/mixins/form-selection';
import {formSizeMixin, props as formSizeProps} from 'bootstrap-vue/src/mixins/form-size';
import {formStateMixin, props as formStateProps} from 'bootstrap-vue/src/mixins/form-state';
import {formTextMixin, props as formTextProps} from 'bootstrap-vue/src/mixins/form-text';
import {formValidityMixin} from 'bootstrap-vue/src/mixins/form-validity';
import {idMixin, props as idProps} from 'bootstrap-vue/src/mixins/id';
import {listenersMixin} from 'bootstrap-vue/src/mixins/listeners'; // --- Constants ---
// Valid supported input types

const TYPES = ['text', 'password', 'email', 'number', 'url', 'tel', 'search', 'range', 'color', 'date', 'time', 'datetime', 'datetime-local', 'month', 'week']; // --- Props ---

export var props = makePropsConfigurable(sortKeys(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, idProps), formControlProps), formSizeProps), formStateProps), formTextProps), {}, {
    list: makeProp(PROP_TYPE_STRING),
    max: makeProp(PROP_TYPE_NUMBER_STRING),
    min: makeProp(PROP_TYPE_NUMBER_STRING),
    // Disable mousewheel to prevent wheel from changing values (i.e. number/date)
    noWheel: makeProp(PROP_TYPE_BOOLEAN, false),
    step: makeProp(PROP_TYPE_NUMBER_STRING),
    type: makeProp(PROP_TYPE_STRING, 'text', function (type) {
        return arrayIncludes(TYPES, type);
    }),
    maxLength: {
        type: [Number],
        default: null
    },
    counter: {
        type: [Number],
        default: null
    },
})), NAME_FORM_INPUT); // --- Main component ---
// @vue/component

export var BFormInput = /*#__PURE__*/Vue.extend({
    name: NAME_FORM_INPUT,
    // Mixin order is important!
    mixins: [listenersMixin, idMixin, formControlMixin, formSizeMixin, formStateMixin, formTextMixin, formSelectionMixin, formValidityMixin],
    props: props,
    computed: {
        localType: function localType() {
            // We only allow certain types
            const type = this.type;
            return arrayIncludes(TYPES, type) ? type : 'text';
        },
        computedAttrs: function computedAttrs() {
            const type = this.localType,
                name = this.name,
                form = this.form,
                disabled = this.disabled,
                placeholder = this.placeholder,
                required = this.required,
                min = this.min,
                max = this.max,
                step = this.step;
            return {
                id: this.safeId(),
                name: name,
                form: form,
                type: type,
                disabled: disabled,
                placeholder: placeholder,
                required: required,
                autocomplete: this.autocomplete || null,
                readonly: this.readonly || this.plaintext,
                min: min,
                max: max,
                step: step,
                list: type !== 'password' ? this.list : null,
                'aria-required': required ? 'true' : null,
                'aria-invalid': this.computedAriaInvalid
            };
        },
        computedListeners: function computedListeners() {
            return _objectSpread(_objectSpread({}, this.bvListeners), {}, {
                input: this.onInput,
                change: this.onChange,
                blur: this.onBlur
            });
        },
    },
    watch: {
        noWheel: function noWheel(newValue) {
            this.setWheelStopper(newValue);
        },
        counter(newVal) {
            this.setCounter(newVal > 0);
        },
        maxLength(newVal) {
            this.setMaxLength(newVal > 0);
        }
    },
    mounted: function mounted() {
        this.setWheelStopper(this.noWheel);
        this.setCounter(this.counter > 0);
        this.setMaxLength(this.maxLength > 0)
    },

    /* istanbul ignore next */
    deactivated: function deactivated() {
        // Turn off listeners when keep-alive component deactivated

        /* istanbul ignore next */
        this.setWheelStopper(false);
        this.setCounter(false);
        this.setMaxLength(false);
    },

    /* istanbul ignore next */
    activated: function activated() {
        // Turn on listeners (if no-wheel) when keep-alive component activated

        /* istanbul ignore next */
        this.setWheelStopper(this.noWheel);
        this.setCounter(this.counter > 0);
        this.setMaxLength(this.maxLength > 0);
    },
    beforeDestroy: function beforeDestroy() {
        /* istanbul ignore next */
        this.setWheelStopper(false);
        this.setCounter(false);
        this.setMaxLength(false);
    },
    methods: {
        addPixelSuffix(value) {
            if (typeof value == "number") value = value + '';
            if (value.length > 0 && /^[0-9]+$/.test(value)) {
                value += 'px';
            }
            return value;
        },
        onCounter() {
            const input = this.$el;
            let parentNode = input.parentNode, marginRight = 0;
            if (parentNode.classList.contains('input-group')) {
                parentNode = parentNode.parentNode;
                const _append = parentNode.querySelectorAll('.input-group-append');
                if (_append.length) {
                    for (let i = 0; i < _append.length; i++) {
                        marginRight += _append[i].offsetWidth;
                    }
                }
            }
            let childGuest = parentNode.querySelectorAll('.input-counter');
            if (childGuest.length === 0) {
                childGuest = document.createElement("div");
                childGuest.className = 'input-counter';
                parentNode.appendChild(childGuest);
            } else {
                childGuest = childGuest[0];
            }
            if (marginRight > 0) {
                childGuest.style.marginRight = this.addPixelSuffix(marginRight);
            }
            parentNode.classList.add("has-input-counter");
            childGuest.innerHTML = this.localValue.length + ' / ' + this.counter;
        },
        offCounter() {
            const input = this.$el;
            let parentNode = input.parentNode;
            if (parentNode && parentNode.classList.contains('input-group')) {
                parentNode = parentNode.parentNode;
            }
            if (parentNode && parentNode.length) {
                Array.from(parentNode.getElementsByClassName("input-counter")).forEach(element => element.remove());
                parentNode.classList.remove("has-input-counter");
            }

        },
        setCounter(on) {
            const input = this.$el;

            eventOnOff(on, input, 'keyup', on ? this.onCounter : this.offCounter);
            eventOnOff(on, input, 'paste', on ? this.onCounter : this.offCounter);

            // We use native events, so that we don't interfere with propgation
            if (on) {
                this.onCounter()
            } else {
                this.offCounter();
            }
        },
        setMaxLength(on) {
            const input = this.$el;
            eventOnOff(on, input, 'keydown', this.onMaxLength);
        },
        onMaxLength(e) {
            let special = [46, 8, 9, 27, 13, 116];
            if (special.indexOf(e.keyCode) !== -1 ||
                // Ctrl+R
                (e.keyCode === 82 && e.ctrlKey === true) ||
                // Ctrl+A
                (e.keyCode === 65 && e.ctrlKey === true) ||
                // Ctrl+C
                (e.keyCode === 67 && e.ctrlKey === true) ||
                // Ctrl+X
                (e.keyCode === 88 && e.ctrlKey === true) ||
                // home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                return // allow
            }
            if (this.localValue.length > this.maxLength) {
                e.preventDefault();
                return false;
            }
        },
        setWheelStopper: function setWheelStopper(on) {
            const input = this.$el; // We use native events, so that we don't interfere with propagation

            eventOnOff(on, input, 'focus', this.onWheelFocus);
            eventOnOff(on, input, 'blur', this.onWheelBlur);

            if (!on) {
                eventOff(document, 'wheel', this.stopWheel);
            }
        },
        onWheelFocus: function onWheelFocus() {
            eventOn(document, 'wheel', this.stopWheel);
        },
        onWheelBlur: function onWheelBlur() {
            eventOff(document, 'wheel', this.stopWheel);
        },
        stopWheel: function stopWheel(event) {
            stopEvent(event, {
                propagation: false
            });
            attemptBlur(this.$el);
        }
    },
    render: function render(h) {
        return h('input', {
            class: this.computedClass,
            attrs: this.computedAttrs,
            domProps: {
                value: this.localValue
            },
            on: this.computedListeners,
            ref: 'input'
        });
    }
});

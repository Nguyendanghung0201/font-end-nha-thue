<template>
    <div class="dropdown bootstrap-select"
         @keydown.native="keydownArrow"
         :class="[{ 'dropup': upShow, 'show': isOpen, 'disabled': ($attrs.disabled || $attrs.disabled === '') }, dropdownClasses]">
        <b-button class="dropdown-toggle w-100 text-left pr-2 " :class="btnClasses" :variant="btnVariant"
                  :size="btnSize"
                  @click="toggleDropdown">
            <slot name="selectedItem" v-bind="{item: this.getCurrentValue}" v-if="getCurrentValue">
                <span class="w-100 align-center justify-between" v-html="showSelectedTextWithIcon()" />
            </slot>
            <span class="w-100 align-center justify-between" v-else v-html="showSelectedTextWithIcon()" />
        </b-button>
        <div class="dropdown-menu" ref="dropdownItemBox"
             :class="{  'show': isOpen, 'visibility': !dropdownRect.height }">

            <div v-if="search" class="p-1">
                <input class="form-control" type="text" :placeholder="searchPlaceholder"
                       v-bind="$attrs"
                       ref="searchable"
                       v-on="listeners" />
            </div>

            <a class="dropdown-item" ref="dropdownItem" href="javascript:;" :class="{ 'disabled': item.disabled,
                  'active':  isCheckedItem(item),
                  'checked':  (activeIndex === index) && !item.disabled }" v-for="(item, index) in filterData"
               :key="index" @click="chooseItem(item, index)">
                <slot name="itemLabel" v-bind="{item, index}">
                    {{ showItemText(item) }}
                </slot>
            </a>
            <a class="dropdown-item disabled" v-show="!filterData.length">{{ emptyText }}</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BootstrapSelect',
    data() {
        return {
            isOpen: this.isDropdown,
            filterData: this.options,
            chooseData: [],
            activeIndex: -1,
            arrowKey: '',
            dropdownRect: {},
            upShow: false
        }
    },
    inheritAttrs: false,
    props: {
        convertToText: {
            type: Function,
            default(str, item) {
                return str
            }
        },
        isDropdown: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: false
        },
        emptyText: {
            type: String,
            default() {
                return this.$t('theme/dropdown.not_found')
            }
        },
        placeholder: {
            type: String,
            default() {
                return this.$t('theme/dropdown.please_select')
            }
        },
        search: {
            type: Boolean,
            default: false
        },
        size: {
            type: [Number, String],
            default: 0
        },
        options: Array,
        value: [Object, Number, Array, String],
        placement: String,
        keyLabel: {
            type: String,
            default: 'text'
        },
        btnVariant: {
            type: String,
            default: 'outline-light'
        },
        btnSize: {
            type: String,
            default: ''
        },
        dropdownClasses: {
            type: String,
            default: ''
        },
        btnClasses: {
            type: String,
            default: ''
        },
        iconClass: {
            type: String,
            default: 'ni ni-chevron-down'
        },
        iconPlacement: {
            type: String,
            default: 'AFTER'
        },
        searchPlaceholder: {
            type: String,
            default() {
                return this.$t('theme/dropdown.search')
            }
        }
    },
    computed: {
        disabledArrow() {
            const disabledCount = this.filterData.reduce((prevValue, currentValue) => {
                if (currentValue.disabled) prevValue++
                return prevValue
            }, 0)
            return disabledCount === this.filterData.length
        },
        listeners() {
            return {
                ...this.$listeners,
                blur: event => {
                },
                input: event => {
                    const value = event.target.value
                    this._dropdownInput(value)
                },
                change: event => {
                    this.$emit('change', { data: this.chooseData, text: this.value })
                },
                keydown: event => {
                    switch (event.keyCode) {
                        case 13: // enter
                            const index = this.activeIndex < 0 ? 0 : this.activeIndex
                            const item = this.filterData[index] || {}
                            this.chooseItem(item, index)
                            event.preventDefault()
                            break
                        case 38: // up
                        case 40: // down
                            const keyName = event.keyCode === 38 ? 'UP' : 'DOWN'
                            this._selectArrow(keyName)
                            event.preventDefault()
                            break
                    }
                }
            }
        },
        getCurrentValue() {
            if (!this.value || (this.value + '').length < 1) return null
            if (this.multiple) {
                return this.lodash.filter(this.options, v => this.value.indexOf(v.value) >= 0)
            }
            return this.lodash.find(this.options, v => this.value == v.value)
        }
    },
    watch: {
        chooseData(value, oldValue) {
            if (oldValue != value) {
                if (value || (typeof value === 'number' && value === 0)) {
                    if (this.multiple) this.$emit('input', value.map(v => v.value))
                    else this.$emit('input', value[0].value)
                } else {
                    this.$emit('input', null)
                }
            }
        },
        options(value) {
            this.filterData = value
        },
        isOpen(value) {
            if (value && this.search && this.$refs.searchable) {
                this.$nextTick(() => {
                    this.$refs.searchable.focus()
                })
            }
        }
    },
    mounted() {
        this.initSelect()
    },
    destroyed() {
        document.removeEventListener('click', this.hideDropdown, false)
    },
    methods: {
        showSelectedText() {
            const currentValue = this.getCurrentValue
            if (!currentValue || (currentValue + '').length < 1) {
                return this.placeholder
            }
            if (this.multiple) {
                if (this.lodash.isObject(currentValue[0])) return this.lodash.map(currentValue, v => v[this.keyLabel]).join(', ')
                return this.lodash.map(currentValue, v => v).join(', ')
            }

            if (this.lodash.isObject(currentValue)) return this.convertToText(currentValue[this.keyLabel], currentValue)
            return this.convertToText(currentValue, null)
        },
        showItemText(item) {
            if (this.lodash.isObject(item)) return this.convertToText(item[this.keyLabel], item)
            return this.convertToText(item, null)
        },
        isCheckedItem(item) {
            const currentValue = this.getCurrentValue
            if (!currentValue || (currentValue + '').length < 1) return false

            if (this.multiple) {
                if (this.lodash.isObject(currentValue[0])) return this.lodash.findIndex(currentValue, v => v.value == item.value) >= 0
                return this.lodash.findIndex(currentValue, v => v == item) >= 0
            }
            if (this.lodash.isObject(currentValue)) return currentValue.value == item.value
            return currentValue == item

        },
        initSelect() {
            const dropdownRect = this.$refs.dropdownItemBox.getBoundingClientRect()
            const dropdownItemHeight = this.$refs.dropdownItemBox.firstChild.offsetHeight
            const fontSize = parseFloat(window.getComputedStyle(document.body, null).fontSize)
            let upShow = (dropdownRect.bottom + window.scrollY) > document.body.clientHeight
            if (this.size) {
                const size = this.size > this.filterData.length ? this.filterData.length : this.size
                const height = (dropdownItemHeight * size + fontSize + 2) / fontSize
                this.$refs.dropdownItemBox.style.height = `${height}rem`
            }
            if (this.placement) {
                upShow = this.placement === 'top'
            }
            this.upShow = upShow
            this.dropdownRect = dropdownRect
            document.addEventListener('click', this.hideDropdown, false)
        },
        toggleDropdown() {
            this.isOpen = !this.isOpen
            if (!this.isOpen) this.activeIndex = -1
        },
        showDropdown() {
            this.isOpen = true
        },
        hideDropdown(event) {
            if (!this.$el.contains(event.target)) {
                this.activeIndex = -1
                this.isOpen = false
            }
        },
        chooseItem(item, itemIndex) {
            if (item.disabled || !this.isOpen) return
            let index
            if (this.lodash.isObject(item)) {
                index = this.lodash.findIndex(this.chooseData, value => item.value == value.value)
            } else {
                index = this.lodash.findIndex(this.chooseData, value => item == value)
            }
            if (!this.multiple) {
                this.isOpen = false
                this.chooseData = [item]
            } else if (index >= 0) {
                this.chooseData.splice(index, 1)
            } else {
                this.chooseData.push(item)
            }
            this.activeIndex = itemIndex
            this.$emit('change', item.value)
        },
        _dropdownInput(value) {
            let newValue = this.options
            if (value) {
                newValue = newValue.reduce((prevValue, currentValue) => {
                    let text = (currentValue[this.keyLabel] || currentValue).toString().toLowerCase()
                    const index = value.split(/,/g).findIndex(v => (v[this.keyLabel] || v).toString() === text)
                    if (text.includes(value.toLowerCase()) || (this.multiple && index > -1)) {
                        prevValue.push(currentValue)
                    }
                    return prevValue
                }, [])
            }
            if (this.multiple) {
                this.chooseData = value ? value.split(/,/g) : []
            }
            this.filterData = newValue
            this.activeIndex = 0
            this.showDropdown()
            this.$emit('input', value)
        },
        _selectArrow(arrow) {
            let index = this.activeIndex
            const itemCount = this.filterData.length - 1
            if (this.disabledArrow) return
            if (arrow === 'UP') {
                index--
                if (index < 0) index = itemCount
            } else if (arrow === 'DOWN') {
                index++
                if (index > itemCount) index = 0
            }
            this.activeIndex = index
            this.arrowKey = arrow
            this.autoFindItem(index)
        },
        autoFindItem(index) {
            if (index < 0) return
            const item = this.filterData[index] || {}
            if (item.disabled) this._selectArrow(this.arrowKey)
            const currentActiveEl = this.$refs.dropdownItem[index]
            const topValue = index < 1 ? 0 : currentActiveEl.offsetTop || 0
            this.$refs.dropdownItemBox.scrollTo(0, topValue)
        },
        showDropdownIcon() {
            if (this.iconClass) {
                return '<em class="' + this.iconClass + (this.iconPlacement !== 'BEGIN' ? ' ml-auto' : '') + '"></em>'
            }
            return ''
        },
        showSelectedTextWithIcon() {
            let text = '<span class="content">' + this.showSelectedText() + '</span>'
            let icon = this.showDropdownIcon()
            if (this.iconPlacement === 'BEGIN') {
                return icon += text
            }
            return text += icon

        }
    }
}
</script>


<style scoped lang="scss">
.bootstrap-select {
    .dropdown-toggle:after {
        right: 1.3rem;
        top: 1.1rem;
        position: absolute;
    }

    &.show {
        .dropdown-toggle:after {
            transform: rotate(180deg);
        }
    }

    .form-control {
        cursor: pointer;
    }

    .dropdown-item:active,
    .dropdown-item.active {
        color: inherit;
        background: #f5f5f5;
    }

    .dropdown-item.checked {
        background: #f8f8f8;
    }

    .dropdown-menu {
        width: 100%;
    }

    &.disabled {
        background-color: #fafafa;
        pointer-events: none;
    }
}
</style>

import Vue from 'vue';
import StorageExpired from "@/utils/storage";
import DatePicker from 'vue2-datepicker'
import moment from 'moment'


const dataLocaleMoment = moment.localeData('vi');

DatePicker.props.lang.default = 'en';
DatePicker.props.inputClass.default = 'form-control';
DatePicker.props.formatter.default = () => {
    return {
        //[optional] Date to String
        stringify: (date, format) => {
            return date ? moment(date).format(format) : ''
        },
        //[optional]  String to Date
        parse: (value, format) => {
            return value ? moment(value, format).toDate() : null
        },
        //[optional] getWeekNumber
        getWeek: (date, options) => {
            return date ? moment(date).format('w') : ''
        }
    };
};

DatePicker.locale(StorageExpired.get('locale'), {
    formatLocale: {
        months: dataLocaleMoment.months(),
        monthsShort: dataLocaleMoment.monthsShort(),
        weekdays: dataLocaleMoment.weekdays(),
        weekdaysShort: dataLocaleMoment.weekdaysShort(),
        weekdaysMin: dataLocaleMoment.weekdaysMin(),
        firstDayOfWeek: dataLocaleMoment.firstDayOfWeek(),
        firstWeekContainsDate: 4,
    },
    yearFormat: 'YYYY',
    monthFormat: 'MMMM',
    monthBeforeYear: true
});

Vue.use(DatePicker);

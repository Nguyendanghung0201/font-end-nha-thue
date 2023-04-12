import Editor from '@tinymce/tinymce-vue'
import { getBaseUrl } from '@/helpers/common'

const path = require('path')
const lang_vi = path.resolve(__dirname, '/assets/plugins/tinymce/langs/vi.js')
const IMAGE_UPLOAD_URL = getBaseUrl() + (process.env.VUE_APP_TINYMCE_IMAGE_UPLOAD_URL ?? '/image-upload')
const API_KEY = (process.env.VUE_APP_TINYMCE_API_KEY ?? 'no-api-key')

let defaultPlugins = [
    'advlist autolink lists link image charmap print preview anchor table',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount fullscreen quickbars template'
]
let defaultToolbars = 'fullscreen | undo redo | formatselect | image template | bold italic backcolor table | alignleft aligncenter alignright alignjustify |' +
    'bullist numlist outdent indent | removeformat | '

const  TINYMCE_PLUGIN = {
    INIT(additionPlugins = [], additionToolbar = ''){
        let plugins = [].concat(defaultPlugins, additionPlugins)
        let toolbar = defaultToolbars + ' ' + additionToolbar

        return {
            height: 500,
            menubar: false,
            language_url: lang_vi,
            language: 'vi',
            plugins: plugins,
            toolbar: toolbar,
            images_upload_url: IMAGE_UPLOAD_URL
        }
    },
    API_KEY(){
        return API_KEY
    }
}
export { Editor ,TINYMCE_PLUGIN }
import config from "@/configs/api.js"

export default function assets(string = ""){
    const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gm
    if(regex.test(string)){
        return string
    }
    return config.assets + '/' + string.replace(/^\/|\/$/g, '')
}
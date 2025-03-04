import request from "@/utils/request/index.js"

export function test() {
    return request.request({
        url: '/items',
    })
}

import { localReq } from "./request";

export function loginByUsername(userFrom) {
    return localReq({
        url: '/login',
        method: 'post',
        data: userFrom
    })
}
import { get, post } from '@/api';

export const getRoles = () => {
    return get('/getRoles')
}

export const setRoles = (data) => {
    return post('/setRoles', data)
}
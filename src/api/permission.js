import { get } from '@/api';

export const getRoles = () => {
    return get('/getRoles')
}
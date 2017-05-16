import {PRE_APP} from 'config/app'

export const displayImage = (src) => {
	return `/${PRE_APP}/images/${src}`
}

export const formatDT = (date) => {
	return date.getFullYear() + '-' +
    ('00' + (date.getMonth()+1)).slice(-2) + '-' +
    ('00' + date.getDate()).slice(-2) + ' ' + 
    ('00' + date.getHours()).slice(-2) + ':' + 
    ('00' + date.getMinutes()).slice(-2) + ':' + 
    ('00' + date.getSeconds()).slice(-2)
}
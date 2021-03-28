import axios from 'axios';

const add = async (data) => {
    try {
        const user = await axios.post('/user/add/', data)
        return user.data
    } catch(error) {
        console.log(error)
    }
}
const update = async (params, data) => {
    try {
        const user = await axios.put('/user/update/' + params, data)
        return user.data
    } catch (error) {
        console.log(error)
    }
}
const list = async (signal) => {
    try {
        const user = await fetch('/user/list/', {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            signal : signal
        })
        return user.json()
    } catch (error) {
        console.log(error)
    }
}
const oneUser = async (params ,signal) => {
    try {
        const user = await fetch('/user/one/' + params, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            signal : signal
        })
        return user.json()
    } catch (error) {
        console.log(error)
    }
}
const remove = async (params) => {
    try {
        const user = await axios.delete('/user/delete/' + params)
        return user.data
    } catch (error) {
        console.log(error)
    }
}
export {
    add,
    update,
    list,
    oneUser,
    remove
}
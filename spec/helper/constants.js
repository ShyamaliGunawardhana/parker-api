/**
 * constatnts for jasmine test
 */

const constatnts = {
    apiEndpoint: 'http://localhost:3000',
    getEndpoint: (endpoint) => {
        return {
            set: (value) => ({
                url: constatnts.apiEmdpoint + endpoint + value,
                method: 'get'
            })
        }
    },
    postEndpoint: (endpoint) => {
        return {
            set: (value) => ({
                url: constatnts.apiEmdpoint + endpoint,
                method: 'post',
                data: value
            })
        }
    },
    putEndpoint: (endpoint) => {
        return {
            set: (id, value) => ({
                url: constatnts.apiEmdpoint + endpoint + id,
                method: 'put',
                data: value
            })
        }
    },
    deleteEndpoint: (endpoint) => {
        return {
            set: (id) => ({
                url: constatnts.apiEmdpoint + endpoint + id,
                method: 'delete'
            })
        }
    }
}
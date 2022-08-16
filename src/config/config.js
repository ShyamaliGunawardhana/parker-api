export function configuration() {
    return {
        errorMessage: {
            NOTFOUND: 'cannot find employee with id {}',
            INVALID: 'Invalid employee id {}',
            DELETED: 'Employee is successfully deleted',
            URL_NOTFOUND: 'Requested URL not found'
        },
        status: {
            CREATED: 201,
            UPDATED: 200,
            SUCCESS: 200,
            BAD_REQUEST: 400,
            NOT_FOUND: 404,
            INTERNAL_SERVER_ERROR: 500
        },
        regex: {
            id: '^([0-9a-zA-Z]{24})$'
        },
        DB_URL: 'mongodb://localhost:27017/parker',
        PORT: 3000
    }
}
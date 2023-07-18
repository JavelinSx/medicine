
const { REACT_APP_URL_DEV, REACT_APP_URL_PROD, NODE_ENV } = process.env

class Api {

    constructor(baseUrl, headers) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    async _request({ url, options }) {

        const response = await fetch(this._baseUrl + url, options)
        if (options.responseType === 'arraybuffer') {
            console.log('hello')
            const responseArrayBuffer = await response.arrayBuffer()
            return new Promise((resolve, reject) => {
                responseArrayBuffer.message ? reject(responseArrayBuffer.message) : resolve(responseArrayBuffer)
            })
        } else {
            const responseJson = await response.json()
            return new Promise((resolve, reject) => {
                responseJson.message ? reject(responseJson.message) : resolve(responseJson)
            })
        }
    }

    help(data) {
        return this._request({
            url: `/help`,
            options: {
                method: 'POST',
                credentials: 'include',
                headers: this._headers,
                body: JSON.stringify(data)
            }
        })
    }

    helpMessage(data) {
        return this._request({
            url: `/help-message`,
            options: {
                method: 'POST',
                credentials: 'include',
                headers: this._headers,
                body: JSON.stringify(data)
            }
        })
    }

    getHelpMessage(data) {
        return this._request({
            url: `/info/doctor/help-message/${data}`,
            options: {
                method: 'GET',
                credentials: 'include',
                headers: this._headers,
            }
        })
    }

    deleteHelpMessage(data) {
        return this._request({
            url: `/info/doctor/help-message/delete`,
            options: {
                method: 'POST',
                credentials: 'include',
                headers: this._headers,
                body: JSON.stringify(data)
            }
        })
    }

    login(data) {
        const { login, password, userRoleLogin } = data
        return this._request({
            url: `/signin/${userRoleLogin}`,
            options: {
                method: 'POST',
                credentials: 'include',
                headers: this._headers,
                body: JSON.stringify({ login, password })
            }
        })
    }

    logout() {
        return this._request({
            url: '/signout',
            options: {
                method: 'POST',
                credentials: 'include',
                headers: this._headers,
            }
        })
    }

    getUser(role) {
        return this._request({
            url: `/info/${role}`,
            options: {
                method: 'GET',
                credentials: 'include',
                headers: this._headers,
            }
        })
    }

    getPatients() {
        return this._request({
            url: `/info-all/patients`,
            options: {
                method: 'GET',
                credentials: 'include',
                headers: this._headers,
            }
        })
    }

    getDoctors() {
        return this._request({
            url: `/info-all/doctors`,
            options: {
                method: 'GET',
                credentials: 'include',
                headers: this._headers,
            }
        })
    }

    getRegistrars() {
        return this._request({
            url: `/info-all/registrars`,
            options: {
                method: 'GET',
                credentials: 'include',
                headers: this._headers,
            }
        })
    }

    getNurses() {
        return this._request({
            url: `/info-all/nurses`,
            options: {
                method: 'GET',
                credentials: 'include',
                headers: this._headers,
            }
        })
    }

    createUser(data) {
        const { roleList } = data

        return this._request({
            url: `/create/${roleList}`,
            options: {
                method: 'POST',
                credentials: 'include',
                headers: this._headers,
                body: JSON.stringify(data)
            }
        })
    }

    deleteUser(data) {

        return this._request({
            url: `/delete/${data.role}/${data._id}`,
            options: {
                method: 'POST',
                credentials: 'include',
                headers: this._headers,
            }
        })
    }

    updateUser(data) {
        const { updatedUser, updatedData } = data

        return this._request({
            url: `/update/${updatedUser.role}/${updatedUser._id}`,
            options: {
                method: 'PATCH',
                credentials: 'include',
                headers: this._headers,
                body: JSON.stringify(updatedData)
            }
        })
    }

    createCard(id) {
        return this._request({
            url: `/cards/${id}`,
            options: {
                method: 'POST',
                credentials: 'include',
                headers: this._headers,
                body: ''
            }
        })
    }

    deleteCard(id) {

        return this._request({
            url: `/cards/delete/${id}`,
            options: {
                method: 'POST',
                credentials: 'include',
                headers: this._headers,
                body: ''
            }
        })
    }

    getCards() {
        return this._request({
            url: `/cards/all/info`,
            options: {
                method: 'GET',
                credentials: 'include',
                headers: this._headers,
            }
        })
    }

    getCardsPatient(data) {
        return this._request({
            url: `/cards/${data}`,
            options: {
                method: 'GET',
                credentials: 'include',
                headers: this._headers,
            }
        })
    }

    getCardFile(data) {
        const { cardId, patientId } = data
        return this._request({
            url: `/cards/getFile/${patientId}/${cardId}`,
            options: {
                method: 'GET',
                credentials: 'include',
                headers: this._headers,
                responseType: 'arraybuffer',
            }
        })
    }

    updateCard(data) {
        const cardId = data.get('_id')
        const patientId = data.get('patientId')
        delete this._headers['Content-Type'];
        return this._request({
            url: `/cards/${patientId}/${cardId}`,
            options: {
                method: 'PATCH',
                credentials: 'include',
                headers: this._headers,
                body: data
            }
        })
    }
}

const url = NODE_ENV === 'production' ? REACT_APP_URL_PROD : REACT_APP_URL_DEV

const MainApi = new Api(
    REACT_APP_URL_PROD,
    {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: REACT_APP_URL_PROD,
    }
)

export default MainApi
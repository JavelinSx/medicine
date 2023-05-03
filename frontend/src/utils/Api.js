import {urlDev} from './constant'

class Api {

    constructor(baseUrl, headers){
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    async _request({url, options}){

            const response = await fetch(this._baseUrl + url, options)
            const responseJson = await response.json()
            return new Promise((resolve, reject) => {
                responseJson.message ? reject(responseJson.message) : resolve(responseJson)
            })
        

    }

    login(data){
        const {login, password, userRoleLogin} = data
        return this._request({
            url: `/signin/${userRoleLogin}`,
            options:{
                method: 'POST',
                credentials: 'include',
                headers: this._headers,
                body: JSON.stringify({login, password})
            }
        })
    }

    logout(){
        return this._request({
            url: '/signout',
            options:{
                method: 'POST',
                credentials: 'include',
                headers: this._headers,
            }
        })
    }

    getUser(role){
        return this._request({
            url: `/info/${role}`,
            options:{
                method: 'GET',
                credentials: 'include',
                headers: this._headers,
            }
        })
    }

    getPatients(){
        return this._request({
            url: `/info-all/patients`,
            options:{
                method: 'GET',
                credentials: 'include',
                headers: this._headers,
            }
        })
    }

    getDoctors(){
        return this._request({
            url: `/info-all/doctors`,
            options:{
                method: 'GET',
                credentials: 'include',
                headers: this._headers,
            }
        })
    }

    getRegistrars(){
        return this._request({
            url: `/info-all/registrars`,
            options:{
                method: 'GET',
                credentials: 'include',
                headers: this._headers,
            }
        })
    }

    getNurses(){
        return this._request({
            url: `/info-all/nurses`,
            options:{
                method: 'GET',
                credentials: 'include',
                headers: this._headers,
            }
        })
    }

    createUser(data){
        return this._request({
            url: `/create/${data.userRole}`,
            options:{
                method: 'POST',
                credentials: 'include',
                headers: this._headers,
                body: JSON.stringify(data)
            }
        })
    }

    deleteUser(data){
        console.log(data)
        return this._request({
            url: `/delete/${data.role}/${data._id}`,
            options:{
                method: 'POST',
                credentials: 'include',
                headers: this._headers,
            }
        })
    }

    updateUser(data){

        const {updatedUser, updatedData} = data
        console.log(updatedUser)
        return this._request({
            url: `/update/${updatedUser.role}/${updatedUser._id}`,
            options:{
                method: 'PATCH',
                credentials: 'include',
                headers: this._headers,
                body: JSON.stringify(updatedData)
            }
        })
    }
}

const MainApi = new Api(
    urlDev,
    {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: urlDev,
    }
)

export default MainApi
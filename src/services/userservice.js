import axios from "axios"

export default class UserService {

    BASE_URL = import.meta.env.VITE_APP_BASE_URL;
    #token = localStorage.getItem('token');

    constructor(context) {
        this.context = context;
    }

    login(username, password) {

        return new Promise((resolve, reject) => {

            let data = JSON.stringify({
                "username": username,
                "password": password
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/employee/login`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {

                    this.setItemWithPromise('token', response.data.token).then(() => {

                        resolve(response.data);
                    });

                })
                .catch((error) => {
                    reject(error.message);
                });
        })
    };

    getMe() {

        return new Promise((resolve, reject) => {

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/employee/me`,
                headers: {
                    'Authorization': `Bearer ${this.#token}`
                }
            };

            axios.request(config)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error.message);
                });
        })
    }

    getEmployee() {
       return new Promise((resolve, reject) => {
           
           let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${this.BASE_URL}/imm_hotel/employee`,
            headers: {
                'Authorization': `Bearer ${this.#token}`
            }
        };

        axios.request(config)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject(error.message)
            });
            
        });
    }

    setItemWithPromise = (key, value) => {
        return new Promise((resolve, reject) => {
            try {
                localStorage.setItem(key, value);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    };
}
import axios from "axios"

export default class UserService {

    BASE_URL = import.meta.env.VITE_APP_BASE_URL;

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
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.message);
                });
        }
        )

    }
}
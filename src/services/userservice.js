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
                    reject(error);
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
                    reject(error);
                });
        })
    };

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
                    reject(error)
                });
        });
    };

    createEmployee(employee) {

        return new Promise((resolve, reject) => {

            let data = JSON.stringify({
                "first_name": employee.firstName,
                "last_name": employee.LastName,
                "username": employee.username,
                "password": employee.password
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/employee/create`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.#token}`
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    getEmployeeById(id) {

        return new Promise((resolve, reject) => {

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/employee/${id}`,
                headers: {
                    'Authorization': `Bearer ${this.#token}`
                }
            };

            axios.request(config)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    updateEmployee(employee, employeeId) {
        return new Promise((resolve, reject) => {

            let data = JSON.stringify({
                "first_name": employee.firstName,
                "last_name": employee.lastName,
            });

            let config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/employee/${employeeId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.#token}`
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    deleteEmployee(employeeId) {
        return new Promise((resolve, reject) => {

            let config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/employee/${employeeId}`,
                headers: {
                    'Authorization': `Bearer ${this.#token}`
                }
            };

            axios.request(config)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

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
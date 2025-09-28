import axios from "axios"

export class BookingService {

    #token = localStorage.getItem('token');
    BASE_URL = import.meta.env.VITE_APP_BASE_URL;

    constructor(context) {
        this.context = context;
    }

    /**
     * 
     * @param {FormData} bookingData 
     * @returns 
     */
    create(bookingData) {

        return new Promise((resolve, reject) => {
           

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/booking`,
                headers: {
                  
                    'Authorization': `Bearer ${this.#token}`
                },
                data: bookingData
            };

            axios.request(config)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.response.data);
                });
        })
    };

    getAll() {
        return new Promise((resolve, reject) => {

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/booking`,
                headers: {
                    'Authorization': `Bearer ${this.#token}`
                }
            };

            axios.request(config)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.response.data);
                });

        });
    };

    getByDateRange(start,end){

        const data = JSON.stringify({
            start:start,
            end:end
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${this.BASE_URL}/imm_hotel/booking/range`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.#token}`
            },
            data: data
        };

        return new Promise((resolve, reject) => {
        
            axios.request(config)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.response.data);
                });
        })
    };

    getById(bookingId) {
        return new Promise((resolve, reject) => {

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/booking/ById/${bookingId}`,
                headers: {
                    'Authorization': `Bearer ${this.#token}`
                }
            };

            axios.request(config)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.response.data);
                });
        });
    }

    update(bookingId, bookingData) {
        return new Promise((resolve, reject) => {

            let data = JSON.stringify(bookingData);

            let config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/booking/${bookingId}`,
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
                    reject(error.response.data);
                });
        });
    };

    delete(bookingId) {
        return new Promise((resolve, reject) => {

            let config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/booking/${bookingId}`,
                headers: {
                    'Authorization': `Bearer ${this.#token}`
                }
            };

            axios.request(config)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error.response.data);
                });
        });
    };

    getByRefNumber(refNumber){
        return new Promise((resolve, reject) => {

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/booking/byref/${refNumber}`,
                headers: {
                    'Authorization': `Bearer ${this.#token}`
                },
            };

            axios.request(config)
                .then((response) => {
                    resolve(response.data.data);
                })
                .catch((error) => {
                    reject(error.response.data);
                });
        });
    }

}
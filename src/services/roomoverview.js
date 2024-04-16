import axios from "axios"

export class RoomOverviewService {

    #token = localStorage.getItem('token');
    BASE_URL = import.meta.env.VITE_APP_BASE_URL;

    constructor(context) {
        this.context = context;
    }

    /**
     * 
     * @param {FormData} roomOverviewData 
     * @returns 
     */
    create(roomOverviewData) {

        return new Promise((resolve, reject) => {
           

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/room-overview`,
                headers: {
                  
                    'Authorization': `Bearer ${this.#token}`
                },
                data: roomOverviewData
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
                url: `${this.BASE_URL}/imm_hotel/room-overview`,
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

    getById(roomId) {
        return new Promise((resolve, reject) => {

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/room-overview/${roomId}`,
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

    update(roomId, roomData) {
        return new Promise((resolve, reject) => {

            let data = JSON.stringify(roomData);

            let config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/room-overview/${roomId}`,
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

    delete(roomId) {
        return new Promise((resolve, reject) => {

            let config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/room-overview/${roomId}`,
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
}
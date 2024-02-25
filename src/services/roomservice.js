import axios from "axios"

export class RoomService {

    #token = localStorage.getItem('token');
    BASE_URL = import.meta.env.VITE_APP_BASE_URL;

    constructor(context) {
        this.context = context;
    }

    createRoom(roomData) {

        return new Promise((resolve, reject) => {
            let data = JSON.stringify(roomData);

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/room`,
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

        })
    };

    getAllRooms() {
        return new Promise((resolve, reject) => {

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/room`,
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

    getRoomById(roomId) {
        return new Promise((resolve, reject) => {

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/room/${roomId}`,
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

    updateRoom(roomId, roomData) {
        return new Promise((resolve, reject) => {

            let data = JSON.stringify(roomData);

            let config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/room/${roomId}`,
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

    deleteRoom(roomId) {
        return new Promise((resolve, reject) => {

            let config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/room/${roomId}`,
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

    /**
     * 
     * @param {String} id 
     * @param {FormData} image 
     * @returns 
     */
    uploadCoverImage(id, image) {
        return new Promise((resolve, reject) => {

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/room/upload-cover/${id}`,
                headers: {
                    'Authorization': `Bearer ${this.#token}`
                },
                data: image
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
}
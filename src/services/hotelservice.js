import axios from "axios"

export default class HotelService {

    BASE_URL = import.meta.env.VITE_APP_BASE_URL;
    #token = localStorage.getItem('token');

    constructor(context) {
        this.context = context;
    }

    getHotel() {
        return new Promise((resolve, reject) => {

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/hotel`,
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

    getHotelById(id) {

        return new Promise((resolve, reject) => {

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/hotel/${id}`,
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

    updateHotel(hotel, hotelId) {
        return new Promise((resolve, reject) => {

            let data = JSON.stringify({
                "name": hotel.name,
                "phone_number": hotel.phone_number,
                "description": hotel.description,
                "address": hotel.address,
                "tumbon": hotel.tumbon,
                "amphure": hotel.amphure,
                "province": hotel.province,
                "country": hotel.country,
                "amenities": hotel.amenities,
                "highlight": hotel.highlight,
                "special_service": hotel.special_service,
                "nearly_place": hotel.nearly_place,
                "parking": hotel.parking,
                "property_policies": hotel.property_policies,
                "certificate": hotel.certificate,
                "other_information": hotel.other_information
            });

            let config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/hotel/${hotelId}`,
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

    deleteHotel(hotelId) {
        return new Promise((resolve, reject) => {

            let config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/hotel/${hotelId}`,
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

    hotelUpload(files) {

        return new Promise((resolve, reject) => {

            const FormData = require('form-data');
            let data = new FormData();

            for (let file of files) {
                data.append('image', file);
            }

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/hotel/upload`,
                headers: {
                    'Authorization': `Bearer ${this.#token}`,
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
        });

    }
}
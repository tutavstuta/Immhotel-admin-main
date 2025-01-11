import axios from "axios"

export class PromotionService {

    #token = localStorage.getItem('token');
    BASE_URL = import.meta.env.VITE_APP_BASE_URL;

    constructor(context) {
        this.context = context;
    }

    createPromotion(promotionData, image) {

        const formData = new FormData();

        for (let key of Object.keys(promotionData)) {
            formData.append(key, promotionData[key]);
        };

        if (image) {
            formData.append('image', image);
        }

        return new Promise((resolve, reject) => {

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/promotion`,
                headers: {
                    'Authorization': `Bearer ${this.#token}`
                },
                data: formData
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

    getAllPromotions() {
        return new Promise((resolve, reject) => {

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/promotion`,
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

    getPromotionById(promotionId) {
        return new Promise((resolve, reject) => {

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/promotion/${promotionId}`,
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

    updatePromotion(promotionId, promotionData,image) {

        const formData = new FormData();

        for (let key of Object.keys(promotionData)) {
            formData.append(key, promotionData[key]);
        };

        if (image) {
            formData.append('image', image);
        }

        return new Promise((resolve, reject) => {

            let config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/promotion/${promotionId}`,
                headers: {
                    'Authorization': `Bearer ${this.#token}`
                },
                data: formData
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

    deletePromotion(promotionId) {
        return new Promise((resolve, reject) => {

            let config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/promotion/${promotionId}`,
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
                url: `${this.BASE_URL}/imm_hotel/promotion/upload-cover/${id}`,
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
    };

    deleteImage(id) {

        return new Promise((resolve, reject) => {

            let config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/promotion/image/${id}`,
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
}
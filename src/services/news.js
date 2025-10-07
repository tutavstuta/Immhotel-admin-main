import axios from "axios"

export class NewsService {
    token = localStorage.getItem('token');
    BASE_URL = import.meta.env.VITE_APP_BASE_URL;

    constructor(context) {
        this.context = context;
    }

    createnews(newsData, image) {
        const formData = new FormData();
        for (let key of Object.keys(newsData)) {
            formData.append(key, newsData[key]);
        }
        if (image) {
            formData.append('image', image);
        }
        return new Promise((resolve, reject) => {
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/news`,
                headers: {
                    'Authorization': `Bearer ${this.token}`
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
    }

    getAllnews() {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/news/employee`,
                headers: {
                    'Authorization': `Bearer ${this.token}`
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

    getnewsById(newsId) {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/news/${newsId}`,
                headers: {
                    'Authorization': `Bearer ${this.token}`
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

    updatenews(newsId, newsData, image) {
        const formData = new FormData();
        for (let key of Object.keys(newsData)) {
            formData.append(key, newsData[key]);
        }
        if (image) {
            formData.append('image', image);
        }
        return new Promise((resolve, reject) => {
            let config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/news/${newsId}`,
                headers: {
                    'Authorization': `Bearer ${this.token}`
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
    }

    deletenews(newsId) {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/news/${newsId}`,
                headers: {
                    'Authorization': `Bearer ${this.token}`
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
                url: `${this.BASE_URL}/imm_hotel/news/upload-cover/${id}`,
                headers: {
                    'Authorization': `Bearer ${this.token}`
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

    deleteImage(id) {
        return new Promise((resolve, reject) => {
            let config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `${this.BASE_URL}/imm_hotel/news/image/${id}`,
                headers: {
                    'Authorization': `Bearer ${this.token}`
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
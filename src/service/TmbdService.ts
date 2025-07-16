import axios from 'axios'


const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

export const movieService = {
    async getUpcomingMovies(page = 1) {
        try {
            const response = await apiClient.get('/films/upcoming', {
                params: {page}
            });
            return response.data;
        } catch (error: any) {
            console.error('Erreur:', error.response.data || error);
            throw error;
        }
    },

    async getNowPlayingMovie(page = 1){

        try{

            const response  = await apiClient.get('/films/indoor', {
                params:{page}
            });
          return  response.data
        }catch (error:any)

        {
            console.error('Erreur:', error.response.data || error);
            throw error;
        }
    },

    async getPopular(page = 1) {

        try {
            const response = await apiClient.get('/films/popular',{
                params: {page}
            });
         return response.data;

        }catch (error: any) {
            console.error('Erreur:', error.response.data || error);
            throw error;
        }
    },

    async getMovieById(id: number) {

        try {
            const response = await apiClient.get(`/films/${id}`,
                {
                    params: {id}
                });
            return response.data;
        } catch (error: any) {
            console.error('Erreur:', error.response.data || error);
            throw error;
        }
    },

    async getCreditMovie(id: number) {

        try {
            const response = await apiClient.get(`/films/${id}/credits`,
                {
                    params: {id}
                });
            return response.data;
        } catch (error: any) {
            console.error('Erreur:', error.response.data || error);
            throw error;
        }
    },

    async getTrailer(id: number) {
        try {
            const response = await apiClient.get(`/films/${id}/videos`);
            console.log("Response data:", response.data); // Pour déboguer
            return response.data;
        } catch (error: any) {
            console.error('Erreur:', error.response?.data || error);
            throw error; // Il faut propager l'erreur
        }
    },

    async getRecommendationMovie (id: number) {

        try {
            const response = await apiClient.get(`/films/${id}/recommendations`);
            console.log('Reponse recommendation:', response.data);
            return response.data;
        }catch (error: any) {

            console.error('Erreur:', error.response?.data || error);
            throw error;
        }
    }



}
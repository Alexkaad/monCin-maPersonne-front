import axios from 'axios'


const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

export const movieService = {
    async getUpcomingMovies(page: number = 1) {
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

    async getNowPlayingMovie(page:number = 1){

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

    async getPopular(page:number = 1) {

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
    }
}
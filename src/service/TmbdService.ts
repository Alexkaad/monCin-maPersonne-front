import axios from 'axios'


const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
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
            const response = await apiClient.get(`/films/${id}`);

            if (!response || !response.data) {
                throw new Error('Réponse invalide du serveur');
            }

            return response.data;
        } catch (error: any) {
            // Log plus détaillé de l'erreur
            if (error.response) {
                console.error('Erreur de réponse:', {
                    status: error.response.status,
                    data: error.response.data,
                    headers: error.response.headers
                });
            } else if (error.request) {
                console.error('Erreur de requête:', error.request);
            } else {
                console.error('Erreur:', error.message);
            }
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
    },

    async getNetWorkPerson(id:number) {

        try {
            const response = await apiClient.get(`/persons/${id}/externalIds`);
            return response.data;
        } catch (error: any) {
            console.error('Erreur:', error.response?.data || error);
        }
    },

    async  getPersonById(id: number) {

        try {
            const response = await apiClient.get(`/persons/${id}`);
            return response.data;
        } catch (error: any) {
            console.error('Erreur:', error.response?.data || error);
            throw error;
        }
    },



async getPersonMovieCredit(id: number) {
        try {
           const response =
               await apiClient.get(`/persons/${id}/movie_credits`);
           return response.data;
        }catch (error: any) {
            console.error('Erreur:', error.response?.data || error);
            throw error;
        }
}


}


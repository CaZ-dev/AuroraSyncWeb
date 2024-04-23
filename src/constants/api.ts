import axios, {AxiosResponse}from "axios";
export module ApiService {

    export async function getCases(): Promise<ChainsData[]>{
        try {
            const response: AxiosResponse = await axios.get('/api/chain/get_data/')
            const data: ChainsData[] = response.data
            return data
        } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
        }
    }

}
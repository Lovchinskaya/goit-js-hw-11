import Notiflix from 'notiflix';
import axios from 'axios';
import {loadMoreBtn} from './index'

    export default class PhotoApiService {
        constructor() {
            this.searchQuery = '';
            this.page = 1;
            this.perPage = 40;
        }

    async fetchPhoto() {
        try {
            const response = await axios.get(`https://pixabay.com/api/?key=37013770-4fd46202a1ea52ee31e31a9bd&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`);

            const { hits, totalHits } = response.data;
            
            if (hits.length === 0) {
                Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            }

            if (this.page >= Math.ceil(totalHits / this.perPage)) {
                Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
                loadMoreBtn.classList.add('is-hidden')
            } else {
                Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
            }
            
            this.page += 1;
                
            return { hits, totalHits };

        } catch (error) {
            console.log(error);
        }
    }
       
    
resetPage() {
        this.page = 1;
    }
}
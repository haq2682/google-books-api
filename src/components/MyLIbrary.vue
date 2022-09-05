<template>
        <div class="results">
            <!-- Loading spinner that indicates fetching of data from My Library -->
            <ProgressSpinner  v-if="loading === true" style="width: 100%; position: relative; top: 200px; margin: 0 auto;"/>
            <div v-else class="library">
            <h1 style="padding-top: 20px;">My Library</h1>
            <!-- Fetched data is shown in the carousel -->
            <carousel :value="library" :numVisible="5" :numScroll="1">
                <!-- Data Fetched is refered to as slotProps by the PrimeVue Library -->
                <template #item="slotProps">
                    <div class="product-item" @click="showDialog(slotProps.data)">
                        <div class="product-item-content">
                            <div class="mb-3">
                                <img :src="slotProps.data.volumeInfo.imageLinks.smallThumbnail" class="product-image" />
                            </div>
                            <div class="properties-height">
                                <h4 class="mb-1">{{slotProps.data.volumeInfo.title}}</h4>
                                <h6 v-for="author in slotProps.data.volumeInfo.authors" :key="author">{{author}}</h6>
                            </div>
                        </div>
                    </div>
                    <!--Dialog component shows the information about the selected volume -->
                    <Dialog v-model:visible="display" :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '50vw'}">
                        <template #header>
                            <div></div>
                        </template>
                        <div>
                            <img :src="currentVolume.volumeInfo.imageLinks.thumbnail" style="float: left; padding-right: 20px;"/>
                            <h3 v-if="currentVolume.volumeInfo.title">{{currentVolume.volumeInfo.title}}</h3>
                            <h3 v-else style="color: #bdbdbd">No Title available</h3>
                            <h4 v-if="currentVolume.volumeInfo.subtitle">{{currentVolume.volumeInfo.subtitle}}</h4>
                            <h4 v-else style="color: #bdbdbd">No Subtitle available</h4>
                            <h5>Author(s):</h5>
                            <span v-if="currentVolume.volumeInfo.authors">
                                <h5 v-for="author in currentVolume.volumeInfo.authors" :key="author">{{author}}</h5>
                            </span>
                            <span v-else style="color: #bdbdbd">No Info available</span>
                            <div style="margin-top: 10px;">
                                <Rating :modelValue="currentVolume.volumeInfo.averageRating" :readonly="true" :stars="5" :cancel="false" name="readonly" />
                                <h6 style="margin: -0px;" v-if="currentVolume.volumeInfo.ratingsCount">Reviewed by {{currentVolume.volumeInfo.ratingsCount}} People</h6>
                                <h6 v-else style="color: #bdbdbd">No Reviews yet</h6>
                            </div>
                        </div>
                        <div>
                            <h3><strong>Description:</strong></h3>
                            <p v-if="currentVolume.volumeInfo.description" style="color: black;">
                                {{currentVolume.volumeInfo.description}}
                            </p>
                            <p v-else style="text-align: center; color: #bdbdbd;">
                                No Description Available
                            </p>
                            <h5>Published By: 
                                <span v-if="currentVolume.volumeInfo.publisher">{{currentVolume.volumeInfo.publisher}}</span>
                                <span v-else style="color: #bdbdbd;">No info available</span>
                            </h5> 
                            <h5>Published Date: 
                                <span v-if="currentVolume.volumeInfo.publishedDate">{{currentVolume.volumeInfo.publishedDate}}</span>
                                <span v-else style="color: #bdbdbd">No info available</span>
                            </h5>
                            <h5 v-if="currentVolume.volumeInfo.pageCount">Page Count: {{currentVolume.volumeInfo.pageCount}}</h5>
                            <h5 v-else style="color: #bdbdbd">No Info about Pages available</h5>
                        </div>
                        <template #footer>
                            <!--Button component here leads to the Google Books page of the selected volume-->
                            <Button label="View More" class="p-button-text" @click="navigateToLink(currentVolume.volumeInfo.previewLink)"/>
                        </template>
                    </Dialog>
                </template>
            </carousel>
            
        </div>
    </div>
</template>

<script>
    import Carousel from 'primevue/carousel';
    import Dialog from 'primevue/dialog';
    import Button from 'primevue/button';
    import Rating from 'primevue/rating';
    import ProgressSpinner from 'primevue/progressspinner';
    import axios from 'axios';

    export default {
        // Imported components are defined here
        components: {
            Carousel,
            Dialog,
            Button,
            Rating,
            ProgressSpinner
        },
        data() {
            return {
                display: false,
                currentVolume: {},
                library: null,
                loading: true,
            }
        },
        methods: {
            //Opens the dialog when a specific volume is clicked upon
            showDialog(item) {
                this.display = true;
                this.currentVolume = item;
                console.log(item);
            },
            //Navigates the user to Google Books page of the volume when clicked on
            navigateToLink(link) {
                window.location.href = link;
            }, 
        },
        created() {
            //Fetches the volumes in My Library after the page is loaded
            axios.get('https://www.googleapis.com/books/v1/mylibrary/bookshelves/0/volumes?key=AIzaSyAcX25O_YZMIVhDGLQTFTkYbiSb476vyzU', {}, {
            })
            .then((response) => {
               this.library = response.data.items;
               this.loading = false;
            })
            .catch(err => console.log(err));
        }
    }
</script>

<style scoped>
    h1 {
        margin-left: 20px;
        margin-top: 200px;
    }
    .results {
        width: 70%;
        margin: 0 auto;
        margin-top: -100px;
        background-color: rgb(255, 255, 255, 0.5);
        border-radius: 10px;
    }
    .library {
        box-shadow: 0px 0px 16px 0.2px rgb(0, 0, 0, 0.2);
    }
    .carousel-img {
        width: 100%;
        height: 240px;
        object-fit: cover;
    }
    .mb-1 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 200px;
    }
    .mb-3 > img {
        height: 150px;
        width: 100px;
    }
    .mb-3 {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .product-item {
        padding: 10px;
        border-radius: 5px;
        transition: 0.2s;
    }
    .product-item:hover {
        background-color: rgb(213, 151, 255);
    }
    .loadspinner {
        display: hidden;
    }
</style>
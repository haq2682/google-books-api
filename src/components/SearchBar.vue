<template>
    <div>
        <div class="search-bar">
            <h1>Welcome to Google Books API Project</h1>
            <!--A simple search bar component. Sends a get request when 'Enter' is pressed and the fetched data is removed if the search bar is cleared-->
            <InputText class="text-input" type="text" placeholder="Search a Volume and press 'Enter'" v-model="value" @keyup.enter="handleSubmit" style="box-shadow: 0px 0px 16px 0.2px rgb(0, 0, 0, 0.2);"/>
        </div>
        <!--Loading spinner to indicate data being fetched from the API -->
        <ProgressSpinner  v-if="loading === true" style="width: 100%; position: relative; top: 200px; margin: 0 auto;"/>
        <!--Searched Results component shows the results from the API -->
        <SearchResults :error="error" :results="results" v-show="res" v-else/>
    </div>
</template>

<script>
    import InputText from 'primevue/inputtext';
    import SearchResults from './SearchResults.vue';
    import ProgressSpinner from 'primevue/progressspinner';
    import axios from 'axios';

    export default {
        //Imported components are defined here
        components: {
            InputText,
            SearchResults,
            ProgressSpinner
        },
        data() {
            return {
                value: '',
                results: null,
                res: false,
                loading: false,
                error: '',
            }
        },
        methods: {
            //Submits the search query from the search bar to the API
            handleSubmit() {
                this.loading = true;
                axios.get('https://www.googleapis.com/books/v1/volumes?q=' + this.value)
                .then((response) => {
                    this.res = true;
                    this.results = response.data.items;
                    this.loading = false;
                })
                .catch((error) => {
                    this.error = error;
                });
            },
        },
        created() {
            //A watcher is used here to watch the value inside the search bar. If it gets cleared, it removes the search results
            this.$watch('value', ()=>{
                if(this.value === '') this.res = false;
            });
        }
    }
</script>

<style scoped>
    .search-bar {
        width: 35%;
        margin: 0 auto;
        margin-top: 200px;
    }
    .search-bar h1 {
        text-align: center;
    }
    .text-input {
        width: 100%;
    }
</style>
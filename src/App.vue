<template>
  <div class="background">
    <div>
      <SearchBar/>
      <MyLIbrary/>
    </div>
  </div>
</template>

<script>
  import SearchBar from './components/SearchBar.vue';
  import MyLIbrary from './components/MyLIbrary.vue';

  export default {
    //Imported components are defined here
    components: {
      SearchBar,
      MyLIbrary,
    },
  }
</script>

<style>
  *{
    font-family: 'Inter', sans-serif;
  }
</style>
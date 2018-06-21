<template>
<div>
  <nav class="navbar navbar-expand navbar-light bg-light border-top fixed-bottom col-lg-8 mx-auto bottom">

    <ul class="navbar-nav mx-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#"><i class="fa fa-home" aria-hidden="true"></i></a>
      </li>
    </ul>
    <ul class="navbar-nav mx-auto">
      <li class="nav-item active">
        <a class="nav-link" v-on:click="searchShower()"><i class="fa fa-search" aria-hidden="true"></i></a>
      </li>
    </ul>
    <ul class="navbar-nav mx-auto">
      <li class="nav-item active">
        <a class="nav-link"><router-link to="/home"><i class="fa fa-user-circle" aria-hidden="true"></i></router-link></a>
      </li>
    </ul>

</nav>
<search v-if="this.showSearch"></search>
</div>

</template>

<script>
import search from './search.vue'
export default {
  name: 'bottom',
  props: {
  },
  methods:{
    searchShower:function(){
      this.showSearch=!this.showSearch
    }
  },
  data: function(){
    return {
      showSearch:false
    }
},
components:{search}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottom{
margin-top:200px;
}
.fa{
  font-size: 25px;
}
</style>

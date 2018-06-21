<template>
    <nav class="navbar navbar-expand navbar-light bg-light border-bottom fixed-top col-lg-8 mx-auto bottom">

      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link"><router-link to="/upload"><i class="fa fa-image"></i></router-link></a>
        </li>
      </ul>

    <a class="navbar-brand mx-auto"><img src="../assets/logo.png" class="maxed"/></a>

    <ul class="navbar-nav float-right">
      <li class="nav-item active">
        <a class="nav-link" v-on:click="refresher()"><i class="fa fa-refresh" aria-hidden="true"></i></a>
      </li>
      <li class="nav-item active dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-cog" aria-hidden="true"></i></a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" v-on:click="logoutMe()">Logout</a>
        </div>
    </li>
    </ul>

  </nav>
</template>

<script>
export default {
  name: 'naver',
  props: {
    msg: String
  },
  methods:{
    refresher:function(){
      location.reload();
    },
    logoutMe:function(){
      if(this.$cookies.get('pc-zzl-loggedin')){
        this.$cookies.remove('pc-zzl-loggedin');
        this.$cookies.remove('pc-zzl-user');
        this.$cookies.remove('pc-zzl-followers');
        this.$cookies.remove('pc-zzl-following');
      }
      location.replace('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-brand {
    text-align: center;
}
.maxed {
  max-height: 35px;
}
.fa{
  font-size: 25px;
}
</style>

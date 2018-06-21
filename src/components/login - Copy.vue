<template>
  <!-- Login form -->
  <div id="loginMain" class="hundred">
    <div class="container hundred">
      <div class="row hundred">
        <div class="w-100 loginner d-flex justify-content-center">
          <div class="align-self-center text-center">
          <p class="m-6 h6">Welcome again, to Photocorner application</p>
          <br>
          <img src="../assets/logo-white.png" class="maxed m-6"/>
          <br><br>
            <!-- login form -->
            <transition name="slide">
            <form v-if="!regformShow">
            <div class="form-group col col-10 offset-1">
            <label for="username" class="h5 mr-2 form-inline">Your e-mail </label>
                <input class="form-control" name="loginEmail" type="text" v-bind="loginEmail">
            </div>
            <div class="form-group col col-10 offset-1">
            <label for="username" class="h5 mr-2 form-inline">Password</label>
                <input class="form-control" name="loginPass" type="text" v-bind="loginPass">
            </div>
            <button type="button" class="btn btn-active" v-on:click="loginMe()">Login</button>
            <br><br>
            <p class="m-6 h6">Or if you are new here, <kbd><a v-on:click="regformShow=!regformShow">Create account !</a></kbd></p>
            </form>
            </transition>

            <!-- Register form -->
            <transition name="slide">
            <form v-if="regformShow">
            <div class="form-group col col-10 offset-1">
            <label for="regName" class="h5 mr-2 form-inline">Your name </label>
                <input class="form-control" name="regName" type="text" v-model="regName">
            </div>
            <div class="form-group col col-10 offset-1">
            <label for="regEmail" class="h5 mr-2 form-inline">Your e-mail</label>
                <input class="form-control" name="regEmail" type="text"  v-model="regEmail">
            </div>
            <div class="form-group col col-10 offset-1">
            <label for="regPass" class="h5 mr-2 form-inline">Password</label>
                <input class="form-control" name="regPass" type="password" v-model="regPass">
            </div>
            <div class="form-group col col-10 offset-1">
            <label for="regPass1" class="h5 mr-2 form-inline">Repeat password</label>
                <input class="form-control" name="regPass1" type="password" v-model="regPass1">
            </div>
            <button type="button" class="btn btn-active mr-2" v-on:click="regMe()">Register</button>
            <button type="button" class="btn btn-active" v-on:click="regformShow=!regformShow">Back</button>
            </form>
          </transition>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
export default {
  name: 'bottom',
  props: {
  },
methods:{
    loginMe:function() {
    },
    regMe:function() {
      this.$http.post('http://localhost:3000/user',{
        regEmail: this.regEmail,
        regPass: this.regPass,
        regName: this.regName
      }).then(function(data){
        if(err) {console.log(err);}
        console.log(data.body.msg);
      })
      .catch(function (err){
        console.log(err)
      })
    }
},
  data(){ return {
    loginEmail:'',
    loginPass:'',
    regformShow:false,
    regEmail:'',
    regPass:'',
    regPass1:'',
    regName:''
  }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn{
  min-width: 150px;
}

</style>

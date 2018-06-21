<template>
  <!-- Login form -->
  <div id="loginMain" class="hundred">
    <div class="container hundred">
      <div class="row hundred">
        <div class="w-100 loginner d-flex justify-content-center">
          <div class="align-self-center text-center">
          <br>
          <img src="../assets/logo-white.png" class="maxed m-6"/>
          <br><br>
            <div class="content loading" v-if="loading">
              <br>
              <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
            </div>

            <div class="content" v-if="!loading">
            <!-- login form -->
            <transition name="slide">
            <form v-if="!regformShow">
            <p class="m-6 h6" id="loginMsg" v-if="!regsuccessor">Welcome , to Photocorner application.</p>
            <p class="m-6 h6" v-if="regsuccessor">Congratulations, you have just joined our family</p>
            <p class="m-6 h6" v-if="loginErr">One of your email or password is incorrent try again</p>
            <br>
            <div class="form-group col col-10 offset-1">
            <label for="username" class="h5 mr-2 form-inline">Your e-mail </label>
                <input class="form-control" name="loginEmail" type="text" v-model="loginEmail">
            </div>
            <div class="form-group col col-10 offset-1">
            <label for="username" class="h5 mr-2 form-inline">Password</label>
                <input class="form-control" name="loginPass" type="password" v-model="loginPass">
            </div>
            <button type="button" class="btn btn-active" v-on:click="loginMe()">Login</button>
            <br><br>
            <p class="m-6 h6" id="regMsg" v-if="!regsuccessor">Or if you are new here, <kbd><a v-on:click="regformShow=!regformShow">Create account !</a></kbd></p>
            </form>
            </transition>

            <!-- Register form -->
            <transition name="slide">
            <form v-if="regformShow">
            <p class="m-6 h6" id="loginMsg" v-if="regfailMsg">An error occured while registering, try again</p>
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
  </div>
</template>

<script>
export default {
  name: 'bottom',
  props: {
  },
methods:{
    loginMe:function() {
      this.loading=true
        this.$http.post('http://' + window.location.hostname + ':3000/login',{
          loginEmail: this.loginEmail,
          regPass: this.loginPass,
          }).then(function(data){
           if(data.body !== null ){
              this.$cookies.set("pc-zzl-loggedin",data.body.user_token,60 * 60 * 24)
              this.$cookies.set("pc-zzl-user",data.body.user_name,60 * 60 * 24)
              this.$cookies.set("pc-zzl-followers",data.body.user_followers,60 * 60 * 24)
              this.$cookies.set("pc-zzl-following",data.body.user_following,60 * 60 * 24)
              this.$cookies.set("pc-zzl-photo",data.body.user_photo,60 * 60 * 24)
              location.replace('./home')
              setTimeout(function(){ console.clear() }, 1000)
            }
            else{
              this.regformShow=false;
              this.loginErr=true;
              this.loading=false;
            }
          })
    },
    regMe:function() {
        this.loading=true
          this.$http.post('http://' + window.location.hostname + ':3000/user',{
            regEmail: this.regEmail,
            regPass: this.regPass,
            regName: this.regName
            }).then(function(data){
              if(data.body.msg === "SUCCESS"){
                this.regformShow=!this.regformShow
                this.regsuccessor=true;
                this.loading=!this.loading
              }
              else{
                this.regformShow=true;
                this.regsuccessor=false;
                this.regfailMsg=true;
                this.loading=!this.loading
                setTimeout(function(){ console.clear() }, 1000)
              }
            })

}
    //,clearer:setInterval(function(){ console.clear() }, 1000)
},
  data(){ return {
    loginErr:false,
    regfailMsg:false,
    loading:false,
    regsuccessor:false,
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
.fa-spin{
  font-size: 60px;
}
.btn{
  min-width: 150px;
}
.loading{
  .fa{
    font-size: 25px
  }
}
</style>

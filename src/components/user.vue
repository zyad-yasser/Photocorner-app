<template>
  <div class="container">
    <div class="col col-lg-8 col-md-12 col-sm-12 m-0 p-0 mx-auto">
<!-- top area -->
    <div class="row">
    <div class="col col-4 float-left">
    <img class="img-fluid rounded-circle img-thumbnail" width="100px" height="100px" id="imgPreview" src="../assets/photo.jpg"/>
    </div>
    <div class="col col-8 float-left">
    <div class="row" style="max-height:60px;min-height:60px;">
    <div v-if="userStateAcc">
      <div class="col col-4 text-center">
        <span class="h6">Posts</span>
        <h6>{{posts}}</h6>
      </div>
    </div>
      <div class="col col-4 text-center">
        <span class="h6">Following</span>
        <h6>{{this.following.length}}</h6>
      </div>
      <div class="col col-4 text-center">
        <span class="h6">Followers</span>
        <h6>{{this.followers.length}}</h6>
      </div>
    </div>
    <div class="row" style="max-height:30px;min-height:30px;">
      <div class="col col-12">
        <div class="border h-100 rounded" v-if="!userStateFol && !userStateAcc"><div class="col col-7 float-left text-center p-0">{{user.user_name}}</div><div class="btn btn-danger float-right col col-5 h-100 p-0" v-on:click="followMe()">Follow</div></div>
        <div class="border h-100 rounded" v-if="userStateFol && !userStateAcc"><div class="col col-7 float-left text-center p-0">{{user.user_name}}</div><div class="btn btn-disabled float-right col col-5 h-100 p-0">Requested</div></div>
      </div>
    </div>
    </div>
    </div>
<!-- images area -->
<div class="text-center" v-if="!userStateAcc">
<br>
<h1><i class="fa fa-lock" aria-hidden="true"></i></h1>
<h4>You are not following this user</h4>
<h5>If uou are interested send a follow request</h5>
</div>
    <div class="row mt-2 lower" v-if="userStateAcc">
    <div v-for="(photo, index) in photosShow" :key="index" class="col col-4 p-0 mt-1 image" v-on:mouseover="mouseOver(photo._id)" v-on:mouseout="mouseOut()">
      <router-link v-bind:to="'/photo/' + photo.photo_uri">
    <transition name="fade">

    <div class="position-absolute hoverer text-center text-white pt-5" v-if="active==photo._id"><i class="fa fa-heart" aria-hidden="true"></i><br>50</div>

    </transition>
    </router-link>
    <router-link v-bind:to="'/photo/' + photo.photo_uri">
    <div class="image m-0" id="imgPreview" v-bind:style="{ 'background-image': 'url(' + userUri + photo.photo_uri + ')' }"></div>
    </router-link>

    </div>
    <div class="w-100 h-25 d-sm-none d-lg-block d-md-none"></div>
    <div class="w-100 h-50 d-sm-block d-lg-none d-md-block"></div>
    </div>

  </div>
</div>
</template>

<script>
export default {
  name: 'user',
  props: {
    msg: String
  },
  created(){
    if(this.$cookies.get('pc-zzl-loggedin') !== this.$route.params.token){
    this.$http.get('http://' + window.location.hostname + ':3000/user/'+ this.token).then(
      function(data){
        this.user = data.body
        this.followers = data.body.user_followers
        this.following = data.body.user_following
        if ( this.following == null ) {this.following=[]}
        if ( this.followers == null ) {this.followers=[]}
        for(let i=0;i<this.followers.length;i++){
          if (this.followers[i].user===this.$cookies.get('pc-zzl-loggedin')){
            this.userStateFol=true;
            if(this.followers[i].user.state==="pen") {
            this.userStateAcc=true;
            }
          }
        }
        console.log(this.userStateAcc)
      })

  } else { location.replace('/home')}
  },
  data(){
    return{
      token: this.$route.params.token,
      followers:'',
      following:'',
      appUsername:this.$cookies.get('pc-zzl-user') ? this.$cookies.get('pc-zzl-user') : '',
      appUser:this.$cookies.get('pc-zzl-loggedin') ? this.$cookies.get('pc-zzl-loggedin') : '',
      user:[],
      photosShow:[],
      posts:0,
      userUri:'http://' + window.location.hostname + ':3000/api/',
      active:'',
      currentPhoto:'',
      userStateFol:false,
      userStateAcc:false,
      userFollowers:[]
    }
  },
  computed:{
  },
  methods:{
    postsGen:function(){
      this.$http.get('http://' + window.location.hostname + ':3000/home/'+ this.token).then(
        function(data){
          this.user = data.body
        })
    },
    followMemisc:function() {
      if (this.$cookies.get('pc-zzl-loggedin')) {
      let data = {followersNew: this.userFollowers, toFollow:this.token}
      this.userFollowers.push({user:this.$cookies.get('pc-zzl-loggedin'),state:"pen"})
      this.$http.post('http://' + window.location.hostname + ':3000/followmisc',data)
    }
    },
    followMe:function() {
      if (this.$cookies.get('pc-zzl-loggedin')) {
      let sends = {toFollow:this.token, you:this.$cookies.get('pc-zzl-loggedin')}
      console.log(sends)
      this.$http.post('http://' + window.location.hostname + ':3000/follow',sends).then(function(data){
        if(data.body !== null) {
          if (data.body.user_followers !== null) {
            this.userFollowers = data.body.user_followers
          } else {
            this.userFollowers = []
          }
          this.followMemisc();
        }else {
          console.log("LOL")
        }
      })
    }
    },
    hoverer:function(){
      let image = document.getElementsByClassName("image")[0];
      image.firstChild.classList.add("shower");
    },
    mouseOver: function(value){
      this.active = value;
    },
    mouseOut: function(){
      this.active ='';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
}
.h6 {
  color:#666;
  font-size: 12px;
}
.lower {
  overflow-y:scroll;
  height:700px;
}
.image{
  background-position:center center;
   background-repeat:no-repeat;
   background-size:cover;
   min-height: 150px;
   max-height: 150px
}
.hoverer {
  font-size: 20px;
  background-color:rgba(220,53,69,0.7);
  min-width: 100%;
  min-height:100%;
}
</style>

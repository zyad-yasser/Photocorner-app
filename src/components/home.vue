<template>
  <div class="container">
    <div class="col col-lg-8 col-md-12 col-sm-12 m-0 p-0 mx-auto">
<!-- top area -->
    <div class="row">
    <div class="col col-4 float-left">
    <div class="cursorer" v-on:mouseover="ppShower()" v-on:mouseout="ppHider()" >
    <img class="img-fluid rounded-circle img-thumbnail position-absolute" width="100px" height="100px" id="imgPreview" v-bind:src="ppPhoto"/>
    <transition name="fade">
    <div v-if="loading" class="position-absolute hoverer1 text-center text-white"><i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw h3"></i></div>
    </transition>
    <transition name="fade">
    <div v-if="failer" class="position-absolute hoverer1 text-center text-white"><i class="fa fa-times" aria-hidden="true"></i></div>
    </transition>
    <transition name="fade">
    <div v-on:click="$refs.ppInput.click()" v-if="ppShow" class="position-absolute hoverer1 text-center text-white"><i class="fa fa-image"></i>
    <input name="file" type="file" ref="ppInput" class="d-none" id="inputer" v-on:change="displayPreview($event)" accept="image/x-png,image/gif,image/jpeg"/>
    </div>
    </transition>

    </div>
    </div>
    <div class="col col-8 float-left">
    <div class="row" style="max-height:60px;min-height:60px;">
      <div class="col col-4 text-center">
        <span class="h6">Posts</span>
        <h6>{{posts}}</h6>
      </div>
      <div class="col col-4 text-center">
        <span class="h6">Following</span>
        <h6>{{followingc}}</h6>
      </div>
      <div class="col col-4 text-center">
        <span class="h6">Followers</span>
        <h6>{{followersc}}</h6>
      </div>
    </div>
    <div class="row" style="max-height:30px;min-height:30px;">
      <div class="col col-12">
        <div class="card text-center">{{appUsername}}</div>
      </div>
    </div>
    </div>
    </div>
<!-- images area -->
    <div class="row mt-3 lower">
    <div v-for="(photo, index) in photosShow" :key="index" class="col col-4 p-0 mt-1 image" v-on:mouseover="mouseOver(photo._id)" v-on:mouseout="mouseOut()">
      <router-link v-bind:to="'/photo/' + photo.photo_uri">
    <transition name="fade">

    <div class="position-absolute hoverer text-center text-white pt-5" v-if="active==photo._id"><i class="fa fa-heart" aria-hidden="true"></i><br>{{photo.photo_likes.length}}</div>

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
    if(this.$cookies.get('pc-zzl-photo') === undefined || (this.$cookies.get('pc-zzl-photo')  == null) || (this.$cookies.get('pc-zzl-photo')  == "undefined") || (this.$cookies.get('pc-zzl-photo')  == "") ){
      this.ppPhoto= 'http://' + window.location.hostname + ':3000/api/user.png'
    }else{
    this.ppPhoto = 'http://' + window.location.hostname + ':3000/api/' + this.$cookies.get('pc-zzl-photo')
    }

    if(this.$cookies.get('pc-zzl-user') && this.$cookies.get('pc-zzl-user') !== undefined){
    this.$http.get('http://' + window.location.hostname + ':3000/home/'+this.appUser).then(
      function(data){
        this.photos = data.body
        this.photosShow = this.photos.slice(0,10)
        // .slice() property is to cut number of elements of an array
        // we use then because this is a promise
        this.posts=this.photos.length
      }
    )
  } else { location.replace('/')}
  },
  data(){
    return{
      followers:this.$cookies.get('pc-zzl-followers'),
      following:this.$cookies.get('pc-zzl-following'),
      appUsername:this.$cookies.get('pc-zzl-user'),
      appUser:this.$cookies.get('pc-zzl-loggedin'),
      photos:[],
      photosShow:[],
      posts:0,
      userUri:'http://' + window.location.hostname + ':3000/api/',
      active:'',
      currentPhoto:'',
      ppShow:false,
      loading:false,
      file:'',
      failer:false,
      ppPhoto:''
    }
  },
  computed:{
    followingc:function() {
      if ( this.following !== null ) { return this.following.toString().split(",").length } else {return 0}
    },
    followersc:function() {
      if ( this.followers !== null ) { return this.followers.toString().split(",").length } else {return 0}
    }
  },
  methods:{
    uploadMisc:function(here){
      var tokener = here;
      let miscData={photo:tokener,userToken:this.$cookies.get('pc-zzl-loggedin')}
      this.$http.post('http://' + window.location.hostname + ':3000/uploadMiscpp',miscData).then(function(data){
         if(data.body.msg !== "fail" ){
           this.loading=false;
           let imgPreview = document.querySelector('#imgPreview')
           imgPreview.src= 'http://' + window.location.hostname + ':3000/api/'+ tokener
           this.$cookies.set("pc-zzl-photo",tokener,60 * 60 * 24)
         }
          else{
            this.loading=false;
            this.failer=true;
          }
        })
    },
    displayPreview:function(event){
        this.loading=true;
        this.file = event.target.files[0];
        const fd = new FormData();
        fd.append('file', this.file, this.file.name)
          this.$http.post('http://' + window.location.hostname + ':3000/uploadpp',fd).then(function(data){
             if(data.body.msg !== "fail" ){
               this.uploadMisc(data.body.token);
              }
              else{
                this.loading=false;
                this.failer=true;
              }
            })
    },
    ppShower:function() {
      this.ppShow=true;
    },
    ppHider:function() {
      this.ppShow=false;
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
.cursorer{
  cursor:pointer;
}
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
.hoverer1 {
  padding-top: 35px;
  font-size: 20px;
  background-color:rgba(220,53,69,0.7);
  width:100px;
  height:100px;
  border-radius: 500px;
}
.img-fluid{
  min-width: 100px;
  min-height: 100px;
}
.fa{
  font-size: 25px;
}
</style>

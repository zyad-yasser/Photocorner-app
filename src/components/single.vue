<template>
  <div class="col col-lg-6 col-md-6 col-sm-12 m-0 p-0 mx-auto text-center">
    <div class="card text-center">
  <div class="card-header">
    {{photoCaption}}
  </div>
  <div class="card-body p-0">
    <img class="img-fluid col col-8" v-bind:src='PhotoUri'/>
  </div>
  <div class="card-footer text-muted text-left">
    <div class="liker">
    <i class="fa fa-heart-o" aria-hidden="true" v-on:click="likeMe()" v-if="!youLiked"></i>
    <i class="fa fa-heart text-danger" aria-hidden="true" v-if="youLiked" v-on:click="dislikeMe()"></i>
    <span class="ml-2 h5">{{this.likes.length}}</span>
    </div>
  </div>
</div>
</div>
</template>

<script>
export default {
    data () {
        return {
            token: this.$route.params.token,
            photo:[],
            PhotoUri:'',
            photoCaption:'',
            likes:[],
            youLiked:false
        }
    },
    created() {
        this.$http.get('http://' + window.location.hostname + ':3000/image/' + this.token).then(function(data){
            this.photo = data.body;
            this.PhotoUri = "http://" + window.location.hostname + ":3000/api/" + this.photo[0].photo_uri;
            this.likes = this.photo[0].photo_likes;
            this.photoCaption = this.photo[0].photo_caption;
            let index = this.likes.indexOf(this.$cookies.get('pc-zzl-loggedin'));
            if (index !== -1) {
            this.youLiked=true;
          } else {this.youLiked=false;}
        })
    },
    methods:{
      dislikeMe:function() {
        let index = this.likes.indexOf(this.$cookies.get('pc-zzl-loggedin'));
        console.log(index)
        if (index !== -1) {
        this.likes.splice(index, 1);
        }
        setTimeout(this.liker(),1);
        this.$http.post('http://' + window.location.hostname + ':3000/liker',{
          photo: this.photo[0].photo_uri,
          likes: this.likes
        })
      },
      likeMe:function(){
        this.likes.push(this.$cookies.get('pc-zzl-loggedin'))
        setTimeout(this.liker(),1);
        this.$http.post('http://' + window.location.hostname + ':3000/liker',{
          photo: this.photo[0].photo_uri,
          likes: this.likes
        })
      },
      liker:function() {
        let index = this.likes.indexOf(this.$cookies.get('pc-zzl-loggedin'));
        if (index !== -1) {
        this.youLiked=true;
      } else {this.youLiked=false;}
    }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card{
  margin-bottom: 200px;
}
</style>

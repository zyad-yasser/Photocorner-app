<template>
  <div class="text-center">
    <div class="col col-lg-5 col-sm-8 col-md-8 m-0 p-0 mx-auto">
  <br>
  <div class="successor" v-if="successor">
    <h5>Your image is ready</h5><br>
    <router-link to="/home"><button type="button" class="btn btn-danger col col-lg-8">Go to home</button></router-link>
  </div>
  <div class="failer" v-if="failer">
    <h5>An error has occured, sorry</h5><br>
    <button type="button" class="btn btn-danger col col-8" v-on:click="backer()">Back</button>
  </div>
  <div class="loading text-danger" v-if="loading">
    <br>
    <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
  </div>
  <div class="content" v-if="!loading && !failer && !successor">
  <h5>Choose image to upload</h5>
    <form enctype="multipart/form-data">
      <input name="photo" type="file" ref="fileInput" class="d-none" id="inputer" v-on:change="displayPreview($event)" accept="image/x-png,image/gif,image/jpeg"/>
      <button type="button" class="btn btn-danger adj col-4 mr-2" v-on:click="$refs.fileInput.click()">Browse</button>
      <button type="button" class="btn btn-danger adj col-4" v-on:click="uploadMe()">Upload</button><br>
      <textarea class="form-control adj text-center mx-auto" placeholder="What do you think of ?" name="photoCap" v-model="photoCap"></textarea>
      <input class="d-none" name="photoPerm" type="text"  v-model="uploadPerm"/>
      <input class="d-none" name="photoUser" type="text" v-model="uploadUser"/>
    </form>
  <div class="h-100 mx-auto mt-3 adj">
  <img class="img-fluid img-thumbnail position-absolute adj2" id="imgPreview" src="../assets/clear.png"/>
  <div class="dropdown float-right m-3">
    <a class="dropdown-toggle greyer" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-cog" aria-hidden="true"></i></a>
    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
      <a class="dropdown-item" v-on:click="Public()"><i class="fa fa-globe" aria-hidden="true"></i> Public</a>
      <a class="dropdown-item" v-on:click="Followers()"><i class="fa fa-users" aria-hidden="true"></i> Followrs</a>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" v-on:click="OnlyMe()"><i class="fa fa-user" aria-hidden="true"></i> Only me</a>
    </div>
  </div>
</div>
</div>
</div>
</div>
</template>

<script>
export default {
  name: 'upload',
  props: {
    msg: String
  },
  methods:{
    backer:function() {
      this.successor=false;
      this.loading=false;
      this.failer=false;
    },
    uploadMisc:function(here){
      var tokener = here;
      let miscData={photoToken:tokener,photoPerm:this.uploadPerm,photoUser: this.uploadUser,photoCap: this.photoCap}
      this.$http.post('http://' + window.location.hostname + ':3000/uploadMisc',miscData).then(function(data){
         if(data.body.msg !== "fail" ){
           this.successor=true;
           this.loading=false;
          }
          else{
            this.loading=false;
            this.failer=true;
          }
        })
    },
    uploadMe:function(){
      this.loading=true;
      const fd = new FormData();
      fd.append('file', this.file, this.file.name)
      if(this.$cookies.get('pc-zzl-loggedin')){
        this.$http.post('http://' + window.location.hostname + ':3000/upload',fd).then(function(data){
           if(data.body.msg !== "fail" ){
             this.uploadMisc(data.body.token);
            }
            else{
              this.loading=false;
              this.failer=true;
            }
          })
        } else {location.replace('/')}
    },
    displayPreview:function(event){
      this.file = event.target.files[0];
      let reader = new FileReader();
      let inputer =  document.querySelector('#inputer')
      let imgPreview = document.querySelector('#imgPreview')
      reader.onload = (e)=>{
      imgPreview.src=e.target.result;}
      reader.readAsDataURL(inputer.files[0]);
    },
    Public: function() {this.uploadPerm='pub';document.querySelector('.greyer').innerHTML='<i class="fa fa-globe" aria-hidden="true"></i>'},
    Followers: function() {this.uploadPerm='fol';document.querySelector('.greyer').innerHTML='<i class="fa fa-users" aria-hidden="true"></i>'},
    OnlyMe: function() {this.uploadPerm='onl';document.querySelector('.greyer').innerHTML='<i class="fa fa-user" aria-hidden="true"></i>'}

  },
  data(){ return {
    uploadUser:this.$cookies.get('pc-zzl-loggedin'),
    uploadPerm:'',
    photoCap:'',
    file:'',
    failer:false,
    loading:false,
    successor:false
  }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.adj {
  margin-top:15px;
  width:61%;
}
.adj2 {
  left:0px;
  right:0px;
  margin: auto;
}
.img-fluid{
  max-width:61%;
  min-width: 61%;
}
.dropdown-item {
  cursor: pointer;
}
.greyer{
  color:rgba(0,0,0,0.5);
}
.loading{
  font-size:35px;
}
</style>

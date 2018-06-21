<template>
<div class="hundred">
<login v-if="!this.loggedin"></login>
<!-- main application -->
  <div v-if="this.loggedin" id="app" class="hundred">
              <br><br><br>
              <transition name="slide">
              <router-view></router-view>
              </transition>
      <bottom></bottom>
      <naver></naver>
    </div>
</div>
</template>

<script>
import login from './components/login.vue'
import naver from './components/naver.vue'
import bottom from './components/bottom.vue'
import single from './components/single.vue'
import system from './components/system.vue'
import surf from './components/surf.vue'
import user from './components/user.vue'
import upload from './components/upload.vue'
import messages from './components/messages.vue'
import home from './components/home.vue'

export default {
  name: 'app',
  components: {
    naver,
    bottom,
    single,
    surf,
    system,
    user,
    upload,
    messages,
    login,
    home
  },
  data(){
    return {
      loggedin:this.$cookies.get('pc-zzl-loggedin')
    }
  }
}
</script>

<style>
html, body{
  margin:0 auto;
  height:100%;
  width:100%;
}
body {
  overflow-y:scroll;
}
.containerer {
    height:100%;
    width:100%;
}
.hundred {
  height:100%;
  min-height:100%;
  min-width:100%;
}
.nopadding {
   padding: 0 !important;
   margin: 0 auto !important;
}
.slide-leave-active{
  height:0px;
}
.slide-enter-active {
  transition: 1s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  opacity:0;
  height: 0px;
  transform: translate(-100%, 0);
}
.loginner{
background: #a90329; /* Old browsers */
background: -moz-linear-gradient(top, #a90329 0%, #8f0222 44%, #6d0019 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(top, #a90329 0%,#8f0222 44%,#6d0019 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to bottom, #a90329 0%,#8f0222 44%,#6d0019 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a90329', endColorstr='#6d0019',GradientType=0 ); /* IE6-9 */
color: #FFF;
}
.h6 {
  font-size: 14px;
}
.btn , kbd {
  cursor:pointer;
}
</style>

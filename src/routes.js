import naver from './components/naver.vue'
import bottom from './components/bottom.vue'
import single from './components/single.vue'
import system from './components/system.vue'
import surf from './components/surf.vue'
import user from './components/user.vue'
import upload from './components/upload.vue'
import messages from './components/messages.vue'
import home from './components/home.vue'



export default [

{path:'/upload' , component:upload },
{path:'/messages' , component:messages },
{path:'/home' , component:home },
{path:'/photo/:token' , component:single},
{path:'/user/:token' , component:user}

]

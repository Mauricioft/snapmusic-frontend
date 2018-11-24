<template>
  <v-layout row>
    <pm-lists :album="lists" @save="init" />
  </v-layout>
</template>

<script>
  import albumSrvc from '../../components/album/albumSrvc'
  import PmLists from '../../components/album/lists'

  export default {
    components: {
      PmLists
    },
    data () {
      return {
        lists: [],
      }
    },
    mounted() {
      this.init()
    },
    methods:{
      init(){
        albumSrvc.list().then((data) => {
          if(data['success']){
            this.lists = data['result']
          }
        })
        .catch(err => console.log(err))
      },
    }
  }
</script>
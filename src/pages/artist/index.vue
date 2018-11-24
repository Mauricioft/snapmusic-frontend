<template>
  <v-layout row>
    <pm-lists :artist="lists" @save="init" />
  </v-layout>
</template>

<script>
  import artistSrvc from '../../components/artist/artistSrvc'
  import PmLists from '../../components/artist/lists'

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
        artistSrvc.list().then((data) => {
          if(data['success']){
            this.lists = data['result']
          }
        })
        .catch(err => console.log(err))
      },
    }
  }
</script>
<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-btn icon slot="activator">
      <v-icon color="pink">delete</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <slot name="card-title"></slot>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <slot name="card-body"></slot>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click.native="close()">Cancelar</v-btn>
        <v-btn color="error" @click.native="remove(artist)">Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      artist: {
        type: Object,
        required: true
      }
    },
    data(){
      return {
        dialog: false,
      }
    },
    methods:{
      remove(artist){
        this.$emit('remove', artist)
        this.close()
      },
      close(){
        this.dialog = !this.dialog
      },
    }
  }  
</script> 
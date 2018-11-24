<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-btn icon fab small right dark fixed top color="primary" slot="activator" @click="init()" v-if="btnIcon != 'edit'">
      <v-icon dark>{{ btnIcon }}</v-icon>
    </v-btn>
    <v-btn icon slot="activator" @click="init()" v-else>
      <v-icon color="teal">{{ btnIcon }}</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <slot name="card-title"></slot>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm12 md12>
              <v-text-field 
                label="Nombre"
                v-model="artistTmp.name"
                :counter="100"
                v-validate="'required|max:100'"
                :error-messages="errors.collect('name')"
                data-vv-name="name"
                required
              />
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field 
                label="Genero musical"
                v-model="artistTmp.music_genre"
                :counter="100"
                v-validate="'required|max:100'"
                :error-messages="errors.collect('music')"
                data-vv-name="music"
                required
              />
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-select
                label="Genero"
                :items="gender"
                v-model="artistTmp.gender_id"
                item-text="name"
                item-value="id"
                :error-messages="errors.collect('gender')"
                v-validate="'required'"
                data-vv-name="gender"
                required
              />
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field 
                label="Edad"
                v-model="artistTmp.age"
                v-validate="'required|numeric'"
                :error-messages="errors.collect('age')"
                data-vv-name="age"
                required
              />
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field 
                label="Ciudad"
                v-model="artistTmp.city"
                :counter="100"
                v-validate="'required|max:100'"
                :error-messages="errors.collect('city')"
                data-vv-name="city"
                required
              />
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field 
                label="Pais"
                v-model="artistTmp.country"
                :counter="100"
                v-validate="'required|max:100'"
                :error-messages="errors.collect('country')"
                data-vv-name="country"
                required
              />
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field 
                label="Nacionalidad"
                v-model="artistTmp.nationality"
                :counter="100"
                v-validate="'required|max:100'"
                :error-messages="errors.collect('nationality')"
                data-vv-name="nationality"
                required
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click.native="close()">Cancelar</v-btn>
        <v-btn :disabled="errors.any()" color="info" @click.native="save(artistTmp)">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import artistSrvc from './artistSrvc'

  export default {
    name: 'save',
    props: {
      artist: {
        type: Object,
        // Object or array defaults must be returned from
        // a factory function
        default: function () {
          return { 
            id: null,
            name: '',
            gender_id: null,
            age: null,
            city: '',
            country: '',
            nationality: '',
            music_genre: ''
          }
        }
      },
      btnIcon: {
        type: String,
        default: 'add'
      }
    },
    data(){
      return {
        dialog: false,
        gender:[],
        artistTmp: {}
      }
    },
    methods:{
      init(){
        this.artistTmp = Object.assign({}, this.artist) 
        artistSrvc.combos().then((data) => {
          if(data['success']){
            this.gender = data['result']
            if(this.artistTmp.id == null){
              this.artistTmp.gender_id = (this.gender[0]['id'] != undefined) ? this.gender[0]['id'] : null
            }
          }
        })
        .catch(error => console.error(error));
        this.dialog = !this.dialog
      },
      save(artist){
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.$emit('save', artist);
            this.close();
          }
        })
        .catch(error => console.error(error));
      },
      close(){
        this.dialog = !this.dialog
        this.artistTmp = {} 
        this.$validator.reset()
      },
    }
  }
</script>
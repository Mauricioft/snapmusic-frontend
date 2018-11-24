<template>
  <v-flex xs12 sm12 md12>
    <v-card>
      <v-card-title>
        <span class="headline">
          Album favoritos
        </span>
        <v-spacer></v-spacer>
        <v-text-field
          label="Buscador"
          v-model="search"
          append-icon="search"
          single-line
          hide-details
        />
      </v-card-title>
      <!--
      <pm-save-artist @save="addAlbum">
        <template slot="card-title">
          <span class="headline">
            Crear album
          </span>
        </template>
      </pm-save-artist>
      -->
      <v-data-table :headers="headers" :items="album" :search="search" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.music_genre }}</td>
          <td class="text-xs-right">{{ props.item.age }}</td>
          <td class="text-xs-right">{{ props.item.city }}</td>
          <td class="text-xs-right">{{ props.item.country }}</td>
          <td class="text-xs-right">{{ props.item.gender.name }}</td>
          <td class="justify-center layout px-0">
            <!--
            <pm-save-artist @save="editArtist" :artist="props.item" :btn-icon="'edit'">
              <template slot="card-title">
                <span class="headline">
                  Editar artista
                </span>
              </template>
            </pm-save-artist>
            <pm-delete-artist @remove="removeArtist" :artist="props.item">
              <template slot="card-title">
                <span class="headline">
                  Eliminar artista
                </span>
              </template>
              <template slot="card-body">
                ¿Seguro que quieres eliminar este artista?
              </template>
            </pm-delete-artist>
            -->
          </td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Su búsqueda de "{{search}}" no encontró resultados.
        </v-alert>
      </v-data-table>
    </v-card>
  </v-flex>
</template>

<script>
  import albumSrvc from './albumSrvc'
  import PmSaveAlbum from './save'
  // import PmDeleteArtist from './delete'

  export default {
    components: {
      // PmSaveAlbum
    },
    props: {
      album: {
        type: Array,
        required: false
      },
    },
    data(){
      return {
        search: '',
        headers: [
          {
            text: 'Nombre',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Genero musical', value: 'music_genre' },
          { text: 'Edad', value: 'age' },
          { text: 'Ciudad', value: 'city' },
          { text: 'Pais', value: 'country' },
          { text: 'Genero', value: 'gender' },
          { text: 'Actions', value: 'name', sortable: false }
        ]
      }
    },
    methods:{ 
      addAlbum(){

      }
    } 
  }
</script>
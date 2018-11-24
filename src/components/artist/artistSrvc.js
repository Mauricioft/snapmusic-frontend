import HTTP from '../../http-common';

export default {
  combos(){
    return HTTP.get('combos/gender/')
      .then(resp => resp.data)
  },
  list(){
    return HTTP.get('artist/')
      .then(resp => resp.data)
  },
  add(artist){
    const params = {
      name: artist.name,
      gender_id: artist.gender_id,
      age: artist.age,
      city: artist.city,
      country: artist.country,
      nationality: artist.nationality,
      music_genre: artist.music_genre
    }
    return HTTP.post('artist/', params)
      .then(resp => resp.data)
  },
  edit(artist) {
    const params = {
      id: artist.id,
      name: artist.name,
      gender_id: artist.gender_id,
      age: artist.age,
      city: artist.city,
      country: artist.country,
      nationality: artist.nationality,
      music_genre: artist.music_genre
    }
    return HTTP.put(`artist/${params.id}`, params)
      .then(resp => resp.data)
  },
  remove(artist){ 
    return HTTP.delete(`artist/${artist.id}`)
      .then(resp => resp.data)   
  }
}
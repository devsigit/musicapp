<!-- Components/Songs.vue-->
<template>
<v-container>
    <v-layout wrap>
      <v-flex xs4 md2
        v-for="(item, index) in posts"
        :key="index"
        mb-16>
        <v-card
    class="mx-auto"
    max-width="100"
    max-height="90"
  >
    <v-img
      class="white--text align-end rounded-lg"
      height="110px"
      width="120px"
      :src="item.album"
      
    >
  <!--playing using native audio player-->  
  <audio :src="item.song" controls></audio>
    </v-img>
  <!--  <audio  ref="audiofile" :src="item.song"  controls></audio> -->
    
 <div class="overflow_prevent">{{ item.title}}</div>
    <div class="caption overflow_prevent" style="line-height: 100%;">{{ item.artist}}</div>
  </v-card>

      </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
 data() {
    return {
      posts: [],
      errors: [],
      file: '',
      multiLine: true,
      snackbar: true,
    }
  },
  methods:{
        play() {
      console.log('playing')
      this.audio.play();
        }
  },
 created() {
    this.audio = document.getElementById('audio');
  },

mounted() {
        const base = {
            
            baseURL: this.$store.state.endpoints.baseUrl,
            headers: {
            // Set your Authorization to 'JWT'!!!
              Authorization: `JWT ${this.$store.state.jwt}`,
              'Content-Type': 'application/json'
            },
            xhrFields: {
                withCredentials: true
            }
          }
          const axiosInstance = axios.create(base)
          axiosInstance({
            url: "http://127.0.0.1:8000/api/v1/songs/",
            method: "get",
            params: {}
          })
            .then((response) => {
               this.posts = response.data.results
            })

        .catch(e => {
      this.errors.push(e)
    })

}
}

</script>

<style lang="css">
.overflow_prevent{
   white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
}
</style>
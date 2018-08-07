<template>
  <div id="audio">
    <div class="page-field">
      <mt-header fixed title="话术学习">
        <router-link to="/more"  slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>          
      </mt-header>
    </div>

    <group>
    <audio ref="audio"  autoplay="autoplay" controls></audio>      
        <div v-for="(item,index) in audioList">
          <cell is-link :title="item.value"  :key="item.id"
          @click.native="check(item)" 
          :arrow-direction=" !item.id ? 'up' : 'down'">
          </cell>

             <div v-if="!item.id" v-for="item2 in item.audio">
              <cell class="sub-item" is-link :value="item2.audioName"
              value-align="left"
              @click.native="play(item2.audioUrl)">
              </cell>
            </div>   

        </div>

    </group>
  </div>

</template>

<script>
export default {
  data () {
    return {
      audioList: [],
      url: ''
    }
  },
  computed: {

  },
  created: function () {
    this.getAudioType()
  },
  methods: {
    play: function (url) {
      let root = 'http://wx.zuanno.cn'
      this.url = root + url

      this.$nextTick(() => {
        this.$refs.audio.src = this.url
        // this.$refs.audio.play()
      })
    },
    getAudio: function (index, type) {
      // 查询话术
      this.$axios.post(
        '/audio/audioDatalist',
        {
          value: type
        },
        r => {
          this.audioList[index].audio = r.data
        },
        r => {
          if (r.code === '101') {
            this.$router.push({path: '/login'})
          }
        }
      )
    },
    check: function (item) {
      item.id = !item.id
    },
    getAudioType: function () {
      this.$axios.post(
        '/audio/audioInfolist',
        {},
        r => {
          this.audioList = r.data
          for (let [index, item] of this.audioList.entries()) {
            this.getAudio(index, item.value)
          }
        },
        r => {
          if (r.code === '101') {
            this.$router.push({path: '/login'})
          }
        }
      )
    }
  }

}
</script>

<style lang="scss" scoped>

</style>

<style lang="less">
  .sub-item {
    color: #888 !important;
    padding-left: 2em !important;
  }
</style>




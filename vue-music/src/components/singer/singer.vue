<template>
  <div class="singer">
    <listview :data="singers" @select="selectSinger"></listview>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {ERR_OK} from 'api/config'
  //  获取数据方法
  import {getSingerList} from 'api/singer'
  import Singer from 'common/js/singer'
  import Listview from 'base/listview/listview'
  //  引入vuex
  import {mapMutations} from 'vuex'

  const HOT_NAME = '热门'
  const HOT_SINGER_LENGTH = 10
  export default {
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingList()
    },
    methods: {
      selectSinger(singer) {
        // 跳转路由
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        // 存入歌手数据
        this.setSinger(singer)
      },
      // 获取歌手数据
      _getSingList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.data.list)
          }
        })
      },
      /**
       *
       * @param 歌手对象
       * @return 对信息处理排序后的歌手对象
       */
      _normalizeSinger(list) {
        // 根据索引字母，处理成字母排序的对象变成数组
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        // 热门列表，取前十个
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LENGTH) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
//          取到字母
          const key = item.Findex
          if (!map[key]) {
//            如果没有key先创建对象
            map[key] = {
              title: key,
              items: []
            }
          }
//          如果有key，就装进数组
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })
        // 为了得到有序列表，处理map
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        // 返回a-z排序
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        // 连接数组
        return hot.concat(ret)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },

    components: {
      Listview
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>

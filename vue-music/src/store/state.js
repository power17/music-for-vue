import {playMode} from 'common/js/config'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [], // 播放模式，比如随机播放
  mode: playMode.sequence,
  currentIndex: -1
}

export default state

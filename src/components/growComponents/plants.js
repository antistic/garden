const unit = process.env.NODE_ENV === 'development' ? 1000 : 60000

export default {
  tomato: {
    path: require('../../assets/imgs/plants/tomato.png'),
    time: 25 * unit,
    totalFrames: 25,
  },
}

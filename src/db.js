import mongoose from 'mongoose'
import config from './config'

export default callback => {
  // db와 커넥트
  let db = mongoose.connect(config.mongoUrl).
  then(() => {
  }).catch(err => {

  })
  // db객체를 반환함(?)
  callback(db)
}

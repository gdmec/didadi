// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const recordCollection = db.collection('ddd_records')
const studentCollection = db.collection('ddd_students')

// 云函数入口函数
exports.main = async (event, context) => {


  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
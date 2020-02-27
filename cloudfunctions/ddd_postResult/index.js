// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const recordCollection = db.collection('ddd_records')
const studentCollection = db.collection('ddd_students')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let openid = cloud.getWXContext().OPENID
  let student = await studentCollection.where({ _openid: openid }).get()
  console.log(event)
  console.log(student)
  if(event.score==5){
    await studentCollection.where({ _openid: openid}).update({
      data: {
        score: _.inc(event.score)
      }
    })
    student.data[0].score += 5 
  }

  let record = event
  record.postDate = new Date()
  record.openid = event.userInfo.openId
  let res = await recordCollection.add({data:record})
  return student.data[0]
}
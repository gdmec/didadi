const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const studentCollection = db.collection('ddd_students')
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let openid = cloud.getWXContext().OPENID
  let student = await studentCollection.where({
    _openid:openid
  }).get()
  let result={}
  if(student.data.length>0){
    result=student.data[0]
  }else{
    result={name:'nobody'}
  }
  return {
    openid: wxContext.OPENID,
    user:result
  }
}

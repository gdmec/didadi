// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  formsubmit:function(e){
    const db = wx.cloud.database()
    const studentCollection = db.collection('ddd_students')
    let sn = e.detail.value.sn
    let name = e.detail.value.name
    studentCollection.where({
      sn:sn
    }).get()
    .then(res=>{
      if(res.data.length==0){
        studentCollection.add({
          data:{
            sn:sn,
            name:name,
            signdate:new Date(),
            score:0
          }
        }).then(res=>{
          if (res.errMsg =='collection.add:ok'){
            wx.showToast({
              title: '绑定成功',
              success: function () {
                wx.navigateTo({
                  url: '../exam/exam',
                })
              }
            })
          }
        })
      }else{
        console.log(res)
        wx.showModal({
          title:'此学号已注册',
          content: '已被'+res.data[0].name+'于'+res.data[0].signdate+'注册,他的openid是'+res.data[0]._openid
        })
      }
    })

  }
})
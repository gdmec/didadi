//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {}
    wx.cloud.callFunction({
      name:'login'
    }).then(res=>{
      //console.log(res)
      if(res.result.user.name=='nobody'){
        wx.navigateTo({
          url: '../register/register',
        })
      }
    })
  }
})

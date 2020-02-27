// pages/exam/exam.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ques:null,
    pos:0,
    quesnum:5,
    score:0,
    total:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:"ddd_getQuestion"
    }).then(res=>{
      console.log(res.result)
      res = res.result.map(val=>{
        let result={}
        let arr = [true, false];
        //Lang=true 题干是中文
        result.lang = arr[Math.floor(Math.random() * arr.length)];
        result.ques = val[0]
        val = val.sort(() => { return .5 - Math.random()})
        val = val.map((val,index)=>{
          val.index = index
          val.checked = false
          return val
        })
        result.choice=val
        return result
      })
      this.setData({
        ques:res
      })
    })
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
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    let lques = this.data.ques
    lques[this.data.pos].answer=e.detail.value
    for(let i=0;i<this.data.quesnum;i++){
      lques[this.data.pos].choice[i].checked=false
      if (lques[this.data.pos].lang){
        if (lques[this.data.pos].choice[i].en==e.detail.value){
          lques[this.data.pos].choice[i].checked = true
          console.log('en choice ')
        }
      }else{
        if (lques[this.data.pos].choice[i].cn == e.detail.value) {
          lques[this.data.pos].choice[i].checked = true
          console.log('cn choice ')
        }
      }
    }
    this.setData({
      ques:lques
    })
  },
  pre:function(e){
    if(this.data.pos>0){
      this.setData({
        pos:this.data.pos-1
      })
    }
  },
  next:function(e){
    console.log(this.data.pos)
    if (this.data.pos < this.data.quesnum - 1) {
      this.setData({
        pos: this.data.pos + 1
      })
    }
  },
  postResult:function(e){
    //计算成绩
    let score = 0;
    for (let i = 0; i < this.data.quesnum;i++){
      console.log(this.data.ques[i].ques.answer)
      console.log(this.data.ques[i].ques.en)
      console.log(this.data.ques[i].ques.cn)
      if(this.data.ques[i].lang){
        if (this.data.ques[i].answer == this.data.ques[i].ques.en)
          score++
      }else{
        if (this.data.ques[i].answer == this.data.ques[i].ques.cn)
          score++
      }
    }

    let result = {}
    result.test = this.data.ques
    result.score = score

    result.type = 0
    console.log(result)
    if(!this.data.submited){
      wx.cloud.callFunction({
        name:"ddd_postResult",
        data:result
      })
      .then(res=>{
        console.log(res)
        this.setData({
          total:res.result.score
        })
      })
      this.setData({
        submited:true,
        score:score
      })
    }else{
      this.onLoad()
      this.setData({
        submited:false,
        ques: null,
        pos:0
      })
    }
  }
})
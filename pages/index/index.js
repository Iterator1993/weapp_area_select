//index.js
Page({
  data: {
    province:'',
    city:'',
    area:'',
    show:false
  },
  sureSelectAreaListener:function(e){
    var that = this;
    that.setData({
      show: false,
      province: e.detail.currentTarget.dataset.province,
      city: e.detail.currentTarget.dataset.city,
      area: e.detail.currentTarget.dataset.area
    })
  },
  chooseAddress:function(){
    console.log("xuanzedizhi")
    var that = this;
    that.setData({
      show:true
    })
  }
 
})

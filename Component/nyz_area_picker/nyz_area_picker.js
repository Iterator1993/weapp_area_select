// common/nyz_area_picker/nyz_area_picker.js
var areaTool = require('../../utils/area.js');
var index = [0,0,0]
var provinces = areaTool.getProvinces();
var citys = areaTool.getCitys(index[0]);
var areas = areaTool.getAreas(index[0],index[1]);

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:{    //控制area_select显示隐藏
      type:Boolean,
      value:false
    },
    maskShow:{    //是否显示蒙层
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    provinces: provinces,
    citys: areaTool.getCitys(index[0]),
    areas: areaTool.getAreas(index[0], index[1]),
    value:[0,0,0],
    province: '北京市',
    city: '北京市',
    area: '东城区'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleNYZAreaChange:function(e){
      var that = this;
      console.log("e:" + JSON.stringify(e));
      var value = e.detail.value;
      /**
       * 滚动的是省
       * 省改变 市、区都不变
       */
      if(index[0] != value[0]){
        index = [value[0],0,0]
        let selectCitys = areaTool.getCitys(index[0]);
        let selectAreas = areaTool.getAreas(index[0], 0);
        that.setData({
          citys: selectCitys,
          areas: selectAreas,
          value: [index[0],0,0],
          province: provinces[index[0]],
          city: selectCitys[0],
          area: selectAreas[0]
        })
      } else if (index[1] != value[1]){
        /**
         * 市改变了 省不变 区变
         */
        index = [value[0], value[1], 0]
        let selectCitys = areaTool.getCitys(index[0]);
        let selectAreas = areaTool.getAreas(index[0], value[1]);
        that.setData({
          citys: selectCitys,
          areas: selectAreas,
          value: [index[0], index[1], 0],
          province: provinces[index[0]],
          city: selectCitys[index[1]],
          area: selectAreas[0]
        })
      } else if (index[2] != value[2]){
        /**
         * 区改变了
         */
        index = [value[0], value[1], value[2]]
        let selectCitys = areaTool.getCitys(index[0]);
        let selectAreas = areaTool.getAreas(index[0], value[1]);
        that.setData({
          citys: selectCitys,
          areas: selectAreas,
          value: [index[0], index[1], index[2]],
          province: provinces[index[0]],
          city: selectCitys[index[1]],
          area: selectAreas[index[2]]
        })
      }
    },
    /**
     * 确定按钮的点击事件
     */
    handleNYZAreaSelect:function(e){
      //console.log("e:" + JSON.stringify(e));
      var myEventDetail = e; // detail对象，提供给事件监听函数
      var myEventOption = {}; // 触发事件的选项
      this.triggerEvent('sureSelectArea', myEventDetail, myEventOption)
    },
    /**
     * 取消按钮的点击事件
     */
    handleNYZAreaCancle:function(e){
      var that = this;
      console.log("e:" + JSON.stringify(e))
      that.setData({
        show:false
      })
    }
  }
})

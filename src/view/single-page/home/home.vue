<template>
  <!-- 首页模块 -->
  <div class="app-box">
    <div class="top-box">
      <div class="count-box c1">
        <div class="key">用户数量(个)</div>
        <div class="value">666</div>

        <div class="animate animate1"></div>
        <div class="animate animate2"></div>
        <div class="animate animate3"></div>
      </div>

      <div class="count-box c2">
        <div class="key">代理商数量(个)</div>
        <div class="value">555</div>

        <div class="animate animate1"></div>
        <div class="animate animate2"></div>
        <div class="animate animate3"></div>
      </div>

      <div class="count-box c3">
        <div class="key">产品商数量(个）</div>
        <div class="value">555</div>

        <div class="animate animate1"></div>
        <div class="animate animate2"></div>
        <div class="animate animate3"></div>
      </div>

      <div class="count-box c4">
        <div class="key">
          <span class="Titlespan">解决方案(个)</span>
        </div>

        <div class="value">555</div>

        <div class="animate animate1"></div>
        <div class="animate animate2"></div>
        <div class="animate animate3"></div>
      </div>
      <div class="count-box c5">
        <div class="key">
          <span class="Titlespan">产品(个)</span>
        </div>

        <div class="value">555</div>

        <div class="animate animate1"></div>
        <div class="animate animate2"></div>
        <div class="animate animate3"></div>
      </div>
      <div class="count-box c6">
        <div class="key">
          <span class="Titlespan">平台交易金额(元)</span>
        </div>

        <div class="value">555</div>

        <div class="animate animate1"></div>
        <div class="animate animate2"></div>
        <div class="animate animate3"></div>
      </div>
    </div>

    <div class="bottom-box">
      <div class="chart-box1">
        <div class="chart-div" id="chart-line"></div>
      </div>
      <div class="list-box">
        <div class="chart-box2">
          <div class="table-title" style="display:flex;">
            <div class="list-title-size">
              代理商排名
            </div>
            <!-- <el-select
              style="width:30%"
              class="callSelect"
              v-model="CallThePolice"
              placeholder="请选择"
              @change="CallPhoneSele"
              size="mini"
            >
              <el-option :value="1" label="周"></el-option>
              <el-option :value="2" label="月"></el-option>
            </el-select>-->
          </div>
          <div class="listBack">
            <div class="table-header">
              <span class="rank">排名</span>
              <span class="name">名称</span>
              <span class="value">营业额</span>
              <span class="turnover">提现额</span>
            </div>
            <div id="list">
              <ul id="list1">
                <li>
                  <span class="rank">1</span>
                  <span class="name">海底捞</span>
                  <span class="value">50000</span>
                  <span class="turnover">49999</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入echarts
var $echarts = require('echarts')
export default {
  data() {
    return {}
  },
  created() {},
  mounted() {

    setTimeout(() => {
          this.initLineChart()
    }, 200);
    
  },
  methods: {
    initLineChart() {
      var LineChart = $echarts.init(document.getElementById('chart-line'))
      var option = {
        title: {
          text: '功能使用排行'
          // subtext: '数据来自网络'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['使用人数', '追加人数']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          axisLine: {
            show: false,
        },
          splitLine: { show: true, lineStyle: { type: 'dashed' } },
        },
        yAxis: {
          type: 'category',
          data: ['大数据', '物联网', '票务平台', '管理平台', '闸机']
        },
        series: [
          {
            name: '使用人数',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744],
            itemStyle: {
              normal: {
                color: '#3AA0FF'
              }
            }
          },
          {
            name: '追加人数',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141],
            itemStyle: {
              normal: {
                color: '#4ECB73'
              }
            }
          }
        ]
      }

      LineChart.setOption(option)
      window.addEventListener('resize', function() {
        LineChart.resize()
      })
    }
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}

html,
.app-box {
  height: 100%;
  background-color: white;
}

.app-box {
  position: relative;
}

ul,
ol {
  list-style: none;
}

div {
  box-sizing: border-box;
}

.c1 {
  background: white;
}

.c2 {
  background: white;
}

.c3 {
  background: white;
}

.c4 {
  background: white;
}

.c5 {
  background: white;
}
.c6 {
  background: white;
}

/*动画*/
@-webkit-keyframes sploosh {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: -1200px;
  }
}
@keyframes sploosh {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: -1200px;
  }
}

.top-box {
  height: 180px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 30px;
  left: 30px;
  right: 30px;
}

.bottom-box {
  position: absolute;
  top: 250px;
  bottom: 30px;
  left: 30px;
  right: 30px;
  display: flex;
  justify-content: space-between;
}

.count-box {
  width: 15%;
  height: 180px;
  box-shadow: 3px 3px 3px #ccc;
  border: 1px solid #cccccc;
  position: relative;
  transition: all 0.5s;
}
//顶部悬浮效果
// .count-box:hover {
//   box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.3);
//   transform: scale(1.05);
// }

.animate {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 63px;
  // background: url('../../assets/wave_01.png') no-repeat;
  background-size: 1920px 62px;
  animation: sploosh 10s linear both infinite;
  border-radius: 0 0 12px 12px;
}

.animate1 {
  opacity: 0.2;
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

.animate2 {
  opacity: 0.4;
  -webkit-animation-delay: -3s;
  animation-delay: -3s;
}

.animate3 {
  opacity: 0.6;
  -webkit-animation-delay: -5s;
  animation-delay: -5s;
}
.Titlespan {
  font-size: 18px;
  font-weight: 100;
}
.count-box .key {
  color: #000;
  text-align: left;
  padding-left: 20px;
  margin-left: 0;
  margin-top: 5px;
  width: 89%;
  height: 10px;
}
.count-box .value {
  color: #000;
  text-align: center;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.count-box .value {
  font-size: 46px;
  font-family: Arial;
  height: 90px;
  line-height: 130px;
}

.count-box .key {
  font-size: 18px;
  // font-weight: bold;
  height: 10px;
  line-height: 40px;
}

.bottom-box > div {
  height: 100%;
  float: left;
  position: relative;
}
.list-box {
  width: 50%;
  display: flex;
  background-color: white;
  justify-content: space-between;
  // bottom: 7.2%;
}
.chart-box1 {
  width: 80%;
  background-color: white;
}

.chart-box2 {
  width:100%;
  min-width: 297px;
  margin-top: 3%;
  margin-left: 3%;
}
.chart-box2 .rank {
  width: 25%;
  display: inline-block;
  text-align: center;
}
.chart-box2 .name {
  width: 25%;
  display: inline-block;
  text-align: center;
}
.chart-box2 .value {
  width: 25%;
  display: inline-block;
  text-align: center;
  font-family: Arial;
}
.chart-box2 .turnover {
  width: 25%;
  display: inline-block;
  text-align: center;
  font-family: Arial;
}
.list-title-size {
  font-size: 20px;
}


.chart-box3 {
  width: 48%;
  margin-top: 3%;
}

.chart-title {
  font-size: 18px;
  position: absolute;
  top: 4%;
  width: 100%;
  z-index: 9999999;
  text-align: center;
}
.chart-div {
  height: 100%;
  // position: absolute;
  // top: 24px;
  // bottom: 0;
  // width: 100%;
}
.callSelect {
  margin-left: 10px;
}
.table-title {
  font-size: 20px;
  // font-weight: bold;
  // color: #299b8a;
  height: 30px;
  width: 100%;
  min-width: 296px;
  margin-bottom: 10px;
  // float: right;
  // background: #eaeaea;
  text-align: center;
  line-height: 30px;
  border-radius: 3px;
}
.airDropdown {
  display: flex;
  left: 75%;
  width: 25%;
  top: 4%;
  z-index: 9999999;
}
.table-header {
  width: 100%;
  min-width: 296px;
  float: right;
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  font-weight: bold;
}

.chart-box3 .rank {
  width: 27%;
  display: inline-block;
  text-align: center;
}

.chart-box3 .name {
  width: 30%;
  display: inline-block;
  text-align: center;
}

.chart-box3 .value {
  width: 39%;
  display: inline-block;
  text-align: center;
  font-family: Arial;
}

#list {
  overflow: auto;
  height: 84%;
  width: 100%;
  min-width: 296px;
  float: right;
  position: relative;
}

#list1 {
  height: auto;
  text-align: left;
}

#list2 {
  height: auto;
}

#list1 li,
#list2 li {
  height: 55px;
  font-size: 16px;
  color: #666;
}

// #list1 li:nth-of-type(1),
// #list2 li:nth-of-type(1) {
//   color: #ff9565;
//   font-weight: bold;
// }

// #list1 li:nth-of-type(2),
// #list2 li:nth-of-type(2) {
//   color: #1a9f9c;
//   font-weight: bold;
// }

// #list1 li:nth-of-type(3),
// #list2 li:nth-of-type(3) {
//   color: #23b7e5;
//   font-weight: bold;
// }

/*滚动条的宽度*/

#list::-webkit-scrollbar {
  width: 9px;
  height: 9px;
}

/*外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果*/

#list::-webkit-scrollbar-track {
  width: 6px;
  background-color: #eeeeee;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

/*滚动条的设置*/

#list::-webkit-scrollbar-thumb {
  background-color: #2bc8c8;
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
/*滚动条移上去的背景*/

#list::-webkit-scrollbar-thumb:hover {
  background-color: #777777;
}
.blue {
  color: #3d88f1;
  font-weight: 100;
  font-size: 16px;
}
.UtiRate {
  color: #3d88f1;
}
.count-box .value {
  font-family: 'PingFang';
  font-size: 40px;
}
</style>
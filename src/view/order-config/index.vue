<template>
  <div class="setting">
    <div class="reapdata">
      <div>
        <p>自动收货设置</p>
        <div class="dataTime">
          <input type="text" placeholder="设置自动收货天数" />
          <span>天</span>
          <button @click="edit" v-if="editshow">修改</button>
          <button @click="edit" v-if="!editshow">保存</button>
        </div>
      </div>
    </div>
    <div class="reapdata time">
      <div>
        <p>锁单设置</p>
        <div class="dataTime">
          <input type="text" placeholder="设置锁单时间" />
          <span>小时</span>
         <button @click="edits" v-if="isShow">修改</button>
          <button @click="edits"  v-if="!isShow">保存</button>
        </div>
      </div>
    </div>
    <div class="reapdata">
      <div>
        <p>使用天数设置</p>
        <div class="dataTime">
          <input type="text" placeholder="设置软件试用天数" />
          <span>天</span>
          <button @click="alter" v-if="buttonCut">修改</button>
          <button @click="alter" v-if="!buttonCut">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      editshow: true,
      isShow:true,
      buttonCut:true
    };
  },
  created() {},
  methods: {
    edit(){
      this.editshow=!this.editshow;
    },
    edits(){
      this.isShow=!this.isShow;
    },
    alter(){
      this.buttonCut=!this.buttonCut;
    }
  }
};
</script>

<style scoped>
.setting {
  width: 100%;
}
.reapdata {
  width: 30%;
  display: flex;
  justify-content: space-around;
  padding: 10px;
}
.time {
  margin-left:7px;
}
.dataTime {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
input {
  height: 40px;
}
button {
  margin-left: 15px;
  padding: 6px 15px;
}
</style>

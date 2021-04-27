<template>
  <div>
    <Modal v-model="userForm" title='活动详情'>
      <div>
        <ul>
          <li>自建应用
              <input type="text">
          </li>
          <li>提交工单
                <input type="text">
          </li>
          <li>下单数量
                <input type="text">
          </li>
          <li>消费金额
                <input type="text">
          </li>
          <li>账户余额
                <input type="text">
          </li>
          <li>一级下线
                <input type="text">
          </li>
          <li>二级下线
                <input type="text">
          </li>
          <li>提现总额:
                <input type="text">
          </li>
          <li>开户行:
                <input type="text">
          </li>
          <li>卡号:
                <input type="text">
          </li>
        </ul>
      </div>
      <div class="footer">关闭</div>
    </Modal>
  </div>
</template>

<script>
import axios from "axios";
import {getDetails} from "@/api/active";
export default {
  data() {
    return {
      userForm: false,
      edit: false,
    };
  },
  methods: {
  }
};
</script>

<style>
ul li {
  list-style: none;
  font-size: 16px;
}
</style>
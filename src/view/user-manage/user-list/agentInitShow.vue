<template>
  <div>
    <!-- :mask-closable="false" -->
    <Modal
      v-model="agentInitShow"
      title="身份升级"
      width="28%"
      :mask-closable="false"
    >
      <Form
        :model="formItem"
        :label-width="120"
        :rules="ruleInline"
        ref="formInline"
      >
        <!-- 选择身份 -->
        <!-- <h2>身份升级</h2> -->
        <Form-item label="选择身份" prop="applicationIdentity">
          <Select v-model="formItem.applicationIdentity" placeholder="请选择">
            <Option value="3">代理商用户</Option>
            <Option value="4">产品商用户</Option>
            <!-- <Option value="3">核验商用户</Option> -->
          </Select>
        </Form-item>
        <!-- 选择类型 -->
        <Form-item label="类型">
          <Radio-group v-model="formItem.agentType">
            <Radio :label="1">公司</Radio>
            <Radio :label="2">个人</Radio>
          </Radio-group>
        </Form-item>

        <div v-if="formItem.agentType == 1">
          <h3 class="text-kong">企业信息</h3>
          <Form-item label="企业类型" prop="companyType">
            <Select placeholder="请选择企业类型" v-model="formItem.companyType">
              <Option :value="1">民企</Option>
              <Option :value="2">国企</Option>
            </Select>
            <!-- 选择类型 -->
            <!-- <Form-item label="企业类型"  prop="companyType">
          <Radio-group  v-model="formItem.companyType">
            <Radio :label="1">民企</Radio>
            <Radio :label="2">个人</Radio>
          </Radio-group>
        </Form-item> -->
          </Form-item>
          <Form-item label="企业名称" prop="companyName">
            <Input
              v-model="formItem.companyName"
              placeholder="请输入企业名称"
              :maxlength="maxlengthsize"
            ></Input>
          </Form-item>
          <Form-item label="机构代码" prop="agencyCode">
            <Input
              v-model="formItem.agencyCode"
              placeholder="请输入机构代码"
              :maxlength="maxlengthsize"
            ></Input>
          </Form-item>
          <Form-item label="法定人代表" prop="legalRepresentative">
            <Input
              v-model="formItem.legalRepresentative"
              placeholder="请输入法定人代表"
              :maxlength="maxlengthsize"
            ></Input>
          </Form-item>
        </div>

        <h3 class="text-kong">
          {{ this.formItem.agentType == 2 ? "个人信息" : "联系人信息" }}
        </h3>
        <Form-item
          :label="this.formItem.agentType == 2 ? '姓名' : '联系人'"
          prop="agentName"
        >
          <Input
            v-model="formItem.agentName"
            placeholder="请输入姓名"
            :maxlength="maxlengthsize"
          ></Input>
        </Form-item>
        <Form-item label="邮箱" prop="email">
          <Input v-model="formItem.email" placeholder="请输入邮箱"></Input>
        </Form-item>
        <Form-item label="联系电话" prop="contactNumber">
          <Input
            v-model="formItem.contactNumber"
            placeholder="请输入联系电话"
          ></Input>
        </Form-item>
        <Form-item label="通讯地址" prop="mailingAddress">
          <Input
            v-model="formItem.mailingAddress"
            placeholder="请输入通讯地址"
            :maxlength="maxlengthsize"
          ></Input>
        </Form-item>

        <h3 class="text-kong">
          {{ this.formItem.agentType == 2 ? "财务信息" : "银行对公账户信息" }}
        </h3>
        <Form-item label="开户银行" prop="bankName">
          <Input
            v-model="formItem.bankName"
            placeholder="请输入开户银行"
            :maxlength="maxlengthsize"
          ></Input>
        </Form-item>

        <Form-item label="银行所在地" prop="bankAddress">
          <Input
            :maxlength="maxlengthsize"
            v-model="formItem.bankAddress"
            placeholder="请输入银行所在地"
          ></Input>
        </Form-item>

        <Form-item label="开户支行" prop="accountOpeningBranch">
          <Input
            :maxlength="maxlengthsize"
            v-model="formItem.accountOpeningBranch"
            placeholder="请输入开户支行"
          ></Input>
        </Form-item>
        <Form-item label="银行账号" prop="bankAccount">
          <Input
            v-model="formItem.bankAccount"
            placeholder="请输入银行账号"
          ></Input>
        </Form-item>
        
        <div v-show="formItem.agentType == 1">
          <formCreate
            ref="agentFormModal1"
            v-model="formData1"
            @success="agentInit"
            :rule="agentRules1"
            :option="option"
          ></formCreate>
        </div>

        <formCreate
          ref="agentFormModal2"
          v-model="formData2"
          @success="agentInit"
          :rule="agentRules2"
          :option="option"
        ></formCreate>
      </Form>
      <div slot="footer">
        <Button @click="handleCancel">取消</Button>
        <Button type="primary" @click="submit" :loading="loading"
          >确定提交</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import option from "./options";
import Bus from "@/bus";
import agentRules1 from "./agentRules1";
import agentRules2 from "./agentRules2";
import { getStatusupdate } from "@/api/user-list";
export default {
  components: { agentRules1, agentRules2 },
  data() {
    return {
      maxlengthsize: 30,
      option,
      loading: false,
      agentRules1,
      agentRules2,
      formData1: {},
      formData2: {},
      formData11: false,
      formData22: false,
      agentInitShow: false,
      ruleInline: {
        applicationIdentity: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        gender: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "请选择免责声明",
            trigger: "change",
          },

          // { required: true, message: "请选择免责声明", trigger: "blur" },
        ],
        companyType: [
          // { required: true, message: "请选择", trigger: "blur" },
        ],
        companyName: [{ required: true, message: "请填写", trigger: "blur" }],
        agencyCode: [
          { required: true, message: "请填写", trigger: "blur" },
          { pattern: /^[0-9]*$/, message: "机构代码必须为数字" },
        ],
        legalRepresentative: [
          { required: true, message: "请填写", trigger: "blur" },
        ],
        agentName: [{ required: true, message: "请填写", trigger: "blur" }],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" },
        ],

        contactNumber: [
          { required: true, message: "请填写", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不正确",
          },
        ],
        mailingAddress: [
          { required: true, message: "请填写", trigger: "blur" },
        ],
        bankName: [{ required: true, message: "请填写", trigger: "blur" }],
        user: [{ required: true, message: "请填写", trigger: "blur" }],
        bankAddress: [{ required: true, message: "请填写", trigger: "blur" }],
        accountOpeningBranch: [
          { required: true, message: "请填写", trigger: "blur" },
        ],
        bankAccount: [
          { required: true, message: "请填写", trigger: "blur" },
          {
            pattern: /^([1-9]{1})(\d{14}|\d{18})$/,
            message: "请输入正确银行帐号",
          },
        ],
      },
      formItem: {
        accountOpeningBranch: "",
        agentName: "",
        agentType: 1,
        annexIdList: [],
        applicationIdentity: "",
        applicationPeopleId: "",
        applicationUserName: "",
        bankAccount: "",
        bankAddress: "",
        bankName: "",
        contactNumber: "",
        email: "",
        mailingAddress: "",
        photoIdList: [],
        photoLists: [],
        companyType: 1,
        companyName: "",
        agencyCode: "",
        legalRepresentative: "",
      },
    };
  },

  watch: {
    agentInitShow: function (val) {
      if (!val) {
        (this.annexIdList = []),
          // this.formItem.agentType = 1;
          this.$refs.formInline.resetFields();
        this.handleCancel();
        this.agentInitShow = false;
      }
    },
  },
  mounted() {
    Bus.$on("change:annexIdList", (data) => {
      this.formItem.photoLists.push(data);
    });
    Bus.$on("delete:annexIdList", (data) => {
      this.formItem.photoLists.map((item, index) => {
        if (data.type == item.type) {
          this.formItem.photoLists.splice(index, 1);
        }
      });
    });
    Bus.$on("notice:warn", () => {
      this.$Message.warning("请选择上传png, jpg, pdf格式的图片!!!");
    });
  },
  methods: {
    // 升级请求
    // 清空上传数组
    agentInit() {
      this.formItem.annexIdList = [];
      this.formItem.photoLists = [];
    },
    submit() {
      this.$refs.formInline.validate((valid) => {
        if (!valid) return;
        this.loading = true;

        let p1 = new Promise((resolve, reject) => {
          resolve();
        }).then((res) => {
          this.formData2.validate((valid, fail) => {
            if (valid) {
              this.formData22 = valid;
            } else {
              this.loading = false;
              return;
            }
          });
        });

        let p2 = new Promise((resolve, reject) => {
          resolve();
        }).then((res) => {
          this.formData1.validate((valid, fail) => {
            if (this.formItem.agentType == 2) {
              delete this.formItem.companyName;
              delete this.formItem.agencyCode;
              delete this.formItem.companyType;
              delete this.formItem.legalRepresentative;
              this.formData11 = true;
            } else {
              if (valid) {
                this.formData11 = valid;
              } else {
                this.formData11 = valid;
                this.loading = false;
                return;
              }
            }
          });
        });
        Promise.all([p1, p2]).then((result) => {
          if (this.formData11 && this.formData22) {
            //  处理上传数组
            this.formItem.annexIdList = [];
            this.formItem.photoLists.forEach((item) => {
              this.formItem.annexIdList.push({ ["fileId"]: item.fileId });
            });
            console.log(this.formItem.annexIdList, "this.formItem.annexIdList");
            this.formItem.photoLists = JSON.stringify(this.formItem.photoLists);
            getStatusupdate(this.formItem)
              .then((res) => {
                this.annexIdList = [];
                this.$Message.success("提交成功");
                this.formItem.agentType = 1;
                this.handleCancel();
                this.$refs.formInline.resetFields();
              })
              .catch((err) => {
                this.formItem.photoLists = JSON.parse(this.formItem.photoLists);
                this.$Message.error(err.msg);
              });
            this.loading = false;
          }
        });
      });
    },

    handleCancel() {
      (this.annexIdList = []),
        // console.log(this.$refs.agentFormModal3, "this.formData3");
        (this.formItem.agentType = 1);
      if (this.formItem.agentType == 1)
        this.$refs.agentFormModal1.$f.resetFields();
      this.$refs.agentFormModal2.$f.resetFields();
      // this.formData3.resetFields();
      this.agentInitShow = false;
      this.agentInit();
    },
    
  },
};
</script>

<style scoped>

.text-kong {
  margin-left: 20px;
}

.mange-img {
  display: block;
  margin: 0 auto;
}

.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}

.demo-upload-list img {
  width: 100%;
  height: 100%;
}

.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}

.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
/* this.formData2.validate((valid, fail) => {
        if (valid) this.formData22 = valid;
      });
      this.formData1.validate((valid, fail) => {
        if (this.formItem.agentType == 2) {
          this.formData11 = true;
        } else {
          this.formData11 = valid;
        }
      }); */
</style>
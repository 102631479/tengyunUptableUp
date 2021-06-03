import {
  getAgentList,
  getAuthorityList,
  rechargeRecord,
  apiDelUser,
  getDetailsById,
  getUserManageDetail,
  upOrDown,
  getLists,
} from "@/api/platform-auth";
import {
  hasOneOf
} from "@/libs/tools";

let _this
let columnData = (data) => {
  _this = data
  return columns
}
let columns = [{
    title: "序号",
    align: "center",
    type: "index",
    width: 100
  },
  {
    title: "用户名",
    key: "userCode",
    align: "center",
    width: 100
  },
  {
    title: "姓名",
    key: "userName",
    align: "center",
    width: 100
  },
  {
    title: "手机号",
    key: "phone",
    align: "center",
    width: 115
  },
  {
    title: "所属企业",
    key: "companyName",
    align: "center",
    width: 180,
    render: (h, params) => [
      h(
        "span", {},
        params.row.companyName == null ? "--" : params.row.companyName
      ),
    ],
  },
  {
    title: "是否为管理员",
    key: "phone",
    align: "center",
    width: "110px",
    render: (h, params) => [
      h("span", {}, params.row.adminFlag == true ? "是" : "否"),
    ],
  },
  {
    title: "上级代理(邀请码)",
    key: "code",
    align: "center",
    width: 130,
    render: (h, params) => [
      h("span", {}, params.row.code == null ? "--" : params.row.code),
    ],
  },
  {
    title: "账户余额",
    key: "balance",
    align: "center",
    width: 130,
    render: (h, params) => [
      h(
        "span", {},
        params.row.balance == null ? "--" : params.row.balance
      ),
    ],
  },
  {
    title: "注册时间",
    key: "registrationTime",
    align: "center",
    width: "105px",
  },
  {
    title: "充值提现记录",
    key: "registrationTime",
    align: "center",
    width: "115px",
    render: (h, params) => [
      h(
        "span", {
          props: {
            type: "md-pricetag",
            size: "small",
          },
          style: {
            marginRight: "5px",
            marginRight: "15px",
            color: "#0084ff",
            cursor: "pointer",
            display: hasOneOf(
                ["operate:user-manage:user-recharge-record"],
                _this.$store.state.user.access
              ) ?
              "inline-block" : "none",
          },
          on: {
            click: () => {
              let power = hasOneOf(
                ["operate:user-manage:user-recharge-record"],
                _this.$store.state.user.access
              );
              if (!power) return;
              _this.modalShow = true;
              let userId = params.row.id;
              rechargeRecord(userId).then((res) => {
                _this.rechargeTabData = res.data;
              });
            },
          },
        },
        "查看"
      ),
    ],
  },
  {
    title: "状态",
    key: "userStatus",
    align: "center",
    width: "100px",
    render: (h, params) => {
      // console.log(params.row.userStatus,'状态显示');
      // _this.status = params.row.userStatus;
      if (params.row.userStatus == 2) {
        return h("span", "停用");
      } else if (params.row.userStatus == 3) {
        return h("span", "拉黑");
      } else if (params.row.userStatus == 4) {
        return h("span", "注销");
      } else {
        return h("span", "正常");
      }
    },
  },
  {
    title: "操作",
    key: "userCode",
    // width: 330,
    // fixed: "right",
    minWidth: 300,
    align: "center",
    render: (h, params) => [
      // 用户列表配置详情
      h(
        "span", {
          props: {
            type: "primary",
            size: "small",
          },
          style: {
            // width: "24px",
            // marginRight: '5px'
            marginRight: "15px",
            color: "#0084ff",
            cursor: "pointer",

            display: hasOneOf(
                ["operate:user-manage:user-detail"],
                _this.$store.state.user.access
              ) ?
              "inline-block" : "none",
          },
          on: {
            click: () => {
              // 点击事件鉴权   双层鉴权
              let power = hasOneOf(
                ["operate:user-manage:user-detail"],
                _this.$store.state.user.access
              );
              if (!power) return;
              _this.modalDetail = true; // 弹窗
              _this.formDatas.setValue(params.row);
              getDetailsById(params.row.id).then((res) => {
                console.log(params.row.userName);
                _this.formDatas.setValue(res.data);
              });
            },
          },
        },
        "详情"
      ),
      // 用户列表配置编辑
      h(
        "span", {
          props: {
            type: "primary",
            size: "small",
          },
          style: {
            marginRight: "15px",
            // width: "24px",
            color: "#0084ff",
            cursor: "pointer",
            display: hasOneOf(
                ["operate:user-manage:user-edit"],
                _this.$store.state.user.access
              ) ?
              "inline-block" : "none",
          },
          on: {
            click: () => {
              let power = hasOneOf(
                ["operate:user-manage:user-edit"],
                _this.$store.state.user.access
              );
              if (!power) return;
              _this.$refs.formModal.formData.setValue(params.row);
              _this.$refs.formModal.userType = params.row.userType;
              if (params.row.supplierId == null) {
                console.log(
                  _this.$refs.formModal.formData.form.userTypetypes,
                  "_this.$refs.formModal.formData.form.userTypetypes"
                );
                _this.$refs.formModal.formData.form.userTypetypes = 1;
              } else {
                _this.$refs.formModal.formData.form.userTypetypes = 3;
                console.log(
                  _this.$refs.formModal.formData.form.userTypetypes
                );
              }
              _this.$refs.formModal.userForm = true;
              _this.$refs.formModal.edit = true;
            },
          },
        },
        "编辑"
      ),
      h(
        "span", {
          props: {
            type: "primary",
            size: "small",
          },
          style: {
            marginRight: "15px",
            // width: "24px",
            color: "#0084ff",
            cursor: "pointer",
            display: "none",
            // display: hasOneOf(
            //   ["operate:user-manage:related-authorize"],
            //   _this.$store.state.user.access
            // )
            //   ? "inline-block"
            //   : "none",
          },

          on: {
            click: () => {
              let power = hasOneOf(
                ["operate:user-manage:related-authorize"],
                _this.$store.state.user.access
              );
              if (!power) return;
              _this.$refs.impower.companyIdcompanyId =
                params.row.companyId;
              _this.$refs.impower.idid = params.row.id;
              // _this.$refs.impower.permissionMap =JSON.stringify(params.row.permissionMap)
              _this.permissionMap = params.row.permissionMap;
              console.log(params.row.permissionMap, "index页面授权");
              _this.$refs.impower.userForm = true;
              _this.$refs.impower.adminFlag = params.row.adminFlag;
              getLists({
                  adminFlag: params.row.adminFlag,
                  // companyId: _this.$store.state.user.userInfo.companyId,
                  companyId: params.row.companyId,
                })
                .then((d) => {
                  _this.$refs.impower.lists = d.data;
                })
                .catch((e) => {
                  let ev = e.msg ? e.msg : e.message;
                  _this.$Message.error(ev);
                });
            },
          },
        },
        "授权"
      ),
      h(
        "span", {
          props: {
            type: "primary",
            size: "small",
          },
          style: {
            marginRight: "15px",
            color: "#0084ff",
            // width: "48px",
            cursor: "pointer",
            display: hasOneOf(
                ["operate:user-manage:up-grade"],
                _this.$store.state.user.access
              ) ?
              "inline-block" : "none",
          },
          on: {
            click: () => {
              let power = hasOneOf(
                ["operate:user-manage:up-grade"],
                _this.$store.state.user.access
              );
              if (!power) return;
              // console.log(params.row, "params.row.");
              _this.$refs.agentInit.formItem.agentName =
                params.row.userCode;
              _this.$refs.agentInit.formItem.email = params.row.email;
              _this.$refs.agentInit.formItem.contactNumber =
                params.row.phone;
              _this.$refs.agentInit.formItem.applicationPeopleId =
                params.row.id;
              _this.$refs.agentInit.agentInitShow = true;
            },
          },
        },
        "身份升级"
      ),

      // 用户列表配置拉黑
      h(
        "span", {
          props: {
            type: "primary",
            size: "small",
          },
          style: {
            marginRight: "15px",
            color: "#0084ff",
            cursor: "pointer",
            // width: "24px",
            // display: hasOneOf(
            //   ["user:backstag:user:edit"],
            //   _this.$store.state.user.access
            // )
            //   ? "inline-block"
            //   : "none"
          },
          on: {
            click: () => {
              _this.$Modal.confirm({
                title: "温馨提示",
                content: "确定拉黑吗？",
                onOk: () => {
                  upOrDown(params.row.id, 3)
                    .then((d) => {
                      _this.$Message.success("拉黑成功!");
                      _this.init();
                    })
                    .catch((e) => {
                      let ev = e.msg ? e.msg : e.message;
                      _this.$Message.error(ev);
                    });
                },
              });
            },
          },
        },
        "拉黑"
      ),

      // 用户列表配置删除
      h(
        "span", {
          props: {
            type: "error",
            size: "small",
          },
          style: {
            marginRight: "15px",
            color: "#0084ff",
            cursor: "pointer",
            // width: "24px",
            display: hasOneOf(
                ["operate:user-manage:user-delete"],
                _this.$store.state.user.access
              ) ?
              "inline-block" : "none",
          },
          on: {
            click: () => {
              // 用列表户配置点击删除弹窗
              _this.$Modal.confirm({
                title: "提示",
                content: "确认删除么？",
                onOk: () => {
                  apiDelUser(params.row.id)
                    // 删除成功执行
                    .then((d) => {
                      if (_this.tabData.length == 1)
                        _this.info["limit.currentPage"] =
                        _this.info["limit.currentPage"] - 1;
                      _this.init();
                      _this.$Message.success("删除成功");
                    })
                    // 失败捕捉
                    .catch(() => _this.$Message.error("删除失败"));
                },
              });
            },
          },
        },
        "删除"
      ),
    ],
  },
];

export default columnData

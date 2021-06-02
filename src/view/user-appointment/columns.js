import {
  getDeleteUser
} from "@/api/user-appointment";
let _this
let columnData = (data) => {
  _this = data
  return columns
}
let columns = [{
    title: "ID",
    key: "id",
    align: "center"
  },
  {
    title: "预约人姓名",
    key: "userName",
    align: "center"
  },
  {
    title: "手机号",
    key: "phone",
    align: "center"
  },
  {
    title: "咨询内容",
    key: "content",
    align: "center"
  },
  {
    title: "附件图片",
    align: "center",
    // key: "registrationTime",
    render: (h, params) => {
      return h("div", [
        h("Icon", {
          props: {
            type: "md-pricetag",
          },
          style: {
            fontSize: "18px",
            color: "#2d8cf0",
            cursor: "pointer",
          },
          on: {
            click: () => {
              _this.userForm = true
              _this.annexTabData = []
              _this.annexTabData = params.row.photoIdList
            },
          },
        }),
      ]);
    },
  },
  {
    title: "提交时间",
    key: "dataCreateTime",
    align: "center"
  },
  {
    title: "状态",
    key: "state",
    align: "center",
    render: (h, params) => [
      h(
        "span", {},
        params.row.state == 1 ? "待沟通" : '已沟通'
      ),
    ],
  },
  {
    title: "沟通人",
    key: "communicateUser",
    align: "center"
  },
  {
    title: "沟通时间",
    key: "communicateTime",
    align: "center"
  },
  {
    title: "备注",
    key: "remarks",
    align: "center"
  },
  {
    title: "操作",
    key: "userCode",
    width: 200,
    align: "center",
    render: (h, params) => [
      h(
        "span", {
          props: {

          },
          style: {
            color: "#0084ff",
            cursor: "pointer",
            marginRight: "15px",
          },
          on: {
            click: () => {
              _this.$Modal.confirm({
                title: "信息",
                content: "确认已沟通？",
                onOk: () => {
                  _this.remarksData = {}
                  _this.remarksData = JSON.parse(JSON.stringify(params.row))
                  _this.remarksData.communicateId = _this.$store.state.user.userId
                  _this.remarksData.state = '2'
                  _this.getRemarks(false)
                },
              });
            },
          },
        },
        params.row.state==1?"沟通":""
      ),
      h(
        "span", {
          props: {
            // type: "error",
            // size: "small"
          },
          style: {
            color: "#0084ff",
            cursor: "pointer",
            marginRight: "15px",
          },
          on: {
            click: () => {
              _this.$Modal.confirm({
                title: "提示",
                content: "确认同意？",
                onOk: () => {
                  getDeleteUser(params.row.id).then(res => {
                    console.log(res);
                    _this.$Message.success("删除成功");
                    _this.init()
                  }).catch(err => {
                    this.$Message.error(err.msg)
                  })
                },
              });
            },
          },
        },
        "删除"
      ),
      h(
        "span", {
          props: {
            // type: "primary",
            // size: "small",
          },
          style: {
            color: "#0084ff",
            cursor: "pointer",
            marginRight: "15px",
          },
          on: {
            click: () => {
              _this.remarksText = ''
              _this.remarksData = {}
              _this.remarksData = JSON.parse(JSON.stringify(params.row))
              _this.remarksReturn = true
            },
          },
        },
        "备注"
      ),
    ],
  },
];

export default columnData

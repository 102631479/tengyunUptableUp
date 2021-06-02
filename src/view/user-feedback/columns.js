import {
  getDeleteUser
} from "@/api/user-feedback";
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
    title: "用户名",
    key: "userName",
    align: "center"
  },
  {
    title: "详情描述",
    key: "details",
    align: "center"
  },
  {
    title: "附件图片",
    align: "center",
    key: "registrationTime",
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
    title: "回复内容",
    key: "reply",
    align: "center"
  },
  {
    title: "回复人",
    key: "replyUser",
    align: "center"
  },
  {
    title: "回复时间",
    key: "replyTime",
    align: "center"
  },
  {
    title: "状态",
    key: "state",
    align: "center",
    render: (h, params) => [
      h(
        "span",
        {},
        params.row.state == 1 ? "待回复" : '已回复'
      ),
    ],
  },
  {
    title: "操作",
    // key: "userCode",
    width: 200,
    align: "center",
    render: (h, params) => [
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
              _this.reply = true
            },
          },
        },
        "回复"
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
    ],
  },
];

export default columnData

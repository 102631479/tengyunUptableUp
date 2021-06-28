import {
  deleTemplate
} from "@/api/message-template";

let _this
let columnData = (data) => {
  _this = data
  return columns
}
let columns = [{
    title: "序号",
    align: "center",
    type: "index",
    width: "100"
  },
  {
    title: "短信商",
    // key: "vendorType",
    align: "center",
    width: "150",
    render: (h, params) => {
      _this.status = params.row.vendorType;
      if (params.row.vendorType == 1) {
        return h("span", "腾讯");
      } else if (params.row.vendorType == 2) {
        return h("span", "阿里");
      } else {
        return h("span", "票联");
      }
    },
  },
  {
    title: "模板CODE",
    key: "businessType",
    align: "center"
  },
  {
    title: "模板名称",
    key: "templateName",
    align: "center"
  },
  {
    title: "模板内容",
    key: "templateContent",
    align: "center"
  },
  {
    title: "变量备注",
    // key: "definitions",
    align: "center",
    render: (h, params) => {
      if (params.row.vendorType == 2) {
        return h("span", "暂无备注");
      }
      if (params.row.definitions == "[]") {
        return h("span", "暂无备注");
      }
      let data = JSON.parse(params.row.definitions);
      let text = [];
      if (params.row.vendorType == 1) {
        data.map((item, index) => {
          if (data.length == index + 1) {
            text.push(index + 1 + " : " + item[index]);
          } else {
            text.push(index + 1 + " : " + item[index] + " , ");
          }
        });
      } else if (params.row.vendorType == 2) {
        text = []
      } else {
        data.map((item, index) => {
          if (data.length == index + 1) {
            text.push(index + " : " + item[index]);
          } else {
            text.push(index + " : " + item[index] + " , ");
          }
        });
      }
      return h("span", text);
    },
  },
  {
    title: "类型",
    // key: "templateType",
    align: "center",
    render: (h, params) => {
      if (params.row.templateType == 1) {
        return h("span", "短信通知");
      } else if (params.row.templateType == 2) {
        return h("span", "推广短信");
      } else if (params.row.templateType == 3) {
        return h("span", "国际/港澳台消息");
      } else {
        return h("span", "验证码");
      }
    },
  },
  {
    title: "模板描述",
    key: "remark",
    align: "center"
  },
  {
    title: "审核状态",
    key: "examineFlag",
    align: "center",
    render: (h, params) => {
      if (params.row.examineFlag == 1) {
        return h("span", "通过");
      } else if (params.row.examineFlag == 2) {
        return h("span", "未通过");
      } else {
        return h("span", "未审核");
      }
    },
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
            type: "success",
            size: "small",
          },
          style: {
            dispaly: 'none',
            marginRight: "8px",
            color: "#0084ff",
            cursor: "pointer",
          },
          on: {
            click: async () => {
              let textObj = {
                templateName: "",
                vendorType: "",
                definitions: "",
                templateContent: "",
                remark: "",
                templateType: "",
              }
              _this.$refs.formModal.formValidate.international = '0'
              _this.$refs.formModal.putId = params.row.id
              for (let item in textObj) {
                if (item == 'templateType') {
                  _this.$refs.formModal.formValidate[item] =
                    params.row[item].toString()
                  break
                }

                _this.$refs.formModal.formValidate[item] =
                  params.row[item];
              }
              if (params.row.definitions) {
                let data = JSON.parse(params.row.definitions);
                if (data.length == 0 || data == "") {
                  _this.$refs.formModal.numMerr = 1
                } else {
                  _this.$refs.formModal.numMerr = Number(data.length);
                }
                let arrerData = []
                if (params.row.vendorType == 3) {
                  await data.map((item, index) => {
                    arrerData.push(
                      item[index]
                    )
                  })
                } else if (params.row.vendorType == 2) {
                  arrerData = []
                } else {
                  await data.map((item, index) => {
                    arrerData.push(
                      item[index]
                    )
                  })
                }
                _this.$refs.formModal.formValidate.definitions = arrerData
                _this.$refs.formModal.edit = true;
                _this.$refs.formModal.userForm = true;
              }

            },
          },
        },
        _this.getEidet(params.row.vendorType, params.row.examineFlag)
      ),

      h(
        "span", {
          props: {
            type: "error",
            size: "small",
          },
          style: {
            marginRight: "8px",
            color: "#0084ff",
            cursor: "pointer",
          },
          on: {
            click: () => {
              _this.$Modal.confirm({
                title: "提示",
                content: "确认删除？",
                onOk: () => {
                  deleTemplate(params.row.id)
                    .then((res) => {
                      _this.$Message.success(
                        params.row.permissionName + " 已删除"
                      );
                      _this.init();
                    })
                    .catch((err) => {
                      console.log(err);
                    });
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
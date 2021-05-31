
let columns = [{
    title: "ID",
    key: "id",
    align: "center"
  },
  {
    title: "预约人姓名",
    key: "name",
    align: "center"
  },
  {
    title: "手机号",
    key: "memo",
    align: "center"
  },
  {
    title: "咨询内容",
    key: "memo",
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
           console.log('11');      
            },
          },
        }),
      ]);
    },
  },
  {
    title: "提交时间",
    key: "memo",
    align: "center"
  },
  {
    title: "状态",
    key: "memo",
    align: "center"
  },
  {
    title: "沟通人",
    key: "memo",
    align: "center"
  },
  {
    title: "沟通时间",
    key: "memo",
    align: "center"
  },
  {
    title: "沟通时间",
    key: "memo",
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
            //   let that = this
            //   getDetails(params.row.id).then((d) => {
            //     that.details = d.data.data;
            //   });
            //   that.$refs.feedback.userForm = true;
            //   that.$refs.feedback.edit = true;
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
                that.$Modal.confirm({
                  title: "提示",
                  content: "确认同意？",
                  onOk: () => {
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
let that
let columnData = (data) => {
    that=data
    console.log(data);
  return columns
}
export default columnData

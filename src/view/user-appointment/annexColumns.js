import config from "@/config";
import platform from "@/config/platform";
let url
if (process.env.NODE_ENV === "development") {
  url = config.baseUrl.dev + platform.FILE;
} else if (process.env.NODE_ENV === "testing") {
  url = config.baseUrl.test + platform.FILE;
} else {
  url = config.baseUrl.pro + platform.FILE;
}
let _this
let columnData = (data) => {
  _this = data
  return columns
}
let columns = [{
    type: 'selection',
    width: 60,
    align: 'center'
  }, {
    title: "附件名称",
    key: "oldName",
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
              _this.userFormIMg = true
              console.log(params.row);
              _this.srcUserFormIMg = params.row.fileAddress
            },
          },
        },
        "查看"
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
              let a = /(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/;
              if (a.test(params.row.oldName)) {
                window.open(
                  url + "/file/img/download/" + params.row.fileId
                );
              } else {
                window.open(params.row.fileAddress);
              }
            },
          },
        },
        "下载"
      ),

    ],
  },
];

export default columnData

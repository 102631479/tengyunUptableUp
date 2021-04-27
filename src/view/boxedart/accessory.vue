<template>
  <div>
    <Modal v-model="userForm" title="附件查询" @on-ok="handleSubmit('formValidate')">
      <Form ref="formValidate" :model="formValidate" :label-width="100">
        <Table border ref="selection" :columns="columns" :data="tabData" :loading="loading"></Table>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { lookFiled, lookpicture } from "@/api/boxedart";
import axios from "axios";
export default {
  props: ["accessory"],
  data() {
    return {
      loading: false,
      userForm: false,
      edit: false,
      code: "",
      depict: "",
      daochu: "",
      formValidate: {
        name: "",
        desc: ""
      },
      tabData: [],
      columns: [
        {
          title: "附件名称",
          key: "",
          align: "center",
          render: (h, params) => {
            // console.log(params);
            return h("div", params.row.oldName);
          }
        },
        {
          title: "操作",
          key: "userCodes",
          width: 220,
          align: "center",
          render: (h, params) => [
            h(
              "Button",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    // console.log(params.row);
                    let a = /(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/;
                    // console.log(a.test(params.row.oldName));
                    if (a.test(params.row.oldName)) {
                      window.open(params.row.fileAddress, "_blank");
                    } else {
                      window.open(
                        "https://view.officeapps.live.com/op/view.aspx?src=" +
                          params.row.fileAddress,
                        "_blank"
                      );
                    }
                  }
                }
              },
              "查看"
            ),
            h(
              "Button",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                       let a = /(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/;
                      if (a.test(params.row.oldName)) {
                        window.open("http://192.168.1.88:811/platform-file/file/img/download/"+
                        params.row.fileId
                        );
                      } else {
                          window.open(
                        params.row.fileAddress
                        );
                      }
                  }
                }
              },
              "下载"
            )
          ]
        }
      ]
    };
  },
  watch: {
    accessory: {
      handler(newName, oldName) {
        // console.log(newName);
        let item = [];
        for (let i = 0; i < newName.length; i++) {
          item.push(newName[i]);
        }
        this.tabData = item;
        // console.log(this.tabData);
      },
      immediate: true
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // console.log(this.tabData);
    },
    handleSubmit() {}
  }
};
</script>
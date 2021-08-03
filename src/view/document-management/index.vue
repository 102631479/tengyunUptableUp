<template>
  <div>
    <!-- <div class="search">
      <searchFrom ref="searchFrom"></searchFrom>
    </div> -->
    <div class="title">文档模板</div>
    <Card>
      <div class="flex justify-between mb-10">
        <div class="flex">
          <div>
            <Button
              type="primary"
              class="mr-6"
              @click="openadd"
              v-if="
                hasOneOf(
                  ['operate:document:add'],
                  this.$store.state.user.access
                )
              "
              >新增</Button
            >
          </div>
          <div>
            <Input
              type="text"
              class="mr-6"
              style="width: 200px"
              v-model="info.fileName"
              placeholder="请输入模板名称"
              search
              enter-button
              @on-search="sercher"
            />
          </div>
        </div>
      </div>

      <Table
        border
        :columns="columns"
        :data="tabData"
        :loading="loading"
      ></Table>
      <Page
        v-if="pageshow"
        class="t-center mt-10"
        :page-size="info['limit.pageSize']"
        :total="total"
        @on-page-size-change="changePageSize"
        @on-change="changePage"
        show-total
        show-sizer
      />
    </Card>
    <!-- 用户表单 -->
    <formModal ref="formModal" @success="init" />
    <Modal v-model="userForm" title="附件列表" :mask-closable="false">
      <Table border :columns="annexColumns" :data="annexTabData"></Table>
    </Modal>
    <Modal v-model="userFormIMg" title="图片查看" :mask-closable="false">
      <div class="img-srcUserFormIMg">
        <img :src="srcUserFormIMg" alt="" class="img-srcUserFormIMg-phone" />
      </div>
      <div slot="footer"></div>
    </Modal>
    <!-- <formModalt ref="formModalt" @success="init" /> -->
  </div>
</template>

<script>
import { hasOneOf } from "@/libs/tools";
import config from "@/config";
import platform from "@/config/platform";
let url = "";
if (process.env.NODE_ENV === "development") {
  url = config.baseUrl.dev + platform.FILE;
} else if (process.env.NODE_ENV === "testing") {
  url = config.baseUrl.test + platform.FILE;
} else {
  url = config.baseUrl.pro + platform.FILE;
}

let actionUrl = url + "/file/img/upload";

import Bus from "@/bus";
import formModal from "./formModal";
import {
  getDocumentList,
  getDocumentdelete,
  getDocumentfiles,
  getDocumentfiles_delete,
} from "@/api/document-management";
export default {
  components: {
    formModal,
  },

  mounted() {
    Bus.$on("issue", (content) => {
      this.init();
    });
  },
  beforeDestroy() {
    Bus.$off("issue", (content) => {
      console.log(content, "content");
    });
  },
  watch: {
    userFormIMg(val) {
      if (!val) this.srcUserFormIMg = "";
    },
  },
  computed: {},
  data() {
    return {
      pageshow: true,
      srcUserFormIMg: "",
      hasOneOf,
      annexTabData: [],
      userForm: false,
      userFormIMg: false,
      annexColumns: [
        { title: "附件名称", key: "oldName", align: "center" },
        {
          title: "操作",
          key: "userName",
          align: "center",
          render: (h, params) => [
            h(
              "span",
              {
                props: {
                  type: "primary",
                  size: "small",
                },
                style: {
                  marginRight: "5px",
                  color: "#0084ff",
                  cursor: "pointer",
                },
                on: {
                  click: () => {
                    // console.log(params.row.oldName);
                    this.srcUserFormIMg = params.row.fileAddress;
                    this.userFormIMg = true;
                  },
                },
              },
              this.LookReturn(params.row.oldName)
            ),
            h(
              "span",
              {
                props: {
                  type: "primary",
                  size: "small",
                },
                style: {
                  marginRight: "5px",
                  color: "#0084ff",
                  cursor: "pointer",
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
            h(
              "span",
              {
                props: {
                  type: "primary",
                  size: "small",
                },
                style: {
                  marginRight: "5px",
                  color: "#0084ff",
                  cursor: "pointer",
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: "提示",
                      content: "确认删除？",
                      onOk: () => {
                        getDocumentfiles_delete(params.row.fileId)
                          .then((res) => {
                            this.userForm = false;
                            console.log(res);
                            this.$Message.success("删除成功");
                          })
                          .catch((e) => {
                            let ev = e.msg ? e.msg : e.message;
                            this.$Message.error(ev);
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
      ],
      total: 0,
      // 请求配置
      info: {
        fileName: "",
        "limit.currentPage": 1,
        "limit.pageSize": 10,
      },

      loading: false,
      // 表头配置
      columns: [
        { title: "序号", align: "center", type: "index", width: "100" },
        {
          title: "文件名称",
          key: "fileName",
          align: "center",
        },
        {
          title: "附件",
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
                    getDocumentfiles(params.row.id)
                      .then((res) => {
                        this.annexTabData = [];
                        res.data.map((item) => {
                          this.annexTabData.push(item);
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                    this.userForm = true;
                  },
                },
              }),
            ]);
          },
        },
        { title: "备注", key: "remake", align: "center", width: "200" },
        { title: "创建时间", key: "dataCreateTime", align: "center" },

        {
          title: "状态",
          key: "status",
          align: "center",
          width: "200",
          render: (h, params) => {
            // this.status = params.row.status;
            if (params.row.status == 1) {
              return h("span", "启用");
            } else {
              return h("span", "禁用");
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
              "span",
              {
                props: {
                  type: "success",
                  size: "small",
                },
                style: {
                  marginRight: "8px",
                  color: "#0084ff",
                  cursor: "pointer",
                  display: hasOneOf(
                    ["operate:document:update"],
                    this.$store.state.user.access
                  )
                    ? "inline-block"
                    : "none",
                },
                on: {
                  click: () => {
                    this.$refs.formModal.formValidate = JSON.parse(
                      JSON.stringify(params.row)
                    );
                    this.$refs.formModal.id = params.row.id;
                    this.$refs.formModal.edit = true;
                    this.$refs.formModal.userForm = true;
                    this.$refs.formModal.formValidate.name =
                      params.row.permissionName;
                    getDocumentfiles(params.row.id)
                      .then((res) => {
                        this.$refs.formModal.updataHtml = [];
                        if (res.data.length == 1) {
                          this.$refs.formModal.formValidate.fileId =
                            res.data[0].fileId;
                          this.$refs.formModal.updataHtml.push({
                            name: res.data[0].oldName,
                            id: res.data[0].fileId,
                          });
                        }
                      })
                      .catch((err) => {});
                  },
                },
              },
              "编辑"
            ),
            h(
              "span",
              {
                props: {
                  type: "error",
                  size: "small",
                },
                style: {
                  marginRight: "8px",
                  color: "#0084ff",
                  cursor: "pointer",
                  display: hasOneOf(
                    ["operate:document:delete"],
                    this.$store.state.user.access
                  )
                    ? "inline-block"
                    : "none",
                },
                // on: {
                //   click: () => {
                //     this.$Modal.confirm({
                //       title: "提示",
                //       content: "确认删除？",
                //       onOk: () => {
                //         getDocumentdelete(params.row.id)
                //           .then((res) => {
                //             if (this.tabData.length == 1)
                //               this.info["limit.currentPage"] =
                //                 this.info["limit.currentPage"] - 1;
                //             console.log(res);
                //             this.$Message.success(
                //               params.row.fileName + " 已删除"
                //             );
                //             this.init();
                //           })
                //           .catch((e) => {
                //             let ev = e.msg ? e.msg : e.message;
                //             this.$Message.error(ev);
                //           });
                //       },
                //     });
                //   },
                // },
                on: {
                  click: async () => {
                    this.ifDeleData = "";
                    this.ifDele = false;
                    this.$nextTick(() => {
                      this.$Modal.confirm({
                        loading: true,
                        title: "删除警告！",
                        okText: "确认",
                        cancelText: "取消",
                        render: (h, params) => [
                          h(
                            "span",
                            {
                              style: {
                                marginRight: "8px",
                              },
                            },
                            "删除将导致本条模板无法在前台使用，再次确定是否删除本条模板？"
                          ),

                          h("br"),

                          h(
                            "span",
                            {
                              style: {
                                marginRight: "8px",
                              },
                              on: {
                                "on-blur": (event) => {
                                  console.log(event);
                                },
                              },
                            },
                            '请在输入框输入"立即删除" '
                          ),

                          h("Input", {
                            props: {
                              value: "",
                              autofocus: true,
                              width: "100px",
                              styles: {
                                // width: "190px",
                                width: "190px",
                                textAlign: "center",
                                color: "red",
                                cursor: "pointer",
                              },
                            },
                            style: {
                              width: "190px",
                              textAlign: "center",
                              color: "red",
                              cursor: "pointer",
                            },
                            on: {
                              input: (val) => {
                                this.ifDeleData = val;
                                if (val == "立即删除") {
                                  console.log("可以删除");
                                  this.ifDele = true;
                                  return;
                                }
                                this.ifDele = false;
                              },
                            },
                          }),

                          h(
                            "div",
                            {
                              style: {
                                width: "300px",
                                marginTop: "8px",
                                textAlign: "right",
                                color: "red",
                                cursor: "pointer",
                              },
                            },
                            this.ifDele == false
                              ? this.ifDeleData == ""
                                ? ""
                                : "*文字输入不正确"
                              : "输入正确可以删除"
                          ),
                        ],
                        onOk: () => {
                          if (this.ifDele) {
                            getDocumentdelete(params.row.id)
                              .then((res) => {
                                if (this.tabData.length == 1)
                                  this.info["limit.currentPage"] =
                                    this.info["limit.currentPage"] - 1;
                                // console.log(res);
                                this.$Message.success(
                                  params.row.fileName + " 已删除"
                                );
                                this.init();
                                this.$Modal.remove();
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          } else {
                            this.$Modal.remove();
                          }
                        },
                      });
                    });
                  },
                },
              },
              "删除"
            ),
          ],
        },
      ],

      tabData: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 查看返回
    LookReturn(d) {
      let data= d.split(".")
      if (data[1].indexOf("md") > -1) return "";
      return "查看";
    },
    sercher() {
      this.pageshow = false;
      this.init();
      ("limit.currentPage=1");
      this.info["limit.currentPage"] = 1;
      this.$nextTick(() => {
        this.pageshow = true;
      });
    },
    downFile(data) {
      a.href = data; // 这里的请求方式为get，如果需要认证，接口上需要带上token
    },

    init() {
      this.loading = true;
      getDocumentList(this.info)
        .then((res) => {
          this.loading = false;
          this.tabData = res.data.list;
          this.total = Number(res.data.pagination.total);
        })
        .catch((err) => {
          console.error(err);
          this.loading = false;
        });
    },
    openadd() {
      this.$refs.formModal.edit = false;
      this.$refs.formModal.userForm = true;
    },
    changePage(num) {
      this.info["limit.currentPage"] = num;
      this.init();
    },
    changePageSize(size) {
      this.info["limit.pageSize"] = size;
      this.init();
    },
  },
};
</script>

<style scoped>
.img-srcUserFormIMg {
  overflow: hidden;
  margin: 0 auto;
  width: 500px;
  height: 500px;
  padding: 20px;
  border-radius: 10px;
}
.img-srcUserFormIMg-phone {
  width: 100%;
  height: 100%;
}
.search {
  background-color: white;
  display: flex;
  flex-direction: column;
}
.container-title {
  padding: 16px;
  background-color: #fff;
  margin: 10px auto;
  border-radius: 4px;
}
.flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>

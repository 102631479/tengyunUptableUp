<template>
  <div>
    <div class="title">反馈列表</div>
    <Card>
      <div class="flex justify-between mb-10">
        <div class="flex">
          <div>
            <Button type="primary" class="mr-6" style="display: none"
              >新增产品商</Button
            >
          </div>
          <div>
            <Input
              type="text"
              class="mr-6"
              style="width: 200px"
              placeholder="请输入用户名、详情内容"
              search
              enter-button
              v-model="info.userName"
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
    <Modal v-model="userForm" title="附件列表" :mask-closable="false">
      <Table
        border
        ref="selection"
        :columns="annexColumns"
        :data="annexTabData"
        @on-select="getimgDownload"
        @on-select-all="getimgDownload"
      ></Table>
      <div slot="footer">
        <Button type="text" @click="closes">取消</Button>
        <Button type="primary" @click="imgDownload(true)">下载</Button>
      </div>
    </Modal>
    <Modal v-model="userFormIMg" title="图片查看" :mask-closable="false">
      <div class="img-srcUserFormIMg">
        <img :src="srcUserFormIMg" alt="" class="img-srcUserFormIMg-phone" />
      </div>
      <div slot="footer"></div>
    </Modal>

    <Modal v-model="reply" title="回复" :mask-closable="false" :width="800">
      <replyText ref="replyText"> </replyText>
      <div slot="footer">
        <Button type="text" @click="closes">取消</Button>
        <Button type="primary" @click="subime">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { userReply } from "@/api/user-feedback";
import config from "@/config";
import platform from "@/config/platform";
let url;
if (process.env.NODE_ENV === "development") {
  url = config.baseUrl.dev + platform.FILE;
} else if (process.env.NODE_ENV === "testing") {
  url = config.baseUrl.test + platform.FILE;
} else {
  url = config.baseUrl.pro + platform.FILE;
}
import { getUserList } from "@/api/user-feedback";
import columns from "./columns";
import annexColumns from "./annexColumns";
import replyText from "./feedback";
export default {
  components: {
    replyText,
  },
  data() {
    return {
      reply: false,
      remarks: "",
      imgDownloaddata: [],
      remarksReturn: false,
      userForm: false,
      userFormIMg: false,
      pageshow: true,
      this: this,
      loading: false,
      columns: columns(this),
      annexColumns: annexColumns(this),
      annexTabData: [],
      tabData: [],
      srcUserFormIMg: "",
      total: 0,
      info: {
        userName: "",
        "limit.currentPage": 1,
        "limit.pageSize": 10,
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    async subime() {
      // console.log(this.$refs.replyText.form, "from");

      // console.log(
      //   this.$store.state.user.userId,
      //   "this.$store.state.user.userId"
      // );
      await userReply(this.$refs.replyText.form)
        .then((res) => {
          this.reply = false;
          this.init();
          console.log(res);
        })
        .catch((err) => {
          console.log(err.msg);
        });
    },
    getimgDownload(e) {
      let data = [];
      e.map((item) => {
        data.push(item.fileId);
      });
      this.imgDownloaddata = data;
    },
    imgDownload() {
      if (this.imgDownloaddata.length == 0) {
        this.$Message.error("请标记下载内容");
        return;
      }
      console.log(this.imgDownloaddata);
      this.imgDownloaddata.map((itme) => {
        window.open(url + "/file/img/download/" + itme);
      });
    },
    closes() {
      this.userForm = false;
      this.reply = false;
    },
    sercher() {
      this.pageshow = false;
      this.init();
      this.info["limit.currentPage"] = 1;
      this.$nextTick(() => {
        this.pageshow = true;
      });
    },
  
    async init() {
      this.loading = true;
      let _this = this;
      await getUserList(this.info)
        .then((res) => {
          let data = res.data;
          _this.total = Number(data.pagination.total);
          _this.tabData = data.list;
          console.log(data.list);
        })
        .catch((err) => {
          _this.loading = false;
          _this.$Message.error(err.msg);
        });
      this.loading = false;
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
.flex {
  display: none;
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* background-color: blue; */
}

.ios-search-input {
  margin-right: 30px;
}
</style>

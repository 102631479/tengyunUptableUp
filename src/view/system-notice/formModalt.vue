<template>
  <div>
    <Modal
      width="700px"
      v-model="userForm"
      :title="edit ? '编辑公告' : '新建公告'"
    >
      <Form
        ref="formValidate"
        :model="form"
        :rules="ruleValidate"
        :label-width="100"
      >
        <FormItem label="标题：" prop="title">
          <Input placeholder="输入标题" v-model="form.title" />
        </FormItem>
        <FormItem label="文档内容：" prop="noticeContent">
          <div class="edit_container">
            <quill-editor
              v-model="form.noticeContent"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)"
            ></quill-editor>
            <div style="display: none">
              <upload
                name="file"
                listType="picture-card"
                class="avatar-uploader"
                :showUploadList="false"
                :on-success="handleChange"
                @change="handleChange"
                :action="actionUrl"
              >
                <div ref="aUpload">
                  <div class="ant-upload-text">Upload</div>
                </div>
              </upload>
            </div>
          </div>
        </FormItem>
      </Form>
      <div slot="footer" class="btn">
        <Button type="text" @click="close">取消</Button>
        <Button
          type="primary"
          :loading="loading"
          @click="handleSubmit('formValidate')"
        >
          {{ edit ? "确认编辑" : "确认增加" }}</Button
        >
      </div>
    </Modal>
  </div>
</template>
<script>
import Bus from '@/bus'
import config from '@/config'
import { addNotice, updateNotice } from '@/api/system-notice'
import { quillEditor } from 'vue-quill-editor' // 调用编辑器
import { quillRedefine } from 'vue-quill-editor-upload'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageResize', ImageResize)
export default {
  components: {
    quillEditor,
    quillRedefine
  },
  created () {
    let vm = this
    const modules = {
      imageResize: {
        displayStyles: {
          backgroundColor: 'black',
          border: 'none',
          color: 'white'
        },
        modules: ['Resize', 'DisplaySize', 'Toolbar']
      },
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ['link', 'image'],
          ['clean']
        ],
        handlers: {
          image: function (value) {
            vm.$refs.aUpload.click()
          }
        }
      }
    }
    vm.editorOption.modules = modules
  },

  data () {
    return {
      actionUrl:
        process.env.NODE_ENV === 'development'
          ? config.baseUrl.dev + '/platform-file/file/img/upload'
          : process.env.NODE_ENV === 'testing'
            ? config.baseUrl.test + '/platform-file/file/img/upload'
            : config.baseUrl.pro + '/platform-file/file/img/upload',
      editid: '',
      form: {
        receiveId: '1',
        noticeType: '1',
        // businessType: "1",
        messageType: '1',
        isDelete: '1',
        sendId: this.$store.state.user.userId,
        title: '',
        noticeContent: ''
      },
      editorOption: {},
      userForm: false,
      edit: false,
      content: '',
      str: '',
      formValidate: {
        title: '',
        noticeContent: ''
      },
      loading: false,
      ruleValidate: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        noticeContent: [
          { required: true, message: '请输入文本', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    let noticeContent = '' // 请求后台返回的内容字符串
    this.str = this.escapeStringHTML(noticeContent)
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  methods: {
    close () {
      console.log('关闭窗口')
      this.userForm = false
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (!valid) return
        this.form.noticeContent = this.escapeStringHTML(
          this.form.noticeContent
        )
        this.loading = true
        if (this.edit) {
          updateNotice({
            id: this.editid,
            title: this.form.title,
            noticeContent: this.escapeStringHTML(this.form.noticeContent)
          })
            .then((res) => {
              this.loading = false
              this.$Message.success(res.msg)
              this.$refs.formValidate.resetFields()
              this.userForm = false
              Bus.$emit('system-notice-username', 'ss')
            })
            .catch((ev) => {
              this.loading = false
              this.$Message.error(ev.message)
            })
          console.log('我是编辑')
        } else {
          addNotice(this.form)
            .then((res) => {
              this.loading = false
              this.$Message.success(res.msg)
              this.$refs.formValidate.resetFields()
              this.userForm = false
              Bus.$emit('system-notice-username', 'ss')
            })
            .catch((ev) => {
              this.loading = false
              this.$Message.error(ev.message)
            })
        }

        // this.loading = false;
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
      this.content = ''
    },
    handleChange (file) {
      let url = file.data[0].fileAddress
      let quill = this.$refs.myQuillEditor.quill
      let length = quill.getSelection().index // 获取当前鼠标焦点位置
      quill.insertEmbed(length, 'image', url) // 插入<img src='url'/>
      quill.setSelection(length + 1)
    },

    onEditorReady (editor) {
      // 准备编辑器
    },
    onEditorBlur (d) {
      // console.log(d, "失去焦点事件");
    }, // 失去焦点事件
    onEditorFocus (d) {
      // console.log(d, "获得焦点事件");
    }, // 获得焦点事件
    onEditorChange (d) {
      // console.log(d, "内容改变事件");
    }, // 内容改变事件
    // 转码
    escapeStringHTML (str) {
      str = str.replace(/&lt;/g, '<')
      str = str.replace(/&gt;/g, '>')
      return str
    }
  }
}
</script>

<style lang="less" scoped>
.ivu-select {
  width: 30%;
}
.edit_container {
  width: 100%;
  height: 500px;
}
/deep/.ql-toolbar.ql-snow + .ql-container.ql-snow {
  border-top: 0px;
  height: 420px;
}
/deep/.ql-toolbar.ql-snow .ql-formats {
  margin-right: 4px;
}
/deep/.ql-snow .ql-picker.ql-size {
  width: 75px;
}
/deep/.ql-snow .ql-picker.ql-header {
  width: 75px;
}
/deep/.ql-snow .ql-picker {
  color: #444;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  height: 32px;
  position: relative;
  vertical-align: middle;
}
</style>

import {
  maker
} from '@form-create/iview'
import Bus from '@/bus'
import config from '@/config'
import platform from '@/config/platform'
import store from '@/store'
import {
  Row
} from 'iview'
let url = "";
if (process.env.NODE_ENV === "development") {
  url = config.baseUrl.dev + platform.FILE;
} else if (process.env.NODE_ENV === "testing") {
  url = config.baseUrl.test + platform.FILE;
} else {
  url = config.baseUrl.pro + platform.FILE;
}

// let actionUrl = "http://192.168.1.57:811/platform-file/file/img/upload"
// let actionUrl = config.baseUrl.dev + platform.FILE + "/file/img/upload"
let actionUrl = url + "/file/img/upload"
// console.log(process.env.NODE_ENV, 'process.env.NODE_ENVprocess.env.NODE_ENV');
export default [
  maker.upload('身份证正面', 'photoIdList3', []).props({
    "action": actionUrl,
    "maxLength": 1,
    "multiple": true,
    "type": "select",
    "uploadType": "image",
    "name": "file",
    "onSuccess": (res, file, fileList) => {
      file.url = res.data[0].fileAddress;
      let {
        fileAddress,
        id,
        oldFileName
      } = res.data[0]
      Bus.$emit('change:annexIdList', {
        fileAddress,
        oldName: oldFileName,
        fileId: id,
        type: 3
      })
    },
    "onRemove": (file, fileList) => {
      Bus.$emit('delete:annexIdList', {
        type: 3
      })
    }
  }).validate([{
    required: true,
    message: '请上传身份证正面'
  }]).col({
    span: 12
  }),
  maker.upload('身份证反面', 'photoIdList4', []).props({
    "action": actionUrl,
    "maxLength": 1,
    "multiple": true,
    "type": "select",
    "uploadType": "image",
    "name": "file",
    "onSuccess": (res, file, fileList) => {
      file.url = res.data[0].fileAddress;
      let {
        fileAddress,
        id,
        oldFileName
      } = res.data[0]
      Bus.$emit('change:annexIdList', {
        fileAddress,
        oldName: oldFileName,
        fileId: id,
        type: 4
      })
    },
    "onRemove": (file, fileList) => {
      Bus.$emit('delete:annexIdList', {
        type: 4
      })
    }
  }).validate([{
    required: true,
    message: '请上传身份证反面'
  }]).col({
    span: 12
  }),
  maker.checkbox('', 'test').options([{
    value: '0',
    label: '您填写并提交上述信息视为您同意并接受 智慧文旅云代理商入驻协议 | 云市场代理商数据安全与保密协议',
  }]).validate([{
    required: true,
    message: '请选择免责声明'
  }])]
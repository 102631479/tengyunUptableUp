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
    url = config.baseUrl.dev + platform.FILE ;
  } else if (process.env.NODE_ENV === "testing") {
    url = config.baseUrl.test + platform.FILE ;
  } else {
    url = config.baseUrl.pro + platform.FILE ;
  }
  
  // let actionUrl = "http://192.168.1.57:811/platform-file/file/img/upload"
  // let actionUrl = config.baseUrl.dev + platform.FILE + "/file/img/upload"
  let actionUrl = url + "/file/img/upload"
  export default [
   maker.upload('营业执照', 'photoIdList1', []).props({
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
          type: 1
        })
      },
      "onRemove": (file, fileList) => {
        Bus.$emit('delete:annexIdList', {
          type: 1
        })
      }
    }).validate([{
      required: true,
      message: '请上传营业执照'
    }]).col({
      span: 12
    }),
    maker.upload('开户证明', 'photoIdList2', []).props({
      "action": actionUrl,
      "maxLength": 1,
      "multiple": true,
      "type": "select",
      "format": ['png', 'jpg', 'pdf'],
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
          type: 2
        })
      },
      "onRemove": (file, fileList) => {
        Bus.$emit('delete:annexIdList', {
          type: 2
        })
      },
      "onFormatError": (file, fileList) => {
        Bus.$emit('notice:warn', '')
      }
    }).validate([{
      required: true,
      message: '请上传开户证明'
    }]).col({
      span: 12
    })]
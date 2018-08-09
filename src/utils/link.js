
function linkPromise (fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res.data)
      }
      obj.fail = function (res) {
        reject(res)
      }
      fn(obj)
    })
  }
};
const link = linkPromise(wx.request)
export const fetch = (url, data = {}, method = 'get', header = {'content-type': 'application/json'}) => {
  return link({
    url: url,
    method: method,
    data: data,
    header: header
  })
}
export default {
  fetch
}

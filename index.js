class axios {
  static onFormatData(data) {
    const formatData = []
    for (const key in data) {
      formatData.push(`${key}=${data[key]}`)
    }
    return formatData.join('$')
  }

  static http(url, data, method = 'get', dataType = 'json', async = true) {
    return new Promise((resolve, reject) => {
      const xhr = window.XMLHttpRequest 
        ? new XMLHttpRequest() 
        : new ActiveXObject("Microsoft.XMLHTTP")
      
      xhr.open(method, method === 'get' ? `${url}?${axios.onFormatData(data)}` : url, async)
      if(method === 'post') {
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded') 
      }
      xhr.send(method === 'post' ? axios.onFormatData(data) : null)
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200) {
          resolve(dataType === 'json' ? JSON.parse(xhr.response) : xhr.response)
        } else {
          reject(xhr.status)
        }
      }
      xhr.onerror = err => {
        reject(err)
      }
    })
  }

  static get(url, data, dataType) {
    return axios.http(url, data, 'get', dataType)
  }

  static post(url, data, dataType) {
    return axios.http(url, data, 'post', dataType)
  }

}

export default axios
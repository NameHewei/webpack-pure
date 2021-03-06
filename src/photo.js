function getFileFromLocal(callback) {
    var inputElement = document.querySelector('cusSelectPhoto')

    if (inputElement) {
        /* 这里删除的原因是为了防止同一个页面有多个该功能，导致所有的input都挂载同一个回调方法 */
        inputElement.parentNode.removeChild(inputElement)
    }
    inputElement = document.createElement('input')
    inputElement.setAttribute('id', 'cusSelectPhoto')
    inputElement.setAttribute('type', 'file')
    inputElement.setAttribute('style', 'display:none')
    document.body.appendChild(inputElement)
    inputElement.addEventListener('change', (e) => {
        callback(e.target.files)
    })
    inputElement.click()
}

for (var i = 1; i < 2; i++) {
    document.querySelector('#p'+ i).addEventListener('click', setImg)
}


function setImg () {
    var _this = this

    getFileFromLocal(function (res) {
        var url = window.URL.createObjectURL(res[0]);
        _this.setAttribute('style', 'background-image: url(' + url + ');')
    })
}

document.querySelector('#export').addEventListener('click', function () {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    html2canvas(document.querySelector('.main'), { allowTaint: true, dpi: 300, scrollY: 0, scrollX: 0, }).then((canvas) => {
        var d = canvas.toDataURL('image/jpeg', 1)
        downloadFile(d)
    })
})

function downloadFile(url) {
    var aEle = document.createElement('a')
    aEle.setAttribute('href', url)
    aEle.setAttribute('download', 'duty-schedule') // 默认是文件原本名
    document.body.appendChild(aEle)
    aEle.click()
}

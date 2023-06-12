/* global Flow, parent, Blob, File */

const btnGeneralTitle = 'Browse'
const btnUploadingTitle = 'Uploading...'

window.addEventListener('load', init)

function init() {
    const dropZone = document.getElementById('upload-form')
    const secondLine = document.getElementById('upload-form__second-line')
    const btn = document.getElementById('upload-form__btn')

    const flow = setUpFlow(dropZone, secondLine, btn)

    window.addEventListener('message', handleMessage.bind(null, flow, secondLine))
}

function setUpFlow(dropZone, secondLine, btn) {
    const flow = new Flow({
        target: '/upload.php',
        testChunks: false,
        singleFile: true,
        progressCallbacksInterval: 250,
        query: {
            audio: 1,
            dev: parseParamFromWindowLocation('dev'),
            ver: parseParamFromWindowLocation('ver'),
            sid: parseParamFromWindowLocation('sid'),
            project: parseParamFromWindowLocation('project'),
            name: parseParamFromWindowLocation('name')
        }
    })

    flow.assignDrop(dropZone)

    flow.assignBrowse(btn, false, true, {accept: 'audio/mp3, audio/mpeg, audio/wav'})

    const handleAdd = file => {
        if (file.size > 25500000) {
            parent.postMessage(
                {type: 'audio', error: 'File is too big. Try to upload file less than 25mb '},
                '*'
            )
            flow.cancel()
            return false
        }
        if (file.getExtension() !== 'mp3' && file.getExtension() !== 'wav') {
            parent.postMessage({type: 'audio', error: 'Please use mp3 or wav file formats'}, '*')
            flow.cancel()
            return
        }

        showOnSecondLine(secondLine, file.name)
    }
    flow.on('fileAdded', handleAdd)

    const handleSubmit = () => flow.upload()
    flow.on('filesSubmitted', handleSubmit)

    flow.on('uploadStart', () => {
        applyUploadingStateToBtn(btn)
        sendProgress(flow.progress())
    })

    flow.on('progress', () => sendProgress(flow.progress()))

    flow.on('complete', () => {
        applyGeneralStateToBtn(btn)
        sendProgress(flow.progress())
    })

    const handleSuccessfulUpload = (file, data) => parent.postMessage(data, '*')
    flow.on('fileSuccess', handleSuccessfulUpload)

    const handleError = message => {
        applyGeneralStateToBtn(btn)
        parent.postMessage({type: 'audio', error: message}, '*')
    }
    flow.on('error', handleError)

    return flow
}

function handleMessage(flow, secondLine, event) {
    if (!event.data) {
        return
    }

    if (event.data.url) {
        showOnSecondLine(secondLine, event.data.url)
    } else {
        handleFileFromParent(flow, event.data)
    }
}

function handleFileFromParent(flow, string) {
    if (string.length < 200) {
        return
    }

    const filename = createFileName()

    if (isIEorEDGE()) {
        const file = new Blob([string], {type: 'wav/audio'})
        file.name = filename
        flow.addFile(file)
    } else {
        flow.addFile(new File([string], filename))
    }

    flow.upload()
}

function parseParamFromWindowLocation(val) {
    let result = ''

    window.location.search
        .substr(1)
        .split('&')
        .forEach(function (item) {
            const tmp = item.split('=')
            if (tmp[0] === val) {
                result = decodeURIComponent(tmp[1])
            }
        })

    return result
}

function truncate(string = '', maxLength) {
    const threeDots = '…'
    return string.length > maxLength ? `${string.slice(0, maxLength - 1)}${threeDots}` : string
}

function showOnSecondLine(secondLine, string) {
    secondLine.innerHTML = truncate(string, 15)
}

function createFileName() {
    const dateString = new Date()
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
    return `Recording ${dateString}.mp3`
}

function isIEorEDGE() {
    return (
        navigator.appName === 'Microsoft Internet Explorer' ||
        (navigator.appName === 'Netscape' && navigator.appVersion.includes('Edge'))
    )
}

function applyUploadingStateToBtn(btn) {
    btn.classList.add('upload-form__btn--disabled')
    btn.innerHTML = btnUploadingTitle
}

function applyGeneralStateToBtn(btn) {
    btn.classList.remove('upload-form__btn--disabled')
    btn.innerHTML = btnGeneralTitle
}

function sendProgress(progress) {
    parent.postMessage({progress, type: 'audio'}, '*')
}

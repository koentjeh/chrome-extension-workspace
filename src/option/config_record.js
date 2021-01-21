let list = document.getElementById('recordings'),
    recordingName = document.getElementById('recording-name'),
    saveButton = document.getElementById('recording-save'),
    saveImage = document.getElementById('save-icon'),
    errorText = document.getElementById('error')

loadRecordings()
saveButton.onclick = event => {
    let name = recordingName.value
    recordingName.value = ''

    if (validate(name)) {
        recordScreen(name)
        saveSuccess()
    } else {
        saveError()
    }
}
function loadRecordings() {
    list.innerText = '' // reset list
    chrome.storage.local.get(null, recordings => {
        for (let key in recordings) {
            createListItem(list, key)
        }
    })
}
function loadRecording(name) {
    name = name.toLowerCase()

    chrome.storage.local.get(name, windows => {
        for (let key in windows[name]) {
            chrome.windows.create(windows[name][key])
        }
    })
}
function createListItem(list, name) {
    let item = document.createElement('li')

    let cleanButton = document.createElement('button')
    cleanButton.className = 'clean'
    cleanButton.onclick = event => {
        closeAllWindows()
        loadRecording(name)
    }
    item.append(cleanButton)

    let cleanIcon = document.createElement('img')
    cleanIcon.src = '../../icons/clean.svg'
    cleanButton.prepend(cleanIcon)

    let innerText = document.createElement('p')
    innerText.innerText = name
    innerText.onclick = event => {
        loadRecording(name)
    }
    item.append(innerText)

    let deleteButton = document.createElement('button')
    deleteButton.className = 'delete'
    deleteButton.onclick = event => {
        if (confirm('Are you sure?')) deleteRecord(name)
    }
    item.append(deleteButton)

    let deleteIcon = document.createElement('img')
    deleteIcon.src = '../../icons/delete.svg'
    deleteButton.append(deleteIcon)

    list.append(item)
}
function recordScreen(name) {
    chrome.windows.getAll({
        populate: true
    }, (windows) => {
        for (let key in windows) {
            // Convert tabs to array of urls
            windows[key].url = [];
            for (let index in windows[key].tabs) {
                windows[key].url.push(
                    windows[key].tabs[index].url)
            }

            // Delete unnecessary keys
            delete windows[key].id
            delete windows[key].alwaysOnTop
            delete windows[key].tabs
        }

        // Save
        chrome.storage.local.set({
            [name.toLowerCase()]: windows
        }, () => {
            loadRecordings()
        })
    })
}
function deleteRecord(name) {
    chrome.storage.local.remove(name.toLowerCase(), () => {
        loadRecordings()
    })
}
function validate(name) {
    return name.length > 5;
}
function saveSuccess() {
    saveButton.disabled = true
    saveButton.style.backgroundColor = 'green'
    saveImage.src = '../../icons/check.svg'
    setTimeout(() => { saveReset() }, 3000)
}
function saveError() {
    errorText.style.display = 'block'
    saveButton.disabled = true
    saveButton.style.backgroundColor = '#FF4030'
    saveImage.src = '../../icons/close.svg'
    setTimeout(() => { saveReset() }, 2000)
}
function saveReset() {
    errorText.style.display = 'none'
    saveButton.disabled = false
    saveButton.style.backgroundColor = 'deepskyblue'
    saveImage.src = '../../icons/save.svg'
}
function closeAllWindows() {
    chrome.windows.getAll(windows => {
        for (let key in windows) {
            chrome.windows.remove(windows[key].id)
        }
    })
}

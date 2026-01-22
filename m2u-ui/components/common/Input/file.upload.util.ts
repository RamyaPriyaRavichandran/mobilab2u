const ALLOWED_FORMATS = ['jpeg', 'jpg', 'png', 'pdf']

const VIDEO_FORMAT_VALID_EXTS = convertArrayToObjectKeys(['mp4', 'mkv'])

function convertArrayToObjectKeys(arr: any) {
  return arr.reduce((agg: any, value: any) => {
    agg[value] = true
    return agg
  }, {})
}

function validateUploadedFile(file: any, validExtensions: any, maxFileSizeInMb: any) {
  if (!file) {
    return
  }
  const name = file.name
  const messages = []

  if (maxFileSizeInMb) {
    const maxSize = maxFileSizeInMb * 1024 * 1024
    if (file.size > maxSize) {
      messages.push(`"${name}" can't be more than "${maxFileSizeInMb} MB" of size.`)
    }
  }

  if (validExtensions) {
    const extension = name.split('.').pop().toLowerCase()

    if (!validExtensions[extension]) {
      messages.push(`"${extension}" file type is not allowed.`)
    }
  }

  const valid = messages.length === 0

  if (!valid) {
    alert(messages.join(' and '))
  }

  return valid
}

function checkVideoExtensionSize(file: any) {
  if (!file) {
    return true
  }
  return validateUploadedFile(file, VIDEO_FORMAT_VALID_EXTS, 20)
}

function checFilekExtensionAndSize(file: any) {
  return validateUploadedFile(file, convertArrayToObjectKeys(ALLOWED_FORMATS), 2)
}

function validateFileSizeAndExtension(file: any, allowedExtension: any, maxSize: any) {
  return validateUploadedFile(file, convertArrayToObjectKeys(allowedExtension || ALLOWED_FORMATS), maxSize || 2)
}

export { checFilekExtensionAndSize, checkVideoExtensionSize, validateFileSizeAndExtension }

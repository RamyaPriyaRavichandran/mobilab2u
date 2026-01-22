import * as fs from 'node:fs'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import type { MultipartFile } from '@fastify/multipart'
import type { ObjectId } from 'mongoose'
import documentModel from '../models/document.model'
import {
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
  LOCAL_STORAGE_LOCATION,
  S3_BUCKET_NAME,
  UPLOAD_TO_S3,
} from '../plugins/env'
import type { User } from '../types/user'

const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
})

const sendToS3 = async (file: MultipartFile) => {
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: `${file.filename}`,
    ContentType: file.mimetype,
    Body: await file.toBuffer(),
  }
  const uploadCommand = new PutObjectCommand(params)
  const s3FIle = await s3.send(uploadCommand)
  return s3FIle
}

type CustomMultipartFile = MultipartFile & {
  key: string
  etag: string
  location: string
  _id: ObjectId
  s3URL?: string
  name: string
}

async function saveDocument(file: CustomMultipartFile, user: User) {
  const doc = new documentModel({
    name: file.name,
    size: file.file.bytesRead,
    originalFileName: file.filename,
    encoding: file.encoding,
    mimeType: file.mimetype,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: user,
    updatedBy: user,
    key: file?.key || '',
    eTag: file?.etag || '',
  })

  if (file.s3URL) {
    doc.s3URL = file.s3URL
  } else {
    doc.localURL = `/file/${doc._id}`
  }

  const savedDoc = await doc.save()
  file._id = savedDoc._id
  return savedDoc
}

export type ReqBodyType = Record<string, any>
export const getFiles = (body: ReqBodyType) => {
  const files = Object.entries(body)
    .filter(([name, field]: [string, MultipartFile]) => {
      return field.type === 'file'
    })
    .map(([name, field]) => {
      field.name = name
      return field
    })
  return files as CustomMultipartFile[]
}

export async function sendToLocal(
  buffer: Buffer,
  filePath: string,
): Promise<string> {
  const fileStoragePath = LOCAL_STORAGE_LOCATION
  // biome-ignore lint/style/noParameterAssign:
  filePath = `${fileStoragePath}/${filePath}`
  // Check if the directory exists
  if (!fs.existsSync(fileStoragePath)) {
    // If it doesn't exist, create the directory
    fs.mkdirSync(fileStoragePath)
  }
  return new Promise((resolve, reject) => {
    // Create a writable stream
    const writeStream = fs.createWriteStream(filePath)

    // Write the buffer to the file
    writeStream.write(buffer)

    // Handle stream events
    writeStream.on('finish', () => {
      resolve(`Buffer has been uploaded to ${filePath}`)
    })

    writeStream.on('error', (err) => {
      reject(`Failed to upload buffer: ${err}`)
    })

    // Close the stream
    writeStream.end()
  })
}

export const getS3FileURL = (fileName: string) =>
  `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${fileName}`

export const localUpload = async (files: MultipartFile[], user: User) => {
  for (const file of files) {
    // upload and save the file
    const document = await saveDocument(file as CustomMultipartFile, user)
    await sendToLocal(await file.toBuffer(), document._id as unknown as string)
  }
}

export const s3Upload = async (files: CustomMultipartFile[], user: User) => {
  for (const file of files) {
    // upload and save the file
    await sendToS3(file)

    const fileUrl = getS3FileURL(file.filename)
    file.s3URL = fileUrl
    await saveDocument(file, user)
  }
}

export class Upload {
  private files
  private user
  constructor(files: CustomMultipartFile[], user: User) {
    this.files = files
    this.user = user
  }

  private async saveDoc(file: CustomMultipartFile) {
    return await saveDocument(file, this.user)
  }

  private async s3(file: CustomMultipartFile) {
    await sendToS3(file)
    const fileUrl = getS3FileURL(file.filename)
    file.s3URL = fileUrl
    await this.saveDoc(file)
  }

  private async local(file: CustomMultipartFile) {
    const document = await this.saveDoc(file)
    await sendToLocal(await file.toBuffer(), document._id as unknown as string)
  }

  async uploadFiles() {
    for (const file of this.files) {
      if (UPLOAD_TO_S3) {
        await this.s3(file)
        continue
      }
      await this.local(file)
    }
  }
}

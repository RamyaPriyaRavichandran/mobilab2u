import fp from 'fastify-plugin'
import { type ReqBodyType, Upload, getFiles } from '../lib/file-upload'
import type { User } from '../types/user'

export default fp(async (fastify) => {
  fastify.addHook('preHandler', async (request, reply) => {
    if (!request.isMultipart()) return
    // Handle file upload
    const files = getFiles(request.body as ReqBodyType)
    const upload = new Upload(files, request.user as unknown as User)
    return await upload.uploadFiles()
  })
})

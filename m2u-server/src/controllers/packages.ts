import { FastifyReply, FastifyRequest } from 'fastify'
import packageModel from '../models/package.model'
import { ACTIONS, SUBJECTS } from '../lib/permissions'
import successMessage from '../constants/success-messages'
import errorMessage from '../constants/error-messages'
import { PackageBodySchema } from '../types/package_body'
import documentModel from '../models/document.model'
import { lookupDataFromCollection, unionWith } from 'mongo-aggregation-utils'
import { PACKAGE_OPTION, PACKAGE_TYPE } from '../constants'

export const createPackage = async (
  req: FastifyRequest<{ Body: PackageBodySchema }>,
  reply: FastifyReply,
) => {
  req.requireAccess(ACTIONS.CREATE, SUBJECTS.Package)
  const plan = new packageModel()
  if (!req.body.image._id) {
    return reply.notFound(errorMessage.DOCUMENT_REQUIRED)
  }
  const body = {
    name: req.body.name,
    description: req.body.description,
    type: req.body.type,
    members: req.body.type === PACKAGE_OPTION.INDIVIDUAL ? 0 : req.body.members,
    serviceType: req.body.serviceType,
    price: req.body.price,
    labShare: req.body.labShare,
    testCount: req.body.testCount,
    hspShare: req.body.hspShare,
    customerShare: req.body.customerShare,
    mobilabShare: req.body.mobilabShare,
    gpShare: req.body.gpShare,
    duration: req.body.duration,
    fastingHour: req.body.fastingHour,
    offerPrice: req.body.offerPrice,
    document: req.body.document._id,
    image: req.body.image._id,
  }
  req.addDataToModel(body, plan)
  const createdPlan = await plan.save()
  return reply.send({
    message: successMessage.CREATE_SUBSCRIPTION_PLAN,
    createdPlan,
  })
}

const getRemovableDocs = (data: any, body: any) => {
  const removableDocs = []
  const removableLocalDocs = []
  if (data?.document?._id && body.document._id) {
    removableDocs.push(data.document.originalFileName)
    removableLocalDocs.push(data.document._id)
  }
  if (data?.image?._id && body.image._id) {
    removableDocs.push(data.image.originalFileName)
    removableLocalDocs.push(data.image._id)
  }
  return { removableDocs, removableLocalDocs }
}

export const updatePackage = async (
  req: FastifyRequest<{ Body: PackageBodySchema; Params: { id: string } }>,
  reply: FastifyReply,
) => {
  req.requireAccess(ACTIONS.UPDATE, SUBJECTS.Package)
  if (!req.params.id) {
    return reply.notFound(errorMessage.PLAN_ID_NOT_FOUND)
  }
  const plan = await packageModel
    .findById({ _id: req.params.id })
    .populate(['document', 'image'])
  if (!plan) {
    return reply.notFound(errorMessage.PLAN_NOT_FOUND)
  }
  const body = {
    $set: {
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      members: req.body.members,
      serviceType: req.body.serviceTyp,
      price: req.body.price,
      labShare: req.body.labShare,
      hspShare: req.body.hspShare,
      customerShare: req.body.customerShare,
      mobilabShare: req.body.mobilabShare,
      gpShare: req.body.gpShare,
      duration: req.body.duration,
      fastingHour: req.body.fastingHour,
      offerPrice: req.body.offerPrice,
      document: req.body.document._id ? req.body.document._id : plan.document,
      image: req.body.image._id ? req.body.image._id : plan.image,
    },
  }

  await packageModel.findByIdAndUpdate(req.params.id, body)
  const { removableDocs, removableLocalDocs } = getRemovableDocs(plan, req.body)
  if (removableDocs.length > 0) {
    await req.deleteFileFromS3Bucket(removableDocs)
    await documentModel.deleteMany({ _id: { $in: removableLocalDocs } })
  }
  return reply.send({
    message: successMessage.UPDATE_SUBSCRIPTION_PLAN,
  })
}

export const getPackages = async (req: FastifyRequest, reply: FastifyReply) => {
  req.requireAccess(ACTIONS.VIEW_ALL, SUBJECTS.Package)
  const plans = await packageModel.find().populate(['document', 'image'])
  return reply.send(plans)
}

export const getTestPackages = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const project = {
    $project: {
      label: '$name', // Changed from 'name' to 'label'
      value: '$_id',
      _id: 0,
    },
  }
  const allPackages = await packageModel.aggregate([
    unionWith('customPackages'),
    {
      $match: {
        serviceType: PACKAGE_TYPE.TEST,
      },
    },
    project,
  ])
  return reply.send(allPackages)
}

export const getCustomerPackages = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const match = {
    $match: {
      serviceType: {
        $in: ['TEST', 'APPOINTMENT'],
      },
    },
  }
  const packages = await packageModel.aggregate([
    unionWith('customPackages', [match]),
    ...lookupDataFromCollection('documentStorage', 'document'),
    ...lookupDataFromCollection('documentStorage', 'image'),
    match,
  ])
  return reply.send(packages)
}

export const getPackage = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) => {
  req.requireAccess(ACTIONS.VIEW, SUBJECTS.Package)
  if (!req.params.id) {
    return reply.notFound(errorMessage.PLAN_ID_NOT_FOUND)
  }
  const plan = await packageModel.findById({ _id: req.params.id })
  return reply.send(plan)
}

export const deletePackage = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) => {
  req.requireAccess(ACTIONS.DELETE, SUBJECTS.Package)
  if (!req.params.id) {
    return reply.notFound(errorMessage.PLAN_ID_NOT_FOUND)
  }
  const lab = await packageModel.findById({ _id: req.params.id })
  if (!lab) {
    return reply.notFound(errorMessage.PLAN_NOT_FOUND)
  }
  await packageModel.findByIdAndDelete({ _id: req.params.id })
  return reply.send({ message: successMessage.PLAN_DELETE_SUCCESS })
}

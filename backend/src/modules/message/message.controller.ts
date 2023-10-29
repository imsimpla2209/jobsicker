import httpStatus from 'http-status'
import { Request, Response } from 'express'
import mongoose from 'mongoose'
import catchAsync from '../../utils/catchAsync'
import ApiError from '../../common/errors/ApiError'
import pick from '../../utils/pick'
import { IOptions } from '../../providers/paginate/paginate'
import * as messageService from './message.service'

export const createMessageRoom = catchAsync(async (req: Request, res: Response) => {
  const message = await messageService.createMessageRoom(req.body)
  res.status(httpStatus.CREATED).send(message)
})

export const getMessageRooms = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['member', 'proposal'])
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy'])
  const result = await messageService.queryMessageRooms(filter, options)
  res.send(result)
})

export const getMessageRoom = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params?.id === 'string') {
    const message = await messageService.getMessageRoomById(new mongoose.Types.ObjectId(req.params.id))
    if (!message) {
      throw new ApiError(httpStatus.NOT_FOUND, 'MessageRoom not found')
    }
    res.send(message)
  }
})

export const updateMessageRoom = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params?.id === 'string') {
    const message = await messageService.updateMessageRoomById(new mongoose.Types.ObjectId(req.params.id), req.body)
    res.send(message)
  }
})

export const deleteMessageRoom = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params?.id === 'string') {
    await messageService.deleteMessageRoomById(new mongoose.Types.ObjectId(req.params.id))
    res.status(httpStatus.NO_CONTENT).send()
  }
})

export const createMessage = catchAsync(async (req: Request, res: Response) => {
  const message = await messageService.createMessage(req.body)
  res.status(httpStatus.CREATED).send(message)
})

export const getMessages = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['room', 'from'])
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy'])
  const result = await messageService.queryMessages(filter, options)
  res.send(result)
})

export const getMessage = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params?.id === 'string') {
    const message = await messageService.getMessageById(new mongoose.Types.ObjectId(req.params.id))
    if (!message) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Message not found')
    }
    res.send(message)
  }
})

export const updateMessage = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params?.id === 'string') {
    const message = await messageService.updateMessageById(new mongoose.Types.ObjectId(req.params.id), req.body)
    res.send(message)
  }
})

export const deleteMessage = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params?.id === 'string') {
    await messageService.deleteMessageById(new mongoose.Types.ObjectId(req.params.id))
    res.status(httpStatus.NO_CONTENT).send()
  }
})

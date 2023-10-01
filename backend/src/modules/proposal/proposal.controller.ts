import httpStatus from 'http-status'
import { Request, Response } from 'express'
import mongoose from 'mongoose'
import catchAsync from '../../utils/catchAsync'
import ApiError from '../../common/errors/ApiError'
import pick from '../../utils/pick'
import { IOptions } from '../../providers/paginate/paginate'
import * as proposalService from './proposal.service'

export const createProposal = catchAsync(async (req: Request, res: Response) => {
  const proposal = await proposalService.createProposal(req.body)
  res.status(httpStatus.CREATED).send(proposal)
})

export const getProposals = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'role'])
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy'])
  const result = await proposalService.queryProposals(filter, options)
  res.send(result)
})

export const getProposal = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params?.proposalId === 'string') {
    const proposal = await proposalService.getProposalById(new mongoose.Types.ObjectId(req.params.proposalId))
    if (!proposal) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Proposal not found')
    }
    res.send(proposal)
  }
})

export const updateProposal = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params?.proposalId === 'string') {
    const proposal = await proposalService.updateProposalById(
      new mongoose.Types.ObjectId(req.params.proposalId),
      req.body
    )
    res.send(proposal)
  }
})

export const deleteProposal = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params?.proposalId === 'string') {
    await proposalService.deleteProposalById(new mongoose.Types.ObjectId(req.params.proposalId))
    res.status(httpStatus.NO_CONTENT).send()
  }
})
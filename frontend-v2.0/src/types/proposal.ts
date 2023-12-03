import { EStatus } from 'src/utils/enum'
import { filterFreelancersQuery } from './freelancer'

export interface IProposal {
  _id: string
  job: string
  freelancer: string
  expectedAmount?: number
  description?: string
  status?: [{ status: EStatus; date: Date }]
  clientComment?: string[]
  freelancerComment?: string[]
  attachments?: string[]
  contract?: string
  messages?: string[]
  answers?: Record<number, string>
  priority?: number
  currentStatus?: EStatus
}

export interface IProposalQuery extends filterFreelancersQuery {
  freelancer?: string
  currentStatus?: EStatus
  job?: string
  _id?: string
  'status.status'?: EStatus
}

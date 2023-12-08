/* eslint-disable import/no-extraneous-dependencies */
import mongoose from 'mongoose'
import {
  ETrackingEvent,
  IFreelancerTrackingDoc,
  IFreelancerTrackingModel,
  ITrackingEvent,
} from './freelancer.tracking.interfaces'

require('mongoose-long')(mongoose)

const SchemaTypes = mongoose.Schema.Types

const freelancerTrackingSchema = new mongoose.Schema<IFreelancerTrackingDoc, IFreelancerTrackingModel>(
  {
    freelancer: { type: String, ref: 'Freelancer' },
    jobs: [
      {
        type: {
          id: { type: String, ref: 'Job' },
          text: { type: String, required: 'false', default: '' },
          event: {
            type: {
              [ETrackingEvent.JOB_VIEW]: {
                viewCount: { type: Number, required: 'false', default: 0 },
                totalTimeView: { type: Number, required: 'false', default: 0 },
              },
              [ETrackingEvent.SEARCHING]: {
                viewCount: { type: Number, required: 'false', default: 0 },
                totalTimeView: { type: Number, required: 'false', default: 0 },
              },
              [ETrackingEvent.APPLY]: {
                viewCount: { type: Number, required: 'false', default: 0 },
                totalTimeView: { type: Number, required: 'false', default: 0 },
              },
              [ETrackingEvent.VIEWCLIENT]: {
                viewCount: { type: Number, required: 'false', default: 0 },
                totalTimeView: { type: Number, required: 'false', default: 0 },
              },
            } as unknown as ITrackingEvent,
            required: 'false',
            default: [],
          },
          lastTimeView: { type: SchemaTypes.Long, required: 'false', default: 0 },
        },
        required: 'false',
      },
    ],
    skills: [
      {
        type: {
          id: { type: String, ref: 'Skill' },
          text: { type: String, required: 'false', default: '' },
          event: {
            type: {
              [ETrackingEvent.JOB_VIEW]: {
                viewCount: { type: Number, required: 'false', default: 0 },
                totalTimeView: { type: Number, required: 'false', default: 0 },
              },
              [ETrackingEvent.SEARCHING]: {
                viewCount: { type: Number, required: 'false', default: 0 },
                totalTimeView: { type: Number, required: 'false', default: 0 },
              },
              [ETrackingEvent.APPLY]: {
                viewCount: { type: Number, required: 'false', default: 0 },
                totalTimeView: { type: Number, required: 'false', default: 0 },
              },
              [ETrackingEvent.VIEWCLIENT]: {
                viewCount: { type: Number, required: 'false', default: 0 },
                totalTimeView: { type: Number, required: 'false', default: 0 },
              },
            } as unknown as ITrackingEvent,
            required: 'false',
            default: [],
          },
          lastTimeView: { type: SchemaTypes.Long, required: 'false', default: 0 },
        },
        required: 'false',
      },
    ],
    categories: [
      {
        type: {
          id: { type: String, ref: 'JobCategory' },
          text: { type: String, required: 'false', default: '' },
          event: {
            type: {
              [ETrackingEvent.JOB_VIEW]: {
                viewCount: { type: Number, required: 'false', default: 0 },
                totalTimeView: { type: Number, required: 'false', default: 0 },
              },
              [ETrackingEvent.SEARCHING]: {
                viewCount: { type: Number, required: 'false', default: 0 },
                totalTimeView: { type: Number, required: 'false', default: 0 },
              },
              [ETrackingEvent.APPLY]: {
                viewCount: { type: Number, required: 'false', default: 0 },
                totalTimeView: { type: Number, required: 'false', default: 0 },
              },
              [ETrackingEvent.VIEWCLIENT]: {
                viewCount: { type: Number, required: 'false', default: 0 },
                totalTimeView: { type: Number, required: 'false', default: 0 },
              },
            } as unknown as ITrackingEvent,
            required: 'false',
            default: [],
          },
          lastTimeView: { type: SchemaTypes.Long, required: 'false', default: 0 },
        },
        required: 'false',
      },
    ],
    locations: [
      {
        type: {
          id: { type: String },
          text: { type: String, required: 'false', default: '' },
          event: {
            type: {
              [ETrackingEvent.JOB_VIEW]: {
                viewCount: { type: Number, required: 'false', default: 0 },
                totalTimeView: { type: Number, required: 'false', default: 0 },
              },
              [ETrackingEvent.SEARCHING]: {
                viewCount: { type: Number, required: 'false', default: 0 },
                totalTimeView: { type: Number, required: 'false', default: 0 },
              },
              [ETrackingEvent.APPLY]: {
                viewCount: { type: Number, required: 'false', default: 0 },
                totalTimeView: { type: Number, required: 'false', default: 0 },
              },
              [ETrackingEvent.VIEWCLIENT]: {
                viewCount: { type: Number, required: 'false', default: 0 },
                totalTimeView: { type: Number, required: 'false', default: 0 },
              },
            } as unknown as ITrackingEvent,
            required: 'false',
            default: [],
          },
          lastTimeView: { type: SchemaTypes.Long, required: 'false', default: 0 },
        },
        required: 'false',
      },
    ],
  },
  {
    timestamps: true,
  }
)

freelancerTrackingSchema.pre('save', function (done) {
  if (this.isModified('status')) {
    const status = this.get('status').at(-1)?.status
    this.set('currentStatus', status)
  }
  done()
})

const FreelancerTracking = mongoose.model<IFreelancerTrackingDoc, IFreelancerTrackingModel>(
  'FreelancerTracking',
  freelancerTrackingSchema
)

export default FreelancerTracking

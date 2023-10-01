import httpStatus from 'http-status'
import mongoose from 'mongoose'
import Skill from './skill.model'
import ApiError from '../../common/errors/ApiError'
import { IOptions, QueryResult } from '../../providers/paginate/paginate'
import { UpdateSkillBody, ISkillDoc, NewCreatedSkill } from './skill.interfaces'

/**
 * Register a skill
 * @param {NewCreatedSkill} skillBody
 * @returns {Promise<ISkillDoc>}
 */
export const createSkill = async (skillBody: NewCreatedSkill): Promise<ISkillDoc> => {
  if (await Skill.isNameTaken(skillBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This skill already exists')
  }
  return Skill.create(skillBody)
}

/**
 * Query for skills
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const querySkills = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const skills = await Skill.paginate(filter, options)
  return skills
}

/**
 * Get skill by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<ISkillDoc | null>}
 */
export const getSkillById = async (id: mongoose.Types.ObjectId): Promise<ISkillDoc | null> => Skill.findById(id)

/**
 * Get skill by skillname
 * @param {string} skillname
 * @returns {Promise<ISkillDoc | null>}
 */
export const getSkillBySkillname = async (skillname: string): Promise<ISkillDoc | null> => Skill.findOne({ skillname })

/**
 * Get skill by email
 * @param {string} email
 * @returns {Promise<ISkillDoc | null>}
 */
export const getSkillByEmail = async (email: string): Promise<ISkillDoc | null> => Skill.findOne({ email })

/**
 * Get skill by option
 * @param {object} options
 * @returns {Promise<ISkillDoc | null>}
 */
export const getSkillByOptions = async (Options: any): Promise<ISkillDoc | null> => Skill.findOne(Options)

/**
 * Update skill by id
 * @param {mongoose.Types.ObjectId} skillId
 * @param {UpdateSkillBody} updateBody
 * @returns {Promise<ISkillDoc | null>}
 */
export const updateSkillById = async (
  skillId: mongoose.Types.ObjectId,
  updateBody: UpdateSkillBody
): Promise<ISkillDoc | null> => {
  const skill = await getSkillById(skillId)
  if (!skill) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Skill not found')
  }
  Object.assign(skill, updateBody)
  await skill.save()
  return skill
}

/**
 * Delete skill by id
 * @param {mongoose.Types.ObjectId} skillId
 * @returns {Promise<ISkillDoc | null>}
 */
export const deleteSkillById = async (skillId: mongoose.Types.ObjectId): Promise<ISkillDoc | null> => {
  const skill = await getSkillById(skillId)
  if (!skill) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Skill not found')
  }
  await skill.deleteOne()
  return skill
}

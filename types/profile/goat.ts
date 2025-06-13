import { skillSchema } from '@/utils/validation/schemas'
import { z } from 'zod'
import React from 'react'

export type SkillAttributes = z.infer<typeof skillSchema>

export type SkillKeys = keyof SkillAttributes

export interface GoatSkillsProps {
  baseSkills: SkillAttributes
  taggedSkills?: string[]
  isGoatCompleted: boolean
}

export type GoatStage = 'intro' | 'test' | 'tagging' | 'success' | 'final'

export interface GoatTestProps {
  setStage: React.Dispatch<React.SetStateAction<GoatStage>>
  setAnswers: React.Dispatch<React.SetStateAction<Record<number, string>>>
}

export interface GoatResultProps extends GoatSkillsProps {
  answers: Record<number, string>
}

export interface GoatSkillTaggerProps
  extends Omit<GoatSkillsProps, 'isGoatCompleted' | 'initialTaggedSkills'>,
    Pick<GoatResultProps, 'answers'> {
  onFinish: (finalSkills: Record<SkillKeys, number>, taggedSkills: string[]) => void
}

export type GoatQuestion = {
  id: number
  question: string
  image?: string
  answers: {
    id: string //* A, B, C, D
    text: string
    tags?: string[] //* optional skill tags for backend skill boosts, e.g. ["barter", "speech"]
  }[]
}

export type GoatSkills = {
  id: number
  name: string
  description: string
  icon: string
}

export interface GoatBaseProps {
  currentQuestion: GoatQuestion
  currentQuestionIndex: number
}

export interface GoatIntroProps {
  handleStart: () => void
}
export interface GoatAnswersProps {
  currentQuestion: GoatQuestion
  onAnswer: (answerKey: string) => void
}

export interface GoatTaggerSummaryProps {
  selectedCount: number
  totalCount: number
}

export interface GoatHoverProps {
  hoveredSkill: SkillKeys | null
  setHoveredSkill: (skill: SkillKeys | null) => void
}

export interface GoatSkillSelectionProps {
  selectedSkills: Record<SkillKeys, boolean>
  setSelectedSkills: React.Dispatch<React.SetStateAction<Record<SkillKeys, boolean>>>
}

export interface GoatBoostedSkillsProps {
  boostedSkills: Record<SkillKeys, number>
  finalSkills: Record<SkillKeys, number>
}

export interface GoatTaggerLeftSectionProps
  extends Pick<GoatHoverProps, 'setHoveredSkill'>,
    GoatSkillSelectionProps,
    Pick<GoatBoostedSkillsProps, 'finalSkills'> {}

export interface GoatTaggerLeftColumnProps
  extends Pick<GoatBoostedSkillsProps, 'finalSkills'>,
    GoatSkillSelectionProps,
    Pick<GoatHoverProps, 'setHoveredSkill'> {}

export type GoatTaggerRightSectionProps = Pick<GoatHoverProps, 'hoveredSkill'>

export type GoatFinalResultsProps = {
  finalSkills: Record<SkillKeys, number>
  taggedSkills: string[]
}

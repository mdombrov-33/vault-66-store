import { SpecialPageResultsProps } from '@/types/profile'
import {
  getAgilityText,
  getCharismaText,
  getCombinedSpecialText,
  getEnduranceText,
  getIntelligenceText,
  getLuckText,
  getPerceptionText,
  getStrengthText,
} from '@/utils/text/special-result-text'

function SpecialResultText({ specialRecord }: SpecialPageResultsProps) {
  const { strength, perception, endurance, charisma, intelligence, agility, luck } = specialRecord

  return (
    <div className="flex flex-col justify-start">
      <div className="border rounded-md px-2 pt-2">
        {/* Dynamic text based on SPECIAL */}
        <span className="font-[roboto-mono] text-xl">VAULT-TEC PSYCH EVAL:</span>
        <p className="text-lg sm:text-xl font-[roboto-mono] leading-10">
          {getStrengthText(strength)}
          <br />
          {getPerceptionText(perception)}
          <br />
          {getEnduranceText(endurance)}
          <br />
          {getCharismaText(charisma)}
          <br />
          {getIntelligenceText(intelligence)}
          <br />
          {getAgilityText(agility)}
          <br />
          {getLuckText(luck)}
          <br />
          {getCombinedSpecialText(specialRecord) && (
            <>
              <br />
              {getCombinedSpecialText(specialRecord)}
            </>
          )}
        </p>
      </div>

      {/* <div className="w-full">
        <p className="text-xl text-muted-foreground font-[roboto-mono] text-center italic ">
          Thank you. You may proceed to the G.O.A.T. evaluation.
        </p>
      </div> */}
    </div>
  )
}

export default SpecialResultText

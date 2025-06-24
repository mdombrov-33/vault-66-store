import StrengthIcon from '@/public/images/special/strength.png'
import EnduranceIcon from '@/public/images/special/endurance.png'
import CharismaIcon from '@/public/images/special/charisma.png'
import LuckIcon from '@/public/images/special/luck.png'
import IntelligenceIcon from '@/public/images/special/intelligence.png'
import AgilityIcon from '@/public/images/special/agility.png'
import PerceptionIcon from '@/public/images/special/perception.png'

export const specialRegisterData = [
  {
    name: 'strength',
    description:
      'Indicates how physically capable you are. Useful for lifting equipment, opening heavy doors, or carrying more rations through the Wastes.',
    icon: StrengthIcon,
  },
  {
    name: 'perception',
    description:
      'Your attentiveness to surroundings. Vault security notes that high perception is handy for spotting threats before they become problems.',
    icon: PerceptionIcon,
  },
  {
    name: 'endurance',
    description:
      'Your stamina and resilience. A higher rating suggests you’ll last longer on long shifts - or longer expeditions beyond the Vault.',
    icon: EnduranceIcon,
  },
  {
    name: 'charisma',
    description:
      'Measures your social presence. Perfect for bartering, leading group activities, or persuading Overseers - if that’s your thing.',
    icon: CharismaIcon,
  },
  {
    name: 'intelligence',
    description:
      'Your mental sharpness and problem-solving skills. Vault-tec recommends high intelligence for technical roles and advanced maintenance.',
    icon: IntelligenceIcon,
  },
  {
    name: 'agility',
    description:
      'Your speed and flexibility. Great for quick tasks, navigating tight spaces, or dodging malfunctioning Protectrons.',
    icon: AgilityIcon,
  },
  {
    name: 'luck',
    description:
      'A hard-to-define trait, but somehow things just go your way. Luck might mean winning at cards or finding the last can of Cram.',
    icon: LuckIcon,
  },
]

import Image from 'next/image'
import vaultboyThumbsUp from '@/public/vaultboy.svg' // or .png
import { motion } from 'framer-motion'

export default function VaultBoySuccessScreen() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-[60vh] text-center px-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Image
        src={vaultboyThumbsUp}
        alt="Vault Boy giving thumbs up"
        width={250}
        height={250}
        priority
      />
      <h2 className="mt-6 text-3xl font-bold text-muted-foreground">Good job, kid!</h2>
      <p className="text-xl text-muted-foreground">Vault-Tec has reviewed your skills</p>
    </motion.div>
  )
}

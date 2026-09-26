import { motion, useReducedMotion } from 'framer-motion'

const Reveal = ({ children, className = '', delay = 0, once = true }) => {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.14 }}
      transition={{ duration: reduceMotion ? 0 : 0.56, delay: reduceMotion ? 0 : delay, ease: [0.22, 0.72, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default Reveal

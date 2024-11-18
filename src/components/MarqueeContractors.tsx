import React from 'react'
import {motion} from 'framer-motion'
import Marquee from './ui/marquee';

const MarqueeContractors = () => {
  return (
    <div className='w-full mx-auto px-4'>
      <motion.div
                initial={{
                    opacity: 0,
                    y:5,
                }}
                animate={{
                    opacity: 1,
                    y: 1,
                }} 
                transition={{
                    delay: 0.6,
                }}                            
                >
                <div className=''
                >
                  <Marquee pauseOnHover className="[--duration:20s]  font-semibold font-inter text-black text-sm">
                    <small>Contractor 1</small>
                    <small>Contractor 2</small>
                    <small>Contractor 3</small>
                    <small>Contractor 4</small>
                    <small>Contractor 5</small>
                    <small>Contractor 1</small>
                    <small>Contractor 2</small>
                    <small>Contractor 3</small>
                    <small>Contractor 4</small>
                    <small>Contractor 5</small>
                  </Marquee>
                </div>    
      </motion.div>
    </div>
  )
}

export default MarqueeContractors

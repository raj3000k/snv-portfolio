import React from 'react'
import EduacationCard from './EduacationCard'
import { motion } from "framer-motion"
const EducationCardContainer = () => {

    const CardData = [
        {
            title:"National Institute of Technology(NIT), Raipur  ",
            content:" (B.Tech)     [Dec 2021 - May 2025]" ,
            loc:" Raipur, Chhattisgarh",

        },
        {
            title:"Kendriya Vidyalaya, Mahasamund",
            content:"12th, PCM + Computer Science [2007-2019]",
            loc:" Mahasamund, Chhattisgarh",
        },
    ]
  return (
    <motion.div 
    initial={{
        opacity:0,
    }}
    transition={{duration:1,delay:0.05}}
    whileInView={{  
        opacity:1,
    }}
    viewport={{once:true}}
    className="time-line-container">
        <div class="timeline">
            <div class="outer">
                <div class="card">
                    {
                        CardData.map((data,i)=>(
                            <EduacationCard data={data} key={i}/>
                        ))
                    }
                    
                </div>
            </div>
        </div>
    </motion.div>
  )
}

export default EducationCardContainer
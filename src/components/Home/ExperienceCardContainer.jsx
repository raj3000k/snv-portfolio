import React from 'react'
import ExperienceCard from './ExperienceCard';
import { motion } from "framer-motion"
import UrbanPiper from '../../assets/images/urban.png';
import GirlScript from '../../assets/images/girlscript.png';
const ExperienceCardContainer = () => {

    const CardData = [
        {
            title:"Software Engineering Intern (UrbanPiper) ",
            content:" May 2024 - Aug 2024 (3 Months)",
            loc: " Bengaluru, Karnataka, India (On-site)",
            image: UrbanPiper, // Pass the image as a prop
            txt:"Built a comprehensive testing platform for the Product, Platform, Integration, and QA teams to streamline the testing process for Urban Piper’s renowned product, HUB. Developed a mock aggregator equipped with features to test specific workflows, including upstream and downstream integrations. This platform significantly enhanced the overall efficiency and workflow of the Engineering team. Utilized a tech stack comprising Python, MongoDB, FastAPI, and React."
        },
        {
            title:"Open Source Contributor (GSSOC '23)",
            content:" Jun - Aug 2023 (3 Months)",
            loc: " Remote",
            image: GirlScript, // Pass the image as a prop
            txt:"Contributed to projects utilizing web technologies and Python (AI/ML models). Collaborated closely with the project community and mentors to understand the requirements and vision of each project." 
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
                            <ExperienceCard data={data} key={i} />
                        ))
                    }
                    
                </div>
            </div>
        </div>
    </motion.div>
  )
}

export default ExperienceCardContainer

import React from 'react'
import ProjectCard from './ProjectCard'
import Traffic from '../../assets/images/projects/traffic-pred.png'
import Ablego from '../../assets/images/projects/ablego.png'
import Rent from '../../assets/images/projects/rentwheels.png'
import { motion } from "framer-motion"


const containerVariant = {
    hidden:{
        opacity:0,
    },
    show:{
        opacity: 1,
        transition:{
            duration:1,
            delay:.05,
        }
    },
    
};

const cardsVariant = {
    hidden:{
        opacity:0,
    },
    show:{
        opacity: 1,
        transition:{
            duration:1,
            delay:.5,
            staggerChildren:0.6
        }
    },
    
};



const headVariant = {
    hidden:{
        opacity:0,
        x:-20,
    },
    show:{
        x:0,
        opacity:1,
    transition:{
        duration:2,
        delay:.5
    }
    }
}



const Projects = () => {

    let cardsData = [
        {
            heading:"Traffic Prediction System",
            sub:"A Collaborative Project for Western Digital Cerebrum hackathon 2023 (Winners)",
            tech:"Python, Tensorflow, Keras, NumPy, Pandas, matplot",
            desc :"Predicted the traffic of a particular area at a particular time using historical data and the use of Deep learning models - RNN,GRU, and LSTM.Implemented model selection as per input given for better accuracy, used Generative AI, LLMs.",
            image:Traffic,
            github:"https://github.com/raj3000k/traffic-prediction",
        },
        {
            heading:"AbleGO",
            sub :"Cab booking app for disabled people. A Collaborative project for inDrive Hackathon 2023.",
            tech:"Flutter, Dart, MapBox API, RazorPay API, Firebase",
            desc :"Control app with voice-enabled, for enhancing accessibility for disabled people. User & Driver login both in one app with Driver training program integrated with the app.Features like Emergency SOS, PayLater, Emergency Contacts add/remove, Ride Scheduling options.",
            image: Ablego,
            github:"https://github.com/raj3000k/able-go",
        },
        {
            heading:"Rent-WHEELS",
            sub:"Full Stack Car booking website.",
            tech:"Typescript, ReactJS, TailwindCSS, Node/ExpressJS, GraphQL, NestJS.",
            desc :"A fully responsive car booking/renting website, GraphQL API and Nest JS are used for Car models. Add, remove, and update cars easily, admin and User Dashboard.",
            image:Rent,
            github:"https://github.com/raj3000k/rent-wheels",
        },
        
        // {
        //     heading:"",
        //     desc :"",
        //     image:,
        //     github:"",
        // },
    ]
  return (
    <motion.div id='projects'
    variants={containerVariant} 
    initial= 'hidden'
    whileInView='show'
    viewport={{once:true,amount:.2,margin:'30%'}}
    className='project-conatiner'>
         <motion.p 
         variants = {headVariant}
         
         class="proj-head">Projects</motion.p>
         <motion.div 
            variants = {cardsVariant}
            initial='hidden'
            whileInView = 'show'
         class="project-card-container">
            {
                cardsData.map((data,index)=>(
                    <ProjectCard key ={index} data = {data}/>
                ))
            }
         </motion.div>
    </motion.div>
  )
}

export default Projects
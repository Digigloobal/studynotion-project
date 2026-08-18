import React, { useState } from 'react'
import {Chart , registerables} from 'chart.js'
import {Pie} from 'react-chartjs-2'

Chart.register(...registerables);
const InstructorChart = ({courses}) => {

    console.log("courses =>",courses);

    const [currChart , setCurrChart] = useState("students");

    const getRandomColors = (numColors)=>{

        const colors = [];

        for(let i = 0 ; i < numColors;i++){
            const color = `rgb(${Math.floor(Math.random()*256 )} ,${Math.floor(Math.random()*256 )} , ${Math.floor(Math.random()*256 )} )` ;
            colors.push(color);
        }

        return colors;

    }




        const chartDataForStudents = {
        labels: courses.map((course) => course.courseName),
        datasets : [
            {
                data : courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses.length), 
            }
        ]
    }

      const chartDataForIncome = {
        labels: courses.map((course) => course.courseName),
        datasets : [
            {
                data : courses.map((course) => course.totalAmountGenerated),
                backgroundColor: getRandomColors(courses.length), 
            }
        ]
    } 

   

    const options ={
         layout: {
            boxWidth: 15,
            padding: 20,
        },
         maintainAspectRatio: false,

    };

  return (
    <div className='bg-richblack-800 p-3 px-5 rounded-lg ' > 

    <div className='flex flex-col gap-4  '>
        <p className='font-semibold' >Visualise</p>
        <div className='flex gap-2'>
            <button
            onClick={() => setCurrChart("students")}
            className={`${currChart === "students" ? " bg-richblack-600  " : " bg-richblack-800 " } text-yellow-100 p-1 px-3`}
            >
                Students
            </button>

            <button
            onClick={() => setCurrChart("income")}
            className={`${currChart !== "students" ? " bg-richblack-600  " : " bg-richblack-800 " } text-yellow-100 p-1 px-3`}
            >
                Income
            </button>
        </div>

        <div  className='flex flex-col gap-4 items-center h-[400px]' >
            <Pie
                data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
                options={options}
               
               
            />
        </div>
    </div>

      
    </div>
  )
}

export default InstructorChart

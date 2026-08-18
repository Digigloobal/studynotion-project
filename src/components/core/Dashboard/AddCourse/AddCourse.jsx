import React from 'react'
import RenderForm from './RenderForm'


const AddCourse = () => {
  return (
    <div className='w-11/12 flex gap-5 justify-between mx-auto' > 
     
     <div className='w-8/12 mt-5 flex justify-center' >
        <RenderForm/>
     </div>

     <div>
        <div className='text-white bg-richblack-800 flex flex-col w-11/12 p-3 mt-5 rounded-lg' >
              <div className='text-xl'>⚡ Course Upload Tips</div>
            <ul className='flex flex-col gap-4 justify-start my-4 text-sm text-richblack-5 list-disc ml-4 '> 

            <li> Set the Course Price option or make it free.</li>
            <li> Standard size for the course thumbnail is 1024x576.</li>
            <li> Video section controls the course overview video.</li>
            <li> Course Builder is where you create & organize a course.</li>
            <li> Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
            <li> Information from the Additional Data section shows up on the course single page.</li>
            <li> Make Announcements to notify any important</li>
            <li> Notes to all enrolled students at once.</li>
            
            </ul>

        </div>
     </div>
      
    </div>
  )
}

export default AddCourse

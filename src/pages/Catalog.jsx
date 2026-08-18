import React, { useEffect, useState } from 'react'
import Course_Card from '../components/core/Catalog/Course_Card'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Footer from '../components/core/common/Footer';

const Catalog = () => {
 

    const {catalogName} = useParams();
    const [catalogPageData,setCatalogPageData] = useState(null);
    const [categoryId,setCategoryId] = useState("");

    const getCategories = async () => {

        const result = await apiConnector("GET",categories.CATEGORIES_API);
       // console.log("result=>",result);
       // console.log("catalogName=>",catalogName);
        const category_id = 
        result?.data?.data?.filter( (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;

        //console.log("catgoryId=>",category_id);
        setCategoryId(category_id);
    }


    

    useEffect(()=>{

        getCategories();

    },[catalogName]);

    useEffect(()=>{

        const result = [];

        const getCategoryDetails = async () => {
             
        try {

            const result = await getCatalogaPageData(categoryId);
            //console.log("result=>",result);
            setCatalogPageData(result);

            
        } catch (error) {
               console.log(error)
        }

        
        
    }
         if(categoryId){
        getCategoryDetails();
         }

    },[categoryId])

    const handleColor = (data) =>{
        

    }

 //console.log("catalog page details =>", catalogPageData);

  return (
    <div className='text-white flex flex-col w-11/12 mt-5'>
      <div className='w-full'>
        <div className='bg-richblack-800 p-5 flex flex-col gap-2 w-[100%] rounded-lg'>
            <p>Home / Catalog / <span className='text-yellow-5 '  >{catalogPageData?.data?.selectedCategory?.name}</span> </p>
             <p>{catalogPageData?.data?.selectedCategory?.name}</p>
              <p className='text-sm text-richblack-400'>{catalogPageData?.data?.selectedCategory?.description}</p>
        </div>

        <div className='mt-10'>
            <div className='text-2xl' >Courses to get you started</div>
            <div className='flex gap-3' >
                <p  >Most Popular</p>
                <p className='border-b-2 border-yellow-25 text-yellow-50' >New</p>
            </div>
           <hr className='-mt-[1px] text-richblack-400'></hr>
            <div className='mt-10 mb-7'>
               <CourseSlider courses={catalogPageData?.data?.selectedCategory?.courses} />
            </div>

        </div>

           <div>

            <div className='text-2xl' >Top courses in {catalogPageData?.data?.selectedCategory?.name}</div>
            <div className='mt-5'>
              <CourseSlider courses = {catalogPageData?.data?.differentCategory?.courses} />
            </div>


           </div>

           <div>
            <div className='text-2xl' >Frequently Bought Together</div>
            <div className='grid grid-cols-2 mt-4 gap-4'>
              {catalogPageData?.data?.mostSellingCourses?.slice(0,4).
              map((course,index) => (
                <Course_Card course = {course} key={index} Height={"h-[300px]"} />
              ))}
            </div>
           </div>


      </div>
        <Footer/>
    </div>
  )
}

export default Catalog

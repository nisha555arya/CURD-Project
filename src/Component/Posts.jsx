
import { useEffect, useState } from "react";
import { getPost} from "../api/PostApi";
import { deletePost } from "../api/PostApi";
import { Form } from "../Component/Form";

export const Posts = () => {

 const [ data , setData] =useState([]);
const [updateDataApi ,setUpdateDataApi] = useState({})



//get function
   const getPostData  = async ()=>{
     try{
      const res = await getPost();
       console.log( res);
       setData(res.data);
     }catch(error){
      console.error("failed to fetch posts:" , error);
     }
     
   }

  useEffect(() => {
    getPostData();
  }, []);

 // function to delete post
 const handleDeletePost = async(id)=>{
  try{

    const res = await deletePost(id);
    console.log(res);
    if(res.status === 200){

      const newUpdatedPosts = data.filter((CurrPost) => CurrPost.id !==id)
      setData(newUpdatedPosts);
    }

  } catch(error){
    console.log(error);
  }

 };
 

 //edit function
 const handlrUpdatePost=(currElem)=>{
   setUpdateDataApi(currElem);
 }

  return(
    <>
    <section className="section-form">
    <Form data= {data}
      setData={setData} 
       updateDataApi={ updateDataApi} 
       setUpdateDataApi={setUpdateDataApi}/>

    </section>
      <section className="section-post">
        <ol>
          {
            data.map((currElem)=>{
              const {id , body , title} = currElem;
              return <li key={ id}>
              <p>{title}</p>
              <p>{body}</p>
              <button className="btn-edit" onClick={()=> handlrUpdatePost(currElem)}>Edit</button>
              <button className="btn-delete" onClick={()=> handleDeletePost(id)}>Delete</button>
              </li>
            })
          }
        </ol>
      </section>
    </>
  )
};

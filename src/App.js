import React ,{useState,useEffect} from 'react'
import './App.css';
import axios from "axios";
function App() {
  const [foodName,setFoodName]= useState("");
  const [newfoodName,setnewFoodName]= useState("");
  const [foodList, setfoodList] = useState([])
  const [days, setdays] = useState("");
  useEffect(() => {
    axios.get('http://localhost:3001/read').then((response)=>{
      setfoodList(response.data);
    })
  }, [])
  const addToList=()=>{
    axios.post("http://localhost:3001/insert",{
      foodName:foodName,
      days:days
    })
  }
  const updateFood=(id)=>{
    axios.put("http://localhost:3001/update",{id:id,newfoodName:newfoodName})
  }
  const deleteFood=(id)=>{
    axios.delete(`http://localhost:3001/delete/${id}`)
  }
  return (
    <div className="App">
     <h1 className="title">Food Recipies</h1>
     <label>Food Name</label>
     <input type="text" onChange={(e)=>{
       setFoodName(e.target.value);
     }}/>
     <label>Recipe</label>
     <input type="text" onChange={(e)=>{
       setdays(e.target.value);
     }}/>
     <button onClick={addToList}>Add</button>
     <h1>Food List</h1>
     {foodList.map((val,key)=>{
       return (
       <div className="foodList">
         <h1>{val.foodName}</h1>
         <h4 className="recipe">{val.days}</h4>
         <input type="text" placeholder="new food name" onChange={(e)=>{
           setnewFoodName(e.target.value);
         }}/>
         <button onClick={()=>{
           updateFood(val._id)
         }}>Update</button>
         <br />
         <button  onClick={()=>{
           deleteFood(val._id)
         }}>Delete</button>
       </div>
       );
     })}
    </div>
  );
}

export default App;

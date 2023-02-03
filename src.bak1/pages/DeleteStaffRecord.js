import React from 'react'
//import './DeleteStaffRecord.css'
function DeleteStaffRecord (){
  return (
    <>
    <div>
    <h1 className= "head" align = "center">Delete Staff Record </h1>
    <form className="formclassName">
            <div>
        <label>Staff Name </label>
        <select className ="button">   <option selected>Choose...</option>
                    <option>...</option>
                 </select>
                        
    </div>
    <div>
    <label>Attendance </label>
     <input type="text" id="attendance" name="Attendance" className = "textbox" />&ensp;&ensp;
    </div>
    <div>
        <label>Date </label>
    <input type="datetime-local" />
    </div>
    <div>
    <label>Pump </label>
    <input type="text" id="pump" name="Pump" className = "textbox" />&ensp;&ensp;
    </div>
    <button type = "submit" className="button">Delete </button>
    </form>
    </div>
    </>
  )
}

export default DeleteStaffRecord;

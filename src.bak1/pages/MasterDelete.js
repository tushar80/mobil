import React from 'react'
// import './styles/MasterDelete.css'
function MasterDelete() {
    return (
        <>
        <div>
        <h1 className= "head" align = "center">Master Delete</h1>
            <form classNameName="formclassName">
            <div>
        <label>Select Pump </label>
        <select className ="button">   <option selected>Choose...</option>
                    <option>...</option>
                 </select>
        
    </div>
    <label>Last Reading </label>
     <input type="text" id="lastreading" name="Last Reading" className = "textbox" />&ensp;&ensp;
     <button type = "submit" className="button">Show</button>

     <div>
        <text>Pump Record Detail </text> <br />
        <label>Pump Number </label>
     <input type="text" id="lastreading" name="Pump Number" className = "textbox" /><br/>
     <label>Date </label>
     <input type="text" id="lastreading" name="Date" className = "textbox"/><br/>
     <label>Initial Reading </label>
     <input type="text" id="lastreading" name="Initial Reading" className = "textbox" /><br/>
     <label>Final Reading </label>
     <input type="text" id="lastreading" name="Final Reading" /><br/>
     </div>


     <div>
        <text>Sales Record Detail </text> <br />
        <label>Pump Number </label>
     <input type="text" id="lastreading" name="Pump Number" /><br/>
     <label>Date </label>
     <input type="text" id="lastreading" name="Date" /><br/>
     <label>Staff Name </label>
     <input type="text" id="lastreading" name="Staff Name" /><br/>
     <label>Shift </label>
     <input type="text" id="lastreading" name="Shift" /><br/>
     </div>
     <button type = "submit" className="button">Delete</button>

            </form>
            
        </div>
        </>
    )
}
export default MasterDelete;

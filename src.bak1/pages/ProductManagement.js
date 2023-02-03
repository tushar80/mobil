//Pumps Management
import React from 'react'

function ProductManagement() {
  return (
	<div>
	  <h1 className= "heading" align = "center">Product Management </h1>
      <form>
      <label>Unit Cost per Litre of AGO </label>
     <input type="text" id="AGO" name="AGO" className = "textbox" />&ensp;&ensp;
     <br/><label>Unit Cost per Litre of DPK </label>
     <input type="text" id="DPK" name="DPK" className = "textbox" />&ensp;&ensp;
     <br/><label>Unit Cost per Litre of PMS </label>
     <input type="text" id="PMS" name="PMS" className = "textbox" />&ensp;&ensp;
     <br/><label>Unit Cost per Litre of BULK </label>
     <input type="text" id="BULK" name="BULK" className = "textbox" />&ensp;&ensp;

     <br/><button type = "submit" className="button">Unlock </button>&ensp;&ensp;
     <button type = "submit" className="button">Save Changes </button>&ensp;&ensp;
     <button type = "submit" className="button">Cancel </button>
      </form>
	</div>
  )
}

export default ProductManagement;
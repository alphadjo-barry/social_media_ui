import {LuUserRoundSearch} from "react-icons/lu";
import React from "react";

export default function InputSearch({ search, setSearch}) {
   return (<>
       <div className="d-flex align-items-center position-relative">
           <LuUserRoundSearch className="position-absolute" style={{ left: "10px"}}/>
           <input
               type="text"
               className="form-control rounded-pill"
               placeholder="Rechercher..."
               style={{ paddingLeft: "30px" }}
               value={search}
               onChange={(e) => setSearch(e.target.value) }
           />
       </div>
   </>);

}

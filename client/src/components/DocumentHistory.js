import React from 'react';


class DocumentHistory extends React.Component{

    
    render(){
       
        return(
           <div>
                <h2>Document History</h2>
            <ul>
                <li> <button className="btn-lg">Download</button>
                <button className="btn-lg">Print</button></li>
               
            </ul>

           

           </div>
            
       
      
        )

    }
    
}

export default DocumentHistory;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class CurrentDoc extends React.Component{

    
    render(){
       if(this.props.currentDoc){
        return(
            <div>
                <h1>{this.props.currentDoc}</h1>
            
                <h3>Actions:</h3>
                <button className="btn-lg">Download</button>
                <button className="btn-lg">Print</button>
                <button className="btn-lg">Edit</button>

            </div>
       
      
        )
       }
       else{
           return(
               <div>
                   <p>No Document Selected</p>
                   <h3>Actions:</h3>
                <button className="btn-lg">Download</button>
                <button className="btn-lg">Print</button>
                <button className="btn-lg">Edit</button>
               </div>
           )
       }
        

    }
    
}

export default CurrentDoc;
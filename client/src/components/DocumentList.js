import React from 'react';
import { connect } from 'react-redux';


function DocumentList ({documents, documentClicked, filterText}){

        if(documents){
            
                const documentList = documents.filter((document) => {
                    return document.title.toLowerCase().indexOf(filterText.toLowerCase()) >= 0;
                })
                .map((document) => {
                    return(
               
                        <div>
                                <a href="#" onClick={() => documentClicked(document)}>
                                    <div className="card border-secondary mb-3" style={{width: '10rem'}}>
                                    
                                    <div className="card-header">{document}</div>
        
                                    <div className="card-body text-secondary">
            
                                    </div>
                                    </div>
                                </a>                         
                        </div>
                    )
                })
                return <div>{documentList}</div>;
        }

        else{
            return(
                <div><p>No Documents</p></div>
            )
        }     
    
}
const mapStateToProps = (state) => ({
     documents: state.documents.documents
  })

export default connect(mapStateToProps) (DocumentList);
import React from 'react';
import './ViewDocuments.css'
import Search from '../components/Search';
import CurrentDoc from '../components/CurrentDoc';
import DocumentList from '../components/DocumentList';
import DocumentHistory from '../components/DocumentHistory'

class ViewDocuments extends React.Component{

    constructor(props){
        super(props)
        this.state= {
            filterText: '',
            selectedDocument: '',
        }
    }

    setDocument(document){
        this.setState({
            selectedDocument: document
        })
    }

    filterText(value){
      this.setState({
        filterText: value
      })
    }

    render(){

        return (
    
            <div className="row">
            <div className="title col-6 border-right text-center">
                 <Search 
                 filterText = {this.filterText.bind(this)}/>
            </div>
            <div className="currentDoc col-6 ">
              <CurrentDoc 
              currentDoc = {this.state.selectedDocument}/>
            </div>
            <table className="docList col-6 border-right">
              <DocumentList 
              documentClicked = {this.setDocument.bind(this)}
              filterText = {this.state.filterText}/>
            </table>
            <div className="docHistory col-6">
              <DocumentHistory />
            </div>
            
            
          </div>
          
          );
    }
  
}
export default ViewDocuments;

import React from 'react';
import { connect } from 'react-redux';

class Search extends React.Component{
        filterText(){
                const val = this.myValue.value;
                this.props.filterText(val);
                console.log(val)
        }

render(){
        return(
                <div>
                     <h1>Your Documents</h1>
                     <div className="md-form mt-0">
                     <input className="form-control" type="text" 
                     placeholder="Search to filter documents..." aria-label="Search"
                     ref={(value)=> this.myValue = value}
                     onChange={this.filterText.bind(this)}
                     ></input>
                     </div>
     
                </div>
      
             )

}
       
     
}

export default Search;
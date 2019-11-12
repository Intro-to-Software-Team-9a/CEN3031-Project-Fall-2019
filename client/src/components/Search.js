import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

class Search extends React.Component {
  filterText() {
    const val = this.myValue.value;
    this.props.filterText(val);
  }

  render() {
    return (
      <InputGroup style={{ maxWidth: '400px' }}>
        <FormControl
          aria-label="Filter"
          aria-describedby="basic-addon1"
          ref={(value) => { this.myValue = value; } }
          onChange={this.filterText.bind(this)}
        />
        <InputGroup.Append>
          <InputGroup.Text id="basic-addon1">Filter</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}

export default Search;

import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";

class DropzoneAreaExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }
  handleChange(files) {
    this.setState({
      files: files,
    });
  }
  render() {
    return (
      <DropzoneArea
        onChange={this.handleChange.bind(this)}
        dropzoneText="Upload up to 10 images"
        filesLimit={10}
      />
    );
  }
}

export default DropzoneAreaExample;

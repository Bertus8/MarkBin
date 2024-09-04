import React, { Component } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/markdown/markdown";
import { Meteor } from "meteor/meteor";

class BinsEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.bin?.content.value,
    };
  }

  handleBeforeChange = async (editor, data, value) => {
    this.setState({ code: value });
    console.log(this.props.bin, value);
    const newContent = { value };

    try {
      const result = await Meteor.callAsync(
        "bins.updateAsync",
        this.props.bin._id,
        newContent
      );
      console.log(result);
    } catch (error) {
      console.error("Error actualizando bin:", error);
    }
  };
  handleChange = async (editor, data, value) => {
    console.log(this.props.bin, value);
    const newContent = { value }; 

    try {
      const result = await Meteor.callAsync(
        "bins.updateAsync",
        this.props.bin._id,
        newContent
      );
      console.log(result);
    } catch (error) {
      console.error("Error actualizando bin:", error);
    }
  };

  render() {
    return (
      <div className="col-xs-8 container-mirror">
        <h5>Input</h5>
        <CodeMirror
          value={this.props.bin?.content.value}
          options={{ mode: "markdown", lineNumbers: true }}
          onChange={this.handleChange}
          onBeforeChange={this.handleBeforeChange}
        />
      </div>
    );
  }
}

export default BinsEditor;

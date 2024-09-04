import React, { Component } from "react";
import { markdown } from "markdown";

class BinsViewer extends Component {
  render() {
    const { bin } = this.props;
    if (!bin || !bin.content.value) {
      return <div className="col-xs-4"><h5>Output</h5>No data available</div>;
    }

    const rawHTML = markdown.toHTML(bin.content.value);
    return (
      <div className="col-xs-4">
        <h5>Output</h5>
        <div className="output-container" dangerouslySetInnerHTML={{ __html: rawHTML }} />
      </div>
    );
  }
}

export default BinsViewer;

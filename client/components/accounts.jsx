import React, { Component, createRef } from "react";
import ReactDOM from "react-dom";
import { Template } from "meteor/templating";
import { Blaze } from "meteor/blaze";

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.containerRef = createRef();
  }

  componentDidMount() {
    //Render the Blaze accounts form find the div
    // we just rendered in the 'render method and place
    // the Blaze accounts form in that div
    this.view = Blaze.render(Template.loginButtons, this.containerRef.current);
  }

  componentWillUnmount() {
    // Go find the fortms we created and destroy them
    // We need to clean up those forms ourselves
    Blaze.remove(this.view);
  }
  render() {
    return <div ref={this.containerRef}></div>;
  }
}

export default Accounts;

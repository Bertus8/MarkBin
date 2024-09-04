import React, { Component, createRef } from "react";
import { Meteor } from "meteor/meteor";

class BinsShare extends Component {
  constructor(props) {
    super(props);
    this.refEmail = createRef();
  }

  onShareClick = async () => {
    const email = this.refEmail.current.value;
    console.log(email);
    const result = await Meteor.callAsync('bins.shareAsync', this.props.bin, email);
    console.log('save email',result);
  };

  renderSharedList(){
    if (!this.props.bin || !this.props.bin.sharedWith) {
      return null; // o algún mensaje de error
    }
    return this.props.bin.sharedWith.map(email => {
      return <button 
      key={email}
      className="btn btn-default">
        {email}
      </button>
    })
  }

  render() {
    return (
      <footer className="bins-share">
        <div className="input-group">
          <input ref={this.refEmail} className="form-control" />
          <div className="input-group-btn">
            <button
              onClick={this.onShareClick}
              className="btn btn-default">
              Share Bin
            </button>
          </div>
        </div>
        <div className="sharedWith-container">
          Shared With:
        </div>
        <div className="btn-group">
          {this.renderSharedList()}
        </div>
      </footer>
    );
  }
}

export default BinsShare;

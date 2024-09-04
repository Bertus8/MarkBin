import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Bins } from "../../../imports/collections/bins";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
class BinList extends Component {
  async onBinRemove(bin) {
    const result = await Meteor.callAsync("bins.removeAsync", bin);
    console.log("result REMOVE", result);
  }
  renderlist() {
    return this.props.bins.map((bin) => {
      const url = `/bins/${bin._id}`;
      return (
        <li className="list-group-item" key={bin._id}>
          <Link to={url}>Bin {bin._id}</Link>
          <span className="pull-right">
            <button
              className="btn btn-danger"
              onClick={() => this.onBinRemove(bin)}
              remove="true"
            >
              REMOVE
            </button>
          </span>
        </li>
      );
    });
  }
  render() {
    console.log(this.props.bins);
    return <ul className="list-group">{this.renderlist()}</ul>;
  }
}

export default withTracker(() => {
  const binsHandle = Meteor.subscribe("bins");
  const sharedBinsHandle = Meteor.subscribe('sharedBins');


  const user = Meteor.user();
  if (!user || !user.emails) return { bins: [], loading: false };

  const email = user.emails[0].address;
  const bins = Bins.find({
    $or: [
      { ownerId: Meteor.userId() },
      { sharedWith: { $elemMatch: { $eq: email } } }
    ]
  }).fetch();

  return { bins, loading: false };
})(BinList);

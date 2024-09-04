import React from "react";
import { useParams } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Bins } from "../../../imports/collections/bins";
import BinsEditor from "./bins_editor";
import BinsViewer from "./bins_viewer";
import { Meteor } from "meteor/meteor";
import BinsShare from "./bins_share";

const BinsMain = () => {
  const { id: binId } = useParams();
  console.log("binId", binId);

  const bin = useTracker(() => {
    const subscriptionBins = Meteor.subscribe("bins");
    const subscriptionSharedBins = Meteor.subscribe("sharedBins");

    if (!subscriptionBins.ready() || !subscriptionSharedBins.ready()) {
      return null;
    }

    const user = Meteor.user();
    if (!user || !user.emails) {
      return null;
    }

    const email = user.emails[0].address;

    return Bins.findOne({
      _id: binId,
      $or: [
        { ownerId: Meteor.userId() },
        { sharedWith: { $elemMatch: { $eq: email } } }
      ]
    });
  }, [binId]);



  return (
    <div>
      <BinsEditor bin={bin} />
      <BinsViewer bin={bin} />
      <BinsShare bin={bin} />
    </div>
  );
};

export default BinsMain;

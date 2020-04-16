import React from 'react';
import { Row, Col, CollectionItem, Collection, Icon, Card, CardTitle, Button } from 'react-materialize';
import image from '../../Main/images/papaya.png';
import LabelConversion from '../../Common/LabelConversion';

class HelpCardHelper extends React.Component {
    render () {
        return (
<div>

<CollectionItem className="avatar">
  <div className="helpCard">
  <img
          alt=""
          className="circle"
          src={image}
        />
        <div className="title">
        {LabelConversion.getStatus(this.props.grocery.status)}
        </div>
        <p>
        Shopping list: {this.props.grocery.groceries}
          <br />
          Address: {this.props.grocery.address}
          <br />
          Additional information: {this.props.grocery.description}
          <br />
          Timeline: {LabelConversion.getTimeline(this.props.grocery.timeline)}
        </p>
  </div>

      </CollectionItem>


</div>
        )
    }
}

export default HelpCardHelper;
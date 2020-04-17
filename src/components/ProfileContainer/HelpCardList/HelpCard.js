import React from 'react';
import { Row, Col, CollectionItem, Collection, Icon, CardTitle, Card, Button } from 'react-materialize';
import LabelConversion from '../../Common/LabelConversion';
import image from '../../Main/images/papaya.png';

class HelpCard extends React.Component {

  onCompletedClick = () => {
    this.props.onCompleteSelected(this.props.grocery);
  }

  render() {
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

          {/* <a 
          className="secondary-content"
          
        > Mark as completed<i className="material-icons" onClick={this.props.onCompleteSelected(this.props.grocery)}>check</i></a> */}

        {this.props.grocery.status !== 'C' &&
              <Button
              node="button"
              className="completedBtn"
              style={{
                marginRight: '5px'
              }}
              waves="light"
              onClick={this.onCompletedClick}
              >
              Mark as completed
              </Button>

        }
         
        </CollectionItem>


      </div>
    )
  }
}

export default HelpCard;
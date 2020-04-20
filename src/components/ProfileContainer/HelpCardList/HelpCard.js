import React from 'react';
import { Row, Col, CollectionItem, Collection, Icon, CardTitle, Card, Button } from 'react-materialize';
import LabelConversion from '../../Common/LabelConversion';
import Moment from 'moment';
import image from '../../Main/images/the-creative-exchange-ixS7UCRJTdM-unsplash.jpg';
import image2 from '../../Main/images/micheile-henderson-3TgIneA4xjM-unsplash.jpg';

class HelpCard extends React.Component {

  onCompletedClick = () => {
    this.props.onCompleteSelected(this.props.grocery);
  }

  onDeleteClick = () => {
    this.props.onDeleteSelected(this.props.grocery);
  }

  render() {

    const boldText = {
      fontSize: '18px'
    };

    const isMobile = window.innerWidth <= 500;

    return (
      <>
        {/* <div className="col s12">
    <div className="card horizontal">
        {!isMobile &&
            <div className="card-image">
                <img src={image2} />
            </div>
        } 

          {this.state.requestor &&
            <CollectionItem className="avatar">
              <div className="helpCard">
                <p>{`This request is: ${LabelConversion.getStatus(this.props.grocery.status)}`}</p>
                <p>Groceries needed: {this.props.grocery.groceries}</p>
                <br/>
                <p style={boldText}>Contact information:</p>
                <p>This request was created by: {this.state.requestor.firstName} {this.state.requestor.lastName}</p>
                    {this.state.requestor.intro &&
                        <p>About: {this.state.requestor.intro}</p>
                    }
                   <p> Phone number: {this.state.requestor.phoneNumber}</p>
                <p>
                    Delivery address: {this.props.grocery.address}
                    <br />  Additional info: {this.props.grocery.description}<br />
                    {`I need this: ${LabelConversion.getTimeline(this.props.grocery.timeline)}`}
                    <br />

                </p>
                <p>Created on: {Moment(this.props.grocery.createdAt).format("MMMM Do YYYY, HH:mm")}</p>
              </div>
            </CollectionItem>
          }
        </div>

        </div> */}



        {/* OR */}

        <div className="col s12">
          <div className="card horizontal">
            {!isMobile &&
              <div className="card-image">
                <img src={image} />
              </div>
            }
            <CollectionItem className="avatar">
              <div className="helpCard">
                <p>{`This request is: ${LabelConversion.getStatus(this.props.grocery.status)}`}</p>
                <p>Groceries needed: {this.props.grocery.groceries}</p>
                <br />
                <p>
                  Delivery address: {this.props.grocery.address}
                  <br />  Additional info: {this.props.grocery.description}<br />
                  {`I need this: ${LabelConversion.getTimeline(this.props.grocery.timeline)}`}
                  <br />
                </p>
                <p>Created on: {Moment(this.props.grocery.createdAt).format("MMMM Do YYYY, HH:mm")}</p>
              </div>

              {this.props.grocery.status !== '3' &&

                <Button
                  node="button"
                  className="completedBtn btn-flat"
                  style={{
                    marginRight: '5px'
                  }}
                  waves="light"
                  onClick={this.onCompletedClick}
                >
                  Mark as completed
              </Button>
              }
              <Button
                node="button"
                className="deleteBtn btn-flat"
                style={{
                  marginRight: '5px'
                }}
                waves="light"
                onClick={this.onDeleteClick}
              >
                Delete request
              </Button>

            </CollectionItem>
          </div>
        </div>
      </>
    )
  }
}

export default HelpCard;
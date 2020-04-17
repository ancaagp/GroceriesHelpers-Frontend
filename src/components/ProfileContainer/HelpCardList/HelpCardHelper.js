import React from 'react';
import { Row, Col, CollectionItem, Collection, Icon, Card, CardTitle, Button } from 'react-materialize';
import image from '../../Main/images/papaya.png';
import LabelConversion from '../../Common/LabelConversion';
import UserAPI from '../../../api/UserAPI';
import Moment from 'moment';

class HelpCardHelper extends React.Component {

  state = {
    requestor: null
  }

  fetchRequestor() {
    UserAPI.getUser(this.props.grocery.requestor)
      .then((res) => {
        this.setState({
          requestor: res.data
        });
      })
      .catch((err) => {
        return err;
      })
  }

  componentDidMount() {
    this.fetchRequestor();
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.grocery.requestor && !this.state.requestor) {
      this.fetchRequestor();
  }
  return true;
}

    render() {
      return (

        <div>
          {this.state.requestor &&
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
                <p>Created on: {Moment(this.props.grocery.createdAt).format("MMMM Do YYYY, HH:mm")}</p>
                <h6>Person in need:</h6>
                <p>{this.state.requestor.firstName} {this.state.requestor.lastName}</p>
                <p>{this.state.requestor.address}</p>
                <p>{this.state.requestor.phoneNumber}</p>
                <p>{this.state.requestor.email}</p>
              </div>
            </CollectionItem>
          }
        </div>
      )
    }
  }

  export default HelpCardHelper;
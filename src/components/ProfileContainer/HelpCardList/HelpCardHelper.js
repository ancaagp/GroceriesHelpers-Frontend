import React from 'react';
import { Row, Col, CollectionItem, Collection, Icon, Card, CardTitle, Button } from 'react-materialize';
import image from '../../Main/images/papaya.png';
import image2 from '../../Main/images/micheile-henderson-3TgIneA4xjM-unsplash.jpg';
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

      const boldText = {
        fontSize: '18px'
    };

    const isMobile = window.innerWidth <= 500;

      return (
<>
{/* <div className="help-card-main container">
{this.state.requestor &&

<div className="col s12 m7">
    <div className="card horizontal">
        {!isMobile &&
            <div className="card-image">
                <img src={image} />
            </div>
        } 

        <div className="card-stacked">

            <div className="card-content">

              
                <p>{`This request is: ${LabelConversion.getStatus(this.props.grocery.status)}`}</p>
                <p>Groceries needed: {this.props.grocery.groceries}</p>
                <br/>
                <p style={boldText}>Contact information:</p>
                <span className="title">This request was created by: {this.state.requestor.firstName} {this.state.requestor.lastName}
                    {this.state.requestor.intro &&
                        <p>About: {this.state.requestor.intro}</p>
                    }

                    <br />
                    Phone number: {this.state.requestor.phoneNumber}
                </span>
                <p>
                    Delivery address: {this.props.grocery.address}
                    <br />  Additional info: {this.props.grocery.description}<br />
                    {`I need this: ${LabelConversion.getTimeline(this.props.grocery.timeline)}`}
                    <br />

                </p>
                <p>Created on: {Moment(this.props.grocery.createdAt).format("MMMM Do YYYY, HH:mm")}</p>
            </div>

        </div>
    </div>

</div>
    }
</div> */}

{/* ORRRRRRRRRRRRRRRRRRR */}

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
        </>
      )
    }
  }

  export default HelpCardHelper;
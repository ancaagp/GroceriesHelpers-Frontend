import React from 'react';
import { Row, Col, CollectionItem, Collection, Icon, Card, CardTitle, Button } from 'react-materialize';
import image from '../../Main/images/the-creative-exchange-ixS7UCRJTdM-unsplash.jpg';
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
{/* <div className="container">
{this.state.requestor &&

<div className="col s12">
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

<div className="col s12">
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

        </div>
    
        </>
      )
    }
  }

  export default HelpCardHelper;
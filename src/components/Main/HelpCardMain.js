import React from 'react';
import './Main.css';
import UserAPI from '../../api/UserAPI';
import icon from './images/account (1).png';
import image from '../Main/images/micheile-henderson-3TgIneA4xjM-unsplash.jpg';
import LabelConversion from '../Common/LabelConversion';
import Moment from 'moment';



class HelpCardMain extends React.Component {
    state = {
        user: {},
    }

    // shouldComponentUpdate () {

    // }


    fetchRequestor() {
        if (this.props.selectedGrocery && this.state.user._id !== this.props.selectedGrocery.requestor) {
            UserAPI.getUser(this.props.selectedGrocery.requestor)
            .then((res) => {
                this.setState({
                    user: res.data
                });
            })
            .catch((err) => {
                return err;
            })
        }
    }

    componentDidMount () {
        this.fetchRequestor();
    }

    componentDidUpdate () {
        this.fetchRequestor();
    }

    render() {
        return (
            <div className="help-card-main container">

<div className="col s12 m7">
    <h2 className="header">Horizontal Card</h2>
    <div className="card horizontal">
      <div className="card-image">
        <img src={image}/>
      </div>
      <div className="card-stacked">
        <div className="card-content">
          <p>I am a very simple card. I am good at containing small bits of information.</p>
        </div>
        <div className="card-action">
          <a href="#">This is a link</a>
        </div>
      </div>
    </div>
  </div>



                <ul className="collection">
                    <li className="collection-item avatar">
                        <img src={icon} alt="" className="circle" />
                        <span className="title">{this.state.user.firstName} {this.state.user.lastName}
                        <br />
                        {this.state.user.intro} 
                        <br />
                        {this.state.user.phoneNumber} 
                         </span>
                        <p>  {this.props.selectedGrocery.groceries}<br />
                        {this.props.selectedGrocery.address}
                        <br />  {this.props.selectedGrocery.description}<br />
                        {`I need this: ${LabelConversion.getTimeline(this.props.selectedGrocery.timeline)}`}
                        <br />
                        {`This request is: ${LabelConversion.getStatus(this.props.selectedGrocery.status)}`}
                        </p>
                        <p>Created on: {Moment(this.props.selectedGrocery.createdAt).format("MMMM Do YYYY, HH:mm")}</p>
                        { this.props.selectedGrocery.status  === "1" && this.props.selectedGrocery.requestor !== this.props.userId &&
                        <a onClick={this.props.onHelpSelected} className="waves-effect waves-light btn">I will help</a>
                        }
                        {this.props.selectedGrocery.status === "2" && this.props.selectedGrocery.helper === this.props.userId &&
                            <a onClick={this.props.onHelpSelected} className="waves-effect waves-light btn disabled">I promised to help</a>
                        }

                    </li>
                </ul>

            </div>
        );
    }
}

export default HelpCardMain;
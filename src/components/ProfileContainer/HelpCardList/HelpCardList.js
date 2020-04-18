import React from 'react';
import { Row, Col, CollectionItem, Collection, Icon } from 'react-materialize';
import HelpCard from './HelpCard';
import HelpCardHelper from './HelpCardHelper';
import UserAPI from '../../../api/UserAPI';

class HelpCardList extends React.Component {

  render() {
    return (


      <>
        <div className="col s12">This div is 12-columns wide on all screen sizes</div>


        <div className="col s12 m10">

          <h3>My contribution</h3>
          <Collection>
            {
              this.props.myGroceriesHelper &&
              this.props.myGroceriesHelper.map(grocery => {
                return (
                  <HelpCardHelper
                    grocery={grocery}
                    key={grocery._id}
                    user={this.props.user}
                  />
                )
              })
            }
          </Collection>

        </div>

        <div className="col s12 m10">

          <h3>My requests</h3>
          <Collection>
            {
              this.props.myGroceries &&
              this.props.myGroceries.map(grocery => {
                return (
                  <HelpCard
                    grocery={grocery}
                    key={grocery._id}
                    onCompleteSelected={this.props.onCompleteSelected}
                    handleDelete={this.props.handleDelete}
                    onDeleteSelected={this.props.onDeleteSelected}
                  />
                )
              })
            }

          </Collection>


        </div>


      </>



    )
  }
}

export default HelpCardList;
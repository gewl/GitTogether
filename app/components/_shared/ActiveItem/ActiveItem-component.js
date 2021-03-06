import React, { Component, PropTypes } from 'react';
import './ActiveItem.scss';

export default class ActiveItem extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }

  static propTypes = {

  };

  render() {
    return (
      <div className="ActiveItem">

        <div className="ActiveItem-Name">

          <div className="ActiveItem-Name-Text">
            {this.props.activeItem.name ? this.props.activeItem.name : this.props.activeItem.path}
          </div> {/* ActiveItem-Name-Text */}

        </div> {/* ActiveItem-Name */}
        {/*
        <div className="ActiveItem-Details">

          <div className="ActiveItem-Details-Content">
            {this.props.activeItem.details}
          </div> 

        </div>*/}
        <div className="ActiveItem-Functionality">

          <div
            onClick={this.props.addSelected.bind(null, this.props.activeItem.name)}
            className="ActiveItem-Functionality-Add">
            +
          </div> {/* ActiveItem-Functionality-Add */}

          <div
            onClick={this.props.removeSelected.bind(null, this.props.activeItem.name)}
            className="ActiveItem-Functionality-Remove">
          -
          </div> {/* ActiveItem-Functionality-Remove */}

        </div>{/* ActiveItem-Functionality */}

        <div className="ActiveItem-MainView">

          <div className="ActiveItem-MainView-Content">
            <table>
            {/*
                {this.displayHeader()}
                {this.displayRow()} */}
            </table> 
            {this.props.activeItem.mainView}
          </div> {/* ActiveItem-Name-MainView-Content */}

        </div>{/* ActiveItem-MainView */}

      </div>
    )
  }
}

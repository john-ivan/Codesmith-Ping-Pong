import React, { Component } from 'react';
import ContactActions from '../actions/ContactActions';
import ContactStore from '../stores/ContactStore';
import request from 'superagent/lib/client';

// const Player = require('./../../server/PlayerModel');

let changed = false;
let changedState = {};

class ContactDetailComponent extends Component {

  constructor() {
    super();
    this.state = {
      contact: {}
    }
    this.onChange = this.onChange.bind(this);
    this.won = this.won.bind(this);
    this.lose = this.lose.bind(this);
  }

  componentWillMount() {
    ContactStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    // if (changed === false)
    ContactActions.getContact(this.props.params._id)
    // else if (changed === true) { this.setState({
    //   contact: [changedState]
    // }); }
  }

  componentWillUnmount() {
      ContactStore.removeChangeListener(this.onChange);

  }

  componentWillReceiveProps(nextProps) {
    ContactActions.getContact(nextProps.params._id);
  }

  onChange() {
    this.setState({
      contact: ContactStore.getContact(this.props.params._id)
    });
  }

  won() {
    const props = this.state.contact[0]
    let winCount = props.wins + 1;
    let newState = Object.assign({}, props, {wins: winCount});
    request.post('http://localhost:3001/' + props.name).send(newState).end(this.setState({
      contact: [newState]
    }));
  }

  lose() {
    const props = this.state.contact[0]
    let loseCount = props.losses + 1;
    let newState = Object.assign({}, props, {losses: loseCount});
    request.post('http://localhost:3001/' + props.name).send(newState).end(this.setState({
        contact: [newState]
      }));
  }

  render() {
    let contact;
    if (Object.keys(this.state.contact).length != 0) {
      contact = this.state.contact[0];
    }
    return (
      <div>
        { Object.keys(this.state.contact).length != 0 &&
          <div>
            <img src={contact.image} width="150" />
            <h1>{contact.name}</h1>
            <h3>Wins: {contact.wins}</h3>
            <h3>Losses: {contact.losses}</h3>
            <input type='submit' value="Add to Wins" onClick={this.won}></input>
            <input type='submit' value="Add to Losses" onClick={this.lose}></input>
          </div>
        }
      </div>
    );
  }
}

export default ContactDetailComponent;

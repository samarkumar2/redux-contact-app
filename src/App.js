import React, { Component } from "react";
import { connect } from "react-redux";
import * as contactAction from "./actions/contactAction";
import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.handlenameChange = this.handlenameChange.bind(this);
    this.handleMobileChange = this.handleMobileChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: "",
      number: "",
      editFlag: false,
    };
  }

  handlenameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }
  handleMobileChange(e) {
    this.setState({
      number: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    let contact = {
      name: this.state.name,
      number: this.state.number,
      editFlag: false,
    };
    this.setState({
      name: "",
      number: "",
    });
    if (contact.name !== "" && contact.number !== "") {
      return this.props.createContact(contact);
    }
  }

  listView(data, index) {
    return (
      <div className="row m-2">
        <div className="col-md-6">
          <li key={index} className="list-group-item clearfix">
            {data.name}
            {"-"}
            {data.number}
          </li>
        </div>
        <div className="col-md-2">
          <button
            onClick={(e) => this.editContact(data, index)}
            className="btn btn-info"
          >
            EDIT
          </button>
        </div>

        <div className="col-md-2">
          <button
            onClick={(e) => this.deleteContact(e, index)}
            className="btn btn-danger"
          >
            Remove
          </button>
        </div>
        <div className="col-md-2">
          {this.state.editFlag && (
            <input
              type="button"
              className="btn btn-warning"
              value="UPDATE"
              onClick={(e) => this.updateHandler(data, index)}
            />
          )}
        </div>
      </div>
    );
  }

  deleteContact(e, index) {
    e.preventDefault();
    this.props.deleteContact(index);
  }
  editContact(data, id) {
    let editValue = this.props.editContact(data).contact;

    return this.setState(
      ...this.props.contacts?.map((items, index) => {
        if (data === items) {
          return {
            ...items,
            name: editValue.name,
            number: editValue.number,
            editFlag: true,
          };
        }
        return items;
      })
    );
  }

  count = 0;
  updateHandler(data, id) {
    const name = this.state.name;
    const number = this.state.number;
    this.props.updateContact({ name: name, number: number }, id);
    this.setState(
      ...this.props.contacts?.map((items, index) => {
        if (data === items) {
          return {
            ...items,
            name: "",
            number: "",
            editFlag: false,
          };
        }
        return items;
      })
    );
  }
  render() {
    return (
      <div className="container">
        <h1>Contacts</h1>
        <hr />
        <div>
          <h3>Add Contact</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-md-3">
                <input
                  type="text"
                  onChange={this.handlenameChange}
                  className="form-control"
                  value={this.state.name}
                  placeholder="Name.."
                />
              </div>
              <div className="col-md-4">
                <input
                  type="number"
                  onChange={this.handleMobileChange}
                  className="form-control"
                  value={this.state.number}
                  placeholder="Mobile.."
                />
              </div>
            </div>

            <br />
            <div className="row">
              <div className="col-sm-2">
                <input type="submit" className="btn btn-success" value="ADD" />
              </div>
            </div>
          </form>
          <hr />
          {
            <ul className="list-group">
              {this.props.contacts.map((contact, i) =>
                this.listView(contact, i)
              )}
            </ul>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    contacts: state.contacts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editContact: (contact, index) =>
      dispatch(contactAction.editContact(contact, index)),
    updateContact: (data, id) =>
      dispatch(contactAction.updateContact(data, id)),
    createContact: (contact) => dispatch(contactAction.createContact(contact)),
    deleteContact: (index) => dispatch(contactAction.deleteContact(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

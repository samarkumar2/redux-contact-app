import { connect } from "react-redux";
import * as contactAction from "../actions/contactAction";
import App from "../App";
const mapStateToProps = (state, ownProps) => {
  return {
    contacts: state.contacts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editContact: (index) => dispatch(contactAction.editContact(index)),
    createContact: (contact) => dispatch(contactAction.createContact(contact)),
    deleteContact: (index) => dispatch(contactAction.deleteContact(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

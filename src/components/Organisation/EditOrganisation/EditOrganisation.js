import React from 'react'
import Form from '../../Form/Form'

const editOrganisation = props => (
  <div>
    <h2>Edit Organisation</h2>
    <Form
      inputs={props.inputs}
      canSubmit={props.canSubmit}
      loading={props.loading}
      error={props.error}
      changed={props.changed}
      submit={props.submit}
    >
      <button className="ui button">Edit</button>
    </Form>
  </div>
);

export default editOrganisation;
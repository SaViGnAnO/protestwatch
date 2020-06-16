import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { addStream } from '../actions/streamActions';
import PropTypes from 'prop-types';

class StreamModal extends Component {
    state = {
        modal: false,
        name: '',
        url: '',
        dateAdded: Date.now,
        city: '',
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const newStream = {
            name: this.state.name,
            dateAdded: this.state.dateAdded,
            url: this.state.url,
            city: this.state.city,
        };

        // Add stream via addStream action
        this.props.addStream(newStream);

        // Close modal
        this.toggle();
    };

    render() {
        return (
            <div>
                {this.props.isAuthenticated ? (
                    <Button
                        color="dark"
                        style={{ marginBottom: '2rem' }}
                        onClick={this.toggle}>
                        Add Stream
                    </Button>
                ) : null}

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Add a New Stream
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Stream Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="stream"
                                    placeholder="Stream Name"
                                    onChange={this.onChange}></Input>
                                <Label for="name">City/State</Label>
                                <Input
                                    type="text"
                                    name="city"
                                    id="city"
                                    placeholder="MUST be in the form of City, ST"
                                    onChange={this.onChange}></Input>
                                <Label for="name">Stream URL</Label>
                                <Input
                                    type="text"
                                    name="url"
                                    id="url"
                                    onChange={this.onChange}></Input>

                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block>
                                    Add Stream
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    stream: state.stream,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addStream })(StreamModal);

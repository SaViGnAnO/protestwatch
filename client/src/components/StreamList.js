import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getStreams, deleteStream } from '../actions/streamActions';
//import streamReducer from '../reducers/streamReducer';
import PropTypes from 'prop-types';

class StreamList extends Component {
    componentDidMount() {
        this.props.getStreams();
    }

    onDeleteClick = (id) => {
        this.props.deleteStream(id);
    }

    render() {
        const { streams } = this.props.stream;
        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className="stream-list">
                        {streams.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button 
                                        className="remove-btn" 
                                        color="danger" 
                                        size="sm" 
                                        onClick={this.onDeleteClick.bind(this, _id)}>&times;</Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

StreamList.propTypes = {
    getStreams: PropTypes.func.isRequired,
    stream: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    stream: state.stream
});

export default connect(mapStateToProps, { getStreams, deleteStream })(StreamList);
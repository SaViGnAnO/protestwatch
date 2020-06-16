import React, { Component } from 'react';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button,
    CardColumns,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getStreams, deleteStream } from '../actions/streamActions';
//import streamReducer from '../reducers/streamReducer';
import PropTypes from 'prop-types';
import StreamCard from './StreamCard';

class StreamList extends Component {
    static propTypes = {
        getStreams: PropTypes.func.isRequired,
        stream: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
    };

    componentDidMount() {
        this.props.getStreams();
    }

    onDeleteClick = (id) => {
        this.props.deleteStream(id);
    };

    render() {
        const { streams } = this.props.stream;
        return (
            <CardColumns>
                {streams.map((stream) => (
                    <CSSTransition
                        key={stream._id}
                        timeout={500}
                        classNames="fade">
                        <StreamCard stream={stream} />
                    </CSSTransition>
                ))}
            </CardColumns>
            // <Container>
            //     <ListGroup>
            //         <TransitionGroup className="stream-list">
            // {streams.map(({ _id, name }) => (
            //     <CSSTransition
            //         key={_id}
            //         timeout={500}
            //         classNames="fade">
            //         <ListGroupItem>
            //             {this.props.isAuthenticated ? (
            //                 <Button
            //                     className="remove-btn"
            //                     color="danger"
            //                     size="sm"
            //                     onClick={this.onDeleteClick.bind(
            //                         this,
            //                         _id
            //                     )}>
            //                     &times;
            //                 </Button>
            //             ) : null}
            //             {name}
            //             <StreamCard />
            //         </ListGroupItem>
            //     </CSSTransition>
            // ))}
            //         </TransitionGroup>
            //     </ListGroup>
            // </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    stream: state.stream,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getStreams, deleteStream })(
    StreamList
);

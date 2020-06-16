import React, { Component } from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
} from 'reactstrap';
import { connect } from 'react-redux';
import { getStreams, deleteStream } from '../actions/streamActions';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

class StreamCard extends Component {
    static propTypes = {
        stream: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
    };

    // onDeleteClick = (id) => {
    //     this.props.deleteStream(id);
    // };

    render() {
        const stream = this.props.stream;
        const now = new Date(Date.now());
        let addedAgo = date_diff(new Date(stream.dateAdded), now);
        let dateRangeType = '';

        if (addedAgo == 1) {
            dateRangeType = 'minute';
        } else if (addedAgo < 60 && addedAgo > 1) {
            addedAgo = Math.round(addedAgo);
            dateRangeType = 'minutes';
        } else if (addedAgo > 60 && Math.round(addedAgo % 60) < 1) {
            addedAgo = Math.round(addedAgo / 60);
            dateRangeType = 'hour';
        } else if (addedAgo > 60 && addedAgo % 60 > 1) {
            addedAgo = Math.round(addedAgo / 60);
            dateRangeType = 'hours';
        }

        return (
            <div>
                <Card>
                    <CardImg
                        top
                        width="100%"
                        src="/assets/318x180.svg"
                        alt="Card image cap"
                    />
                    <CardBody>
                        <CardTitle>{stream.name}</CardTitle>
                        <CardSubtitle className="card-city">
                            {stream.city}
                        </CardSubtitle>
                        <CardText>
                            <small className="text-muted">
                                Added {addedAgo} {dateRangeType} ago
                            </small>
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

const date_diff = function (dt1, dt2) {
    let denominator = 60000;
    const value = Math.floor((dt2 - dt1) / denominator);
    return value;
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getStreams, deleteStream })(
    StreamCard
);

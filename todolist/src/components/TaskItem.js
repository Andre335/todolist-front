import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import RoundCheckBox from './RoundCheckBox';

class TaskItem extends Component {
    constructor(props) {
        super(props);
        this.handleStatus = this.handleStatus.bind(this);
        this.state = {
            status: this.props.task.done
        };
    }

    handleStatus(status) {
        this.setState({ status: status });
        this.props.handleStatus(this.props.task._id, status);
    }

    render() {
        return(
            <ListItem className="task-item">
                <Card className="task-card">
                    <CardHeader
                        title={this.props.task.title}
                        subheader={"Categoria: " + this.props.task.type}
                        avatar={
                            <RoundCheckBox done={this.state.status} handleStatus={this.handleStatus} />
                        }
                    />
                </Card>
            </ListItem>
        )
    }
}

export default TaskItem;
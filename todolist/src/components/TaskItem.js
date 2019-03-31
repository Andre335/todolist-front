import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/CheckBox';
import NotDoneIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import '../css/TaskItem.css';

class TaskItem extends Component {
    constructor(props) {
        super(props);
        this.handleStatus = this.handleStatus.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.state = {
            status: this.props.task.done
        };
    }

    handleStatus() {
        this.setState({ status: !this.state.status });
        this.props.handleStatus(this.props.task._id, !this.state.status);
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString();
    }

    render() {
        return(
            <ListItem className="task-item">
                <Card className="task-card">
                    <CardHeader
                        title={<h1> {this.props.task.title} </h1>}
                        subheader={
                            <div className="subheader">
                                {"Categoria: " + this.props.task.type} <br/>
                                {"Até: " + this.formatDate(this.props.task.period)}
                            </div>
                        }
                        
                        action={
                            <IconButton>
                              <DeleteIcon />
                            </IconButton>
                        }

                        avatar={
                            this.state.status ? <DoneIcon onClick={this.handleStatus}/> 
                                                : <NotDoneIcon onClick={this.handleStatus}/>
                        }
                    />
                </Card>
            </ListItem>
        )
    }
}

export default TaskItem;
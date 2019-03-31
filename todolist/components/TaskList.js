import React, { Component } from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import '../css/TaskList.css';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.handleStatus = this.handleStatus.bind(this);

        this.state = {
            tasks: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/task').then(res => {
            this.setState({ tasks: res.data });
        });
    }

    render() {
        return(
            <div className="task-list-container">
                <List className="TaskList">
                    {
                        this.state.tasks.map(task => <TaskItem task={task} />)
                    }
                </List>
            </div>
        );
    }
}

export default TaskList;
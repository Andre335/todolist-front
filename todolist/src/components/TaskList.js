import React, { Component } from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import TaskItem from './TaskItem';
// import '../css/TaskList.css';

class TaskList extends Component {
    constructor() {
        super();
        this.handleNewTask = this.handleNewTask.bind(this);
        this.handleStatus = this.handleStatus.bind(this);

        this.state = {
            tasks: []
        }
    }

    handleStatus(task_id, status) {
        var updatedTasks = this.state.tasks.filter((task) => { return task._id !== task_id});
        axios.put('http://localhost:3001/task/' + task_id, {done: status}).then(res => {
            this.setState({ tasks: [...updatedTasks, res.data]});
        });
    }

    handleNewTask(title, type, period) {
        const taskObj = {
            title: title,
            type: type,
            period: period,
            done: false
        }

        axios.post('http://localhost:3001/task', taskObj).then(res => {
            this.setState({ tasks: [...this.state.tasks, res.data] });
        });
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
                        this.state.tasks.map(task => <TaskItem key={task._id} task={task} handleNewTask={this.handleStatus}
                                                               handleStatus={this.handleStatus} title={task.title}/>)
                    }
                </List>
            </div>
        );
    }
}

export default TaskList;
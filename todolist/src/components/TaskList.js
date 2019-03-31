import React, { Component } from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import TaskItem from './TaskItem';
import NewTaskDialog from './NewTaskDialog';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import '../css/TaskList.css';

class TaskList extends Component {
    constructor() {
        super();
        this.handleNewTask = this.handleNewTask.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            tasks: []
        }
    }

    handleClickOpen = () => {
        this.setState({ dialogOpen: true });
    };

    handleClose = () => {
        this.setState({ dialogOpen: false });
    };

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
                <div className="task-list">
                    <List className="TaskList">
                        {
                            this.state.tasks.map(task => <TaskItem key={task._id} task={task} handleStatus={this.handleStatus} title={task.title}/>)
                        }
                    </List>
                </div>

                {this.state.dialogOpen ? <NewTaskDialog handleClose={this.handleClose} handleNewTask={this.handleNewTask}/> : ""}

                <Fab color="primary" aria-label="Add" className="fab-button">
                    <AddIcon onClick={this.handleClickOpen}/>
                </Fab>
            </div>
        );
    }
}

export default TaskList;
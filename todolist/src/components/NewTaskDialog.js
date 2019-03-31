import React, { Component } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

var options = ["Pessoal", "Professional"];

class NewTaskDialog extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleNewTask = this.handleNewTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOptChange = this.handleOptChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);

        this.state = {
            open: true,
            text: "",
            type: options[0],
            period: new Date()
        };
    }

    handleChange(e) {
        const value = e.target["value"];
        this.setState({ text: value });
    }

    handleOptChange(e) {
        const value = e.target["value"];
        this.setState({ type: value });
    }

    handleDateChange(e) {
        const value = e.target["value"];
        this.setState({ period: value });
    }

    handleNewTask(title, type, period) {
        this.props.handleNewTask(title, type, period);
    }

    handleClose() {
        this.setState({ open: false });
        this.props.handleClose();
    }

    handleOk() {
        this.setState({ open: false });
        this.handleNewTask(this.state.text, this.state.type, this.state.period);
        this.props.handleClose();
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Fill the empty info to create task"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            New Task
                        </DialogContentText>

                        <input
                            type="text"
                            placeholder="Title"
                            value={this.props.text}
                            name="Title"
                            onChange={this.handleChange}
                        /> <br/>

                        <select>
                            {options.map(type => <option handleChange={this.handleOptChange} 
                                                         value={type}>{type}</option>)}
                        </select> <br/>

                        <input
                            type="date"
                            placeholder="Period"
                            value={this.props.period}
                            name="Period"
                            onChange={this.handleDateChange}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleOk} color="primary" autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default NewTaskDialog;
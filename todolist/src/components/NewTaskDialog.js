import React, { Component } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import '../css/TaskItem.css';

var options = ["Personal", "Professional"];

class NewTaskDialog extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleNewTask = this.handleNewTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateInputs = this.validateInputs.bind(this);

        this.state = {
            open: true,
            text: "",
            type: options[0],
            period: "",
            error: ""
        };
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    handleNewTask(title, type, period) {
        this.props.handleNewTask(title, type, period);
    }

    handleClose() {
        this.setState({ open: false });
        this.props.handleClose();
    }

    validateInputs(text, type, period) {
        if (!text || text === "") return "Title";
        if (!type || type === "") return "Categorie";
        if (!period || period === "") return "Date";
        return;
    }

    handleOk() {
        var error = this.validateInputs(this.state.text, this.state.type, this.state.period);
        if (error) {    
            this.setState({ error: error });
            return;
        }

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
                        <form className="new-task-form">
                            <FormControl className="form-control">
                                <TextField
                                    id="title"
                                    label="Title"
                                    placeholder="Title"
                                    className="title"
                                    margin="normal"
                                    onChange={this.handleChange('text')}
                                    required
                                /> <br/>

                                <Select
                                    value={this.state.type}
                                    onChange={this.handleChange('type')}
                                    inputProps={{
                                        name: 'type',
                                        id: 'type',
                                    }}
                                    label="Categorie"
                                >
                                    {options.map(type => <MenuItem value={type}>{type}</MenuItem>)}
                                </Select> <br/>
                                
                                <input
                                    type="date"
                                    placeholder="Period"
                                    value={this.props.period}
                                    name="Period"
                                    onChange={this.handleChange('period')}
                                    required
                                />

                                {this.state.error ? <p className="errors"> {"Please fill out the " + this.state.error} </p> : ""}
                            </FormControl>
                        </form>
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
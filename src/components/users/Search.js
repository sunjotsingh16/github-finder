import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Search extends Component {

    state = {
        text: ""
    };

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClearButton: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired,
    }
    

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        if (this.state.text === "") {
            this.props.setAlert("Please enter some text", "light");
        }

        else {
        this.props.searchUsers(this.state.text);
        this.setState({ text: ""});
    }
}

    render() {

        const { clearUsers, showClearButton } = this.props;

        return (
            <div>
                <form className="form" onSubmit={this.onSubmit}>
                    <input type="text" name="text" placeholder="Search Users..." value={this.state.text} onChange={this.onChange} />
                    <input type="submit" value="Search" className="btn btn-dark btn-block" />
                </form>
            { showClearButton && 
            <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>
        }
            </div>
        )
    }
}

export default Search;

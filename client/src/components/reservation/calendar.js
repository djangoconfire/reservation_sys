import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';

export default class CalendarComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            controlledDate: null,
        };
    }

    handleChange = (event, date) => {
        this.setState({controlledDate: moment(date).format('yyyy-MM-dd')});
        this.props.tabChange({'tabVal' : '1' , 'selectedDate' : moment(date).format('YYYY-MM-DD')})
    };

    render() {
        return (
            <DatePicker
                hintText="Controlled Date Input"
                value={this.state.controlledDate}
                onChange={this.handleChange}
            />
        );
    }
}
import React from 'react';
import SubmitButton from './submitbutton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
registerLocale("ru", ru);

class DateRange extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            fromDate: '',
            toDate: ''
        };
        
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange   = this.handleEndDateChange.bind(this);
    }
    
    handleStartDateChange(value) {
        this.setState({fromDate: value});
    }
    
    handleEndDateChange(value) {
        this.setState({toDate: value});
    }
//                        dateFormat="dd.MM.yyyy"
    
    render() {
        return (
            <React.Fragment>    
            <div className="form-group row">
                <label htmlFor="startDate" className="col-3 col-form-label text-right">Временной диапазон:</label>
                <div className="col-3">
                    <DatePicker
                        selected={this.state.fromDate}
                        onChange={this.handleStartDateChange}
                        selectsStart
                        startDate={this.state.fromDate}
                        endDate={this.state.toDate}
                        locale="ru"
                        dateFormat="yyyy.MM.dd"
                        name="from"
                        placeholderText="Начальная дата"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        className="form-control form-control-sm"
                        autoComplete="off"
                    />
                </div>
                <div className="offset1-1 col-3">
                    <DatePicker
                        selected={this.state.toDate}
                        onChange={this.handleEndDateChange}
                        selectsEnd
                        startDate={this.state.fromDate}
                        endDate={this.state.toDate}
                        minDate={this.state.fromDate}
                        locale="ru"
                        dateFormat="yyyy.MM.dd"
                        name="to"
                        placeholderText="Конечная дата"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        className="form-control form-control-sm"
                        autoComplete="off"
                    />
                </div>
                <div className="offset1-1 col-3">
                    <SubmitButton />
                </div>
            </div>
            </React.Fragment>
        );
    }
}

export default DateRange;

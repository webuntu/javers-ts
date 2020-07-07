import * as React from 'react';
import SubmitButton from './submitbutton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
registerLocale("ru", ru);

interface IDateRangeProps {}
interface IDateRangeState {
    fromDate?: Date;
    toDate?: Date;
}

class DateRange extends React.Component<{}, IDateRangeState> {
    
    constructor(props: {}) {
        super(props);
        this.state={
            fromDate: undefined,
            toDate: undefined
        } 

        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange   = this.handleEndDateChange.bind(this);
    }
    
    handleStartDateChange(value: Date) {
        this.setState({fromDate: value});
    }
    
    handleEndDateChange(value: Date) {
        this.setState({toDate: value});
    }
    
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
                        dateFormat="dd.MM.yyyy"
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
                        dateFormat="dd.MM.yyyy"
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

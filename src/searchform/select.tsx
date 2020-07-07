import React from 'react';

class FormSelect extends React.Component<any, any> {

    render() {

        const options: JSX.Element[] = [];
        options.push(<option key="" value="">{this.props.placeholder}</option>);
        
        this.props.options.length && this.props.options.forEach((option: string,index: string) => {
            options.push(
                <option key={index} value={option}>{option}</option>
            );
        });        
        
        return (
            <React.Fragment>    
                <div className={'form-group row'}>
                    <label htmlFor={this.props.name} className={'col-3 col-form-label text-right'}>{this.props.label}:</label>
                    <div className={'col-9'}>
                        <select className={'form-control form-control-sm'} id={this.props.name} name={this.props.name}>
                            {options}
                        </select>
                    </div>
                </div>
            </React.Fragment>    
        );

    }
    
}

export default FormSelect;

import React from 'react';

class FormInput extends React.Component<{name: string; label: string; placeholder?: string;}, {}> {
    render() {
        return (
            <React.Fragment>    
            <div className="form-group row">
              <label htmlFor={this.props.name} className="col-3 col-form-label text-right">{this.props.label}:</label>
              <div className="col-9"><input type="this.props.type" className="form-control form-control-sm" name={this.props.name} id={this.props.name} placeholder={this.props.placeholder} /></div>
            </div>                
            </React.Fragment>    
        );
    }
}

export default FormInput;

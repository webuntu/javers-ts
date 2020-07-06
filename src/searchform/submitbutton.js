import React from 'react';

class SubmitButton extends React.Component {
        
    render() {
        return (
            <React.Fragment>    
                    <button className="btn btn-primary btn-sm btn-block" type="submit">Поиск</button>
            </React.Fragment>
        );
    }
}

export default SubmitButton;

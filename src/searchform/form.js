import React from 'react';
import DateRange from './daterange';
import FormInput from './input';
import FormSelect from './select';

class SearchForm extends React.Component {
       
    constructor(props) {
        super(props);
        
        this.AUTHORS_URL   = 'http://react.webuntu/index.php?request=initiators';
        this.INSTANCES_URL = 'http://react.webuntu/index.php?request=objects';
        
        this.state = {
            initiators: [],
            objects: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    initiators() {       
        fetch(this.AUTHORS_URL)
        .then(response => response.json())
        .then(result => this.setState({initiators: result}));      
    }
    
    objects() {        
        fetch(this.INSTANCES_URL)
        .then(response => response.json())
        .then(result => this.setState({objects: result}));
    }
    
    componentDidMount() {
        this.initiators();
        this.objects();
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.props.search(event);
    }

    render() {
        return (
            <React.Fragment>
                <form className="form" id="events_filter" onSubmit={this.handleSubmit} >
                    <FormSelect label="Инициатор изменений" name="author" placeholder="Выберите инициатора изменений…"
                        options={this.state.initiators}
                    />
                    <FormSelect label="Тип объекта изменений" name="controlledType" placeholder="Выберите тип объекта изменений…"
                        options={this.state.objects}
                    />
                    <FormInput label="Объект изменений"  name="instanceId" />
                    <input type="hidden" name="page" value="1" />
                    <input type="hidden" name="paging" value="1" />
                    <DateRange />
                </form>
            </React.Fragment>                    
        );
    }
}

export default SearchForm;

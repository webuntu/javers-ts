import React from 'react';
import SearchForm  from './searchform/form';
import SearchResults from './searchresults/searchresults';
import './bootstrap.min.css';
import './App.css';

class App extends React.Component { 

    constructor(props) {
        super(props);

        this.EVENTS_URL            = 'http://react.webuntu/index.php?request=events';
        this.RESULTS_FIRST_REQUEST = 100;
        this.RESULTS_PER_REQUEST   = 100;

        this.state = {
            search_conditions: null,
            search_results: [],
            search_completed: false,
            search_message: ""
        };

        this.search     = this.search.bind(this);
        this.searchMore = this.searchMore.bind(this);
    }

    search(event) {

        var fd =  new FormData(event.target);
        fd.append('size', this.RESULTS_FIRST_REQUEST);
        this.setState({ 
            search_conditions: fd, 
            search_results: [],
            search_completed: false,
            search_message: <div className="alert alert-light text-center" role="alert"> Выполняется поисковый запрос …</div>
        },
        () => this.searchFetchResults());
        
    }
    
    searchMore(conditions) {

        this.state.search_conditions.set('page', parseInt(this.state.search_conditions.get('page'))+1);
        this.state.search_conditions.set('size', this.RESULTS_PER_REQUEST);
        this.searchFetchResults();
        
    }
    
    searchFetchResults() {

        fetch(this.EVENTS_URL + '&' +  new URLSearchParams(this.state.search_conditions).toString())
        .then(response => response.json())
        .then(result => this.updateResults(result));
        
    }
    
    updateResults(result) {
        
        if(!result) { 
            this.setState({ search_completed: true });
            if(this.state.search_results.length)
                this.setState({ search_message: <div className="alert alert-light text-center" role="alert">{"1-Общий размер поисковой выборки - " + this.state.search_results.length }</div>});
            else
                this.setState({ search_message: <div className="alert alert-warning text-center" role="alert"> Поиск выполнен. Ничего не найдено.</div> });
            
        }
        else {
            if(result.length < this.RESULTS_PER_REQUEST) this.setState({ search_completed: true });
            this.setState({ 
                search_results: this.state.search_results.concat(result),
                search_message: <div className="alert alert-light text-center" role="alert">{"2-Общий размер поисковой выборки - " + this.state.search_results.concat(result).length}</div>
            });
        }
        
    }
    
    render() {

        return (
            <React.Fragment>    
                <SearchForm    search={this.search} />
                <SearchResults search={this.searchMore} results={this.state.search_results} hasMore={!this.state.search_completed} endMessage={this.state.search_message} />
            </React.Fragment>
        );

    }
    
}

export default App;


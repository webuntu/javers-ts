import React,{FormEvent} from 'react';
import SearchForm  from './searchform/form';
import SearchResults from './searchresults/searchresults';
import './bootstrap.min.css';
import './App.css';

interface IProps {
}

interface IState {
    search_conditions?: FormData
    search_results: any
    search_completed: boolean
    search_message?: JSX.Element
}

class App extends React.Component<IProps, IState> { 

    EVENTS_URL: string;
    RESULTS_FIRST_REQUEST: string;
    RESULTS_PER_REQUEST: string;

    constructor(props: IProps) {

        super(props);

        this.EVENTS_URL             = 'http://localhost:8070/suid/audit/changes';
        this.RESULTS_FIRST_REQUEST  = '100';
        this.RESULTS_PER_REQUEST    = '100';

        this.state = {
            search_results: [],
            search_completed: false
        };

        this.search     = this.search.bind(this);
        this.searchMore = this.searchMore.bind(this);
    }
    
    search(event: FormEvent) {

        var fd =  new FormData(event.target as HTMLFormElement);
        fd.append('size', this.RESULTS_FIRST_REQUEST.toString());
        this.setState({ 
            search_conditions: fd, 
            search_results: [],
            search_completed: false,
            search_message: <div className="alert alert-light text-center" role="alert"> Выполняется поисковый запрос …</div>
        },
        () => this.searchFetchResults());
        
    }
    
    searchMore(event: Event) {

        const search_conditions: FormData = this.state.search_conditions!;
        const next_page: string = (parseInt(search_conditions.get('page')! as string)+1).toString();

        search_conditions.set('page', next_page);
        search_conditions.set('size', this.RESULTS_PER_REQUEST);
        this.searchFetchResults();
        
    }
    
    searchFetchResults() {
// console.log(this.state.search_conditions as unknown as string);
// console.log(new URLSearchParams(this.state.search_conditions as unknown as string).toString());
// document.xxx = this.state.search_conditions;

        fetch(this.EVENTS_URL + '&' +  new URLSearchParams(this.state.search_conditions as unknown as string).toString())
        .then(response => response.json())
        .then(result => this.updateResults(result));
        
    }
    
    updateResults(result: any) {
        
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
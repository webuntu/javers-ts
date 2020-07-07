import * as React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

class PropertyList extends React.Component<any, any> {

    render() {
        
        const properties_list: JSX.Element[] = [];
        const properties = this.props.properties;

        for(var key in properties) {
            properties_list.push(
                    <li key={key}>{properties[key]}</li>
                    );
        };
        return (
            <ol style={{margin:0,padding:0}}>
                {properties_list}
            </ol>
        );
        
    }
    
}

class SearchResultRow extends React.Component<any, any> {

    render() {

        const result = this.props.result;
        
        return (
            <div className="row" >
                <div className="col-1">{result.changes.affectedLocalId}</div>
                <div className="col-2">{result.changes.commitMetadata.commitDate}</div>
                <div className="col-3">{result.changes.affectedGlobalId.typeName}</div>
                <div className="col-3"><PropertyList properties={result.changes.commitMetadata.properties} /></div>
                <div className="col-3">{result.changes.commitMetadata.author}</div>
            </div>
        );
        
    }
    
}

class SearchResults extends React.Component<any, any> {
    
    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions();
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }    
    updateDimensions() {
        const scrollableDiv = document.getElementById('scrollableDiv');
        if(scrollableDiv !== null) {
            // let innerHeight = window.innerHeight - scrollableDiv.offsetTop;
            // scrollableDiv.style.height = innerHeight + "px";
            scrollableDiv.style.height = (window.innerHeight - scrollableDiv.offsetTop).toString() + "px";
        }
    }
    
    render() {
        
        const results: any[] = [];

        this.props.results.forEach((result: any,index: string) => {
            results.push(
                <SearchResultRow
                    key={index} result={result}
                />
            );
        });
        return (
            <React.Fragment>        
                <div className="results-list">
                    <div key="0" className="row results-list-head">
                        <div className="col-1">#</div>
                        <div className="col-2">Дата</div>
                        <div className="col-3">Объект</div>
                        <div className="col-3">Тип операции</div>
                        <div className="col-3">Оператор</div>
                    </div>

                    <div id="scrollableDiv" className="results-" style={{  overflow: "auto" }}>
                        
                    <InfiniteScroll
                        dataLength={this.props.results.length}
                        next={this.props.search}
                        hasMore={this.props.results.length?this.props.hasMore:false}
                        loader={<div className="row">Подгружаю данные...</div>}
                        scrollableTarget="scrollableDiv"
                        endMessage={this.props.endMessage}
                        >        
                        {results}
                    </InfiniteScroll>
                    
                    </div>
                </div>
            </React.Fragment>
        );
        
    }
      
}
    
export default SearchResults;


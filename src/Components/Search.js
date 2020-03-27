import React,{Component} from 'react'
import {Link} from 'react-router-dom' 
import * as BooksAPI from '../BooksAPI'

class Search extends Component{

    state={
        SearchBooks:[],
        query:"",
    }

    updateQuery = (query) => {
        this.setState({
          query: query
        })
        BooksAPI.search(query).then((searchResults) => {
            if (!searchResults || searchResults.error){
              this.setState({
                SearchBooks : []
              })
            }else if (Array.isArray(searchResults)) {
                for (let searchResult of searchResults) {
                    for (let currentBook of this.props.currentBooks) {
                        if (searchResult.id === currentBook.id) {
                            this.setState( {  
                                SearchResults: [searchResult.shelf=currentBook.shelf] 
                            })
                        }
                    }
                }
                this.setState({
                    SearchBooks: searchResults
                })
            }
        })
    }

    render(){
        return(
            <div className="search-books">
                <div className="search-books-bar">
                <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input 
                        type="text" 
                        placeholder="Search by title or author"
                        value={this.state.query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        { this.state.SearchBooks.length !== 0 && 
                            this.state.SearchBooks.map(books => (
                                <li key={books.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${books.imageLinks === undefined ? "" : books.imageLinks.thumbnail})` }}></div>
                                            <div className="book-shelf-changer">
                                                <select value={books.shelf === undefined ? 'none' :books.shelf}  onChange={(event) => this.props.onItemSelect(books,event.target.value)}>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{books.title}</div>
                                        <div className="book-authors">{books.authors}</div>
                                    </div>
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        )
    }
}
export default Search;
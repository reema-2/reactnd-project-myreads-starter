import React,{Component} from 'react'
import PropTypes from 'prop-types'

class Read extends Component{
  static propTypes = {
    Read: PropTypes.array.isRequired,
    onItemSelect: PropTypes.func.isRequired,
  }
    render(){
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                { this.props.Read.length !== 0
                    ? this.props.Read.filter((b) => {
                        return b.shelf === "read"
                      }).map(books => (
                    <li key={books.id}>
                        <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${books.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                            <select value={books.shelf} onChange={(event) => this.props.onItemSelect(books, event.target.value)}>
                                <option value="move">Move to...</option>
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
                
                    : <div></div>
                   
                }
                </ol>
                </div>
            </div> 
        )
    }
}
export default Read;
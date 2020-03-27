import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route ,BrowserRouter} from 'react-router-dom'
import Search from './Components/Search'
import CurrentlyReading from './Components/CurrentlyReading'
import Read from './Components/Read'
import WantToRead from './Components/WantToRead'
import {Link} from 'react-router-dom' 
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books:[], 
      statbooks:[]
    };
    this.updateBooks = this.updateBooks.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
          this.setState(() => ({
            books:books
        }))
      }) 
    }
    
 updateBooks =(book, shelf) => {
  let newbooks=[]
  book.shelf =shelf
  for (let b of this.state.books) {
    if (b.id !== book.id) {
      newbooks=[...newbooks ,b]
    }
  }
  newbooks=[...newbooks ,book]
  this.setState({
    books: newbooks
  })
 BooksAPI.update(book,shelf)
}

  render() {
    return (
      <div className="app">
        <BrowserRouter>
        <Route exact path='/'  render={()=>(
           <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <CurrentlyReading 
                CurrentlyReading={this.state.books}
                onItemSelect={(book,value) => {
                  this.updateBooks(book,value)
                }}
              />
              <WantToRead 
              WantToReading={this.state.books}
              onItemSelect={(book,value) => {
                this.updateBooks(book,value)
              }}
              />
              <Read 
              Read={this.state.books}
              onItemSelect={(book,value) => {
                this.updateBooks(book,value)
              }}
              />
            </div>
            
            <div className="open-search">
                <Link to='search'>
                  <button>Add a book</button>
                </Link>
            </div>
          </div>
          )}/>

        <Route exact path='/search' render={({ history }) => (
          <Search
            currentBooks={this.state.books}
            onItemSelect={(book,value) => {
              this.updateBooks(book, value)
            }}
          />
          )}/>
        </BrowserRouter>
      </div>
    )
  }
}

export default BooksApp
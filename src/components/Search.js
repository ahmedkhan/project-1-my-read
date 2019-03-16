import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI'


class Search extends Component {
  state ={   
    searchResults: [],
   
  }
      search = (e) => {
      // console.log(e)
        const query = e.target.value;
        if (!query) {
            this.setState({searchResults: []});
            return;
        }        
        BooksAPI
            .search(query, 20)
            .then(searchResults => {
                if (!searchResults || searchResults.error) {
                    this.setState({searchResults: []});
                    return;
                }   
                

                this.setState({searchResults});
            });
    };
      
  
  
    render() {
      
      const {searchResults } = this.state;
      const showSearchPage = searchResults ? searchResults.map( book =>(             
                             <li key ={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, 
                                backgroundImage: `url(${book.imageLinks.thumbnail})`
                             }}></div>
                                <div className="book-shelf-changer">
                                  <select value={book.shelf} onChange={(e)=>this.props.changeShelf(book ,e.target.value)}>
                                    <option value="move" >Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors}</div>
                            </div>
                          </li>
                         
      )
     
            
       
      ):null
      
          
    
       return ( 
            <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={()=>this.props.showSearchPage(false)}>Close</button>
              <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author" onChange={this.search} />
              </div>
            </div>
            <div className="search-books-results" >
           
              <ol className="books-grid">
             {showSearchPage}
              </ol>
            </div>
            
          </div>
         );
    }
}
 
export default Search;
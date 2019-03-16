import React, { Component } from 'react';
import Shelf from './Shelf';


class Shelves extends Component {    
    render() { 
     // console.log(this.props.allBooks)
      const {allBooks} = this.props;      
      const currentlyReading = allBooks.filter( book => (book.shelf === 'currentlyReading'));
      const wantToRead = allBooks.filter( book => (book.shelf === 'wantToRead'));
      const read = allBooks.filter( book => (book.shelf === 'read'));
      
        // changeShelf function >>> shelf 
        return ( 
            <div className="list-books-content">
            <div>       
              <Shelf books={currentlyReading} title= "Currently Reading" changeShelf={this.props.changeShelf}/>
              <Shelf books={wantToRead} title="Want to Read" changeShelf={this.props.changeShelf}/>
              <Shelf books={read} title="Read" changeShelf={this.props.changeShelf}/>
             </div>
          </div>
         );
    }
}
 
export default Shelves;
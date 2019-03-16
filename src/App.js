import React from 'react'
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelves from './components/Shelves';
import Search from './components/Search';
import SearchButton from './components/SearchButton';
import Header from './components/Header';

class BooksApp extends React.Component {
  state = {
    
    showSearchPage: false,
    Books:[],
    query :null
    
  }

  // button Function 
  updateSearchPageState =(state)=>{
    this.setState({showSearchPage : state})
  }
  // fatch Api 
  componentDidMount(){
    BooksAPI.getAll()
    .then( (res)=> this.setState({Books:res}))
  }
  changeBookShelf =(book ,shelf)=>{
    book.shelf = shelf;
     //console.log(book.shelf);
     //console.log(shelf)
    BooksAPI.update(book, shelf).then( ()=> {
      this.setState({Books: this.state.Books.filter( (b) =>b.id !== book.id).concat( [book] )});
    });
      
  }
 

  render() {
   // console.log(this.state.showSearchPage)
    return (
      
      
      <div className="app">
        {this.state.showSearchPage ? ( 
         
        <Search showSearchPage ={this.updateSearchPageState} query={this.state.query} changeShelf={this.changeBookShelf} />
       
        ) : ( 
         
        <Route 
        exact path="/"          
          render={() => (
          <div className="list-books">        
            <Header/>
            <Shelves allBooks={this.state.Books} changeShelf={this.changeBookShelf}/>            
            <SearchButton showSearchPage ={this.updateSearchPageState}/>          
          </div>
          )}/>
        )}
      </div>
    )
  }
}

export default BooksApp

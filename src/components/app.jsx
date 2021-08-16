import React, { Component } from 'react';
import giphy from 'giphy-api';

import SearchBar from './search_bar.jsx'
import Gif from './gif.jsx'
import GifList from './gif_list.jsx'

const GIPHY_API_KEY = 'JNp8C9C6iZRwJQmwYu9QlxA7g2ZYGiwz';

class App extends Component {
    constructor(props) {
    super(props);

    this.state = {
      gifs: [],
      selectedGifId: "xT9IgDEI1iZyb2wqo8"
    };
    this.search = this.search.bind(this);
    this.selectGif = this.selectGif.bind(this);
  }

  search(query) {
    const giphEndpoint = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${query}&limit=10`
    fetch(giphEndpoint).then(response => response.json()).then((data) => {
      const gifs = data.data.map(giph => giph.id)
      this.setState({
        gifs: gifs
      })
    })
  }

  selectGif(id) {
    this.setState({
      selectedGifId: id
    });
  }

  render() {
    return (
      <div>
        <div className="left-pane">
          <SearchBar search={this.search} />
          <div className="selected-gif">
            <Gif id={this.state.selectedGifId} />
          </div>
        </div>
        <div className="right-pane">
          <GifList gifs={this.state.gifs} selectGif={this.selectGif} />
        </div>
      </div>
    );
  }
}

export default App;
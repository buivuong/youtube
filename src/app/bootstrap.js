import React, {Component} from 'react'

import createRouter from 'router5'
import listenersPlugin from 'router5/plugins/listeners'
import browserPlugin from 'router5/plugins/browser'

import Tree from 'app/tree'
import routes from 'app/routes'

const router = createRouter(routes)
.usePlugin(browserPlugin({
	useHash: true,
	base: ''
}))
.usePlugin(listenersPlugin())

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			videos: [],
			input: ''
		}
	}
	_bindSearchList(event){
		this.setState({input: event.target.value});
	}
	_bindSubmit(event){
		this._keywordSearch(this.state.input);
	}
	_keywordSearch(val){
		var self = this;
		gapi.client.setApiKey('AIzaSyBV9BpGJgZcJku3ran9JETQ2FV-PvvZ_i8');
        gapi.client.load('youtube', 'v3', function() {
            self._makeRequest(val)
        })
	}
	_makeRequest(val){
		var self = this;
		var request = gapi.client.youtube.search.list({
            q: val,
            part: 'snippet', 
            maxResults: 10
        });
        request.execute(function(response)  {                                                                                    
            self.setState({videos: response.items});
        })
	}
	_handleKeyPress(event){
		if(event.key === 'Enter'){
      		this._keywordSearch(this.state.input);
    	}
	}
	render(){
		return (
			<div>
				<div className="container">
					<center>
						<div className="row">
							<div className="form-inline">
							  <div className="form-group">
							    	<input type="text" onChange={this._bindSearchList.bind(this)}
							    		onKeyPress={this._handleKeyPress.bind(this)}/>
							  </div>
							  &nbsp;
							  <a className="btn btn-default" onClick={this._bindSubmit.bind(this)}>Search</a>
							</div>
						</div>
					</center>
				</div>
				<br/>
				  <div className="container">
				  	<div className="row">
				  		<ul className="thumbnails">
				  		{
					  		this.state.videos.map((video, key) => {
					  			return <li className="col-md-4" key={key}>
					  						<div className="thumbnail">
					  							<img src={video.snippet.thumbnails.default.url}/>
					  							<div className="caption">
	                  								<h3>{video.snippet.title}</h3>
	                  								<p align="center"><a href={`https://www.youtube.com/watch?v=${video.id}`}>View Video</a></p>
                								</div>
                							</div>
					  				</li>
					  		})
				  		}
				  		</ul>
				  	</div>
				  </div>
			</div>
		)
	}
}

import ReactDOM from 'react-dom'
const render = () => {
	ReactDOM.render(<App/>, document.getElementById('app'))
}

render()
class something {
    constructor() {
        super()
    }

    render() {
        const { value } = this.props;
        // console.log(this.props.state.poster)
        // const { poster } = res.data.search.poster
        console.log(this.props)
        console.log(this.props.state)
        console.log(this.props.state.search)
        console.log(this.props.state.search.movies)
        
        
        return (
            <div>
                <h1 align='center'>Movie Finder!</h1>
                <br></br>
                <div className = "container-fluid">
                    <div className = 'row'>
                        <div className = "input-group">
                            <input 
                                type = "text"
                                className = "form-control glyphicon glyphicon-search"
                                placeholder = "Enter Movie Title Here:"
                                value = { value }
                                onChange = {this.handleSearchInput }/>
                            <div className = "input-group-prepend">
                                <button className = "btn btn-outline-secondary" type="button" id='search-button' onClick={ this.handleClick }>Go!</button>
                            </div>
                            <br></br>
                            <div class="a class you write with flexbox in it">
                            {
                                this.props.state.search.movies.map((movies) => {
                                    <div>
                                        <div className='container-fluid'>
                                            <div className="row">
                                                <div className="card mb-4" >
                                                    <div className="col-md-8">
                                                        <img src={movies.poster} width="75%"/>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="card-body">
                                                            <h5 className="card-title"></h5>
                                                            <hr />
                                                            {/* <NavLink to={/movie/${movies.imdbID}}>
                                                            <button className='btn btn-info flex-right' type='button'>More Information</button>
                                                            onClick={() => this.handleDetails(movies.imdbID)}
                                                            </NavLink>  */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                })
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

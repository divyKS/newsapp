import React, { Component } from 'react';
import Loading from '../Loading/Loading';
import './NewsComponent.css';

export default class NewsComponent extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=653238b3e78b4317b1b6c594b152a82c';
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    }

    componentDidMount() {
        fetch(this.url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    })
                }
            )
    }


    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return (
                <div>Error : {error.message}</div>
            )
        }
        else if (!isLoaded) {
            return (
                <>
                    <h1>Today's Headlines</h1>
                    <br /><br />
                    <div><Loading /></div>
                </>
            )
        }
        else {
            let i = 0;
            return (
                <>
                    <h1>Today's Top Headlines</h1>
                    <br /><br />
                    <div className='news'>
                        {items.articles.map((article) => {
                            let returnJSX;
                            let result = "";
                            if (article.urlToImage) {
                                returnJSX = (
                                    <div className="newsContainer" key={i.toString()}>
                                        <img src={article.urlToImage} alt={article.title} />
                                        <a href={article.url} target="_blank" rel="noreferrer">
                                            <h3>{article.title}</h3>
                                            <p>{article.description}</p>
                                        </a>
                                    </div>
                                )
                            }
                            result = returnJSX;
                            i++;
                            return result
                        })
                        }
                    </div>
                </>
            )
        }
    }
}

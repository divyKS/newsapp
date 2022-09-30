import './App.css';
import Navbar from './components/Navbar/Navbar';
import NewsComponent from './components/NewsComponent/NewsComponent';
import React, { Component } from 'react'
import Weather from './components/Weather/Weather';

export default class App extends Component {
  render() {
    return (
      <>
        <Navbar title="NewsMonkey" />

        <div className="main">
          <Weather />
          <NewsComponent />
        </div>
      </>
    )
  }
}
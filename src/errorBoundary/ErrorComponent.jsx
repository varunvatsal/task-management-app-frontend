import React, { Component } from 'react'

export default class ErrorComponent extends Component {

    constructor(){
        super()
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(){
        return {
            hasError: true
        }
    }

    componentDidCatch(error, info){
        console.log(error)
        console.log(info)
    }

  render() {
    if(this.state.hasError === true){
        return (
            <h1>accessToken expired, please login if you have a account, otherwise register and then login</h1>
        )
    }else{
        return this.props.children
    }
  }
}

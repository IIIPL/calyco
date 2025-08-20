import React from "react";

export default class SimpleErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError() { 
    return { hasError: true }; 
  }
  
  componentDidCatch() {}
  
  render() { 
    return this.state.hasError ? null : this.props.children; 
  }
}

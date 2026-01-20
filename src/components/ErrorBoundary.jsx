import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);

        // Prevent bad titles from being indexed
        if (typeof document !== 'undefined') {
            document.title = 'Error - Calyco Paints';
        }
    }

    render() {
        if (this.state.hasError) {
            let errorMessage = 'An error occurred';
            try {
                if (this.state.error) {
                    errorMessage =
                        this.state.error.message || this.state.error.toString();
                }
            } catch (e) {
                errorMessage = 'Error details unavailable';
            }

            let componentStack = '';
            try {
                if (
                    this.state.errorInfo &&
                    this.state.errorInfo.componentStack
                ) {
                    componentStack =
                        this.state.errorInfo.componentStack.toString();
                }
            } catch (e) {
                componentStack = 'Component stack unavailable';
            }

            return (
                <div className="p-8 bg-red-50 text-red-900 font-mono">
                    <h1 className="text-2xl font-bold mb-4">
                        Something went wrong.
                    </h1>
                    <details className="whitespace-pre-wrap">
                        <summary>Error Details</summary>
                        <div>{errorMessage}</div>
                        {componentStack && (
                            <>
                                <br />
                                <div>{componentStack}</div>
                            </>
                        )}
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

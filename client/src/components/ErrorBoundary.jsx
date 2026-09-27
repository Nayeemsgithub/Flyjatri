import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("FlyJatri UI Error caught by Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl">
            <div className="w-12 h-12 bg-rose-500/20 text-[#E11D48] rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-xl">
              !
            </div>
            <h2 className="text-xl font-black mb-2">Notice</h2>
            <p className="text-xs text-slate-300 mb-6">
              A temporary display error occurred while loading. Click below to reload cleanly.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              className="px-6 py-2.5 bg-[#E11D48] text-white text-xs font-bold rounded-xl shadow-lg hover:bg-rose-700 transition"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

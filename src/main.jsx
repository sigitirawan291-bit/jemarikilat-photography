import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[React ErrorBoundary caught error]:', error, errorInfo);
  }

  componentDidUpdate(prevProps) {
    if (this.state.hasError && prevProps.children !== this.props.children) {
      this.setState({ hasError: false, error: null });
    }
  }

  handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.error(e);
    }
    this.setState({ hasError: false, error: null });
    window.location.href = window.location.origin + window.location.pathname;
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md bg-neutral-900 border border-amber-500/30 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="w-14 h-14 bg-amber-500 text-black rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold">
              ⚠️
            </div>
            <h1 className="font-serif text-2xl text-amber-400 font-bold">
              JEMARI KILAT Visual Arts
            </h1>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Terjadi kendala pemuatan cache pada peramban Anda. Klik tombol di bawah untuk memulihkan cache dan memuat ulang website secara bersih.
            </p>
            <div className="p-3 bg-black/60 border border-neutral-800 text-[11px] font-mono text-amber-300 text-left overflow-x-auto max-h-24 rounded-xl">
              {this.state.error?.toString() || 'Unknown Error'}
            </div>
            <button
              onClick={this.handleReset}
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-sans text-xs tracking-widest py-3.5 font-bold uppercase rounded-xl transition-all shadow-lg active:scale-95"
            >
              🔄 MUAT ULANG & PULIHKAN WEBSITE
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);

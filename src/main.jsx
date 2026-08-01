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

  handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.error(e);
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md bg-neutral-900 border border-amber-500/30 p-8 shadow-2xl space-y-6">
            <div className="w-12 h-12 bg-amber-500 text-black rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              ⚠️
            </div>
            <h1 className="font-serif text-2xl text-amber-400 font-normal">
              JEMARI KILAT Visual Arts
            </h1>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Terjadi kendala pemuatan sistem pada peramban Anda. Klik tombol di bawah untuk memulihkan cache dan memuat ulang website secara bersih.
            </p>
            <div className="p-3 bg-black/60 border border-neutral-800 text-[11px] font-mono text-neutral-400 text-left overflow-x-auto max-h-24">
              {this.state.error?.toString() || 'Unknown Error'}
            </div>
            <button
              onClick={this.handleReset}
              className="w-full bg-amber-500 text-black font-sans text-xs tracking-widest py-3 font-bold uppercase hover:bg-amber-400 transition-colors shadow-lg"
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

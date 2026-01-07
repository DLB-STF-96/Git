import { useState } from 'react'
import './App.css'
import ApplicationForm from './components/ApplicationForm'
import ApplicationList from './components/ApplicationList'
import Statistics from './components/Statistics'

function App() {
  const [activeTab, setActiveTab] = useState<'apply' | 'list' | 'stats'>('apply')
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleApplicationSubmitted = () => {
    setRefreshTrigger(prev => prev + 1)
    setActiveTab('list')
  }

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1>🏦 Credit Application Simulator</h1>
          <p className="subtitle">Demo Banking Credit System</p>
        </div>
      </header>

      <nav className="nav">
        <div className="container">
          <button
            className={`nav-button ${activeTab === 'apply' ? 'active' : ''}`}
            onClick={() => setActiveTab('apply')}
          >
            📝 Apply for Credit
          </button>
          <button
            className={`nav-button ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            📋 Applications
          </button>
          <button
            className={`nav-button ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            📊 Statistics
          </button>
        </div>
      </nav>

      <main className="main">
        <div className="container">
          {activeTab === 'apply' && (
            <ApplicationForm onSubmitted={handleApplicationSubmitted} />
          )}
          {activeTab === 'list' && (
            <ApplicationList key={refreshTrigger} />
          )}
          {activeTab === 'stats' && (
            <Statistics key={refreshTrigger} />
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© 2026 Credit Simulator - Demo Application</p>
        </div>
      </footer>
    </div>
  )
}

export default App

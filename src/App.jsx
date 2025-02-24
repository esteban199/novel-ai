import { useState } from 'react'
import './App.css'

function App() {
  const [novelText, setNovelText] = useState('')
  const [analysis, setAnalysis] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const analyzeNovel = async () => {
    if (!novelText.trim()) return
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/analyze_novel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: novelText }),
      })
      
      const data = await response.json()
      setAnalysis(data.analysis)
    } catch (error) {
      console.error('Error:', error)
      setAnalysis('Error al analizar el texto. Por favor, intente nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app-container">
      <div className="panel-container">
        <div className="left-panel">
          <textarea
            value={novelText}
            onChange={(e) => setNovelText(e.target.value)}
            placeholder="Escribe o pega tu texto aquí..."
            className="novel-input"
          />
          <button 
            onClick={analyzeNovel}
            disabled={isLoading}
            className="analyze-button"
          >
            {isLoading ? 'Analizando...' : 'Analizar Texto'}
          </button>
        </div>
        <div className="right-panel">
          <div className="analysis-output">
            {isLoading ? (
              <div className="loading">Analizando...</div>
            ) : (
              analysis || 'El análisis aparecerá aquí'
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

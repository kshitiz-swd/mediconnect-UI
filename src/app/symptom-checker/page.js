'use client'

import React, { useState } from 'react';
import axios from 'axios';
import baseUrl from '../../utils/constants';

const SymptomChecker = () => {
  const [prompt, setPrompt] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  console.log('hi')

  const generatesymptom = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setSuggestion('');

    try {
      const res = await axios.post(baseUrl+'suggest-specialist', {
        symptoms: prompt, 
      });
      console.log(res)

      setSuggestion(res.data.reply || 'No suggestion returned.');
    } catch (error) {
      console.error("Error calling API:", error);
      setSuggestion("Something went wrong while generating the symptom.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Symptom Checker</h1>
      </header>

      <main className="flex justify-center items-center py-16 px-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          <p className="text-gray-600 mb-4">
            Enter the symptoms below to get the suggestions.
          </p>

          <textarea
            className="w-full p-3 border rounded-md mb-4 text-gray-700"
            placeholder="E.g. chest pain, shortness of breath"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
          />

          <button
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
            onClick={generatesymptom}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Suggestions'}
          </button>

          {suggestion && (
            <div className="mt-8 text-gray-800 whitespace-pre-wrap">
              <strong>Suggested Specializations:</strong>
              <p>{suggestion}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SymptomChecker;

'use client'

import React, { useState } from 'react';

const SymptomChecker = () => {
  const [prompt, setPrompt] = useState('');
  const [symptom, setsymptom] = useState('');
  const [loading, setLoading] = useState(false);

const generatesymptom = async () => {
  if (!prompt) return;

  setLoading(true);
  setsymptom('');

  try {
    const res = await fetch('/api/symptom-checker', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symptom }),
    });

    const data = await res.json();
    setsymptom(data.symptom || "No symptom content returned.");
  } catch (error) {
    console.error("Error calling API:", error);
    setsymptom("Something went wrong while generating the symptom.");
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
          {/* <h2 className="text-2xl font-bold mb-2 text-gray-800"></h2> */}
          <p className="text-gray-600 mb-4">
            Enter the symptoms below to get the suggestions.
          </p>

          <textarea
            className="w-full p-3 border rounded-md mb-4 text-gray-700"
            placeholder="E.g."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
          />

          <button
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
            onClick={()=> generatesymptom()}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate symptom Post'}
          </button>

          {symptom && (
            <div className="mt-8">
              {/* <h3 className="text-xl font-semibold mb-2 text-gray-700">Generated symptom:</h3> */}
              {/* <div className="prose max-w-none whitespace-pre-wrap text-gray-800">{symptom}</div> */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SymptomChecker;
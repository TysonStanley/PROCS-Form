import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

const ConversationAssessment = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    topic: '',
    setting: '',
    partner: '',
    goal: '',
    responses: Array(10).fill(null)
  });

  const questions = [
    "engage at a level I felt good about",
    "ask questions as desired",
    "share my opinion as desired",
    "share information as desired",
    "keep up with the conversation",
    "feel heard by my partner",
    "present myself the way I wanted to",
    "connect with my partner as desired",
    "say what I wanted to say",
    "participate"
  ];

  const options = [
    { label: 'Strongly Disagree', value: 5 },
    { label: 'Disagree', value: 4 },
    { label: 'Somewhat Disagree', value: 3 },
    { label: 'Somewhat Agree', value: 2 },
    { label: 'Agree', value: 1 },
    { label: 'Strongly Agree', value: 0 }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleResponseChange = (questionIndex: number, value: number) => {
    const newResponses = [...formData.responses];
    newResponses[questionIndex] = value;
    setFormData({
      ...formData,
      responses: newResponses
    });
  };

  const calculateColumnTotals = () => {
    const columnCounts = Array(6).fill(0);
    formData.responses.forEach(response => {
      if (response !== null) {
        columnCounts[5 - response] += 1;
      }
    });
    return columnCounts;
  };

  const calculateTotalScore = () => {
    const columnTotals = calculateColumnTotals();
    return columnTotals.reduce((acc, count, index) => acc + count * (5 - index), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <Card className="max-w-4xl mx-auto bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Patient-Reported Outcome of Conversational Success (PROCS)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            {/* Header Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Topic</label>
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Setting</label>
                <input
                  type="text"
                  name="setting"
                  value={formData.setting}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Partner</label>
              <input
                type="text"
                name="partner"
                value={formData.partner}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                What was the goal of this conversation?
              </label>
              <input
                type="text"
                name="goal"
                value={formData.goal}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Assessment Questions */}
            <div className="mt-6 relative">
              <div className="max-h-[600px] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider shadow-sm">
                        Question
                      </th>
                      {options.map((option) => (
                        <th key={option.label} className="px-4 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider shadow-sm">
                          {option.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {questions.map((question, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {index + 1}. In this conversation, it was difficult for me to... <span className="font-bold">{question}</span>.
                      </td>
                      {options.map((option) => (
                        <td key={option.label} className="px-4 py-4 text-center">
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option.value}
                            checked={formData.responses[index] === option.value}
                            onChange={() => handleResponseChange(index, option.value)}
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>

            {/* Results */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Results</h3>
              <div className="grid grid-cols-6 gap-4 mb-4">
                {calculateColumnTotals().map((count, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm text-gray-500">× {5 - index}</div>
                    <div className="font-medium text-gray-900">{count}</div>
                  </div>
                ))}
              </div>
              <div className="text-right">
                <span className="text-lg font-medium text-gray-900">
                  Raw score: {calculateTotalScore()} / 50
                </span>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationAssessment;
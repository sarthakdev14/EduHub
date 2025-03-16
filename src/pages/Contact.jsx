import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChatBubbleLeftRightIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const Contact = () => {
  const [userDetails, setUserDetails] = useState({
    exams: [],
    percentiles: {},
    isDropper: null,
    homeState: '',
    category: '',
    detailsSubmitted: false
  });

  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hi! I'm your Engineering Entrance Guide. To provide you with the best guidance, please help me understand your profile better.",
      options: ["Start Profile Assessment"]
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      id: 'exams',
      text: "Which engineering entrance exams have you given? (Select all that apply)",
      options: ["JEE Main", "JEE Advanced", "BITSAT", "VITEEE", "State CETs"],
      type: 'multiple'
    },
    {
      id: 'percentiles',
      text: "What were your percentiles in these exams?",
      type: 'percentiles'
    },
    {
      id: 'isDropper',
      text: "Are you a dropper (taking a year gap)?",
      options: ["Yes", "No"],
      type: 'single'
    },
    {
      id: 'homeState',
      text: "What is your home state?",
      type: 'text'
    },
    {
      id: 'category',
      text: "What is your category?",
      options: ["General", "OBC", "SC", "ST", "EWS"],
      type: 'single'
    }
  ];

  const handleProfileAssessment = () => {
    setMessages(prev => [...prev, {
      type: 'bot',
      content: questions[0].text,
      options: questions[0].options
    }]);
  };

  const handleExamSelection = (exam) => {
    const updatedExams = userDetails.exams.includes(exam)
      ? userDetails.exams.filter(e => e !== exam)
      : [...userDetails.exams, exam];
    
    setUserDetails(prev => ({
      ...prev,
      exams: updatedExams
    }));

    if (updatedExams.length > 0) {
      setMessages(prev => [...prev, {
        type: 'user',
        content: `Selected exams: ${updatedExams.join(', ')}`
      }]);
      
      setCurrentQuestion(1);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: "Please enter your percentiles for each exam. You can enter them all at once (e.g., 'JEE Main: 95.5, BITSAT: 92') or one by one."
      }]);
    }
  };

  const handlePercentileInput = async (text) => {
    // Split the input by commas to process multiple exams
    const examPercentilePairs = text.split(',');
    let updatedPercentiles = { ...userDetails.percentiles };
    let validPercentileEntered = false;
    
    // Process each exam:percentile pair
    examPercentilePairs.forEach(pair => {
      const match = pair.match(/([^:]+):\s*(\d+\.?\d*)/);
      if (match) {
        const [_, exam, percentile] = match;
        const trimmedExam = exam.trim();
        if (userDetails.exams.includes(trimmedExam)) {
          updatedPercentiles[trimmedExam] = parseFloat(percentile);
          validPercentileEntered = true;
        }
      }
    });
    
    if (validPercentileEntered) {
      setUserDetails(prev => ({
        ...prev,
        percentiles: updatedPercentiles
      }));

      // Check if all exams have percentiles
      const allExamsHavePercentiles = userDetails.exams.every(exam => 
        Object.keys(updatedPercentiles).includes(exam)
      );

      if (allExamsHavePercentiles) {
        setCurrentQuestion(2);
        setMessages(prev => [...prev, {
          type: 'bot',
          content: questions[2].text,
          options: questions[2].options
        }]);
      } else {
        // Let user know which exams still need percentiles
        const remainingExams = userDetails.exams.filter(exam => 
          !Object.keys(updatedPercentiles).includes(exam)
        );
        setMessages(prev => [...prev, {
          type: 'bot',
          content: `Please enter percentiles for: ${remainingExams.join(', ')}`
        }]);
      }
    }
  };

  const getAIResponse = async (userProfile) => {
    try {
      const response = await axios.post('/api/chat', {
        messages: [{
          role: "system",
          content: "You are an expert counselor for engineering college admissions in India. Provide detailed, personalized advice based on the student's profile. Focus on specific college recommendations, cutoffs, and next steps."
        }, {
          role: "user",
          content: `Please analyze this student profile and suggest suitable colleges and provide advice:
            Exams taken: ${userProfile.exams.join(', ')}
            Percentiles: ${Object.entries(userProfile.percentiles).map(([exam, score]) => `${exam}: ${score}`).join(', ')}
            Dropper: ${userProfile.isDropper}
            Home State: ${userProfile.homeState}
            Category: ${userProfile.category}
            
            Please provide:
            1. List of specific colleges they can target based on their scores, including branch recommendations
            2. Detailed cutoff analysis for their category
            3. Clear next steps and timeline for admissions
            4. Additional preparation advice if needed`
        }]
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error getting AI response:', error);
      throw new Error('Failed to get AI response. Please try again later.');
    }
  };

  const handleUserInput = async (text = userInput) => {
    if (!text.trim() && !userDetails.detailsSubmitted) return;

    setMessages(prev => [...prev, { type: 'user', content: text }]);
    setUserInput('');
    setLoading(true);

    if (currentQuestion === 1) {
      await handlePercentileInput(text);
    } else if (currentQuestion === 3) {
      setUserDetails(prev => ({
        ...prev,
        homeState: text
      }));
      setCurrentQuestion(4);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: questions[4].text,
        options: questions[4].options
      }]);
    } else if (!userDetails.detailsSubmitted) {
      const response = await getAIResponse(userDetails);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: response,
        options: ["Ask another question", "Start new assessment"]
      }]);
      setUserDetails(prev => ({ ...prev, detailsSubmitted: true }));
    } else {
      const response = await getAIResponse({
        ...userDetails,
        followUpQuestion: text
      });
      setMessages(prev => [...prev, {
        type: 'bot',
        content: response,
        options: ["Ask another question", "Start new assessment"]
      }]);
    }

    setLoading(false);
  };

  const handleOptionSelect = async (option) => {
    if (option === "Start Profile Assessment") {
      handleProfileAssessment();
    } else if (option === "Start new assessment") {
      setUserDetails({
        exams: [],
        percentiles: {},
        isDropper: null,
        homeState: '',
        category: '',
        detailsSubmitted: false
      });
      setCurrentQuestion(0);
      handleProfileAssessment();
    } else if (currentQuestion === 0) {
      handleExamSelection(option);
    } else if (currentQuestion === 2) {
      setUserDetails(prev => ({
        ...prev,
        isDropper: option === "Yes"
      }));
      setCurrentQuestion(3);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: questions[3].text
      }]);
    } else if (currentQuestion === 4) {
      setMessages(prev => [...prev, {
        type: 'user',
        content: `Selected category: ${option}`
      }]);

      setUserDetails(prev => ({
        ...prev,
        category: option
      }));

      setLoading(true);
      const response = await getAIResponse({
        ...userDetails,
        category: option
      });

      setMessages(prev => [...prev, {
        type: 'bot',
        content: response,
        options: ["Ask another question", "Start new assessment"]
      }]);

      setUserDetails(prev => ({ ...prev, detailsSubmitted: true }));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6 bg-primary">
            <div className="flex items-center gap-3">
              <ChatBubbleLeftRightIcon className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white">Engineering Entrance Guide</h1>
            </div>
            <p className="text-white/80 mt-2">Get personalized college recommendations and guidance</p>
          </div>

          <div className="h-[600px] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-4 ${
                    message.type === 'user' 
                      ? 'bg-primary text-white'
                      : 'bg-gray-100'
                  }`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    {message.options && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {message.options.map((option, i) => (
                          <button
                            key={i}
                            onClick={() => handleOptionSelect(option)}
                            className={`px-4 py-2 rounded-full text-sm transition-colors ${
                              currentQuestion === 0 && userDetails.exams.includes(option)
                                ? 'bg-primary text-white'
                                : 'bg-white text-primary hover:bg-primary/5'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUserInput()}
                  placeholder={currentQuestion === 1 ? "Enter exam percentiles (e.g., JEE Main: 95.5, BITSAT: 92)" : "Type your message..."}
                  className="flex-1 p-3 border-2 rounded-lg focus:outline-none focus:border-primary"
                />
                <button
                  onClick={() => handleUserInput()}
                  className="p-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <PaperAirplaneIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
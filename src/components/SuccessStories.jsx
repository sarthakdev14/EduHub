import { FaStar, FaQuoteLeft, FaLinkedin } from 'react-icons/fa';

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      name: "Rahul Sharma",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60",
      college: "IIT Bombay",
      branch: "Computer Science",
      rank: "AIR 145",
      year: "2023",
      quote: "The structured guidance and mock tests helped me understand my strengths and weaknesses. The mentors were always available for doubt clearing.",
      tips: [
        "Focus on NCERT thoroughly",
        "Regular mock tests",
        "Time management is key"
      ]
    },
    {
      id: 2,
      name: "Priya Patel",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60",
      college: "BITS Pilani",
      branch: "Electronics",
      rank: "BITSAT 355",
      year: "2023",
      quote: "The personalized study plan and weekly assessments kept me on track. The college counseling sessions helped me make an informed decision.",
      tips: [
        "Practice previous year papers",
        "Join mock test series",
        "Balance all subjects"
      ]
    },
    {
      id: 3,
      name: "Arun Kumar",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60",
      college: "IIT Delhi",
      branch: "Mechanical",
      rank: "AIR 892",
      year: "2023",
      quote: "The expert sessions on advanced topics and problem-solving techniques were game-changers. The mentors' support was invaluable.",
      tips: [
        "Consistent daily study",
        "Focus on concepts",
        "Revise regularly"
      ]
    }
  ];

  return (
    <div className="w-full py-12 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Success Stories</h2>
          <p className="text-gray-600 text-lg">Learn from our toppers and their journey to success</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map(story => (
            <div key={story.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white">{story.name}</h3>
                  <p className="text-white/90">{story.college}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {story.rank}
                  </div>
                  <div className="text-gray-600">
                    {story.branch} | {story.year}
                  </div>
                </div>

                <div className="mb-6">
                  <FaQuoteLeft className="text-primary/20 text-4xl mb-4" />
                  <p className="text-gray-600 italic">{story.quote}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Top Tips:</h4>
                  <ul className="space-y-2">
                    {story.tips.map((tip, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600">
                        <FaStar className="text-yellow-500 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full mt-6 flex items-center justify-center gap-2 bg-primary/10 text-primary py-3 rounded-md hover:bg-primary hover:text-white transition-all font-semibold">
                  <FaLinkedin />
                  <span>Connect on LinkedIn</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
};

export default SuccessStories;
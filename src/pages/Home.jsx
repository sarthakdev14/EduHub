import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  ChartBarIcon, 
  BuildingLibraryIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <AcademicCapIcon className="h-8 w-8" />,
      title: "Expert Guidance",
      desc: "Get mentored by top rankers & professors"
    },
    {
      icon: <ChartBarIcon className="h-8 w-8" />,
      title: "Personalized Strategy",
      desc: "Custom study plans for your goals"
    },
    {
      icon: <UserGroupIcon className="h-8 w-8" />,
      title: "Live Sessions",
      desc: "Interactive webinars & doubt solving"
    },
    {
      icon: <BuildingLibraryIcon className="h-8 w-8" />,
      title: "College Insights",
      desc: "In-depth analysis of top colleges"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-pink-500/10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="heading-gradient mb-6">
            Navigate Your Engineering Dreams
          </h1>
          <p className="text-xl text-blue-600 max-w-2xl mx-auto mb-8">
            Your personalized compass for engineering entrance exams. Get expert guidance,
            crack top exams, and secure your dream college.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/mentors-webinars" className="btn-primary">
              Join Free Masterclass
            </Link>
            <Link to="/mentors-webinars" className="btn-secondary">
              Meet Our Mentors
            </Link>
          </div>
        </motion.div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/30 rounded-full filter blur-3xl animate-float" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        </div>
      </section>

      {/* Features Section */}
      <section ref={ref} className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-dark-light p-6 rounded-xl card-hover"
              >
                <div className="text-purple-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-dark-light">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-4xl font-bold gradient-text">1000+</h4>
              <p className="text-gray-400 mt-2">Expert Mentors</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold gradient-text">20,000+</h4>
              <p className="text-gray-400 mt-2">Students Guided</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold gradient-text">95%</h4>
              <p className="text-gray-400 mt-2">Success Rate</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold gradient-text">100+</h4>
              <p className="text-gray-400 mt-2">Partner Colleges</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Get in Touch</h2>
            <p className="text-gray-600 text-lg">We're here to help you succeed</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-primary/5 p-8 rounded-xl text-center">
              <PhoneIcon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600">+91 98765 43210</p>
              <p className="text-gray-600">Mon-Sat, 9AM-8PM IST</p>
            </div>

            <div className="bg-primary/5 p-8 rounded-xl text-center">
              <EnvelopeIcon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600">support@collegeraahi.com</p>
              <p className="text-gray-600">24/7 Email Support</p>
            </div>

            <div className="bg-primary/5 p-8 rounded-xl text-center">
              <ChatBubbleLeftRightIcon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Chat with AI Guide</h3>
              <p className="text-gray-600">Get instant answers</p>
              <Link to="/contact" className="text-primary hover:text-secondary mt-2 inline-block">
                Start Chat →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
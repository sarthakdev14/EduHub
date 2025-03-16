import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import MentorsComponent from '../components/Mentors';
import WebinarsComponent from '../components/Webinars';

const MentorsAndWebinars = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen pt-20">
      <section className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="heading-gradient mb-6">Expert Mentors & Free Sessions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Learn from experienced professors and join our comprehensive sessions covering all engineering entrance exams
          </p>
        </motion.div>
        <MentorsComponent />
        <div className="mt-20">
          <WebinarsComponent />
        </div>
      </section>
    </div>
  );
};

export default MentorsAndWebinars;
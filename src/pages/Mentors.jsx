import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import MentorsComponent from '../components/Mentors';

const Mentors = () => {
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
          <h1 className="heading-gradient mb-6">Our Expert Mentors</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Learn from experienced professors and successful alumni
          </p>
        </motion.div>
        <MentorsComponent />
      </section>
    </div>
  );
};

export default Mentors;
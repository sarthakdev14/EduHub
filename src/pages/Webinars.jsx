import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import WebinarsComponent from '../components/Webinars';

const Webinars = () => {
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
          <h1 className="heading-gradient mb-6">Free Expert Sessions</h1>
          <p className="text-xl text-indigo-700 font-[600] max-w-2xl mx-auto mb-12">
            Join our comprehensive sessions covering all engineering entrance exams
          </p>
        </motion.div>
        <WebinarsComponent />
      </section>
    </div>
  );
};

export default Webinars;
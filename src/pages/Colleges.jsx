import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CollegeComparison from '../components/CollegeComparison';
import SuccessStories from '../components/SuccessStories';

const Colleges = () => {
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
          <h1 className="heading-gradient mb-6">Top Engineering Colleges</h1>
          <p className="text-xl text-indigo-700 font-[600] max-w-2xl mx-auto">
            Compare colleges, explore rankings, and make informed decisions about your future
          </p>
        </motion.div>
        <CollegeComparison />
        <SuccessStories />
      </section>
    </div>
  );
};

export default Colleges;
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ExamCalendar from '../components/ExamCalendar';
import RankPredictor from '../components/RankPredictor';
import CutoffExplorer from '../components/CutoffExplorer';

const Exams = () => {
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
          <h1 className="heading-gradient mb-6">Engineering Entrance Exams</h1>
          <p className="text-xl text-indigo-700 font-[600] max-w-2xl mx-auto">
            Stay updated with exam schedules, predict your rank, and explore college cutoffs
          </p>
        </motion.div>
        <ExamCalendar />
        <RankPredictor />
        <CutoffExplorer />
      </section>
    </div>
  );
};

export default Exams;
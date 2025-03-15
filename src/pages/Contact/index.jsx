import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ContactComponent from '../../components/Contact';

const Contact = () => {
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
          <h1 className="heading-gradient mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Have questions? We're here to help you succeed
          </p>
        </motion.div>
        <ContactComponent />
      </section>
    </div>
  );
};

export default Contact;
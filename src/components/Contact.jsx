import { FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  return (
    <div name="contact" className="w-full py-20 bg-white">
      <div className="max-w-screen-xl mx-auto p-4">

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-primary/5 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-primary mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <FaPhone className="text-xl text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Call Us</h4>
                  <p className="text-gray-600">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <FaEnvelope className="text-xl text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Email Us</h4>
                  <p className="text-gray-600">support@jeeguide.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <FaWhatsapp className="text-xl text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">WhatsApp</h4>
                  <p className="text-gray-600">+91 98765 43210</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
              <h4 className="font-semibold mb-2">Office Hours</h4>
              <p className="text-gray-600">Monday - Saturday</p>
              <p className="text-gray-600">9:00 AM - 8:00 PM (IST)</p>
            </div>
          </div>

          <div>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-3 border-2 rounded-md focus:outline-none focus:border-primary"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-3 border-2 rounded-md focus:outline-none focus:border-primary"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full p-3 border-2 rounded-md focus:outline-none focus:border-primary"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  className="w-full p-3 border-2 rounded-md focus:outline-none focus:border-primary"
                  placeholder="Tell us about your requirements"
                ></textarea>
              </div>

              <button className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-md hover:opacity-90 transition-all font-semibold text-lg">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
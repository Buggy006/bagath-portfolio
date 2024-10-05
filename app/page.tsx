'use client'

import { useState, useEffect, useRef, FormEvent } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Mail, Instagram, Linkedin, Github, Menu, X } from 'lucide-react'
import Image from 'next/image'
import emailjs from 'emailjs-com';

type FormState = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
};


export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formState, setFormState] = useState<FormState>({
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  });
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({})
  const { scrollY } = useScroll()

  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.8])

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    Object.values(sectionsRef.current).forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId: string) => {
    sectionsRef.current[sectionId]?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ ...formState, isLoading: true, isError: false, isSuccess: false });

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        e.currentTarget
      );
      setFormState({
        isLoading: false,
        isSuccess: true,
        isError: false,
        errorMessage: '',
      });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Failed to send message:', error);
      setFormState({
        isLoading: false,
        isSuccess: false,
        isError: true,
        errorMessage: 'Failed to send message. Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans">
      <nav className="fixed top-0 left-0 w-full p-4 md:p-6 flex justify-between z-40 bg-black bg-opacity-80 backdrop-blur-md">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl font-bold text-white"
        >
          Buggy👽
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="hidden md:flex space-x-6"
        >
          {['home', 'about', 'interest', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`capitalize hover:text-white transition-colors ${activeSection === section ? 'text-white' : 'text-gray-500'
                }`}
            >
              {section}
            </button>
          ))}
        </motion.div>
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-16 left-0 w-full bg-black bg-opacity-90 z-30 md:hidden"
        >
          <div className="flex flex-col items-center py-4">
            {['home', 'about', 'interest', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`capitalize py-2 text-lg hover:text-white transition-colors ${activeSection === section ? 'text-white' : 'text-gray-500'
                  }`}
              >
                {section}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <section
        id="home"
        ref={(el) => (sectionsRef.current['home'] = el)}
        className="h-screen flex flex-col justify-center items-center relative bg-gradient-to-b from-black to-gray-900"
      >
        <motion.div style={{ opacity, scale }} className="text-center px-4">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-400"
          >
            Tech & Creative Alchemist
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-500"
          >
            Elevating digital landscape through art and innovation
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12"
        >
          <ChevronDown size={32} className="animate-bounce text-gray-400" />
        </motion.div>
      </section>


      <section
        id="about"
        ref={(el) => (sectionsRef.current['about'] = el)}
        className="min-h-screen py-16 md:py-20 px-4 md:px-6 flex flex-col md:flex-row items-center justify-center bg-black"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="relative w-48 h-48 md:w-64 md:h-64 mb-8 md:mb-0 md:mr-12 flex-shrink-0"
        >
          <Image
            src="/hero.png"
            alt="Your Name"
            fill
            className="rounded-full object-cover border-4 border-gray-800"
          />
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-lg"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">About Me</h2>
          <p className="text-base md:text-lg mb-4 text-gray-400">
            Welcome! I'm a dynamic Infrastructure Analyst and Creative Designer with a passion for building robust digital ecosystems and crafting visually captivating designs. With a strong background in cloud infrastructure and system management, I ensure that the digital backbone of your business is always secure, scalable, and efficient.
          </p>
          <p className="text-base md:text-lg mb-4 text-gray-400">
            As a Graphic & Web Designer, I bring innovative concepts to life through sleek, user-centric designs. Whether it's building intuitive websites or delivering impactful visual stories, my goal is to create experiences that resonate.
          </p>
          <p className="text-base md:text-lg mb-4 text-gray-400">
            I'm also an avid Photographer, capturing moments through my lens with a focus on aesthetics and storytelling.
          </p>
          <p className="text-base md:text-lg text-gray-400">
            Let's build something extraordinary together—whether it's through tech, design, or photography.
          </p>
        </motion.div>
      </section>

      <section
        id="interest"
        ref={(el) => (sectionsRef.current['interest'] = el)}
        className="min-h-screen py-16 md:py-20 px-4 md:px-6 bg-gray-900"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-white">My Interests</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {[
            {
              src: '/Photography.jpg',
              title: 'Photography',
              description: `"Capturing Moments, Crafting Stories" Professional photography that turns fleeting moments into timeless visual stories. Specializing in portraits, events, product photography, and more, each shot is a unique reflection of your narrative.`,
            },
            {
              src: '/Web Design.jpg',
              title: 'Web Design',
              description: `"Designing Digital Spaces that Inspire" – I craft beautiful, functional, and responsive websites tailored to your brand. Whether you prefer minimalism or intricate UI, my designs prioritize user experience and make a lasting impression, enhancing both aesthetics and functionality. Let's create something impactful together.`,
            },
            {
              src: '/Graphics Design.jpg',
              title: 'Graphics Design',
              description: `"Visual Designs that Speak Louder than Words"
            From logos to full branding packages, my designs elevate your identity. Crafted with precision and creativity, I ensure your visuals stand out and communicate your message effectively.`,
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center lg:items-start"
            >
              <div className="relative group overflow-hidden rounded-lg mb-4 w-full">
                <div className="w-full h-64 lg:h-72">
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={500}
                    height={500}
                    layout="responsive"
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-base sm:text-lg font-semibold">{item.title}</p>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-center lg:text-left">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        id="contact"
        ref={(el) => (sectionsRef.current['contact'] = el)}
        className="min-h-screen py-16 md:py-20 px-4 md:px-6 flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-white">Get in Touch</h2>
        <motion.form
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full max-w-md"
          onSubmit={sendEmail}
        >
          <input
            type="text"
            name="user_name"
            placeholder="Name"
            className="w-full mb-4 p-2 bg-gray-800 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
            disabled={formState.isLoading}
            required
          />
          <input
            type="email"
            name="user_email"
            placeholder="Email"
            className="w-full mb-4 p-2 bg-gray-800 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
            disabled={formState.isLoading}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={4}
            className="w-full mb-4 p-2 bg-gray-800 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
            disabled={formState.isLoading}
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white py-2 rounded hover:from-gray-600 hover:to-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-700 disabled:opacity-50"
            disabled={formState.isLoading}
          >
            {formState.isLoading ? 'Sending...' : 'Send Message'}
          </button>
          {formState.isSuccess && (
            <p className="mt-4 text-green-500">Message sent successfully!</p>
          )}
          {formState.isError && (
            <p className="mt-4 text-red-500">{formState.errorMessage}</p>
          )}
        </motion.form>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 md:mt-12 flex space-x-6"
        >
          <a href="mailto:bagath006@gmail.com" className="text-gray-400 hover:text-white transition-colors">
            <Mail size={24} />
          </a>
          <a href="https://www.instagram.com/_.buuggy._" className="text-gray-400 hover:text-white transition-colors">
            <Instagram size={24} />
          </a>
          <a href="https://www.linkedin.com/in/bagath-singh-40aba0216/" className="text-gray-400 hover:text-white transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="https://github.com/Buggy006" className="text-gray-400 hover:text-white transition-colors">
            <Github size={24} />
          </a>
        </motion.div>
      </section>

    </div>
  )
}

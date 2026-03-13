'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';

interface ContactSectionProps {
  email: string;
  github: string;
  linkedin: string;
  location: string;
}

const SocialLink = ({
  href,
  icon: Icon,
  label,
  delay,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  delay: number;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ scale: 1.05, y: -4 }}
    className="flex items-center gap-4 p-5 glass rounded-xl card-hover group"
  >
    <div className="p-3 rounded-lg bg-portfolio-primary/20 group-hover:bg-portfolio-primary/40 transition-colors">
      <Icon className="w-6 h-6 text-portfolio-highlight" />
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-white font-medium group-hover:text-portfolio-highlight transition-colors">
        {href.replace('mailto:', '').replace('https://', '').replace('http://', '')}
      </p>
    </div>
  </motion.a>
);

export function ContactSection({ email, github, linkedin, location }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Get In Touch
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <SocialLink
            href={`mailto:${email}`}
            icon={Mail}
            label="Email"
            delay={0.1}
          />
          <SocialLink
            href={github}
            icon={Github}
            label="GitHub"
            delay={0.2}
          />
          <SocialLink
            href={linkedin}
            icon={Linkedin}
            label="LinkedIn"
            delay={0.3}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 p-5 glass rounded-xl"
          >
            <div className="p-3 rounded-lg bg-portfolio-primary/20">
              <MapPin className="w-6 h-6 text-portfolio-highlight" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="text-white font-medium">{location}</p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.a
            href={`mailto:${email}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-portfolio-primary via-portfolio-highlight to-portfolio-accent text-white rounded-lg font-medium text-lg transition-all hover:shadow-glow-primary btn-glow"
          >
            <Mail className="w-5 h-5" />
            Say Hello
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

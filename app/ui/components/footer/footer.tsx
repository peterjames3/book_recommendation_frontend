"use client";

import { motion } from "motion/react";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import NewsletterForm from "./newsletter-form";
import Image from "next/image";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-background space-y-10 bg-[#030f08] px-6 py-12 md:px-20"
    >
      <div className="mx-auto grid w-full max-w-full gap-8 pb-10 md:grid-cols-4 lg:max-w-[1240px] xl:max-w-[1440px]">
        {/* Logo & Description */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-1 lg:gap-2">
              <Image
                src="/favicon-32x32.png"
                alt="TestHelpNow logo"
                height={30}
                width={30}
                priority
                className="object-contain"
              />
              <span className="font-semibold">
                <span className="text-foreground">TestHelp</span>
                <span className="text-gray-400">Now</span>.
              </span>
            </Link>
          </div>

          <p className="p-text text-gray-300">
            Your trusted partner for academic success. We help students excel in
            their exams and classes with personalized support.
          </p>
        </div>

        {/* Solutions */}
        <div>
          <h3 className="mb-4 text-xl font-semibold">Solutions</h3>
          <ul className="space-y-2 text-[1rem] text-gray-300">
            <li>
              <Link href="/exam-aid">➜ Proctored Exam support</Link>
            </li>
            <li>
              <Link href="/test-prep">➜ Test Prep </Link>
            </li>
            <li>
              <Link href="/academic/tutoring">
                ➜ One-on-One Online Tutoring
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="mb-4 text-xl font-semibold">Company</h3>
          <ul className="space-y-2 text-[1rem] text-gray-300">
            <li>
              <Link href="/faq">➜ FAQs</Link>
            </li>
            <li>
              <Link href="/how-it-works">➜ How It Works</Link>
            </li>
            <li>
              <Link href="/blog">➜ Blog</Link>
            </li>
            <li>
              <Link href="/contact">➜ Contact</Link>
            </li>
            <li>
              <Link href="/sitemap.xml">➜ Sitemap</Link>
            </li>
            <li>
              <Link href="/privacy">➜ Privacy</Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-3">
          <h3 className="mb-4 text-xl font-semibold">Support</h3>
          <div className="flex items-start gap-3 text-[1rem] text-gray-300">
            <MapPin size={20} className="mt-1" />
            <span>123 Education Ave, Learning City</span>
          </div>
          <div className="flex items-center gap-3 text-[1rem] text-gray-300">
            <Mail size={20} />
            <Link href="mailto:info@testhelpnow.com">info@testhelpnow.com</Link>
          </div>
          <div className="flex items-center gap-3 text-[1rem] text-gray-300">
            <Phone size={20} />
            <Link href="tel:5551234567">(555) 123-4567</Link>
          </div>
        </div>
      </div>
      <hr className="border-0.5 border-accent2" />

      {/* Newsletter */}
      <div className="mx-auto w-full max-w-full pt-6 pb-6 lg:max-w-[840px]">
        <NewsletterForm />
      </div>
      <hr className="border-0.5 border-accent2" />

      {/* Copyright */}
      <div className="pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Edusion. All rights reserved. <br />
        Designed & built with ❤️ by{" "}
        <span className="font-semibold text-white">KItechCreatives</span>
      </div>
    </motion.footer>
  );
}
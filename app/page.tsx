"use client";

import Image from "next/image";
import Link from "next/link";
import { Bus, Map, UserPlus, Route, Clock, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <header className="w-full border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">
            TransportPlanner
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/about">About</Link>
            <Link href="/features">Features</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <Link
            href="/auth/login"
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
            Powered by TfL API
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
            Plan your journey across London
            <span className="text-blue-600"> smarter & faster</span>
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            Get live routes, departure times, delays, and step-by-step
            navigation across buses, underground, DLR, trams and more.
          </p>

          <div className="mt-6 flex gap-4">
            <Link
              href="/auth/register"
              className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold flex items-center gap-2 hover:bg-blue-700 transition"
            >
              <UserPlus size={18} /> Create Account
            </Link>

            <Link
              href="/journey-planner"
              className="px-5 py-3 rounded-xl border font-semibold flex items-center gap-2 hover:bg-gray-100 transition"
            >
              Try Planner <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* IMAGE / ILLUSTRATION */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb"
            alt="London transport"
            className="rounded-2xl shadow-lg object-cover w-full"
          />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            Everything you need to move around London
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Map />}
              title="Live Route Planning"
              text="Find the fastest route across buses, tubes and trams."
            />
            <FeatureCard
              icon={<Clock />}
              title="Real-time updates"
              text="Get delay alerts and live arrival/departure times."
            />
            <FeatureCard
              icon={<Bus />}
              title="All transport modes"
              text="Plan trips using bus, tube, DLR, overground and more."
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-10">How it works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Create an account"
              icon={<UserPlus />}
            />
            <StepCard number="2" title="Enter your journey" icon={<Route />} />
            <StepCard
              number="3"
              title="Follow live directions"
              icon={<Map />}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to start your journey?
          </h2>
          <p className="mb-6 text-lg">
            Join thousands of users planning smarter London trips daily.
          </p>

          <Link
            href="/auth/register"
            className="px-6 py-3 bg-white text-blue-700 rounded-xl font-semibold hover:bg-gray-100"
          >
            Create your free account
          </Link>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="p-6 rounded-2xl border shadow-sm hover:shadow-md transition bg-white">
      <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  icon,
}: {
  number: string;
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="p-6 rounded-2xl border bg-white">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          {number}
        </div>
        <div className="text-blue-700">{icon}</div>
      </div>
      <p className="font-semibold">{title}</p>
    </div>
  );
}

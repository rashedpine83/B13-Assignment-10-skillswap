"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#070B1A] text-white">
      {/* Background gradients */}
      <div className="absolute left-[-100px] top-[-100px] h-[350px] w-[350px] rounded-full bg-purple-600/25 blur-[120px]" />
      <div className="absolute right-[-100px] top-[100px] h-[350px] w-[350px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-[-120px] left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-[100px]" />

      {/* Grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-28 lg:py-36">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-white/5 px-5 py-2 text-sm text-cyan-300 backdrop-blur-md">
            <Sparkles size={16} />
            Modern Freelance Micro-Task Platform
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
            Complete tasks with
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              talented freelancers
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-300">
            SkillSwap connects clients and freelancers through fast, reliable
            micro-tasks. Post work, hire talent, and pay securely in one
            seamless experience.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/post-task"
              className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 px-8 py-4 text-sm font-semibold shadow-lg shadow-purple-500/30 transition-all hover:scale-105"
            >
              Post a Task
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/browse-tasks"
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold backdrop-blur-md transition hover:bg-white/10"
            >
              Browse Tasks
            </Link>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <h3 className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent">
                2+
              </h3>
              <p className="mt-1 text-sm text-gray-400">Tasks Posted</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <h3 className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent">
                6+
              </h3>
              <p className="mt-1 text-sm text-gray-400">Users</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <h3 className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent">
                $90
              </h3>
              <p className="mt-1 text-sm text-gray-400">Total Payout</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

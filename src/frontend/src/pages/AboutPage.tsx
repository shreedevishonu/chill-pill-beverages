import { motion } from "motion/react";
import {
  useScrollAnimation,
  useStaggeredAnimation,
} from "../hooks/useScrollAnimation";

const TIMELINE = [
  {
    year: "2022",
    title: "Founded in Bangalore",
    desc: "Three friends, frustrated with sugary artificial beverages, decide India deserves honest, flavorful drinks rooted in local tradition.",
    color: "#FF6B35",
  },
  {
    year: "2023",
    title: "First Recipes Developed",
    desc: "Months of recipe testing, sourcing real ingredients from farms across Gujarat, Maharashtra, and Tamil Nadu.",
    color: "#7CB518",
  },
  {
    year: "2024",
    title: "Test Markets in 5 Cities",
    desc: "Pilot launch across Mumbai, Bengaluru, Delhi, Hyderabad, and Jaipur — sold out in the first week.",
    color: "#00B4D8",
  },
  {
    year: "2025",
    title: "Pan India Launch",
    desc: "Chill Pill goes nationwide with 6 launch flavors, full e-commerce, and delivery across every Indian state.",
    color: "#9B5DE5",
  },
];

const TEAM = [
  {
    name: "Arjun Mehta",
    initials: "AM",
    title: "Founder & CEO",
    bio: "Serial entrepreneur with 10+ years in FMCG and a passion for Indian flavors.",
    color: "#FF6B35",
  },
  {
    name: "Priya Iyer",
    initials: "PI",
    title: "Co-Founder",
    bio: "Brand strategist turned beverage enthusiast — the creative heart of Chill Pill.",
    color: "#7CB518",
  },
  {
    name: "Rahul Bose",
    initials: "RB",
    title: "Head of Product",
    bio: "Food scientist obsessed with perfecting every recipe to deliver maximum refreshment.",
    color: "#9B5DE5",
  },
];

const VALUES = [
  {
    emoji: "🌿",
    label: "Fresh",
    desc: "Made fresh, sourced locally, never stale or artificial",
    color: "#7CB518",
  },
  {
    emoji: "🍃",
    label: "Natural",
    desc: "No artificial colors, no preservatives — just real ingredients",
    color: "#00B4D8",
  },
  {
    emoji: "💰",
    label: "Affordable",
    desc: "Premium taste at prices every Indian can enjoy",
    color: "#FFD700",
  },
  {
    emoji: "🇮🇳",
    label: "Pan India",
    desc: "Rooted in India's diverse flavors, delivered everywhere",
    color: "#FF6B35",
  },
  {
    emoji: "⚡",
    label: "Energetic",
    desc: "Every sip fuels your day with natural energy and vibrancy",
    color: "#FF6B35",
  },
  {
    emoji: "🎉",
    label: "Youthful",
    desc: "A brand for the bold, spirited, fun-loving generation",
    color: "#9B5DE5",
  },
];

function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.12 });
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`fade-in-up ${isVisible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  const { ref: valuesRef, visibleItems } = useStaggeredAnimation(
    VALUES.length,
    { threshold: 0.08 },
  );
  const { ref: teamRef, visibleItems: teamVisible } = useStaggeredAnimation(
    TEAM.length,
    { threshold: 0.08 },
  );

  return (
    <div className="min-h-screen" style={{ background: "#0A0A1A" }}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="pt-28 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/12 via-transparent to-[#9B5DE5]/12" />
        {/* decorative blobs */}
        <div
          className="absolute top-16 right-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(255,107,53,0.08)" }}
        />
        <div
          className="absolute bottom-8 left-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(155,93,229,0.08)" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span
              className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6"
              style={{
                background: "rgba(255,107,53,0.15)",
                color: "#FF6B35",
                border: "1px solid rgba(255,107,53,0.3)",
              }}
            >
              Our Story
            </span>

            <h1
              className="font-display font-black text-white leading-[0.95] mb-6"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
            >
              Made in <span className="gradient-text-brand">India</span>,<br />
              For <span className="gradient-text-cool">India</span>
            </h1>

            <p className="text-white/60 text-xl max-w-2xl mx-auto leading-relaxed">
              Chill Pill started with one bold idea: bring fresh, natural,
              deeply Indian beverages to every household — from bustling metros
              to quiet towns across Bharat.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Brand Story ──────────────────────────────────── */}
      <section className="py-20" style={{ background: "#0D0D20" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <ScrollReveal>
            <span className="text-[#7CB518] text-xs font-bold tracking-[0.2em] uppercase">
              Brand Story
            </span>
            <h2 className="font-display text-4xl font-black text-white mt-2 mb-8">
              How It All Started
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-5">
              <ScrollReveal delay={0.1}>
                <p className="text-white/65 leading-relaxed text-base">
                  In 2022, three childhood friends — an engineer, a chef, and a
                  marketer — sat around a table in Bengaluru, sipping
                  overpriced, artificially flavored sodas, and asked:{" "}
                  <em className="text-white/80 not-italic">
                    "Why can't India have honest beverages that actually taste
                    like India?"
                  </em>
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-white/65 leading-relaxed text-base">
                  The idea was simple: source real fruits, spices, and herbs
                  from Indian farms. No artificial colors. No preservatives. No
                  shortcuts. Create drinks that celebrate India's incredible
                  palette of flavors — tangy tamarind, cooling jeera, zingy
                  nimbu — with a modern, energetic twist.
                </p>
              </ScrollReveal>
            </div>
            <div className="space-y-5">
              <ScrollReveal delay={0.15}>
                <p className="text-white/65 leading-relaxed text-base">
                  What followed was a year-long journey of testing, failure, and
                  delicious discoveries. Over 200 recipe iterations.
                  Collaborations with farmers from Gujarat to Tamil Nadu. Blind
                  taste tests with thousands of Indians across age groups and
                  states.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.25}>
                <p className="text-white/65 leading-relaxed text-base">
                  The result? Six launch flavors that Indians instantly loved.
                  In 2024, our test markets sold out in days. In 2025, Chill
                  Pill went Pan India — bringing fresh, affordable, joyful
                  refreshment to every corner of the country.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ─────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-[#FF6B35] text-xs font-bold tracking-[0.2em] uppercase">
              Purpose
            </span>
            <h2 className="font-display text-4xl font-black text-white mt-2">
              Why We Exist
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div
                className="glass-card rounded-3xl p-8 h-full relative overflow-hidden"
                style={{ borderLeft: "3px solid #FF6B35" }}
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl"
                  style={{ background: "rgba(255,107,53,0.08)" }}
                />
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-xl"
                  style={{ background: "rgba(255,107,53,0.15)" }}
                >
                  🎯
                </div>
                <h3 className="font-display text-2xl font-black text-white mb-3">
                  Our Mission
                </h3>
                <p className="text-white/65 leading-relaxed">
                  To refresh every Indian with honest, flavorful beverages made
                  with care — accessible, affordable, and always natural.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div
                className="glass-card rounded-3xl p-8 h-full relative overflow-hidden"
                style={{ borderLeft: "3px solid #9B5DE5" }}
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl"
                  style={{ background: "rgba(155,93,229,0.08)" }}
                />
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-xl"
                  style={{ background: "rgba(155,93,229,0.15)" }}
                >
                  🚀
                </div>
                <h3 className="font-display text-2xl font-black text-white mb-3">
                  Our Vision
                </h3>
                <p className="text-white/65 leading-relaxed">
                  To become India's most loved homegrown beverage brand — where
                  every sip proudly says{" "}
                  <em className="text-white/80 not-italic">Made in India</em>.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#0D0D20" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[#7CB518] text-xs font-bold tracking-[0.2em] uppercase">
              Journey
            </span>
            <h2 className="font-display text-4xl font-black text-white mt-2">
              From Idea to Sip
            </h2>
            <p className="text-white/50 mt-3 max-w-md mx-auto">
              Every milestone that brought Chill Pill to your doorstep.
            </p>
          </motion.div>

          {/* Desktop alternating / Mobile left-aligned */}
          <div className="relative">
            {/* center line – desktop only */}
            <div
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{
                background:
                  "linear-gradient(to bottom, #FF6B35, #7CB518, #00B4D8, #9B5DE5)",
              }}
            />
            {/* left line – mobile */}
            <div
              className="md:hidden absolute left-6 top-0 bottom-0 w-px"
              style={{
                background: "linear-gradient(to bottom, #FF6B35, #9B5DE5)",
              }}
            />

            <div className="space-y-10 md:space-y-0">
              {TIMELINE.map((item, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="relative md:mb-12"
                  >
                    {/* mobile layout */}
                    <div className="md:hidden flex gap-5 items-start pl-4">
                      <div className="relative flex-shrink-0 mt-1">
                        <div
                          className="w-5 h-5 rounded-full border-2 z-10 relative"
                          style={{
                            borderColor: item.color,
                            background: item.color,
                            boxShadow: `0 0 12px ${item.color}66`,
                          }}
                        />
                      </div>
                      <div className="glass-card rounded-2xl p-5 flex-1">
                        <span
                          className="text-xs font-black tracking-widest uppercase"
                          style={{ color: item.color }}
                        >
                          {item.year}
                        </span>
                        <h3 className="font-display font-bold text-white text-lg mt-1 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-white/50 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* desktop alternating layout */}
                    <div className="hidden md:grid md:grid-cols-2 gap-8 items-center">
                      {isEven ? (
                        <>
                          <div className="glass-card rounded-2xl p-6 text-right">
                            <span
                              className="text-xs font-black tracking-widest uppercase"
                              style={{ color: item.color }}
                            >
                              {item.year}
                            </span>
                            <h3 className="font-display font-bold text-white text-xl mt-1 mb-2">
                              {item.title}
                            </h3>
                            <p className="text-white/50 text-sm leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                          <div className="flex justify-start pl-4">
                            <div
                              className="w-6 h-6 rounded-full border-2 relative z-10"
                              style={{
                                borderColor: item.color,
                                background: item.color,
                                boxShadow: `0 0 16px ${item.color}88`,
                              }}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-end pr-4">
                            <div
                              className="w-6 h-6 rounded-full border-2 relative z-10"
                              style={{
                                borderColor: item.color,
                                background: item.color,
                                boxShadow: `0 0 16px ${item.color}88`,
                              }}
                            />
                          </div>
                          <div className="glass-card rounded-2xl p-6">
                            <span
                              className="text-xs font-black tracking-widest uppercase"
                              style={{ color: item.color }}
                            >
                              {item.year}
                            </span>
                            <h3 className="font-display font-bold text-white text-xl mt-1 mb-2">
                              {item.title}
                            </h3>
                            <p className="text-white/50 text-sm leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-[#00B4D8] text-xs font-bold tracking-[0.2em] uppercase">
              The People
            </span>
            <h2 className="font-display text-4xl font-black text-white mt-2">
              The Chill Gang
            </h2>
            <p className="text-white/50 mt-3">
              The dreamers and doers behind every bottle.
            </p>
          </motion.div>

          <div
            ref={teamRef as React.RefObject<HTMLDivElement>}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 28 }}
                animate={teamVisible[i] ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.55,
                  delay: i * 0.12,
                  ease: "easeOut",
                }}
                data-ocid={`team-card-${i}`}
              >
                <div className="glass-card rounded-2xl p-7 text-center group cursor-default transition-smooth hover:scale-[1.03]">
                  {/* avatar */}
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center text-white text-2xl font-display font-black select-none"
                    style={{
                      background: `radial-gradient(circle at 35% 35%, ${member.color}, ${member.color}55)`,
                      boxShadow: `0 0 24px ${member.color}44`,
                    }}
                  >
                    {member.initials}
                  </div>
                  <h3 className="font-display font-black text-white text-lg">
                    {member.name}
                  </h3>
                  <p
                    className="text-xs font-bold tracking-wider uppercase mt-1 mb-3"
                    style={{ color: member.color }}
                  >
                    {member.title}
                  </p>
                  <p className="text-white/45 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#0D0D20" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-[#FFD700] text-xs font-bold tracking-[0.2em] uppercase">
              Values
            </span>
            <h2 className="font-display text-4xl font-black text-white mt-2">
              What We Stand For
            </h2>
            <p className="text-white/50 mt-3 max-w-md mx-auto">
              The principles that guide every decision, every recipe, every
              bottle.
            </p>
          </motion.div>

          <div
            ref={valuesRef as React.RefObject<HTMLDivElement>}
            className="grid grid-cols-2 sm:grid-cols-3 gap-5"
          >
            {VALUES.map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={visibleItems[i] ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.45,
                  delay: i * 0.08,
                  ease: "easeOut",
                }}
                data-ocid={`value-card-${v.label.toLowerCase()}`}
              >
                <div className="glass-card rounded-2xl p-6 text-center group transition-smooth hover:scale-[1.04]">
                  <div
                    className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl"
                    style={{
                      background: `${v.color}18`,
                      border: `1px solid ${v.color}30`,
                    }}
                  >
                    {v.emoji}
                  </div>
                  <h3 className="font-display font-black text-white text-base mb-1.5">
                    {v.label}
                  </h3>
                  <p className="text-white/45 text-xs leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Made in India Banner ─────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        {/* Indian flag gradient: saffron → white → green */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #FF9933 0%, #FF9933 25%, rgba(26,26,46,0.9) 45%, rgba(26,26,46,0.9) 55%, #138808 75%, #138808 100%)",
            opacity: 0.18,
          }}
        />
        {/* dark overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(10,10,26,0.72)" }}
        />
        {/* subtle Ashoka Chakra watermark */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] leading-none pointer-events-none select-none"
          style={{ opacity: 0.03, color: "#ffffff" }}
          aria-hidden
        >
          ☸
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="text-7xl mb-6 float-animation">🇮🇳</div>

            <h2
              className="font-display font-black text-white leading-tight mb-5"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Made in India,
              <br />
              <span className="gradient-text-brand">for India.</span>
            </h2>

            <p className="text-white/60 text-lg max-w-xl mx-auto leading-relaxed mb-8">
              Every bottle celebrates the bold, natural flavors that have
              refreshed generations of Indians. We're just making them fresher,
              more accessible, and more fun than ever before.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {["Sourced in India", "Made in India", "Loved across India"].map(
                (tag, i) => (
                  <span
                    key={tag}
                    className="text-sm font-semibold px-5 py-2 rounded-full glass-card"
                    style={{
                      border: `1px solid ${["#FF9933", "#ffffff33", "#138808"][i]}`,
                      color: ["#FF9933", "#ffffff99", "#6BCB77"][i],
                    }}
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import DiamondLogo from "./DiamondLogo";
import SocialIcons from "./SocialIcons";

/* ─── Staggered text reveal ─── */
function RevealText({
  children,
  delay = 0,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  delay?: number;
  as?: React.ElementType;
}) {
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <Tag>{children}</Tag>
      </motion.div>
    </div>
  );
}

/* ─── Particle background ─── */
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(77, 200, 232, ${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.5 }}
    />
  );
}

/* ─── Radial glow ─── */
function BurstLines() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        background: `
          radial-gradient(ellipse 60% 40% at 50% 30%, rgba(77,200,232,0.04) 0%, transparent 70%),
          radial-gradient(ellipse 80% 60% at 50% 50%, rgba(2,12,20,0) 0%, rgba(2,12,20,0.8) 100%)
        `,
      }}
    />
  );
}

/* ─── Divider with lines ─── */
function Divider({ delay = 0 }: { delay?: number }) {
  return (
    <div className="flex items-center justify-center gap-4 w-full">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: "1px",
          flex: 1,
          transformOrigin: "right",
          background: "linear-gradient(to left, rgba(77,200,232,0.7), transparent)",
        }}
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: delay + 0.3 }}
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(0.45rem, 1vw, 0.58rem)",
          fontWeight: 600,
          color: "rgba(77,200,232,0.85)",
          textTransform: "uppercase",
          letterSpacing: "0.3em",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        The New Portfolio is Taking Shape
      </motion.span>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: "1px",
          flex: 1,
          transformOrigin: "left",
          background: "linear-gradient(to right, rgba(77,200,232,0.7), transparent)",
        }}
      />
    </div>
  );
}

/* ─── Main Hero ─── */
export default function HeroScene() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-3, 3]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    mouseX.set((e.clientX / window.innerWidth) - 0.5);
    mouseY.set((e.clientY / window.innerHeight) - 0.5);
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden"
      style={{ background: "#020c14" }}
      onMouseMove={handleMouseMove}
    >
      <Particles />
      <BurstLines />

      {/* ── Spacer top ── */}
      <div className="flex-1" />

      {/* ── Main content ── */}
      <motion.main
        className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto px-5 sm:px-10 lg:px-16"
        style={{ perspective: "800px" }}
      >

        {/* Logo block */}
        <motion.div
          className="flex items-center justify-center gap-2 sm:gap-4 lg:gap-6 mb-2 sm:mb-3 lg:mb-4"
          style={{ rotateX, rotateY }}
        >
          <motion.span
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
              fontSize: "clamp(2.6rem, 8vw, 7rem)",
              letterSpacing: "0.18em",
              color: "#e8f4f8",
              lineHeight: 1,
              display: "block",
            }}
          >
            GREG
          </motion.span>

          <motion.div
            style={{ marginTop: "-0.4rem", flexShrink: 0 }}
            className="scale-[0.55] sm:scale-[0.75] lg:scale-100 origin-center"
          >
            <DiamondLogo delay={0.5} />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
              fontSize: "clamp(2.6rem, 8vw, 7rem)",
              letterSpacing: "0.18em",
              color: "#e8f4f8",
              lineHeight: 1,
              display: "block",
            }}
          >
            LARA
          </motion.span>
        </motion.div>

        {/* Script subtitle */}
        <RevealText delay={0.9} as="div">
          <span
            style={{
              fontFamily: "'Pinyon Script', cursive",
              fontSize: "clamp(1.8rem, 4.5vw, 3.8rem)",
              color: "rgba(77,200,232,0.9)",
              display: "block",
              letterSpacing: "0.02em",
              lineHeight: 1.3,
            }}
          >
            Art Direction + Designer
          </span>
        </RevealText>

        {/* Gap after script → divider */}
        <div className="mt-10 sm:mt-12 lg:mt-14 w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <Divider delay={1.4} />
          </motion.div>
        </div>

        {/* Gap after divider → body */}
        <div className="mt-10 sm:mt-12 lg:mt-14 w-full flex flex-col items-center">
          {/* Body copy */}
          <motion.div
            className="flex flex-col items-center gap-5 sm:gap-6 lg:gap-7 w-full max-w-[90vw] sm:max-w-md lg:max-w-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: "clamp(0.72rem, 1.8vw, 0.85rem)",
                color: "rgba(232,244,248,0.9)",
                letterSpacing: "0.02em",
                lineHeight: 1.75,
              }}
            >
              The final touches are nearly complete—the full portfolio arrives soon.
            </p>

            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(0.68rem, 1.6vw, 0.78rem)",
                color: "rgba(232,244,248,0.55)",
                letterSpacing: "0.01em",
                lineHeight: 1.9,
              }}
            >
              I&apos;m currently available for new creative partnerships, select work-for-hire
              projects, and open to discussing long-term roles with the right team.
            </p>

            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(0.68rem, 1.6vw, 0.78rem)",
                color: "rgba(232,244,248,0.55)",
                letterSpacing: "0.01em",
                lineHeight: 1.9,
              }}
            >
              If you&apos;d like to be notified when the portfolio goes live—or would like to
              review work samples for an upcoming project—{" "}
              <motion.a
                href="mailto:hello@greglara.com"
                whileHover={{ color: "#4dc8e8", textShadow: "0 0 12px rgba(77,200,232,0.6)" }}
                style={{
                  color: "rgba(77,200,232,0.9)",
                  fontWeight: 600,
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                connect today
              </motion.a>{" "}
              to start the conversation.
            </p>
          </motion.div>

          {/* Social icons */}
          <motion.div
            className="mt-10 sm:mt-12 lg:mt-14"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <SocialIcons delay={2.2} />
          </motion.div>
        </div>
      </motion.main>

      {/* ── Spacer bottom ── */}
      <div className="flex-1" />

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.4 }}
        className="relative z-10 w-full text-center pb-5 sm:pb-7 lg:pb-8 pt-4"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(0.58rem, 1.4vw, 0.65rem)",
          fontWeight: 400,
          letterSpacing: "0.05em",
          color: "rgba(232,244,248,0.3)",
        }}
      >
        © 2026 Greg Lara. All Rights Reserved.
      </motion.footer>
    </div>
  );
}

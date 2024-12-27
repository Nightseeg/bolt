import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-950" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(600px circle at 0% 0%, rgba(61, 220, 151, 0.15) 0%, transparent 70%)',
            'radial-gradient(600px circle at 100% 100%, rgba(61, 220, 151, 0.15) 0%, transparent 70%)',
            'radial-gradient(600px circle at 100% 0%, rgba(61, 220, 151, 0.15) 0%, transparent 70%)',
            'radial-gradient(600px circle at 0% 100%, rgba(61, 220, 151, 0.15) 0%, transparent 70%)',
            'radial-gradient(600px circle at 0% 0%, rgba(61, 220, 151, 0.15) 0%, transparent 70%)',
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />

      {/* Floating particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary-400/20 rounded-full"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
            ],
            x: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
            ],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(61, 220, 151, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(61, 220, 151, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Glow effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary-400/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-primary-400/[0.03] rounded-full blur-[120px]" />
      </div>

      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-dark-900/10 backdrop-blur-[1px]" />
    </div>
  );
}
export default function Marquee() {
  const skills = [
    "HTML5", "CSS3", "JavaScript", "React.js", "Astro", "Node.js", 
    "Java", "MongoDB", "VS Code", "Figma", "GitHub", "Photoshop"
  ];

  return (
    <section id="habilidades" className="py-20 my-16 border-t border-b border-white/10 bg-acid text-black rotate-1 scale-105 transform origin-left z-20 relative">
      <div className="marquee-container font-sans font-bold text-4xl md:text-6xl uppercase tracking-tight">
        <div className="marquee-content">
          {skills.map((skill, i) => (
            <span key={i}>
              {skill}<span>✷</span>
            </span>
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {skills.map((skill, i) => (
            <span key={i}>
              {skill}<span>✷</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

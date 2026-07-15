import { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Maximize2,
  Heart,
  Compass
} from "lucide-react";
import { Project, initialProjects } from "../data/projectsData";

// @ts-ignore
import refugeeChildPortrait from "../assets/images/refugee_child_portrait_1782472576507.jpg";

interface ProjectsPageProps {
  onDonateClick: () => void;
  onJoinClick: () => void;
  onBackToHome: () => void;
  onProjectSelect?: (project: Project) => void;
  projects?: Project[];
}

export default function ProjectsPage({
  onDonateClick,
  onJoinClick,
  onBackToHome,
  onProjectSelect,
  projects = initialProjects
}: ProjectsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter items by category tab & search query
  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const matchesCategory =
        selectedCategory === "All" || proj.category === selectedCategory;
      const matchesSearch =
        proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  const categories = ["All", "Care", "Medical", "Nutrition", "Water", "Education"];

  return (
    <div className="bg-white min-h-screen text-gray-800" id="projects-page-container">
      
      {/* 1. Header Banner with Breadcrumbs */}
      <section
        className="relative bg-secondary py-42 text-white flex flex-col items-center justify-center text-center overflow-hidden"
        id="projects-hero-banner"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={refugeeChildPortrait}
            alt="Projects Banner Background"
            className="w-full h-full object-cover opacity-20 filter grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 to-secondary z-10" />
        </div>

        <div className="relative z-20 space-y-4 max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight">
            Projects
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-display font-bold text-gray-300">
            <button
              onClick={onBackToHome}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-primary font-black">»</span>
            <span className="text-white">Projects</span>
          </div>
        </div>
      </section>

      {/* 2. Advanced Filtering Controls Bar */}
      <section className="py-10 bg-gray-50 border-b border-gray-100" id="projects-filter-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2" id="projects-categories-wrapper">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full font-display font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                      : "bg-white text-secondary hover:bg-gray-100 border border-gray-200"
                  }`}
                  id={`cat-tab-${cat.toLowerCase()}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:max-w-xs" id="projects-search-wrapper">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-sans text-secondary placeholder-gray-400 bg-white shadow-sm"
                id="projects-search-input"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 3. Main Projects Custom Asymmetric Grid */}
      <section className="py-24 bg-white" id="projects-masonry-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200 max-w-xl mx-auto space-y-4">
              <Compass className="w-12 h-12 text-gray-300 mx-auto animate-pulse" />
              <h3 className="font-display font-black text-xl text-secondary">No Projects Found</h3>
              <p className="text-sm text-gray-400 font-sans">
                We couldn't find any active projects matching your current filter. Try adjusting your query or selecting another category.
              </p>
              <button
                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-full font-display font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10" id="projects-asymmetric-grid">
              {filteredProjects.map((proj) => {

                return (
                  <motion.div
                    key={proj.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.55, type: "spring", stiffness: 100 }}
                    className={`${proj.colSpan} relative rounded-[2rem] overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-500 bg-gray-100 border border-gray-100`}
                    id={`project-card-${proj.id}`}
                  >
                    {/* Inner Image Container */}
                    <div className={`${proj.aspectRatio} w-full relative overflow-hidden`}>
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Dark overlay that transitions on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

                      {/* Header Category Tag on top-left */}
                      <div className="absolute top-5 left-5 z-10">
                        <span className="px-4 py-1.5 rounded-full bg-white/95 text-secondary font-display font-black text-xs uppercase tracking-widest shadow-md">
                          {proj.category}
                        </span>
                      </div>

                      {/* Diagnostic/Expand Icon on bottom-right -> Navigates to Project Details page directly */}
                      <button
                        onClick={() => onProjectSelect?.(proj)}
                        className="absolute bottom-5 right-5 z-10 w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-secondary transition-all duration-300 shadow-md group-hover:scale-110"
                        title="View Full Details"
                        id={`btn-expand-${proj.id}`}
                      >
                        <Maximize2 className="w-5 h-5" />
                      </button>

                      {/* Layout Type A: Orange Overlay Badge (Permanent on Highlighted, Hover-revealed on others) */}
                      {proj.highlighted ? (
                        <div
                          className="absolute bottom-5 left-5 z-10 bg-primary text-white p-5 pr-8 rounded-3xl shadow-xl max-w-[85%] sm:max-w-md border border-white/10"
                          id="mockup-orange-badge-showcase"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex-1 space-y-1">
                              <h3 className="font-display font-black text-lg sm:text-xl md:text-2xl text-white tracking-tight leading-tight">
                                {proj.title}
                              </h3>
                              <p className="text-xs text-white/80 font-sans tracking-wide">
                                {proj.subtitle}
                              </p>
                            </div>
                            <button
                              onClick={() => onProjectSelect?.(proj)}
                              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-md hover:scale-105 active:scale-95 transition-transform"
                            >
                              <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        // Standard layout: Details displayed inside the image card with elegant typography
                        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col justify-end text-white z-10 pointer-events-none group-hover:pointer-events-auto">
                          <div className="space-y-3 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                            
                            {/* Title & Description preview */}
                            <div className="space-y-1">
                              <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
                                {proj.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-300 font-sans line-clamp-1 group-hover:line-clamp-2 transition-all duration-300">
                                {proj.description}
                              </p>
                            </div>

                            {/* Micro-Progress Bar */}
                            <div className="pt-2 space-y-1.5">
                              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1, delay: 0.2 }}
                                  className="h-full bg-primary rounded-full"
                                />
                              </div>
                            </div>

                            {/* View Details Text link -> Navigates to details page */}
                            <div className="pt-2">
                              <button
                                onClick={() => onProjectSelect?.(proj)}
                                className="flex items-center gap-1.5 text-primary hover:text-white font-display font-black text-xs uppercase tracking-wider transition-colors pointer-events-auto"
                              >
                                <span>Learn More</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </button>
                            </div>

                          </div>
                        </div>
                      )}

                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* 4. Immersive Statistics Ribbon section for Projects page */}
      <section className="bg-secondary py-16 text-white relative overflow-hidden" id="projects-impact-stats">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <div className="space-y-2">
              <span className="block text-4xl sm:text-5xl font-display font-black text-primary">12k+</span>
              <span className="block text-xs sm:text-sm font-sans font-medium text-gray-300 uppercase tracking-wider">Lives Empowered</span>
            </div>

            <div className="space-y-2">
              <span className="block text-4xl sm:text-5xl font-display font-black text-primary">94%</span>
              <span className="block text-xs sm:text-sm font-sans font-medium text-gray-300 uppercase tracking-wider">Project Efficiency</span>
            </div>

            <div className="space-y-2">
              <span className="block text-4xl sm:text-5xl font-display font-black text-primary">$450k+</span>
              <span className="block text-xs sm:text-sm font-sans font-medium text-gray-300 uppercase tracking-wider">Direct Funds Deployed</span>
            </div>

            <div className="space-y-2">
              <span className="block text-4xl sm:text-5xl font-display font-black text-primary">28</span>
              <span className="block text-xs sm:text-sm font-sans font-medium text-gray-300 uppercase tracking-wider">Active Regional Outposts</span>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Stand With Us CTA */}
      <section className="py-24 bg-gray-50" id="projects-cta-box">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary">
            <Heart className="w-4 h-4 fill-primary" />
            <span className="font-display font-black uppercase tracking-wider text-xs">Direct Partnerships</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-secondary leading-tight max-w-3xl mx-auto">
            Have a Specific District Or Goal In Mind?
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-sans max-w-2xl mx-auto">
            We partner with corporate sponsors, academic institutions, and regional family unions to customize aid structures. Contact our program directors directly to spawn a custom pipeline.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onDonateClick}
              className="px-8 py-3.5 rounded-full bg-primary hover:bg-[#d6471c] text-white font-display font-black text-sm uppercase tracking-wider transition-colors shadow-lg shadow-primary/20 cursor-pointer"
            >
              Fund Active Campaign
            </button>
            <button
              onClick={onJoinClick}
              className="px-8 py-3.5 rounded-full border border-secondary text-secondary hover:bg-secondary hover:text-white font-display font-black text-sm uppercase tracking-wider transition-all cursor-pointer"
            >
              Register as Volunteer
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

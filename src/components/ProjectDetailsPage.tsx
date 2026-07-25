import React, { useState } from "react";
import { Project, ProjectComment } from "../types";
import { ArrowLeft, MapPin, Calendar, Heart, MessageSquare, Send, Quote, CheckCircle2, User } from "lucide-react";
import { motion } from "motion/react";

interface ProjectDetailsPageProps {
  project: Project;
  projects?: Project[];
  onNavigateToProject?: (proj: Project) => void;
  onDonateClick: (campaign?: any) => void;
  onBackToHome?: () => void;
  onBackToProjects: () => void;
  onUpdateProjects?: (updatedProjects: Project[]) => void; // optional call to refresh in parent state
}

export default function ProjectDetailsPage({
  project,
  projects = [],
  onNavigateToProject,
  onDonateClick,
  onBackToHome,
  onBackToProjects,
  onUpdateProjects
}: ProjectDetailsPageProps) {
  const [commentName, setCommentName] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [activeTab, setActiveTab] = useState<"story" | "challenge" | "outcomes">("story");

  const progressPercent = Math.min(
    100,
    Math.round((project.raisedAmount / (project.targetAmount || 1)) * 100)
  );

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentContent.trim()) return;

    setIsSubmittingComment(true);
    try {
      const newComment: ProjectComment = {
        id: `pc-${Date.now()}`,
        name: commentName.trim(),
        avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(commentName.trim())}`,
        date: new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        content: commentContent.trim(),
      };

      const res = await fetch(`/api/projects/${project.id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: newComment }),
      });

      if (res.ok) {
        // Successfully added comment to server. Update state.
        const updatedProject = {
          ...project,
          comments: [...project.comments, newComment],
        };
        // Fetch latest projects to refresh state
        const refreshRes = await fetch("/api/projects");
        if (refreshRes.ok && onUpdateProjects) {
          const freshList = await refreshRes.json();
          onUpdateProjects(freshList);
        }
        setCommentName("");
        setCommentContent("");
      }
    } catch (err) {
      console.error("Failed to post comment:", err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Hero Banner */}
      <section
        className="relative bg-secondary py-42 text-white flex flex-col items-center justify-center text-center overflow-hidden"
        id="project-details-hero"
      >
        {/* Banner background photo with dark overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={project.image}
            alt="Project Details Banner Background"
            className="w-full h-full object-cover opacity-20 filter grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111e38] via-[#10352c] to-[#0e4d2d] z-10" />
        </div>

        <div className="relative z-20 space-y-4 max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight">
            {project.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-display font-bold text-gray-300">
            <button
              onClick={onBackToHome}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-primary font-black">»</span>
            <button
              onClick={onBackToProjects}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Projects
            </button>
            <span className="text-primary font-black">»</span>
            <span className="text-white">{project.category}</span>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Back button */}
        <button
          onClick={onBackToProjects}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-emerald-700 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Campaigns
        </button>

        {/* Project header metadata */}
        <div className="mb-10 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
          <p className="text-lg text-primary font-semibold mb-6">{project.subtitle}</p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-t border-gray-100 pt-6">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              <span>By <strong className="text-gray-800 font-semibold">{project.author}</strong></span>
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>{project.location}</span>
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>{project.date}</span>
            </span>
          </div>
        </div>

        {/* Layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main content column */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Project Image */}
            <div className="rounded-3xl overflow-hidden aspect-[16/10] bg-gray-100 shadow-sm border border-gray-100">
              <img
                src={project.image || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200"}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quick Description Quote */}
            <div className="bg-white p-6 rounded-2xl border-l-4 border-primary shadow-sm flex gap-4">
              <Quote className="w-8 h-8 text-primary shrink-0 opacity-40" />
              <div>
                <p className="text-gray-700 font-medium italic text-base">
                  {project.quote || project.description}
                </p>
              </div>
            </div>

            {/* Detailed sections via tabs */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex border-b border-gray-100 bg-gray-50/50">
                {(["story", "challenge", "outcomes"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-center font-bold text-sm border-b-2 transition-all capitalize ${
                      activeTab === tab
                        ? "border-primary text-primary bg-white"
                        : "border-transparent text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-8">
                {activeTab === "story" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-extrabold text-gray-950">Project Overview & Mission</h3>
                    <p className="text-gray-600 leading-relaxed text-base">{project.description}</p>
                    
                    {project.content && project.content.length > 0 ? (
                      <div className="mt-8 space-y-6">
                        {project.content.map((sec, idx) => (
                          <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <h4 className="text-lg font-bold text-gray-900 mb-2">{sec.title}</h4>
                            <p className="text-gray-600 leading-relaxed text-sm">{sec.paragraph}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 italic text-sm">No additional content blocks defined.</p>
                    )}
                  </div>
                )}

                {activeTab === "challenge" && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-extrabold text-gray-950">The Obstacles and Solutions</h3>
                    <p className="text-gray-600 leading-relaxed text-base">
                      {project.challengeSolution ||
                        "Our humanitarian team closely interfaces with local coordinates to bypass resource constraints, supply line halts, and difficult geographic terrains safely."}
                    </p>
                  </div>
                )}

                {activeTab === "outcomes" && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-extrabold text-gray-950">Direct Outcomes & Results</h3>
                    <p className="text-gray-600 leading-relaxed text-base">
                      {project.finalResult ||
                        "Through clean logistics and direct community feedback loops, every dollar funded achieves transparent, high-impact results for rural families."}
                    </p>
                    <div className="flex items-center gap-3 bg-emerald-50 text-emerald-900 p-4 rounded-xl mt-4 border border-emerald-100">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span className="text-sm font-medium">All progress and metrics are fully audited by local volunteers.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Comment Section */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-extrabold text-gray-950 mb-6 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-gray-400" />
                Comments ({project.comments.length})
              </h3>

              {/* Comment Form */}
              <form onSubmit={handlePostComment} className="mb-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h4 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">Leave a Comment</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      rows={4}
                      placeholder="Share your encouraging feedback or support..."
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                      required
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmittingComment}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/10 hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {isSubmittingComment ? "Posting..." : "Post Comment"}
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </form>

              {/* Comments List */}
              {project.comments.length === 0 ? (
                <p className="text-gray-400 text-center py-6 italic">No comments yet. Be the first to show your support!</p>
              ) : (
                <div className="space-y-6">
                  {project.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                      <img
                        src={comment.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(comment.name)}`}
                        alt={comment.name}
                        className="w-11 h-11 rounded-xl bg-gray-100 border border-gray-200 shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-gray-900 text-sm">{comment.name}</span>
                          <span className="text-xs text-gray-400">{comment.date}</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Side panel widget column */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* Donation stats box */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-6">
              <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">Campaign Status</span>
              <div className="text-4xl font-black text-gray-950 mb-1">
                ${project.raisedAmount.toLocaleString()}
              </div>
              <p className="text-sm text-gray-500 mb-6">
                raised of <strong className="text-gray-800 font-semibold">${project.targetAmount.toLocaleString()}</strong> goal
              </p>

              {/* Progress bar */}
              <div className="mb-6">
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs font-bold text-gray-500">
                  <span>{progressPercent}% Funded</span>
                  <span>Goal: ${project.targetAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Donate Button */}
              <button
                onClick={() => onDonateClick({ id: project.id, title: project.title })}
                className="w-full py-4 bg-primary/95 hover:bg-primary text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/20 hover:-translate-y-0.5 transition-all mb-4 text-center block"
              >
                Donate Now
              </button>

              <div className="text-center">
                <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5">
                  Together we can save lives and restore futures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

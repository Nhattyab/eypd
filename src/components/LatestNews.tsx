import { BlogPost } from "../types";
import { BookOpen, User, Tag, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface LatestNewsProps {
  posts: BlogPost[];
  onPostClick: (post: BlogPost) => void;
}

export default function LatestNews({ posts, onPostClick }: LatestNewsProps) {
  return (
    <section className="py-10 bg-white" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Grid */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 bg-accent/15 text-primary border border-primary/20 text-xs font-display font-bold uppercase px-3 py-1 rounded-full">
              <BookOpen className="w-3.5 h-3.5" />
              <span>News & Stories</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-secondary leading-tight" id="blog-section-title">
              Read Our Latest News & Global Updates
            </h2>
            <p className="text-sm text-text-muted font-sans max-w-xl">
              We provide periodic, transparent journals covering on-the-ground volunteer tasks, clean sanitation launches, and impact reports.
            </p>
          </div>

          <button className="flex items-center gap-2 text-primary hover:text-secondary font-display font-bold text-sm transition-colors border-b-2 border-primary hover:border-secondary pb-1 self-start md:self-end">
            <span>View All News</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="blog-posts-grid">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="bg-surface-main rounded-3xl overflow-hidden border border-border-main hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
              id={`blog-card-${post.id}`}
            >
              {/* Media Block */}
              <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-display font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                  {post.date}
                </span>
              </div>

              {/* Text Info Block */}
              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-3">
                  {/* Metadata line */}
                  <div className="flex items-center gap-4 text-xs text-text-muted font-display font-semibold">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-primary" />
                      By {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-accent" />
                      {post.category}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-base sm:text-lg text-secondary group-hover:text-primary transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Read More button */}
                <button
                  onClick={() => onPostClick(post)}
                  className="inline-flex items-center gap-1.5 text-primary hover:text-secondary font-display font-extrabold text-xs group/btn transition-colors cursor-pointer self-start"
                  id={`blog-readmore-${post.id}`}
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

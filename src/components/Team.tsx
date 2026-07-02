import { TeamMember } from "../types";
import { Users, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface TeamProps {
  team: TeamMember[];
  onJoinClick: () => void;
}

export default function Team({ team, onJoinClick }: TeamProps) {
  return (
    <section className="py-24 bg-white" id="team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Grid */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 text-xs font-display font-bold uppercase px-3 py-1 rounded-full">
              <Users className="w-3.5 h-3.5" />
              <span>Our Dedicated Team</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-secondary leading-tight" id="team-section-title">
              Passionate Advocates Dedicated to You & the Cause
            </h2>
          </div>

          <button
            onClick={onJoinClick}
            className="flex items-center gap-2 bg-primary hover:bg-secondary text-white font-display font-bold text-sm px-6 py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-secondary/10 self-start md:self-end"
            id="team-join-btn"
          >
            <span>Join Our Team</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Team Grid (4 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" id="team-members-grid">
          {team.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="bg-surface-main rounded-3xl p-5 border border-border-main hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center group"
              id={`team-member-${member.id}`}
            >
              {/* Photo Wrapper */}
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-md mb-5 bg-secondary shrink-0">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Social links drawer overlay */}
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2.5">
                  {member.socialLinks?.facebook && (
                    <a
                      href={member.socialLinks.facebook}
                      className="text-white hover:scale-125 transition-transform p-1"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-4 h-4 fill-white" />
                    </a>
                  )}
                  {member.socialLinks?.twitter && (
                    <a
                      href={member.socialLinks.twitter}
                      className="text-white hover:scale-125 transition-transform p-1"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-4 h-4 fill-white" />
                    </a>
                  )}
                  {member.socialLinks?.linkedin && (
                    <a
                      href={member.socialLinks.linkedin}
                      className="text-white hover:scale-125 transition-transform p-1"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4 fill-white" />
                    </a>
                  )}
                  {member.socialLinks?.instagram && (
                    <a
                      href={member.socialLinks.instagram}
                      className="text-white hover:scale-125 transition-transform p-1"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Text Info */}
              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-base text-secondary group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-display font-semibold text-text-muted">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

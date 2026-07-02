import { Event } from "../types";
import { Calendar, MapPin, ArrowRight, Bell } from "lucide-react";
import { motion } from "motion/react";

interface EventScheduleProps {
  events: Event[];
  onRegisterClick: (event: Event) => void;
}

export default function EventSchedule({ events, onRegisterClick }: EventScheduleProps) {
  return (
    <section className="py-14 bg-white" id="event">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 bg-accent/15 text-primary border border-primary/20 text-xs font-display font-bold uppercase px-3 py-1 rounded-full">
              <Calendar className="w-3.5 h-3.5" />
              <span>Upcoming Events</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-secondary leading-tight" id="events-section-title">
              Events Held by EYPD
            </h2>
          </div>

          <button className="flex items-center gap-2 text-primary hover:text-secondary font-display font-bold text-sm transition-colors border-b-2 border-primary hover:border-secondary pb-1 self-start md:self-end">
            <span>Explore All Events</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="events-grid-layout">
          {events.map((evt, idx) => (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="bg-surface-main rounded-3xl overflow-hidden border border-border-main hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row h-full group"
              id={`event-card-${evt.id}`}
            >
              {/* Event Image & Floating Date */}
              <div className="relative w-full sm:w-48 aspect-video sm:aspect-square shrink-0 bg-secondary">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                {/* Float Date Box */}
                <div className="absolute top-4 left-4 bg-primary text-white p-2.5 rounded-2xl shadow-lg flex flex-col items-center justify-center min-w-[55px] border border-white/10">
                  <span className="font-display font-black text-lg leading-none">{evt.date}</span>
                  <span className="font-display font-bold text-[10px] uppercase tracking-wider mt-1">{evt.month}</span>
                </div>
              </div>

              {/* Event Text Info */}
              <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-3">
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-secondary group-hover:text-primary transition-colors leading-snug line-clamp-2">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                    {evt.description}
                  </p>

                  {/* Venue detail */}
                  <div className="flex items-start gap-1.5 text-xs text-text-muted pt-1">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="leading-snug">{evt.venue}</span>
                  </div>
                </div>

                {/* Event Registration action */}
                <div className="flex items-center justify-between pt-2 border-t border-border-main">
                  <button
                    className="flex items-center gap-2 bg-primary hover:bg-secondary text-white font-display font-bold text-xs py-2.5 px-4 rounded-xl transition-all duration-200 cursor-pointer shadow-md hover:shadow-secondary/10"
                    id={`event-action-btn-${evt.id}`}
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>Get Event Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

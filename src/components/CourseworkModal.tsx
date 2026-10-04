import { useEffect } from 'react';
import { X, BookOpen, CheckCircle, Wrench } from 'lucide-react';
import type { CourseDetail } from '../data/courseworkDetails';
import { playBlip } from '../utils/sound';
import './CourseworkModal.css';

interface CourseworkModalProps {
  course: CourseDetail | null;
  onClose: () => void;
}

export const CourseworkModal = ({ course, onClose }: CourseworkModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (course) {
      playBlip(1500);
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [course, onClose]);

  if (!course) return null;

  return (
    <div className="coursework-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="coursework-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="coursework-modal__header">
          <div className="coursework-modal__title-group">
            {course.code && <span className="coursework-modal__code">{course.code}</span>}
            <h3 className="coursework-modal__title">{course.title}</h3>
          </div>
          <button className="coursework-modal__close-btn" onClick={onClose} aria-label="Close details">
            <X size={16} />
          </button>
        </div>

        {/* Focus description */}
        <div className="coursework-modal__focus">
          <BookOpen size={16} className="coursework-modal__focus-icon" />
          <p>{course.focus}</p>
        </div>

        {/* Highlights */}
        <div className="coursework-modal__section">
          <h4 className="coursework-modal__section-heading">Core Topics &amp; Implementations</h4>
          <ul className="coursework-modal__highlights">
            {course.highlights.map((h, i) => (
              <li key={i} className="coursework-modal__highlight-item">
                <CheckCircle size={14} className="coursework-modal__check-icon" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tools & Stack */}
        {course.tools && course.tools.length > 0 && (
          <div className="coursework-modal__section">
            <h4 className="coursework-modal__section-heading">
              <Wrench size={13} style={{ display: 'inline', marginRight: '6px', color: 'var(--accent)' }} />
              Technologies &amp; Environments
            </h4>
            <div className="coursework-modal__tools">
              {course.tools.map((t) => (
                <span key={t} className="coursework-modal__tool-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';

export interface Annotation {
  id: string;
  elementId: string;
  text: string;
  position: { x: number; y: number };
  timestamp: number;
}

export interface WebsiteAnnotationToolProps {
  onAnnotationAdd?: (annotation: Annotation) => void;
  onAnnotationRemove?: (annotationId: string) => void;
  annotations?: Annotation[];
  className?: string;
}

export const WebsiteAnnotationTool: React.FC<WebsiteAnnotationToolProps> = ({
  onAnnotationAdd,
  onAnnotationRemove,
  annotations = [],
  className = '',
}) => {
  const [isAnnotationMode, setIsAnnotationMode] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [showAnnotationForm, setShowAnnotationForm] = useState(false);
  const [annotationText, setAnnotationText] = useState('');
  const [annotationPosition, setAnnotationPosition] = useState({ x: 0, y: 0 });
  const [selectedElementId, setSelectedElementId] = useState<string>('');
  
  const annotationFormRef = useRef<HTMLDivElement>(null);

  // Handle mouse movement for highlighting elements
  useEffect(() => {
    if (!isAnnotationMode) {
      setHoveredElement(null);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target !== hoveredElement) {
        // Remove previous highlight
        if (hoveredElement) {
          hoveredElement.style.outline = '';
          hoveredElement.style.outlineOffset = '';
        }
        
        // Add highlight to new element
        if (target.tagName !== 'BODY' && target.tagName !== 'HTML') {
          target.style.outline = '2px solid #007AFF';
          target.style.outlineOffset = '2px';
          setHoveredElement(target);
        }
      }
    };

    const handleMouseLeave = () => {
      if (hoveredElement) {
        hoveredElement.style.outline = '';
        hoveredElement.style.outlineOffset = '';
        setHoveredElement(null);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (hoveredElement) {
        hoveredElement.style.outline = '';
        hoveredElement.style.outlineOffset = '';
      }
    };
  }, [isAnnotationMode, hoveredElement]);

  // Handle clicks to create annotations
  useEffect(() => {
    if (!isAnnotationMode) return;

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      const target = e.target as HTMLElement;
      if (target && target.tagName !== 'BODY' && target.tagName !== 'HTML') {
        setSelectedElementId(target.id || `element-${Date.now()}`);
        setAnnotationPosition({ x: e.clientX, y: e.clientY });
        setShowAnnotationForm(true);
        setAnnotationText('');
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isAnnotationMode]);

  // Handle form submission
  const handleSubmitAnnotation = () => {
    if (annotationText.trim()) {
      const newAnnotation: Annotation = {
        id: `annotation-${Date.now()}`,
        elementId: selectedElementId,
        text: annotationText.trim(),
        position: annotationPosition,
        timestamp: Date.now(),
      };

      onAnnotationAdd?.(newAnnotation);
      setShowAnnotationForm(false);
      setAnnotationText('');
      setSelectedElementId('');
    }
  };

  // Handle form close
  const handleCloseForm = () => {
    setShowAnnotationForm(false);
    setAnnotationText('');
    setSelectedElementId('');
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseForm();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Cleanup highlights when annotation mode is turned off
  useEffect(() => {
    if (!isAnnotationMode) {
      if (hoveredElement) {
        hoveredElement.style.outline = '';
        hoveredElement.style.outlineOffset = '';
        setHoveredElement(null);
      }
      setShowAnnotationForm(false);
    }
  }, [isAnnotationMode, hoveredElement]);

  return (
    <>
      {/* Annotation Toggle Button */}
      <div 
        className={`website-annotation-toggle ${className}`}
        data-testid="annotation-toggle"
        data-referenceid="annotation-toggle"
      >
        <button
          onClick={() => setIsAnnotationMode(!isAnnotationMode)}
          className={`toggle-button ${isAnnotationMode ? 'active' : ''}`}
          data-testid="toggle-button"
          data-referenceid="toggle-button"
        >
          <div className="toggle-icon">
            {isAnnotationMode ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            )}
          </div>
          <span>Annotate</span>
        </button>
      </div>

      {/* Annotation Form */}
      {showAnnotationForm && (
        <div 
          ref={annotationFormRef}
          className="annotation-form"
          style={{
            position: 'fixed',
            left: annotationPosition.x,
            top: annotationPosition.y,
            zIndex: 10000,
          }}
          data-testid="annotation-form"
          data-referenceid="annotation-form"
        >
          <div className="annotation-form-header">
            <span>Add Annotation</span>
            <button 
              onClick={handleCloseForm}
              className="close-button"
              data-testid="close-annotation-form"
              data-referenceid="close-annotation-form"
            >
              ×
            </button>
          </div>
          <textarea
            value={annotationText}
            onChange={(e) => setAnnotationText(e.target.value)}
            placeholder="Enter your annotation..."
            className="annotation-textarea"
            data-testid="annotation-textarea"
            data-referenceid="annotation-textarea"
            autoFocus
          />
          <div className="annotation-form-actions">
            <button 
              onClick={handleCloseForm}
              className="cancel-button"
              data-testid="cancel-annotation"
              data-referenceid="cancel-annotation"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmitAnnotation}
              className="save-button"
              disabled={!annotationText.trim()}
              data-testid="save-annotation"
              data-referenceid="save-annotation"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Display Existing Annotations */}
      {isAnnotationMode && annotations.map((annotation) => (
        <div
          key={annotation.id}
          className="annotation-display"
          style={{
            position: 'fixed',
            left: annotation.position.x,
            top: annotation.position.y,
            zIndex: 9999,
          }}
          data-testid={`annotation-${annotation.id}`}
          data-referenceid={`annotation-${annotation.id}`}
        >
          <div className="annotation-content">
            <div className="annotation-text">{annotation.text}</div>
            <button
              onClick={() => onAnnotationRemove?.(annotation.id)}
              className="remove-annotation"
              data-testid={`remove-annotation-${annotation.id}`}
              data-referenceid={`remove-annotation-${annotation.id}`}
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default WebsiteAnnotationTool;

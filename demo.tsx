import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { WebsiteAnnotationTool, Annotation } from './src';

function DemoApp() {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  const handleAnnotationAdd = (annotation: Annotation) => {
    console.log('New annotation added:', annotation);
    setAnnotations(prev => [...prev, annotation]);
  };

  const handleAnnotationRemove = (annotationId: string) => {
    console.log('Annotation removed:', annotationId);
    setAnnotations(prev => prev.filter(ann => ann.id !== annotationId));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Website Annotation Tool Demo</h1>
      <p>This is a demo of the website annotation tool. Click the "Annotate" button in the bottom-left corner to start adding annotations to this page.</p>
      
      <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Sample Content Section</h2>
        <p>You can annotate any element on this page. Try hovering over different elements when annotation mode is active.</p>
        <button style={{ padding: '10px 20px', margin: '10px 5px' }}>Sample Button 1</button>
        <button style={{ padding: '10px 20px', margin: '10px 5px' }}>Sample Button 2</button>
      </div>

      <div style={{ margin: '20px 0', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Another Section</h3>
        <p>This section has a different background color. You can annotate any part of it.</p>
        <ul>
          <li>List item 1</li>
          <li>List item 2</li>
          <li>List item 3</li>
        </ul>
      </div>

      <div style={{ margin: '20px 0' }}>
        <h4>Current Annotations: {annotations.length}</h4>
        {annotations.length > 0 && (
          <div style={{ fontSize: '12px', color: '#666' }}>
            {annotations.map(ann => (
              <div key={ann.id} style={{ margin: '5px 0', padding: '5px', backgroundColor: '#fff', border: '1px solid #ddd' }}>
                <strong>Element:</strong> {ann.elementId} | <strong>Text:</strong> {ann.text}
              </div>
            ))}
          </div>
        )}
      </div>

      <WebsiteAnnotationTool
        annotations={annotations}
        onAnnotationAdd={handleAnnotationAdd}
        onAnnotationRemove={handleAnnotationRemove}
      />
    </div>
  );
}

ReactDOM.render(<DemoApp />, document.getElementById('root'));

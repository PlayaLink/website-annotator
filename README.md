# Website Annotation Tool

A React component for adding annotations to web pages, similar to Figma's annotation feature. Perfect for design handoffs and collaboration.

## Features

- 🎯 **Toggle Annotation Mode**: Switch between normal and annotation modes
- ✨ **Element Highlighting**: Hover over elements to see them highlighted
- 📝 **Click to Annotate**: Click on any element to add an annotation
- 💾 **Save Annotations**: Store and manage annotations with callbacks
- 🎨 **Modern UI**: Clean, professional design that fits any website
- 📱 **Responsive**: Works on desktop and mobile devices
- ♿ **Accessible**: Includes proper semantic markup and keyboard navigation

## Installation

```bash
npm install website-annotation-tool
```

## Usage

```jsx
import React, { useState } from 'react';
import { WebsiteAnnotationTool, Annotation } from 'website-annotation-tool';
import 'website-annotation-tool/src/styles.css'; // Import the CSS

function App() {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  const handleAnnotationAdd = (annotation: Annotation) => {
    setAnnotations(prev => [...prev, annotation]);
  };

  const handleAnnotationRemove = (annotationId: string) => {
    setAnnotations(prev => prev.filter(ann => ann.id !== annotationId));
  };

  return (
    <div>
      {/* Your website content */}
      <h1>Welcome to my website</h1>
      <p>This is some content that can be annotated.</p>
      
      {/* Annotation Tool */}
      <WebsiteAnnotationTool
        annotations={annotations}
        onAnnotationAdd={handleAnnotationAdd}
        onAnnotationRemove={handleAnnotationRemove}
      />
    </div>
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `annotations` | `Annotation[]` | No | Array of existing annotations to display |
| `onAnnotationAdd` | `(annotation: Annotation) => void` | No | Callback when a new annotation is added |
| `onAnnotationRemove` | `(annotationId: string) => void` | No | Callback when an annotation is removed |
| `className` | `string` | No | Additional CSS class for styling |

## Annotation Interface

```typescript
interface Annotation {
  id: string;
  elementId: string;
  text: string;
  position: { x: number; y: number };
  timestamp: number;
}
```

## How It Works

1. **Toggle Mode**: Click the "Annotate" button in the bottom-left corner
2. **Highlight Elements**: Hover over any element to see it highlighted
3. **Add Annotations**: Click on a highlighted element to open the annotation form
4. **Save Notes**: Enter your annotation text and click "Save"
5. **View Annotations**: Annotations appear as yellow sticky notes when in annotation mode
6. **Remove Annotations**: Click the × button on any annotation to remove it

## Styling

The component includes built-in styles that work out of the box. You can customize the appearance by overriding CSS classes:

- `.website-annotation-toggle` - The toggle button container
- `.toggle-button` - The toggle button itself
- `.annotation-form` - The annotation input form
- `.annotation-display` - The annotation display notes

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

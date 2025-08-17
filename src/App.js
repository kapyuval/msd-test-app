import { useEffect, useState } from 'react';

function App() {
  const [snippet, setSnippet] = useState('');

  useEffect(() => {
    fetch('/config/snippet.html')
      .then((res) => res.text())
      .then((html) => setSnippet(html))
      .catch((err) => {
        console.error('Failed to load snippet:', err);
        setSnippet('<p>Failed to load snippet.</p>');
      });
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: snippet }} />
  );
}

export default App;

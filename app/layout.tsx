import React from 'react';
import 'styles/globals.css';

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html data-theme="emerald" lang="en">
      <body>{props.children}</body>
    </html>
  );
}

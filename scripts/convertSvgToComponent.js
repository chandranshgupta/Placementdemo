const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../public/IndiaMap.svg');
const startTag = '<svg';
const endTag = '</svg>';

try {
  let svgContent = fs.readFileSync(svgPath, 'utf8');

  // Extract content specifically between tags
  const startIndex = svgContent.indexOf(startTag);
  const endIndex = svgContent.indexOf(endTag) + endTag.length;

  if (startIndex === -1 || endIndex === -1) {
    throw new Error('Could not find SVG tags');
  }

  let innerContent = svgContent.substring(startIndex, endIndex);

  // Remove XML declaration if present inside (unlikely if strictly grabbing svg tag, but good finding)
  // The svg tag itself needs to be replaced with our component wrapper or modified.

  // We want to keep the viewBox but add React props.
  // Let's parse the viewBox from the string.
  const viewBoxMatch = innerContent.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 2048 2048";

  // Clean up the tag to just get inner HTML of the SVG would be easier, 
  // but we want to preserve attributes or just set our own?
  // Let's replace the opening <svg ...> with our own group logic,
  // and replace <path ...> with <motion.path ...>

  // Remove the opening <svg ...> tag and closing </svg>
  let body = innerContent.replace(/<svg[^>]*>/, '').replace('</svg>', '');

  // Replace <path with <motion.path
  // Add animation props
  // We want the stroke to draw.
  // Original has fill="#..." and likely no stroke.
  // We want to animate from stroke-only to fill? Or just stroke draw + fill fade in.

  // Global replace
  body = body.replace(/<path/g, `
      <motion.path
        initial={{ pathLength: 0, fillOpacity: 0 }}
        animate={{ pathLength: 1, fillOpacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        stroke="var(--cyber-radar)"
        strokeWidth="2"
    `);

  // We also need to handle 'transform' attribute to be valid JSX if it's not already?
  // SVG attributes are mostly valid in React, but 'class' -> 'className' (unlikely in raw SVG), 
  // style string -> object (this is the big one).
  // The previous view showed `style="background: transparent;"` in the SVG tag. 
  // Inside paths, simple attributes usually work.
  // Let's check for style="..." strings and comment them out or try to fix.
  // The cached view showed `style="background: transparent;"` on the root svg.
  // Inner paths seemed to have attributes like `d`, `fill`, `transform`.
  // Valid React props: `fill` is ok, `transform` is ok.

  const componentContent = `
'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function IndiaMap() {
  return (
    <svg 
      viewBox="${viewBox}" 
      className="w-full h-full drop-shadow-[0_0_10px_var(--cyber-text)]"
      style={{ overflow: 'visible' }}
    >
      ${body}
    </svg>
  );
}
`;

  fs.writeFileSync(path.join(__dirname, '../components/IndiaMap.tsx'), componentContent);
  console.log('Successfully created components/IndiaMap.tsx');

} catch (err) {
  console.error('Error:', err);
  process.exit(1);
}

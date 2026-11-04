import React from 'react';
import {
  siPython, siTypescript, siJavascript, siReact, siNextdotjs, siVite, siTailwindcss, siReactrouter, siReactquery,
  siTensorflow, siKeras, siPytorch, siScikitlearn, siPandas, siNumpy, siFastapi, siPydantic, siExpress, siSqlalchemy,
  siPostgresql, siRedis, siDocker, siGithubactions, siVercel, siRender, siReplit, siVitest, siTestinglibrary,
  siEslint, siPrettier, siRuff, siPytest, siMlflow, siWeightsandbiases, siHuggingface, siLangchain, siGooglegemini,
  siUnity, siCplusplus, siC, siThreedotjs, siGradio, siOpencv, siNodedotjs, siMake, siPnpm, siUv, siTimescale,
  siLanggraph, siMockserviceworker, siScipy,
} from 'simple-icons';

/* Brand icons from the simple-icons set (only the ones listed are bundled). Anything without a brand mark
   gets a quiet monogram tile, so every tool is still one tile in the grid. */
const ICONS = {
  python: siPython, typescript: siTypescript, javascript: siJavascript, react: siReact, 'next.js': siNextdotjs,
  vite: siVite, 'tailwind css': siTailwindcss, 'react router': siReactrouter, 'tanstack query': siReactquery,
  tensorflow: siTensorflow, keras: siKeras, pytorch: siPytorch, 'scikit-learn': siScikitlearn, pandas: siPandas,
  numpy: siNumpy, fastapi: siFastapi, pydantic: siPydantic, express: siExpress, sqlalchemy: siSqlalchemy,
  postgresql: siPostgresql, redis: siRedis, 'docker compose': siDocker, 'github actions': siGithubactions,
  vercel: siVercel, render: siRender, replit: siReplit, vitest: siVitest, 'testing library': siTestinglibrary,
  eslint: siEslint, prettier: siPrettier, ruff: siRuff, pytest: siPytest, mlflow: siMlflow,
  'weights & biases': siWeightsandbiases, 'hugging face hub': siHuggingface, transformers: siHuggingface,
  langchain: siLangchain, langsmith: siLangchain, 'gemini api': siGooglegemini, 'unity ml-agents': siUnity,
  'c++': siCplusplus, c: siC, 'three.js': siThreedotjs, gradio: siGradio, opencv: siOpencv, 'node.js': siNodedotjs,
  make: siMake, pnpm: siPnpm, uv: siUv, timescaledb: siTimescale, langgraph: siLanggraph, msw: siMockserviceworker,
  scipy: siScipy,
};

const monogram = (name) => {
  const words = name.replace(/[^A-Za-z0-9 +#.]/g, ' ').split(/\s+/).filter(Boolean);
  return (words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2)).toUpperCase();
};

export default function TechIcon({ name, size = 26, className = '' }) {
  const icon = ICONS[name.toLowerCase()];
  if (icon) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} role="img" aria-label={name}>
        <path d={icon.path} />
      </svg>
    );
  }
  return (
    <span
      role="img"
      aria-label={name}
      style={{ fontSize: size * 0.46 }}
      className={`font-mono font-semibold tracking-tight leading-none ${className}`}
    >
      {monogram(name)}
    </span>
  );
}

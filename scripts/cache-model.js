const { pipeline, env } = require('@huggingface/transformers');

env.cacheDir = process.env.TRANSFORMERS_CACHE || '/usr/src/app/.cache/transformers';
env.allowLocalModels = true;
env.allowRemoteModels = true;

pipeline('text-generation', 'onnx-community/Qwen2.5-1.5B-Instruct', { dtype: 'q4' })
  .then(() => {
    console.log('Cached Qwen2.5-1.5B-Instruct');
  })
  .catch((err) => {
    console.error('Model cache failed');
    console.error(err && err.message ? err.message : err);
    process.exit(1);
  });

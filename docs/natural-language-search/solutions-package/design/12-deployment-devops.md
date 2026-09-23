# Deployment

Keep `docker-compose.yml`: app on port 3001, MySQL 8.0 on port 3306.

The app image stays `node:18-alpine`. Add `@huggingface/transformers@4.3.0`. Download `Xenova/flan-t5-small` during image build into a cache directory in the image, and set the runtime to read that cache only. A request must not download weights.

No new Compose service.

Trace: architecture baseline, ADR-0001.

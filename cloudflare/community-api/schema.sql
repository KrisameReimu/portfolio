-- Users created by nickname/provider in MVP mode.
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  provider TEXT NOT NULL DEFAULT 'guest',
  display_name TEXT NOT NULL,
  email TEXT,
  role TEXT NOT NULL DEFAULT 'member',
  session_token TEXT,
  session_issued_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Favorites are scoped by user and content key.
CREATE TABLE IF NOT EXISTS favorites (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  item_key TEXT NOT NULL,
  item_type TEXT NOT NULL,
  item_title TEXT NOT NULL,
  item_url TEXT NOT NULL,
  item_cover_image TEXT,
  client_ts TEXT,
  source_page TEXT,
  ua_hash TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_favorites_user_item
ON favorites(user_id, item_key);

CREATE INDEX IF NOT EXISTS idx_favorites_user_id
ON favorites(user_id);

-- Comments with a simple moderation status.
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  resource_key TEXT NOT NULL,
  user_id TEXT NOT NULL,
  display_name TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'ok',
  client_ts TEXT,
  source_page TEXT,
  ua_hash TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_comments_resource_created
ON comments(resource_key, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_comments_status
ON comments(status);

-- Weekly "Now" snapshots.
CREATE TABLE IF NOT EXISTS now_snapshots (
  id TEXT PRIMARY KEY,
  week_of TEXT NOT NULL,
  focus_zh TEXT NOT NULL,
  focus_en TEXT NOT NULL,
  doing_zh TEXT NOT NULL,
  doing_en TEXT NOT NULL,
  not_doing_zh TEXT NOT NULL,
  not_doing_en TEXT NOT NULL,
  blockers_zh TEXT NOT NULL,
  blockers_en TEXT NOT NULL,
  next_actions_zh TEXT NOT NULL,
  next_actions_en TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_now_snapshots_week_of
ON now_snapshots(week_of DESC);

-- Public roadmap items.
CREATE TABLE IF NOT EXISTS roadmap_items (
  id TEXT PRIMARY KEY,
  area TEXT NOT NULL,
  title_zh TEXT NOT NULL,
  title_en TEXT NOT NULL,
  status TEXT NOT NULL,
  priority INTEGER NOT NULL DEFAULT 2,
  target_month TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_roadmap_items_status
ON roadmap_items(status);

CREATE INDEX IF NOT EXISTS idx_roadmap_items_sort
ON roadmap_items(sort_order ASC, created_at DESC);

-- Experiment logs by pillar.
CREATE TABLE IF NOT EXISTS experiments (
  id TEXT PRIMARY KEY,
  pillar TEXT NOT NULL,
  status TEXT NOT NULL,
  title_zh TEXT NOT NULL,
  title_en TEXT NOT NULL,
  hypothesis_zh TEXT NOT NULL,
  hypothesis_en TEXT NOT NULL,
  method_zh TEXT NOT NULL,
  method_en TEXT NOT NULL,
  result_zh TEXT NOT NULL,
  result_en TEXT NOT NULL,
  failure_notes_zh TEXT NOT NULL,
  failure_notes_en TEXT NOT NULL,
  decision_zh TEXT NOT NULL,
  decision_en TEXT NOT NULL,
  published_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_experiments_pillar_status
ON experiments(pillar, status, published_at DESC);

-- Subscribers for future newsletter or updates.
CREATE TABLE IF NOT EXISTS subscribers (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  locale TEXT NOT NULL DEFAULT 'en',
  source TEXT NOT NULL DEFAULT 'site',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_subscribers_created
ON subscribers(created_at DESC);

-- Contact form messages submitted from the public site.
CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  topic TEXT NOT NULL,
  message TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'en',
  source TEXT NOT NULL DEFAULT 'contact-page',
  page_path TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  client_ts TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created
ON contact_messages(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_messages_status
ON contact_messages(status, created_at DESC);

-- Generic event stream for analytics and abuse forensics.
CREATE TABLE IF NOT EXISTS page_events (
  id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  event_name TEXT NOT NULL,
  page_path TEXT NOT NULL,
  user_id TEXT,
  session_token TEXT,
  payload_json TEXT,
  ua_hash TEXT,
  client_ts TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_page_events_type_created
ON page_events(event_type, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_page_events_user_created
ON page_events(user_id, created_at DESC);

-- Ask Echo query logs for quality monitoring.
CREATE TABLE IF NOT EXISTS ask_queries (
  id TEXT PRIMARY KEY,
  query TEXT NOT NULL,
  answer TEXT NOT NULL,
  top_citations_json TEXT NOT NULL,
  confidence REAL NOT NULL DEFAULT 0,
  fallback INTEGER NOT NULL DEFAULT 0,
  latency_ms INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'ok',
  user_id TEXT,
  locale TEXT NOT NULL DEFAULT 'en',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_ask_queries_created
ON ask_queries(created_at DESC);

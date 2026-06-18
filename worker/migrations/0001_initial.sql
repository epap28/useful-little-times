PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions(user_id);

CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_preferences (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  category_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('PREFERRED', 'AVOIDED')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  UNIQUE(user_id, category_id)
);

CREATE TABLE IF NOT EXISTS sources (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  publisher TEXT,
  added_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS learning_items (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category_id TEXT NOT NULL,
  card_type TEXT NOT NULL,
  content TEXT NOT NULL,
  explanation TEXT NOT NULL,
  prompt TEXT,
  answer TEXT,
  answer_options TEXT,
  mnemonic TEXT,
  analogy TEXT,
  approved INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS learning_item_sources (
  learning_item_id TEXT NOT NULL,
  source_id TEXT NOT NULL,
  FOREIGN KEY (learning_item_id) REFERENCES learning_items(id) ON DELETE CASCADE,
  FOREIGN KEY (source_id) REFERENCES sources(id) ON DELETE CASCADE,
  PRIMARY KEY (learning_item_id, source_id)
);

CREATE TABLE IF NOT EXISTS activity_items (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  home_version TEXT NOT NULL,
  office_version TEXT NOT NULL,
  remote_version TEXT,
  why TEXT NOT NULL,
  safety_note TEXT NOT NULL,
  tags TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_item_interactions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('LEARNING', 'ACTIVITY')),
  learning_item_id TEXT,
  activity_item_id TEXT,
  shown_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  feedback TEXT CHECK (feedback IN ('KNEW_THIS', 'NOT_RELEVANT', 'INTERESTING', 'SHOW_ANOTHER', 'TOO_EASY', 'TOO_HARD')),
  quiz_answer TEXT,
  quiz_correct INTEGER,
  batch_number INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (learning_item_id) REFERENCES learning_items(id) ON DELETE SET NULL,
  FOREIGN KEY (activity_item_id) REFERENCES activity_items(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS interactions_user_batch_idx ON user_item_interactions(user_id, batch_number);
CREATE INDEX IF NOT EXISTS interactions_learning_item_idx ON user_item_interactions(learning_item_id);
CREATE INDEX IF NOT EXISTS interactions_activity_item_idx ON user_item_interactions(activity_item_id);

CREATE TABLE IF NOT EXISTS recaps (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  batch_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  questions TEXT NOT NULL,
  item_ids TEXT NOT NULL,
  activity_ids TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, batch_number)
);

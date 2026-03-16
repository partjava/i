CREATE TABLE study_sessions_new (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  study_time int NOT NULL DEFAULT 0,
  category varchar(255) DEFAULT NULL,
  technology varchar(255) DEFAULT NULL,
  activity varchar(255) DEFAULT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  study_date DATE GENERATED ALWAYS AS (DATE(created_at)) STORED,
  PRIMARY KEY (id),
  KEY idx_user_id (user_id),
  KEY idx_created_at (created_at),
  UNIQUE KEY uq_user_date (user_id, study_date),
  CONSTRAINT study_sessions_fk2 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

INSERT INTO study_sessions_new (user_id, study_time, category, technology, activity, created_at)
SELECT user_id, SUM(study_time), MAX(category), MAX(technology), MAX(activity),
       DATE_FORMAT(MIN(created_at), '%Y-%m-%d 00:00:00')
FROM study_sessions
GROUP BY user_id, DATE(created_at);

DROP TABLE study_sessions;
RENAME TABLE study_sessions_new TO study_sessions;

CREATE TABLE IF NOT EXISTS "session" (
	sid varchar NOT NULL COLLATE "default" PRIMARY KEY,
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
);

CREATE INDEX session_expire_index ON session(expire);

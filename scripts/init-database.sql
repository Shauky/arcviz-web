-- Initial database setup script
-- This will create the database and enable necessary extensions

-- Enable UUID extension for generating unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable full-text search extension
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create indexes for better performance
-- These will be created after running prisma migrate

-- Full-text search indexes
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS job_postings_search_idx ON job_postings USING gin(to_tsvector('english', title || ' ' || description));
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS companies_search_idx ON companies USING gin(to_tsvector('english', name || ' ' || COALESCE(description, '')));

-- Performance indexes
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS leads_email_idx ON leads(email);
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS leads_status_idx ON leads(status);
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS job_postings_status_idx ON job_postings(status);
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS analytics_events_created_at_idx ON analytics_events(created_at);

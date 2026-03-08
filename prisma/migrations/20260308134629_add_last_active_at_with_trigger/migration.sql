-- AlterTable
ALTER TABLE "Owner" ADD COLUMN     "lastActiveAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Trigger: automatically update Owner.lastActiveAt whenever one of their tasks changes
CREATE OR REPLACE FUNCTION update_owner_last_active()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    UPDATE "Owner" SET "lastActiveAt" = NOW() WHERE id = OLD."ownerId";
  ELSE
    UPDATE "Owner" SET "lastActiveAt" = NOW() WHERE id = NEW."ownerId";
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER task_change_update_owner_last_active
AFTER INSERT OR UPDATE OR DELETE ON "Task"
FOR EACH ROW EXECUTE FUNCTION update_owner_last_active();

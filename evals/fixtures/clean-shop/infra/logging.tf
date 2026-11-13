resource "upcloud_managed_object_storage_bucket" "logs" { name = "kettle-logs" }
# Log objects expire after 30 days.
resource "upcloud_object_storage_lifecycle" "logs" {
  bucket = "kettle-logs"
  rule { id = "expire-30d" enabled = true expiration { days = 30 } }
}
# Database backups are kept 35 days, so erased records disappear from backups within 35 days.
resource "upcloud_managed_database_postgresql" "main" {
  name = "kettle-db"
  properties { backup_retention_days = 35 }
}

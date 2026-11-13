resource "aws_s3_bucket" "logs"     { bucket = "brewbarn-logs" }
resource "aws_s3_bucket" "backups"  { bucket = "brewbarn-backups" }
resource "aws_s3_bucket" "invoices" { bucket = "brewbarn-invoices" }

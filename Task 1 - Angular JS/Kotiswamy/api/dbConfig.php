<?php

try {
  $dsn = "pgsql:host=localhost;dbname=ifmis_database";
  $dbUsername = 'postgres';
  $dbPassword = 'Swamy@61802';

  $pdo = new PDO($dsn, $dbUsername, $dbPassword);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException) {
  echo "Connection Failed";
}

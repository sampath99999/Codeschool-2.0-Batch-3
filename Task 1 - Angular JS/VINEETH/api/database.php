<?php
$url = "https://fakestoreapi.com/products";
$data = file_get_contents($url);
$data = json_decode($data, true);

if (isset($data)) {
    require_once './dbconfig.php';
    $pdo = getPDO();
    $categories = [
        ['cat_id' => 1, 'name' => "men's clothing"],
        ['cat_id' => 2, 'name' => "jewelery"],
        ['cat_id' => 3, 'name' => "electronics"],
        ['cat_id' => 4, 'name' => "women's clothing"],
    ];

    $categoryInsertQuery = "INSERT INTO categories (cat_id, name) VALUES (?, ?)";
    $categoryInsertStatement = $pdo->prepare($categoryInsertQuery);
    
    foreach ($categories as $categoryData) {
        $categoryQuery = "SELECT cat_id FROM categories WHERE cat_id = ?";
        $categoryStatement = $pdo->prepare($categoryQuery);
        $categoryStatement->execute([$categoryData['cat_id']]);
        $categoryIdResult = $categoryStatement->fetch();
        
        if (!$categoryIdResult) {
            $categoryInsertStatement->execute([$categoryData['cat_id'], $categoryData['name']]);
        }
    }
    
    foreach ($data as $items) {
        $title = $items['title'];
        $price = $items['price'];
        $description = $items['description'];
        $category_name = $items['category'];  
        $image_url = $items['image'];
        $rating = $items['rating']['rate'];
        $categoryQuery = "SELECT cat_id FROM categories WHERE name = ?";
        $categoryStatement = $pdo->prepare($categoryQuery);
        $categoryStatement->execute([$category_name]);
        $categoryIdResult = $categoryStatement->fetch();
        
        if ($categoryIdResult) {
            $category_id = $categoryIdResult['cat_id'];
        } else {
             echo "null";
        }
        
        $query = "INSERT INTO products (productName, price, description, category_id, image_url, rating) VALUES (?, ?, ?, ?, ?, ?)";
        $smt = $pdo->prepare($query);
        $smt->execute([$title, $price, $description, $category_id, $image_url, $rating]);
    }
}
else{
    echo 'database connection failed !!!!';
}

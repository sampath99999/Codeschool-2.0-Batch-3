<?php

    // Function to return success response and data.
    function responseSuccess($message, $data){
        $response = ["status" => true, "message" => $message, "data" => $data];
        return json_encode($response);
    }

    // Funtion to return error response and no data.
    function responseError($message){
        $response = ["status" => false, "message" => $message];
        return json_encode($response);    
    }

?>
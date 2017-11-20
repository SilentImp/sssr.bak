<?php
require __DIR__ . '/../vendor/autoload.php';
use Nacmartin\PhpExecJs\PhpExecJs;

$config = file_get_contents('webpack-assets.json');
$config = json_decode($config, true);
// $react_source = file_get_contents($config['a']['js']);
// $app_source = file_get_contents($config['main']['js']);

function url(){
  return sprintf(
    "%s://%s%s",
    isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http',
    $_SERVER['SERVER_NAME'],
    $_SERVER['REQUEST_URI']
  );
}

echo url();

$v8 = new V8Js();
$react = array();
$react[] = "function setTimeout(){}";
$react[] = "function setInterval(){}";
$react[] = "global = {
    setTimeout: setTimeout,
    setInterval: setInterval,
    css: [],
    location: {
      origin: '".url()."'
    }
  }";
$react[] = "window = global";
$react[] = file_get_contents('react-with-addons.js');
$react[] = file_get_contents('react-dom-server.js');
$react[] = file_get_contents('../transpiled/shared/components/example/index.js');
$react = implode(";\n", $react);

try {
  $v8->executeString($react);
} catch (V8JsException $e) {
  echo "<pre>"; var_dump($e);
}

// $phpexecjs = new PhpExecJs();
// $rjs = new ReactJS($react_source, $app_source);
// $rjs->setComponent('ExamplePage');
// echo $rjs->getMarkup();
// var_dump($config['main']['js']);
// echo $v8->executeString($react_source);
// echo $phpexecjs->evalJs("
//   import React from 'react';
//   import ReactDOM from 'react-dom';
//   import ExamplePage from 'components/example';
// ");

?>
